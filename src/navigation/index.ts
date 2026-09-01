/**
 * navigation — path-derived nav groups (the golden compass projection).
 *
 * Sidebar · skill-router manifest · Payload admin grouping all read the SAME
 * prefix tree — never hand-listed menus. An atom at `agents/mcp/tool` lives in
 * nav group `agents → mcp`, admin group `agents`, route `/agents/mcp/tool/SKILL`.
 * Root vocabulary nests under hub parents (`medical/clinic`, `body/abdomen`);
 * `navPathsForGrouping` dedupes bare root leaves when a hub child exists.
 *
 *   tsx src/navigation/index.ts agents/mcp/tool
 *
 * @audit nav · group · route computed from the path only — never assigned
 * @see ../corpus -- ../vitepress -- ../compass -- ./groups -- ./SKILL.md
 */

export {
  NAV_HUBS,
  ROOT_PIVOTS,
  MEDICAL_WAVE_1,
  BODY_FOLD_ROOT,
  isNavHub,
  navPathsForGrouping,
  type NavHub,
} from './groups'
import { navPathsForGrouping } from './groups'
import { trinities } from '../horo'

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

/** VitePress top-nav anchors — first N sequence-order skills that exist at atom paths. */
export function topNavAnchorsFromSequence(
  sequenceOrder: readonly string[],
  existsAt: (atomPath: string) => boolean,
  count = 2,
): readonly { readonly text: string; readonly link: string }[] {
  const out: { text: string; link: string }[] = []
  for (const name of sequenceOrder) {
    if (!existsAt(name)) continue
    out.push({ text: name, link: routeOfPath(name) })
    if (out.length >= count) break
  }
  return out
}

/**
 * Compute `nav` · `group` · `route` from one atom path (frontmatter injection).
 * `group` is the first path segment — the Payload admin bucket and top nav hub.
 */
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

/**
 * merkaba — the star tetrahedron over one atom path: two counter-rotating traversals meeting at the center.
 *
 * Real navigation is two spins, not one. The sidebar trie only DESCENDS (root → leaf, the drill-in). An atom
 * also ASCENDS (leaf → root, the fold back to [[law]] every atom composes up to — the breadcrumb). The two are
 * exact inverses about the shared center (the atom itself), and that counter-rotation IS the merkaba: the
 * up-pointing tetrahedron drilling in, the down-pointing tetrahedron folding out, interpenetrating at one point.
 *
 * The spin is [[horo]]'s two flow trinities — the hexagram the star tetrahedron shadows. Doubling (the ⟨2⟩ east
 * flow) SWAPS {1,4,7} ↔ {2,5,8} about the fixed axis {3,6,9}: two triangles counter-rotating. Proven in
 * `horo/trinities` and REUSED here, never re-derived (the fold law — one theorem, one home).
 *
 * Honest boundary — theorem vs overlay. The inverse traversal (ascend = descend reversed; the round trip rests
 * on the center) is the THEOREM, tested. The "star tetrahedron spinning both directions" is a faithful geometric
 * OVERLAY named as convention — the numerology discipline [[rules]]/refutable · [[rodin]] already carry. The
 * names decode the traversal; they add no claim it cannot refute.
 *
 * @invariant ascend is descend reversed — the two spins are inverse
 * @invariant the round trip returns to the center — descend then ascend rests on the atom
 */
export interface Merkaba {
  /** root → leaf: the drill-in routes, one per nav level (the ⟨2⟩ encode spin, up-pointing tetrahedron). */
  readonly descend: readonly string[]
  /** leaf → root: the fold-out to [[law]], the breadcrumb (the ⟨5⟩ decode spin, down-pointing tetrahedron). */
  readonly ascend: readonly string[]
  /** the atom itself — the one point where both tetrahedra interpenetrate. */
  readonly center: string
  /** the hexagram the star tetrahedron shadows — horo's two counter-rotating flow trinities about the axis. */
  readonly spin: ReturnType<typeof trinities>
}

