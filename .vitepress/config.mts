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

function routeOf(relDir: string): string {
  return '/' + relDir.split(/[\\/]/).join('/') + '/SKILL'
}

function walk(dir: string): SidebarItem[] {
  const items: SidebarItem[] = []
  for (const name of readdirSync(dir).sort()) {
    const full = join(dir, name)
    if (!statSync(full).isDirectory()) continue
    const rel = relative('.', full)
    const route = routeOf(rel)
    wikiMap[name] = route // leaf-word resolution (one word per concept ⇒ unique)
    const children = walk(full)
    items.push(children.length ? { text: name, link: route, collapsed: true, items: children } : { text: name, link: route })
  }
  return items
}

const skillSidebar = walk(SKILLS_DIR)

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

function relationsFromPath(relFile: string): {
  ancestors: Ref[]
  siblings: Ref[]
  children: Ref[]
  related: Ref[]
} {
  const relDir = dirname(relFile) // e.g. .claude/skills/self/sufficient
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
  if (existsSync(relFile)) {
    const body = readFileSync(relFile, 'utf8')
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
  return wikiMap[t] ?? '/' + SKILLS_DIR + '/' + t + '/SKILL'
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
  srcExclude: [
    '**/node_modules/**',
    'src/**',
    'tests/**',
    'scripts/**',
    'migrations/**',
    // planning/analysis notes — not part of the skill corpus the site documents,
    // and authored as plain markdown (bare <domain>-style text the Vue compiler
    // rejects). The site IS the fractal skill tree; these aren't skills.
    'docs/**',
    'README.md',
    '**/*.test.{ts,tsx}',
    '**/*.spec.{ts,tsx}',
  ],
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
    if (rel.startsWith(SKILLS_DIR) && rel.endsWith('SKILL.md')) {
      Object.assign(pageData.frontmatter, relationsFromPath(rel))
    }
  },
  markdown: {
    config: (md) => wikilinks(md),
  },
})
