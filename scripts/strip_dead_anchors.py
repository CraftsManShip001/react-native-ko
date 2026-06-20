#!/usr/bin/env python3
"""빌드 로그가 확정한 '죽은 앵커'(원본에도 없는 섹션을 가리키는 업스트림 stale 링크)를 정리한다.
- 타 페이지 대상: fragment 만 제거해 페이지로 연결.
- 같은 페이지(#frag) 대상: 링크를 풀어 텍스트만 남김.
"""
import os, re

REPO = '/Users/zerone001/Projects/react-native-ko'
WEB = REPO + '/website'
LOG = '/tmp/rnko-build.log'

SECTIONS = [
    ('/docs/', f'{WEB}/versioned_docs/version-0.86'),
    ('/contributing/', f'{WEB}/contributing'),
    ('/community/', f'{WEB}/community'),
    ('/architecture/', f'{WEB}/architecture'),
]

# route -> 소스 파일 절대경로 (frontmatter id/slug 별칭 포함)
route2file = {}
def fm_aliases(text, rel):
    al = set()
    m = re.match(r'^---\n(.*?)\n---', text, re.S)
    if not m:
        return al
    fm = m.group(1)
    bd = os.path.dirname(rel)
    idm = re.search(r'^id:\s*([^\s#]+)\s*$', fm, re.M)
    if idm:
        v = idm.group(1).strip('"\'')
        al.add(os.path.normpath(os.path.join(bd, v)) if bd else v)
    sm = re.search(r'^slug:\s*([^\s#]+)\s*$', fm, re.M)
    if sm:
        al.add(sm.group(1).strip('"\'').lstrip('/'))
    return al

for prefix, root in SECTIONS:
    for dp, _, files in os.walk(root):
        for fn in files:
            if not fn.endswith(('.md', '.mdx')):
                continue
            full = os.path.join(dp, fn)
            rel = re.sub(r'\.(md|mdx)$', '', os.path.relpath(full, root))
            txt = open(full, encoding='utf-8').read()
            route2file.setdefault(prefix + rel, full)
            for a in fm_aliases(txt, rel):
                route2file.setdefault(prefix + a, full)

# 빌드 로그 파싱: (sourceRoute, rawTarget)
pairs = []
src = None
for line in open(LOG, encoding='utf-8'):
    m = re.search(r'Broken (?:anchor|link) on source page path = (\S+):', line)
    if m:
        src = m.group(1); continue
    m = re.search(r'-> linking to (\S+)', line)
    if m and src:
        pairs.append((src, m.group(1)))

stripped = 0
unlinked = 0
missing_src = set()
by_file = {}
for src, raw in pairs:
    if '#' not in raw:
        continue
    f = route2file.get(src)
    if not f:
        missing_src.add(src); continue
    by_file.setdefault(f, set()).add(raw)

for f, raws in by_file.items():
    txt = open(f, encoding='utf-8').read()
    orig = txt
    for raw in raws:
        path = raw.split('#', 1)[0]
        if path == '':
            # 같은 페이지 죽은 앵커 -> 링크 해제 (텍스트 유지)
            pat = re.compile(r'\[([^\]]+)\]\(' + re.escape(raw) + r'\)')
            txt, n = pat.subn(r'\1', txt)
            unlinked += n
        else:
            # 타 페이지 -> fragment 제거
            for q in (f'])({raw})', f'](%s)' % raw):
                pass
            txt2 = txt.replace(f']({raw})', f']({path})')
            txt2 = txt2.replace(f'href="{raw}"', f'href="{path}"').replace(f"href='{raw}'", f"href='{path}'")
            if txt2 != txt:
                stripped += 1
            txt = txt2
    if txt != orig:
        open(f, 'w', encoding='utf-8').write(txt)

print(f'fragment 제거: {stripped}건, 링크 해제(같은 페이지): {unlinked}건')
print(f'소스 라우트 미해결: {sorted(missing_src) if missing_src else "없음"}')