/** The star tetrahedron over an atom path — both nav spins at once, sharing one center. */
export function merkaba(atomPath: string): Merkaba {
  const segs = segmentsOf(atomPath)
  const descend = segs.map((_, i) => routeOfPath(segs.slice(0, i + 1).join('/')))
  const center = descend.length ? descend[descend.length - 1]! : routeOfPath('')
  return { descend, ascend: [...descend].reverse(), center, spin: trinities() }
}

/**
 * The navigational pyramid — nav COMPUTED from the superposition (referrer × current), never stored.
 *
 * A 3157-atom base cannot store a nav per page. It doesn't need to: every page IS a superposition of its
 * referrer and its own path, and the pyramid collapses that pair to the nav at request time. The deepest
 * shared prefix of (referrer, current) is the collapse point — the `context` the referrer arrived through —
 * so the breadcrumb is referrer-relative (starts at the shared course, not always root) and the group is the
 * entry context, not a hardcoded label. Reuses `merkaba` (the two spins) and `pathNavMeta`; adds no store.
 *
 * @invariant same current, empty referrer ⇒ the full merkaba (context = root) — the base case with no context.
 */
export interface NavPyramid {
  readonly referrer: string
  readonly current: string
  /** deepest shared ancestor of referrer and current — where the superposition collapses. */
  readonly context: string
  /** nav group from the superposition: the shared-context root when the referrer is in-tree, else current's own. */
  readonly group: string
  /** breadcrumb from the collapse context down to current (referrer-relative, not always from root). */
  readonly breadcrumb: readonly string[]
  /** the current atom's merkaba spins. */
  readonly descend: readonly string[]
  readonly ascend: readonly string[]
}

export function navPyramid(referrer: string, current: string): NavPyramid {
  const cur = segmentsOf(current)
  const ref = segmentsOf(referrer)
  let i = 0
  while (i < cur.length && i < ref.length && cur[i] === ref[i]) i += 1
  const context = i > 0 ? cur.slice(0, i).join('/') : ''
  const m = merkaba(current)
  const breadcrumb = i > 1 ? m.descend.slice(i - 1) : m.descend
  const group = i > 0 ? cur[0]! : pathNavMeta(current).group
  return { referrer, current, context, group, breadcrumb, descend: m.descend, ascend: m.ascend }
}

/**
 * QUANTUM-PREDICTED UX — predict → measure → account → optimise, all computed from the (referrer × current)
 * superposition, never from stored usage data. A visitor at `current` who arrived from `referrer` carries a
 * TRAJECTORY, and the next page they want is the continuation of it: the pyramid already collapses the pair,
 * so the prediction is a pure function of the two paths + the candidate atoms — zero tracking, zero PII.
 *
 * @invariant a predicted page that is the actual next page saves its breadcrumb depth in navigation cost (eb).
 */
export interface UxPrediction {
  readonly current: string
  /** the trajectory the arrival implies: descend (drilled in from an ancestor), sequence (sibling ring), or ascend. */
  readonly trajectory: 'descend' | 'sequence' | 'ascend'
  /** ranked predicted next atom paths (most likely first) — the optimisation: shallowest expected cost first. */
  readonly predicted: readonly string[]
  /** confidence in [0,1] — how committed the superposition is (1 = a single obvious continuation). */
  readonly confidence: number
}

/**
 * Predict the next atoms a visitor wants, from the superposition + the candidate atom set (pure, no store).
 * DESCEND (referrer is an ancestor of current ⇒ drilling in) ⇒ predict current's children. SEQUENCE (referrer
 * and current are siblings) ⇒ predict the other siblings. Else ASCEND ⇒ predict the parent. Reuses segmentsOf.
 */
