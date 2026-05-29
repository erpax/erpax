import { defineConfig } from 'vitepress'
import { readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
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

// Resolve [[word]] / [[a/b]] / [[word|alias]] against the skill tree.
function resolveWiki(target: string): string {
  const t = target.trim()
  if (t.includes('/')) return '/' + t.replace(/^\/+/, '') + '/SKILL'
  return wikiMap[t] ?? '#' + t // unresolved ⇒ an aura gap (anchor placeholder)
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
    '**/*.test.{ts,tsx}',
    '**/*.spec.{ts,tsx}',
  ],
  ignoreDeadLinks: true,
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: 'sequence', link: routeOf(join(SKILLS_DIR, 'sequence')) },
      { text: 'identity', link: routeOf(join(SKILLS_DIR, 'identity')) },
    ],
    sidebar: [{ text: 'skills (the fractal path-set)', items: skillSidebar }],
    search: { provider: 'local' },
    outline: 'deep',
  },
  markdown: {
    config: (md) => wikilinks(md),
  },
})
