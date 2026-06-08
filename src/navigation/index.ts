/**
 * navigation — path-derived nav groups (the golden compass projection).
 *
 * Sidebar · skill-router manifest · Payload admin grouping all read the SAME
 * prefix tree — never hand-listed menus. An atom at `agents/mcp/tool` lives in
 * nav group `agents → mcp`, admin group `agents`, route `/agents/mcp/tool/SKILL`.
 *
 *   tsx src/navigation/index.ts agents/mcp/tool
 *
 * @audit nav · group · route computed from the path only — never assigned
 * @see ../corpus -- ../vitepress -- ../compass -- ./SKILL.md
 */

/** VitePress sidebar node — folder segment with optional link and nested groups. */
export interface NavGroup {
  readonly text: string
  readonly link?: string
  readonly collapsed?: boolean
  readonly items?: readonly NavGroup[]
}

/** Per-atom navigation metadata — the frontmatter `nav` / `group` projection. */
export interface PathNavMeta {
  /** path segments, e.g. `['agents','mcp','tool']`. */
  readonly path: readonly string[]
  /** ancestor segments (nav chain, excludes leaf) — same as Payload path prefixes. */
  readonly nav: readonly string[]
  /** top-level segment — Payload `admin.group` and docs root nav bucket. */
  readonly group: string
  /** VitePress docs route, e.g. `/agents/mcp/tool/SKILL`. */
  readonly route: string
}

/** Normalize an atom path to forward-slash segments (no `src/` prefix). */
export function segmentsOf(atomPath: string): readonly string[] {
  return atomPath
    .replace(/\\/g, '/')
    .replace(/^src\//, '')
    .replace(/^\/+|\/+$/g, '')
    .split('/')
    .filter(Boolean)
}

/** Docs route for an atom path — mirrors corpus `routeOf` / vitepress `routeOf`. */
export function routeOfPath(atomPath: string): string {
  const segs = segmentsOf(atomPath)
  return segs.length ? '/' + segs.join('/') + '/SKILL' : '/SKILL'
}

/** Compute `nav` · `group` · `route` from one atom path (frontmatter injection). */
export function pathNavMeta(atomPath: string): PathNavMeta {
  const path = segmentsOf(atomPath)
  const nav = path.slice(0, -1)
  const group = path[0] ?? ''
  return { path, nav, group, route: routeOfPath(atomPath) }
}

/** Payload admin group for a collection/module atom path — the first path segment. */
export function adminGroupOf(atomPath: string): string {
  return pathNavMeta(atomPath).group
}

type TrieNode = { children: Map<string, TrieNode> }

const trieNode = (): TrieNode => ({ children: new Map() })

const insertPath = (root: TrieNode, segs: readonly string[]): void => {
  let node = root
  for (const seg of segs) {
    let child = node.children.get(seg)
    if (!child) {
      child = trieNode()
      node.children.set(seg, child)
    }
    node = child
  }
}

const trieToGroups = (node: TrieNode, prefix: readonly string[], skillPaths: ReadonlySet<string>): NavGroup[] => {
  const out: NavGroup[] = []
  for (const seg of [...node.children.keys()].sort()) {
    const child = node.children.get(seg)!
    const path = [...prefix, seg]
    const pathKey = path.join('/')
    const items = trieToGroups(child, path, skillPaths)
    const hasSkill = skillPaths.has(pathKey)
    if (hasSkill) {
      const link = routeOfPath(pathKey)
      out.push(items.length ? { text: seg, link, collapsed: true, items } : { text: seg, link })
    } else if (items.length) {
      out.push({ text: seg, collapsed: true, items })
    }
  }
  return out
}

/**
 * Build nested nav groups from atom paths — the SAME tree VitePress sidebar uses.
 * Intermediate prefixes without a listed path become group headers (no link).
 */
export function navigationGroupsFromPaths(atomPaths: readonly string[]): readonly NavGroup[] {
  const skillPaths = new Set<string>()
  const root = trieNode()
  for (const raw of atomPaths) {
    const segs = segmentsOf(raw)
    if (!segs.length) continue
    const key = segs.join('/')
    skillPaths.add(key)
    insertPath(root, segs)
  }
  return trieToGroups(root, [], skillPaths)
}

/** Flat manifest row — skill-router index + search ingest share this shape. */
export interface NavManifestEntry {
  readonly path: readonly string[]
  readonly nav: readonly string[]
  readonly group: string
  readonly route: string
}

/** Per-atom nav manifest — one row per skill path for the catch-all router. */
export function navManifestFromPaths(atomPaths: readonly string[]): readonly NavManifestEntry[] {
  return [...atomPaths]
    .map((p) => pathNavMeta(p))
    .sort((a, b) => a.route.localeCompare(b.route))
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const sample = process.argv[2] ?? 'agents/mcp/tool'
  const meta = pathNavMeta(sample)
  console.log('navigation — path-derived groups:')
  console.log('  path:  ', meta.path.join('/'))
  console.log('  nav:   ', meta.nav.join(' → ') || '(root)')
  console.log('  group: ', meta.group)
  console.log('  route: ', meta.route)
}
