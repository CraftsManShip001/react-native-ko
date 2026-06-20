#!/usr/bin/env python3
"""번역으로 바뀐 헤딩 자동 id 때문에 깨진 내부 앵커 링크를 수정한다.
- 영어 원문(git HEAD)과 현재 한국어 파일의 헤딩을 파일별 index 로 짝지어
  englishSlug -> koreanSlug 매핑을 만든다 (github-slugger 동일 재현).
- 모든 소스의 내부 링크 fragment 를 koreanSlug 로 교체한다.
"""
import os, re, subprocess
from collections import defaultdict

REPO = '/Users/zerone001/Projects/react-native-ko'
WEB = REPO + '/website'

# 매핑을 만들 (번역된) 섹션: section -> (소스 루트, git 경로 prefix)
TRANSLATED = {
    'docs': (f'{WEB}/versioned_docs/version-0.86', 'website/versioned_docs/version-0.86'),
    'contributing': (f'{WEB}/contributing', 'website/contributing'),
    'community': (f'{WEB}/community', 'website/community'),
}
# 링크를 고칠 디렉터리 (architecture 는 영어지만 /docs 앵커를 참조하므로 포함)
REWRITE_ROOTS = [
    (f'{WEB}/versioned_docs/version-0.86', 'docs'),
    (f'{WEB}/contributing', 'contributing'),
    (f'{WEB}/community', 'community'),
    (f'{WEB}/architecture', 'architecture'),
]

# --- github-slugger 재현 (Docusaurus 가 사용) ---
# 문자/숫자/밑줄(\w, 유니코드)·하이픈·공백만 유지, 나머지 문장부호 제거 후 공백->하이픈.
def gh_slug(text):
    s = text.strip().lower()
    s = re.sub(r'[^\w\s-]', '', s, flags=re.UNICODE)
    s = re.sub(r'\s', '-', s)
    return s

class Slugger:
    def __init__(self):
        self.seen = defaultdict(int)
    def slug(self, text):
        base = gh_slug(text)
        n = self.seen[base]
        self.seen[base] += 1
        return base if n == 0 else f'{base}-{n}'

def heading_text(raw):
    t = re.sub(r'`([^`]*)`', r'\1', raw)             # 인라인 코드
    t = re.sub(r'\[([^\]]*)\]\([^)]*\)', r'\1', t)    # 링크 -> 텍스트
    t = re.sub(r'[*_]{1,3}', '', t)                   # 강조
    t = re.sub(r'\s*\{#[\w-]+\}\s*$', '', t)          # 명시적 앵커
    return t.strip()

def extract_headings(text):
    out = []
    infence = False
    for line in text.split('\n'):
        st = line.lstrip()
        if st.startswith('```') or st.startswith('~~~'):
            infence = not infence
            continue
        if infence:
            continue
        m = re.match(r'^(#{1,6})\s+(.+?)\s*$', line)
        if m:
            out.append(heading_text(m.group(2)))
    return out

def git_show(path):
    try:
        return subprocess.run(['git', 'show', f'HEAD:{path}'], cwd=REPO,
                              capture_output=True, text=True, check=True).stdout
    except subprocess.CalledProcessError:
        return None

def rel_no_ext(root, full):
    return re.sub(r'\.(md|mdx)$', '', os.path.relpath(full, root))

def frontmatter_aliases(text, rel):
    """frontmatter 의 id/slug 로부터 추가 라우트 키(상대경로)를 만든다."""
    aliases = set()
    m = re.match(r'^---\n(.*?)\n---', text, re.S)
    if not m:
        return aliases
    fm = m.group(1)
    base_dir = os.path.dirname(rel)
    idm = re.search(r'^id:\s*([^\s#]+)\s*$', fm, re.M)
    if idm:
        aliases.add(os.path.normpath(os.path.join(base_dir, idm.group(1).strip('"\''))) if base_dir else idm.group(1).strip('"\''))
    sm = re.search(r'^slug:\s*([^\s#]+)\s*$', fm, re.M)
    if sm:
        slug = sm.group(1).strip('"\'')
        aliases.add(slug.lstrip('/'))
    return aliases

