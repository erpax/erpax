import { defineConfig } from 'vitepress'
import { readdirSync, statSync, existsSync, readFileSync } from 'node:fs'
import { join, relative, dirname, basename } from 'node:path'
import type MarkdownIt from 'markdown-it'

// ── The fractal skill tree IS the docs structure ──────────────────────────
// VitePress's directory→sidebar→route mapping is the same path-as-address law
// the skills follow, so the tree maps 1:1: folder→nav group, SKILL.md→page,
// [[link]]→route. The sidebar + wiki-link map are DERIVED from the filesystem
// (the akashic record), never hand-listed.
const SKILLS_DIR = '.claude/skills'

type SidebarItem = { text: string; link?: string; collapsed?: boolean; items?: SidebarItem[] }
const wikiMap: Record<string, string> = {} // leaf word → route
const allSkills: { name: string; route: string }[] = [] // flat list → the reading chain

function routeOf(relDir: string): string {
  // Routes are srcDir-relative (srcDir = SKILLS_DIR), so drop that base prefix:
  // .claude/skills/self/sufficient → /self/sufficient/SKILL
  return '/' + relative(SKILLS_DIR, relDir).split(/[\\/]/).join('/') + '/SKILL'
}

function walk(dir: string): SidebarItem[] {
  const items: SidebarItem[] = []
  for (const name of readdirSync(dir).sort()) {
    const full = join(dir, name)
    if (!statSync(full).isDirectory()) continue
    const rel = relative('.', full)
    const route = routeOf(rel)
    wikiMap[name] = route // leaf-word resolution (one word per concept ⇒ unique)
    allSkills.push({ name, route })
    const children = walk(full)
    items.push(children.length ? { text: name, link: route, collapsed: true, items: children } : { text: name, link: route })
  }
  return items
}

const skillSidebar = walk(SKILLS_DIR)

// ── Reading order = the sequence (0·3·6·9·1·2·4·8·7·5), DERIVED from the
// `sequence` skill's "Positions → skills" table — the akashic source of the
// order, the one thing NOT derivable from the path. prev/next walk this chain
// so an agent following `next` reads the corpus as the dance, not A→Z. Skills
// absent from the table fall back to alphabetical, after the core order.
function sequenceOrder(): string[] {
  try {
    const txt = readFileSync(join(SKILLS_DIR, 'sequence', 'SKILL.md'), 'utf8')
    const start = txt.indexOf('Positions → skills')
    if (start < 0) return []
    const next = txt.indexOf('\n## ', start + 1)
    const region = txt.slice(start, next < 0 ? undefined : next)
    const order: string[] = []
    for (const m of region.matchAll(/`([a-z][a-z0-9-]*)`/g)) {
      if (!order.includes(m[1])) order.push(m[1])
    }
    return order
  } catch {
    return []
  }
}
const SEQ = sequenceOrder()
const seqRank = (name: string): number => {
  const i = SEQ.indexOf(name)
  return i < 0 ? Number.MAX_SAFE_INTEGER : i
}
const readingChain = [...allSkills].sort(
  (a, b) => seqRank(a.name) - seqRank(b.name) || a.route.localeCompare(b.route),
)
const chainIndex = new Map(readingChain.map((s, i) => [s.route, i]))

// ── Directional relations, COMPUTED from the path (never stored) ───────────
// The path IS the address, so a skill's neighbours are derivable: ancestors /
// siblings / children fall out of the folder tree, `related` out of the body's
// [[links]]. Nothing is hand-listed in frontmatter — `transformPageData` injects
// these per page at build time, keeping stored frontmatter minimal (name/desc).
type Ref = { text: string; link: string }
const isSkill = (dir: string): boolean => existsSync(join(dir, 'SKILL.md'))
const skillRef = (relDir: string): Ref => ({ text: basename(relDir), link: routeOf(relDir) })
const subDirs = (dir: string): string[] =>
  existsSync(dir)
    ? readdirSync(dir)
        .map((n) => join(dir, n))
        .filter((d) => statSync(d).isDirectory())
        .sort()
    : []

