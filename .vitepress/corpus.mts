// The ONE corpus walker — the path-as-address logic shared by the docs config
// (config.mts: sidebar · wikiMap · relations) AND the search ingest
// (scripts/ingest-corpus-to-search.ts). DRY by design: there is a SINGLE walk of
// src/, never a parallel one. VitePress is the frontend matter; this is the map
// it and the backend search both read, so a skill's docs route and its search
// slug are the same address (the uuid is the router; the route is its name).
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

// src is the 0: skills live co-located with their matter-twin code, so the docs
// emerge from the code itself. srcDir + sidebar + wiki-links all derive from this
// single root (the recursive mask, identical at every depth).
export const SKILLS_DIR = 'src'

export type SidebarItem = { text: string; link?: string; collapsed?: boolean; items?: SidebarItem[] }
export const wikiMap: Record<string, string> = {} // normalized leaf word → route
export const allSkills: { name: string; route: string }[] = [] // flat list → the reading chain

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

export function walk(dir: string): SidebarItem[] {
  const items: SidebarItem[] = []
  for (const name of readdirSync(dir).sort()) {
    const full = join(dir, name)
    if (!statSync(full).isDirectory()) continue
    const rel = relative('.', full)
    const route = routeOf(rel)
    // Only a dir WITH a SKILL.md is a routable page. A SKILL-less matter-twin
    // dir (services/proof, collections/Users/access, hooks/collections, …) is
    // recursed for its skill children but never registered — otherwise it
    // shadows the real same-named atom in the leaf wikiMap and points
    // [[proof]] → /services/proof/SKILL (a dead link). Many such dirs share a
    // leaf word with a real atom; without this guard the last-walked one wins.
    const hasSkill = existsSync(join(full, 'SKILL.md'))
    if (hasSkill) {
      wikiMap[norm(name)] = route // normalized leaf-word resolution (case/hyphen-insensitive)
      // Trailing-suffix aliases — the dissolution split compound names into nested
      // folders, sometimes under domain containers (gl-accounts → gl/accounts,
      // SalesOrders → customers/sales/orders). Prose [[links]] still carry the bare
      // compound name, so register EVERY trailing-suffix concatenation of the path
      // (orders, salesorders, customerssalesorders) as a fill-in alias. A real leaf
      // word (set unconditionally above, every walk) always wins over a compound
      // alias; among aliases the first walked wins (deterministic by sort order).
      const segs = route.replace(/^\//, '').replace(/\/SKILL$/, '').split('/')
      const addAlias = (k: string) => { if (k && !(k in wikiMap)) wikiMap[k] = route }
      for (let i = segs.length - 1; i >= 0; i--) {
        const key = norm(segs.slice(i).join(''))
        addAlias(key)
        // naive singular/plural so the model/collection duality reconciles:
        // [[tenant]] → tenants, [[architecture-invariants]] → architecture/invariant.
        addAlias(key.endsWith('s') ? key.slice(0, -1) : key + 's')
        // …and the -y/-ies class ([[parties]] → party, [[ConsignmentInventory]] → inventories).
        if (key.endsWith('ies')) addAlias(key.slice(0, -3) + 'y')
        else if (key.endsWith('y')) addAlias(key.slice(0, -1) + 'ies')
      }
      allSkills.push({ name, route })
    }
    const children = walk(full)
    if (hasSkill) items.push(children.length ? { text: name, link: route, collapsed: true, items: children } : { text: name, link: route })
    else if (children.length) items.push({ text: name, collapsed: true, items: children }) // SKILL-less container: a group header, no page link
  }
  return items
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
    return { route: rel, name: fmName || name, description, body }
  })
}
