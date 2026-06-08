// The ONE corpus walker — the path-as-address logic shared by the docs config
// (config.mts: sidebar · wikiMap · relations) AND the search ingest
// (scripts/ingest-corpus-to-search.ts). DRY by design: there is a SINGLE walk of
// src/, never a parallel one. VitePress is the frontend matter; this is the map
// it and the backend search both read, so a skill's docs route and its search
// slug are the same address (the uuid is the router; the route is its name).
import { existsSync, readFileSync, readdirSync, realpathSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { navigationGroupsFromPaths } from '../navigation/index.ts'

// src is the 0: skills live co-located with their matter-twin code, so the docs
// emerge from the code itself. srcDir + sidebar + wiki-links all derive from this
// single root (the recursive mask, identical at every depth).
export const SKILLS_DIR = 'src'

export type SidebarItem = { text: string; link?: string; collapsed?: boolean; items?: SidebarItem[] }
export const wikiMap: Record<string, string> = {} // normalized leaf word → route
export const allSkills: { name: string; route: string }[] = [] // flat list → the reading chain
const skillPaths: string[] = [] // src-relative atom paths (SKILL.md dirs) → nav tree input
let corpusCollected = false

/**
 * Canonical key: lowercase + strip `-`/`_`. So a prose link's generic one-word name
 * (`[[invoices]]`, `[[gl-accounts]]`) resolves to its CamelCase collection folder
 * (`Invoices`, `GLAccounts`) — the generic-naming law (one lowercase word) reconciled
 * with the Payload folder convention. The SAME norm is mirrored in the aura speech gate,
 * so the two gates agree (no false green). Only `tags`/`Tags` collide, benignly.
 */
export const norm = (s: string): string => s.toLowerCase().replace(/[-_]/g, '')

export function routeOf(relDir: string): string {
  // Routes are srcDir-relative (srcDir = SKILLS_DIR), so drop that base prefix:
  // self/sufficient → /self/sufficient/SKILL
  return '/' + relative(SKILLS_DIR, relDir).split(/[\\/]/).join('/') + '/SKILL'
}

/** Filesystem pass — wikiMap · allSkills · skillPaths (one realpath plane). */
function collectCorpus(dir: string, seen: Set<string> = new Set()): void {
  // Follow symlinks — they GATEWAY to shared configs; never skip them. But this
  // walker is intra-dimensional: it enumerates each real node ONCE (realpath dedup).
  const real = realpathSync(dir)
  if (seen.has(real)) return
  seen.add(real)
  for (const name of readdirSync(dir).sort()) {
    if (name === 'node_modules' || name.startsWith('.')) continue
    const full = join(dir, name)
    if (!statSync(full).isDirectory()) continue
    const rel = relative('.', full)
    const route = routeOf(rel)
    const hasSkill = existsSync(join(full, 'SKILL.md'))
    if (hasSkill) {
      wikiMap[norm(name)] = route
      const segs = route.replace(/^\//, '').replace(/\/SKILL$/, '').split('/')
      const addAlias = (k: string) => { if (k && !(k in wikiMap)) wikiMap[k] = route }
      for (let i = segs.length - 1; i >= 0; i--) {
        const key = norm(segs.slice(i).join(''))
        addAlias(key)
        addAlias(key.endsWith('s') ? key.slice(0, -1) : key + 's')
        if (key.endsWith('ies')) addAlias(key.slice(0, -3) + 'y')
        else if (key.endsWith('y')) addAlias(key.slice(0, -1) + 'ies')
      }
      allSkills.push({ name, route })
      skillPaths.push(relative(SKILLS_DIR, rel).split(/[\\/]/).join('/'))
    }
    collectCorpus(full, seen)
  }
}

/** Sidebar tree — derived from collected skill paths via `navigationGroupsFromPaths`. */
export function walk(dir: string): SidebarItem[] {
  if (!corpusCollected) {
    collectCorpus(SKILLS_DIR)
    corpusCollected = true
  }
  if (dir !== SKILLS_DIR) return []
  return navigationGroupsFromPaths(skillPaths) as SidebarItem[]
}

/** One loaded atom for the search ingest — route + frontmatter + raw body (the caller computes the content-uuid). */
export interface LoadedAtom {
  /** srcDir-relative path, e.g. `identity/signal` — the unambiguous search slug (the docs route minus /SKILL). */
  route: string
  /** frontmatter `name`, falling back to the leaf folder word. */
  name: string
  /** frontmatter `description` (the "Use when…" trigger). */
  description?: string
  /** the full SKILL.md text — the content the uuid is computed from. */
  body: string
  /** dual-partner leaf words — the `[[a]]↔[[b]]` pole-pairs this atom bonds to (symmetric, computed). */
  dual?: string[]
}

/**
 * Load the whole corpus as atoms via the SAME walk the docs use (so a skill's
 * search slug equals its docs route). Reuses `walk`/`allSkills`; reads each
 * SKILL.md's frontmatter once. This is the code-side feed for the unified
 * content-uuid search — the frontend matter (VitePress) and the backend mirror
 * (Payload `search`) drawn from one source.
 */
export function loadCorpus(): LoadedAtom[] {
  if (allSkills.length === 0) walk(SKILLS_DIR)
  return allSkills.map(({ name, route }) => {
    const rel = route.replace(/^\//, '').replace(/\/SKILL$/, '')
    const body = readFileSync(join(SKILLS_DIR, rel, 'SKILL.md'), 'utf8')
    const fm = body.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? ''
    const fmName = fm
      .match(/^name:\s*(.+)$/m)?.[1]
      ?.trim()
      .replace(/^["']|["']$/g, '')
    const description = fm
      .match(/^description:\s*(.+)$/m)?.[1]
      ?.trim()
      .replace(/^["']|["']$/g, '')
    const leaf = rel.split('/').pop() as string
    return { route: rel, name: fmName || name, description, body, dual: dualOf(leaf) }
  })
}

// ── Dualities — the two-fold law made an INDEX (computed, never stored) ─────
// A duality is two atoms bonded as opposites that complete to a trinity ([[duality]]):
// give↔take, whole↔part, begin↔end, open↔close, flow↔balance, payload⊕vitepress, …
// Declared in prose as the linked pole-pair operator `[[a]]↔[[b]]` (or `⊕`), it is a
// CROSS-CUTTING relation (the poles are rarely path-siblings) and SYMMETRIC (a↔b ⇒ b↔a),
// declarable in EITHER pole's file — so it needs a GLOBAL index, not a per-page body scan.
// This is the one shared source both faces read: VitePress renders it as a relation row;
// the Payload `search` mirror folds the partners into each atom's indexed meta.
export interface Duality {
  /** the two pole leaf-words, in canonical (sorted) order — first-seen surface forms. */
  a: string
  b: string
}
const DUAL_OP = /\[\[([a-zA-Z][\w/-]*)(?:\|[^\]]*)?\]\]\s*[↔⊕]\s*\[\[([a-zA-Z][\w/-]*)(?:\|[^\]]*)?\]\]/g
let _dualMap: Record<string, Set<string>> | null = null // norm(leaf) → set of partner surface leaves
let _dualities: Duality[] | null = null

/** Scan the corpus once for `[[a]]↔[[b]]` / `[[a]] ⊕ [[b]]` pole-pairs; symmetric + memoized. */
export function buildDualities(): Duality[] {
  if (_dualities) return _dualities
  if (allSkills.length === 0) walk(SKILLS_DIR)
  const map: Record<string, Set<string>> = {}
  const pairs = new Map<string, Duality>()
  const leafOf = (t: string): string => t.split('/').pop() as string
  for (const { route } of allSkills) {
    const rel = route.replace(/^\//, '').replace(/\/SKILL$/, '')
    let body: string
    try {
      body = readFileSync(join(SKILLS_DIR, rel, 'SKILL.md'), 'utf8')
    } catch {
      continue
    }
    for (const m of body.matchAll(DUAL_OP)) {
      const aw = leafOf(m[1])
      const bw = leafOf(m[2])
      const a = norm(aw)
      const b = norm(bw)
      if (!a || !b || a === b) continue
      ;(map[a] ??= new Set()).add(bw)
      ;(map[b] ??= new Set()).add(aw)
      const key = a < b ? `${a}|${b}` : `${b}|${a}`
      if (!pairs.has(key)) pairs.set(key, a < b ? { a: aw, b: bw } : { a: bw, b: aw })
    }
  }
  _dualMap = map
  _dualities = [...pairs.values()].sort((x, y) => x.a.localeCompare(y.a) || x.b.localeCompare(y.b))
  return _dualities
}

/** The dual-partner leaf-words of an atom (looked up by its leaf word), symmetric + sorted. */
export function dualOf(word: string): string[] {
  if (!_dualMap) buildDualities()
  return [...(_dualMap![norm(word)] ?? [])].sort()
}