export function predictNext(referrer: string, current: string, candidates: readonly string[]): UxPrediction {
  const cur = segmentsOf(current)
  const ref = segmentsOf(referrer)
  const curKey = cur.join('/')
  const childrenOf = (p: readonly string[]): string[] =>
    candidates.filter((c) => {
      const s = segmentsOf(c)
      return s.length === p.length + 1 && p.every((seg, i) => s[i] === seg)
    })
  const refIsAncestor = ref.length > 0 && ref.length < cur.length && ref.every((seg, i) => seg === cur[i])
  const shareParent = cur.length > 1 && ref.length === cur.length && cur.slice(0, -1).every((seg, i) => seg === ref[i]) && curKey !== ref.join('/')
  let trajectory: UxPrediction['trajectory']
  let predicted: string[]
  if (refIsAncestor || ref.length === 0) {
    trajectory = 'descend'
    predicted = childrenOf(cur) // drilling in ⇒ the next level down
  } else if (shareParent) {
    trajectory = 'sequence'
    predicted = childrenOf(cur.slice(0, -1)).filter((c) => c !== curKey) // the other siblings on the ring
  } else {
    trajectory = 'ascend'
    predicted = cur.length > 1 ? [cur.slice(0, -1).join('/')] : [] // fold out to the parent
  }
  // optimise: shallowest first (least expected navigation cost), then lexical for determinism
  predicted = [...predicted].sort((a, b) => segmentsOf(a).length - segmentsOf(b).length || a.localeCompare(b))
  const confidence = predicted.length === 0 ? 0 : 1 / predicted.length
  return { current: curKey, trajectory, predicted, confidence }
}

/** The measured + accounted economy of a run of predictions — statistics + eb saved (the optimisation target). */
export interface UxEconomy {
  readonly hits: number
  readonly total: number
  /** statistical: correct predictions / total. */
  readonly hitRate: number
  /** accounted in eb: each hit saves the user the depth they would have navigated to reach `actual`. */
  readonly ebSaved: number
}

/**
 * Measure + account a run of predictions against what actually happened. A HIT (the actual next page was in the
 * predicted set) saves that page's breadcrumb depth in navigation cost — accounted in eb, the corpus currency.
 * The statistic (hitRate) and the account (ebSaved) are the optimisation target: a better predictor saves more eb.
 */
export function predictionEconomy(
  outcomes: readonly { readonly predicted: readonly string[]; readonly actual: string }[],
): UxEconomy {
  let hits = 0
  let ebSaved = 0
  for (const o of outcomes) {
    if (o.predicted.includes(o.actual)) {
      hits += 1
      ebSaved += segmentsOf(o.actual).length // the depth the hit saved navigating
    }
  }
  const total = outcomes.length
  return { hits, total, hitRate: total ? hits / total : 0, ebSaved }
}

/** One breadcrumb crumb — the UI renders these root→leaf; the last (`current`) is the page itself. */
export interface Crumb {
  readonly text: string
  readonly link: string
  readonly current: boolean
}

/**
 * The breadcrumb trail for an atom — the merkaba's descend spin, LABELLED for the UI (`src/ui/breadcrumb.tsx`,
 * which ships the presentational crumbs but had no source deciding WHICH). Root→leaf, each segment linked to its
 * route; the leaf is the current page. This is where the two-spin geometry becomes a rendered nav element: the
 * same chain the breadcrumb reads root→leaf, an atom's fold-to-[[law]] reads leaf→root (`merkaba().ascend`).
 */
export function breadcrumbTrail(atomPath: string): readonly Crumb[] {
  const segs = segmentsOf(atomPath)
  const { descend } = merkaba(atomPath)
  return segs.map((text, i) => ({ text, link: descend[i]!, current: i === segs.length - 1 }))
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
  const grouped = navPathsForGrouping(atomPaths)
  const skillPaths = new Set<string>()
  const root = trieNode()
  for (const key of grouped) {
    const segs = key.split('/').filter(Boolean)
    if (!segs.length) continue
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
  const m = merkaba(sample)
  console.log('  merkaba center:', m.center, '· spins', m.descend.length)
}

export * from './github-folded.generated'