function relationsFromPath(pageRel: string): {
  ancestors: Ref[]
  siblings: Ref[]
  children: Ref[]
  related: Ref[]
} {
  // pageRel is srcDir-relative (e.g. self/sufficient/SKILL.md); the config's
  // filesystem reads run from the project root, so rebase onto SKILLS_DIR.
  const fsFile = join(SKILLS_DIR, pageRel)
  const relDir = dirname(fsFile) // e.g. .claude/skills/self/sufficient
  const parent = dirname(relDir)
  // ancestors: every skill folder up the path to the skills root
  const ancestors: Ref[] = []
  for (let p = parent; p.startsWith(SKILLS_DIR) && p !== SKILLS_DIR; p = dirname(p)) {
    if (isSkill(p)) ancestors.unshift(skillRef(p))
  }
  // siblings: same-parent skill folders; children: nested skill folders
  const siblings = subDirs(parent).filter((d) => d !== relDir && isSkill(d)).map(skillRef)
  const children = subDirs(relDir).filter(isSkill).map(skillRef)
  // related: the [[links]] in the body, resolved against the tree (deduped, self excluded)
  const selfWord = basename(relDir)
  const related: Ref[] = []
  if (existsSync(fsFile)) {
    const body = readFileSync(fsFile, 'utf8')
      .replace(/^---[\s\S]*?\n---/, ' ') // strip frontmatter
      .replace(/```[\s\S]*?```/g, ' ') // strip fenced code
      .replace(/`[^`]*`/g, ' ') // strip inline code
    const seen = new Set<string>()
    for (const m of body.matchAll(/\[\[([a-z][a-z0-9/-]*)(?:\|[^\]]*)?\]\]/g)) {
      const target = m[1]
      const word = target.split('/').pop() as string
      if (word === selfWord || seen.has(word)) continue
      seen.add(word)
      related.push({ text: word, link: resolveWiki(target) })
    }
  }
  return { ancestors, siblings, children, related }
}

// Resolve [[word]] / [[a/b]] / [[word|alias]] against the skill tree.
// An unresolved word points at its EXPECTED skill path, so VitePress strict
// (ignoreDeadLinks: false) flags it as a dead link = an aura gap = an
// unanswered question. The docs build is the immune system for the speech layer.
function resolveWiki(target: string): string {
  const t = target.trim()
  if (t.includes('/')) return '/' + t.replace(/^\/+/, '') + '/SKILL'
  return wikiMap[t] ?? '/' + t + '/SKILL'
}

// Render the path-computed relations into the page CONTENT (not just data) so
// they are visible, click-navigable, AND indexed by local search (the search
// IS the skills prompt). Same derivation as the frontmatter — relationsFromPath.
function skillRelations(md: MarkdownIt): void {
  md.core.ruler.push('skill-relations', (state) => {
    const rel: string | undefined = (state.env as { relativePath?: string })?.relativePath
    if (!rel || !rel.endsWith('SKILL.md')) return
    const groups = relationsFromPath(rel)
    const order: [string, Ref[]][] = [
      ['ancestors', groups.ancestors],
      ['children', groups.children],
      ['siblings', groups.siblings],
      ['related', groups.related],
    ]
    const rows = order
      .filter(([, refs]) => refs.length)
      .map(
        ([label, refs]) =>
          `<p class="skill-rel"><strong>${label}</strong> ` +
          refs.map((r) => `<a href="${r.link}">${r.text}</a>`).join(' · ') +
          `</p>`,
      )
    if (!rows.length) return
    const token = new (state as unknown as { Token: new (t: string, g: string, n: number) => { content: string; block: boolean } }).Token(
      'html_block',
      '',
      0,
    )
    token.content = `<nav class="skill-relations" aria-label="skill relations">\n${rows.join('\n')}\n</nav>\n`
    token.block = true
    state.tokens.push(token as unknown as (typeof state.tokens)[number])
  })
}

function wikilinks(md: MarkdownIt): void {
  md.inline.ruler.before('link', 'wikilink', (state, silent) => {
    const s = state.src
    const start = state.pos
    if (s.charCodeAt(start) !== 0x5b || s.charCodeAt(start + 1) !== 0x5b) return false // not '[['
    const end = s.indexOf(']]', start + 2)
    if (end < 0) return false
    const inner = s.slice(start + 2, end)
    if (inner.includes('[') || inner.includes(']')) return false
    if (!silent) {
      const [target, alias] = inner.split('|')
      let token = state.push('link_open', 'a', 1)
      token.attrs = [['href', resolveWiki(target)], ['class', 'wikilink']]
      token = state.push('text', '', 0)
      token.content = (alias ?? target).trim()
      state.push('link_close', 'a', -1)
    }
    state.pos = end + 2
    return true
  })
}

export default defineConfig({
  title: 'erpax',
  description: 'The fractal skill corpus — all in the path; the links are the language.',
  // The corpus lives in a dot-dir (.claude/skills) that VitePress's page scanner
  // skips by default. Pointing srcDir at it makes the .md pages render — the dot
  // is now in the base, not the glob match — and everything outside (src/, docs/,
  // tests/, test-results/, README) is automatically not a page.
  srcDir: SKILLS_DIR,
  // strict: a dead link is an unanswered question / aura gap — the docs build
  // fails until every [[link]] resolves to a path with its answer.
  ignoreDeadLinks: false,
  cleanUrls: true,
  // Pin the docs client bundle to a modern target so esbuild doesn't try to
  // downlevel VitePress's own destructuring (it inherits an older `target` from
  // tsconfig otherwise → "Transforming destructuring … not supported yet").
  vite: { build: { target: 'esnext' } },
  themeConfig: {
    nav: [
      { text: 'sequence', link: routeOf(join(SKILLS_DIR, 'sequence')) },
      { text: 'identity', link: routeOf(join(SKILLS_DIR, 'identity')) },
    ],
    sidebar: [{ text: 'skills (the fractal path-set)', items: skillSidebar }],
    search: { provider: 'local' },
    outline: 'deep',
  },
  // Use the skill frontmatter to optimize the page: title by `name`, surface the
  // per-path presence (the `sessions:` audit/chat seed) as rendered head meta.
  transformPageData(pageData) {
    const fm = pageData.frontmatter as { name?: string; sessions?: string[] }
    if (fm.name && !pageData.title) pageData.title = fm.name
    if (Array.isArray(fm.sessions) && fm.sessions.length) {
      pageData.frontmatter.presence = fm.sessions.length
      ;(pageData.frontmatter.head ||= []).push([
        'meta',
        { name: 'erpax:sessions', content: fm.sessions.join(',') },
      ])
    }
    // Compute the directional relations from the PATH — prev/next VitePress
    // already derives from the sidebar (itself the tree); ancestors/siblings/
    // children/related are injected here so the page carries its full subgraph
    // without any of it being stored in the file's frontmatter.
    const rel = pageData.relativePath
    if (rel.endsWith('SKILL.md')) {
      Object.assign(pageData.frontmatter, relationsFromPath(rel))
      // prev/next walk the sequence reading-chain (override VitePress's
      // alphabetical sidebar default) so `next` reads the corpus as the dance.
      const route = '/' + rel.replace(/\.md$/, '')
      const i = chainIndex.get(route)
      if (i !== undefined) {
        const p = readingChain[i - 1]
        const n = readingChain[i + 1]
        pageData.frontmatter.prev = p ? { text: p.name, link: p.route } : false
        pageData.frontmatter.next = n ? { text: n.name, link: n.route } : false
      }
    }
  },
  markdown: {
    config: (md) => {
      wikilinks(md)
      skillRelations(md)
    },
  },
})