# --- 1) 매핑 구축: (section, relpath) -> {engSlug: koSlug} ---
MAP = {}
mismatch = []
for section, (root, gitprefix) in TRANSLATED.items():
    for dirpath, _, files in os.walk(root):
        for fn in files:
            if not fn.endswith(('.md', '.mdx')):
                continue
            full = os.path.join(dirpath, fn)
            rel = rel_no_ext(root, full)
            ko_text = open(full, encoding='utf-8').read()
            en_text = git_show(f'{gitprefix}/{os.path.relpath(full, root)}')
            ko_h = extract_headings(ko_text)
            en_h = extract_headings(en_text) if en_text is not None else ko_h
            if len(en_h) != len(ko_h):
                mismatch.append((section, rel, len(en_h), len(ko_h)))
            es, ks = Slugger(), Slugger()
            d = {}
            for e, k in zip(en_h, ko_h):
                d[es.slug(e)] = ks.slug(k)
            MAP[(section, rel)] = d
            for alias in frontmatter_aliases(ko_text, os.path.relpath(full, root).rsplit('.', 1)[0]):
                MAP[(section, alias)] = d

# --- 2) 링크 재작성 ---
LINK_RE = re.compile(r'(\]\(|href=["\'])([^)"\'\s]+)([)"\'])')

def resolve(section, rel, target):
    if '#' not in target:
        return None
    pathpart, frag = target.split('#', 1)
    pathpart = pathpart.split('?', 1)[0]
    frag = frag.split('?', 1)[0]
    if not frag:
        return None
    for pref, sec in (('/docs/', 'docs'), ('/contributing/', 'contributing'), ('/community/', 'community')):
        if pathpart.startswith(pref):
            trel = re.sub(r'\.(md|mdx)$', '', pathpart[len(pref):]).rstrip('/')
            return (sec, trel, frag)
    if pathpart.startswith('/'):
        return None
    if pathpart == '':
        return (section, rel, frag)
    base = os.path.dirname(rel)
    trel = os.path.normpath(os.path.join(base, re.sub(r'\.(md|mdx)$', '', pathpart)))
    return (section, trel, frag)

fixed = 0
files_changed = 0
for root, section in REWRITE_ROOTS:
    for dirpath, _, files in os.walk(root):
        for fn in files:
            if not fn.endswith(('.md', '.mdx')):
                continue
            full = os.path.join(dirpath, fn)
            rel = rel_no_ext(root, full)
            text = open(full, encoding='utf-8').read()
            changed = [0]
            out_lines = []
            infence = False
            for line in text.split('\n'):
                st = line.lstrip()
                if st.startswith('```') or st.startswith('~~~'):
                    infence = not infence
                    out_lines.append(line); continue
                if infence:
                    out_lines.append(line); continue
                def repl(m):
                    pre, tgt, post = m.group(1), m.group(2), m.group(3)
                    res = resolve(section, rel, tgt)
                    if not res:
                        return m.group(0)
                    sec, trel, frag = res
                    d = MAP.get((sec, trel))
                    if not d:
                        return m.group(0)
                    new = d.get(frag) or d.get(frag.lower())
                    if not new or new == frag:
                        return m.group(0)
                    changed[0] += 1
                    base = tgt.split('#', 1)[0]
                    return f'{pre}{base}#{new}{post}'
                out_lines.append(LINK_RE.sub(repl, line))
            if changed[0]:
                open(full, 'w', encoding='utf-8').write('\n'.join(out_lines))
                fixed += changed[0]
                files_changed += 1

print(f'리맵된 링크: {fixed}개, 수정 파일: {files_changed}개')
print(f'헤딩 개수 불일치 파일: {len(mismatch)}개', mismatch[:10] if mismatch else '')
