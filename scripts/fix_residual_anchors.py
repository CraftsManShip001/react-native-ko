#!/usr/bin/env python3
"""빌드가 확정한 잔여 깨진 앵커를, 실제 빌드 HTML 의 id 와 퍼지 매칭해 교정한다.
- 라벨 접미사(-ios/-android) 차이 등은 실제 id 로 교정.
- 매칭 안 되면(진짜 죽은 앵커) fragment 제거 / 같은 페이지면 링크 해제.
"""
import os, re

REPO = '/Users/zerone001/Projects/react-native-ko'
WEB = REPO + '/website'
BUILD = WEB + '/build'
LOG = '/tmp/rnko-build.log'

SECTIONS = [
    ('/docs/', f'{WEB}/versioned_docs/version-0.86'),
    ('/contributing/', f'{WEB}/contributing'),
    ('/community/', f'{WEB}/community'),
    ('/architecture/', f'{WEB}/architecture'),
]

def fm_aliases(text, rel):
    al = set()
    m = re.match(r'^---\n(.*?)\n---', text, re.S)
    if not m:
        return al
    fm, bd = m.group(1), os.path.dirname(rel)
    idm = re.search(r'^id:\s*([^\s#]+)\s*$', fm, re.M)
    if idm:
        v = idm.group(1).strip('"\'')
        al.add(os.path.normpath(os.path.join(bd, v)) if bd else v)
    sm = re.search(r'^slug:\s*([^\s#]+)\s*$', fm, re.M)
    if sm:
        al.add(sm.group(1).strip('"\'').lstrip('/'))
    return al

route2file = {}
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

_id_cache = {}
def real_ids(route):
    if route in _id_cache:
        return _id_cache[route]
    path = BUILD + route + '.html'
    ids = set()
    if os.path.exists(path):
        html = open(path, encoding='utf-8', errors='ignore').read()
        for m in re.finditer(r'\bid=(?:"([^"]+)"|([A-Za-z0-9_\-:.]+))', html):
            v = m.group(1) or m.group(2)
            if v and not v.startswith('__docusaurus'):
                ids.add(v.lower())
    _id_cache[route] = ids
    return ids

def stem(s):
    return re.sub(r'-(ios-android|android-ios|ios|android)$', '', s)

def best_id(frag, ids):
    f = frag.lower()
    if f in ids:
        return f
    fs = stem(f)
    for i in ids:
        if stem(i) == fs or stem(i) == f or i == fs:
            return i
    cands = [i for i in ids if i.endswith(f) or i.endswith(fs) or i.startswith(f) or i.startswith(fs)]
    if len(cands) == 1:
        return cands[0]
    return None

def resolve(section, rel, pathpart):
    pathpart = pathpart.split('?', 1)[0]
    for pref, sec in (('/docs/', '/docs/'), ('/contributing/', '/contributing/'), ('/community/', '/community/'), ('/architecture/', '/architecture/')):
        if pathpart.startswith(pref):
            return pref + re.sub(r'\.(md|mdx)$', '', pathpart[len(pref):]).rstrip('/')
    if pathpart.startswith('/'):
        return None
    if pathpart == '':
        return section + rel
    base = os.path.dirname(rel)
    return section + os.path.normpath(os.path.join(base, re.sub(r'\.(md|mdx)$', '', pathpart)))

# 빌드 로그: (srcRoute, frag, targetRoute)
broken = []
src = None
for line in open(LOG, encoding='utf-8'):
    m = re.search(r'Broken (?:anchor|link) on source page path = (\S+):', line)
    if m:
        src = m.group(1); continue
    m = re.search(r'-> linking to (\S+?)(?: \(resolved as: (\S+?)\))?$', line.rstrip())
    if m and src:
        raw = m.group(1); resolved = m.group(2) or raw
        if '#' in resolved:
            broken.append((src, resolved.split('#', 1)[1], resolved.split('#', 1)[0]))

# srcRoute -> sectionprefix/rel 정보
def route_parts(route):
    for pref, _ in SECTIONS:
        if route.startswith(pref):
            return pref, route[len(pref):]
    return None, None

remapped = stripped = unlinked = skipped = 0
LINK_RE = re.compile(r'(\]\(|href=["\'])([^)"\'\s]+)([)"\'])')
edits = {}
for srcRoute, frag, targetRoute in broken:
    f = route2file.get(srcRoute)
    if not f:
        skipped += 1; continue
    ids = real_ids(targetRoute)
    new = best_id(frag, ids) if ids else None
    edits.setdefault(f, []).append((frag, targetRoute, new))

for f, items in edits.items():
    sec, rel = None, None
    for pref, root in SECTIONS:
        if f.startswith(root):
            sec = pref; rel = re.sub(r'\.(md|mdx)$', '', os.path.relpath(f, root)); break
    text = open(f, encoding='utf-8').read()
    lines = text.split('\n'); infence = False
    item_map = {(frag.lower(), tr): new for frag, tr, new in items}
    for li, line in enumerate(lines):
        st = line.lstrip()
        if st.startswith('```') or st.startswith('~~~'):
            infence = not infence; continue
        if infence:
            continue
        def repl(m):
            global remapped, stripped
            pre, tgt, post = m.group(1), m.group(2), m.group(3)
            if '#' not in tgt:
                return m.group(0)
            path, fr = tgt.split('#', 1)
            tr = resolve(sec, rel, path)
            if tr is None:
                return m.group(0)
            key = (fr.lower().split('?', 1)[0], tr)
            if key not in item_map:
                return m.group(0)
            new = item_map[key]
            if new:
                remapped += 1
                return f'{pre}{path}#{new}{post}'
            else:
                if path == '':
                    return m.group(0)  # 같은 페이지 죽은 앵커는 라인 단위로 후처리
                stripped += 1
                return f'{pre}{path}{post}'
        lines[li] = LINK_RE.sub(repl, line)
    new_text = '\n'.join(lines)
    # 같은 페이지 죽은 앵커: 링크 해제
    for frag, tr, new in items:
        if new is None and tr == sec + rel:
            pat = re.compile(r'\[([^\]]+)\]\(#' + re.escape(frag) + r'\)', re.I)
            new_text, n = pat.subn(r'\1', new_text)
            unlinked += n
    if new_text != text:
        open(f, 'w', encoding='utf-8').write(new_text)

print(f'리맵: {remapped}, fragment제거: {stripped}, 링크해제: {unlinked}, 소스미해결: {skipped}')
