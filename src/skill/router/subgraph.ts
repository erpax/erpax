/**
 * subgraph — the per-message aura: resolve a query's RELATED skill subgraph (the
 * harmonic context to LOAD) and FLAG absent neighbours (the gap discovered by use).
 *
 * The static [[aura]] gate checks the corpus has no dead [[link]] at commit time;
 * this is its LIVE twin, run at message time. Given a seed skill, walk its
 * related ∪ ancestors ∪ children graph to `depth` hops and return:
 *   - `atoms`    — the seed + its subgraph: the skills the message should load
 *                  ("the window IS the skills" — [[akashic]] harmonic context).
 *   - `gaps`     — referenced neighbours ABSENT from the index: a skill needed by
 *                  handling but missing (the dynamic gap; the MINT queue grown by use).
 *   - `coverage` — loaded / (loaded + gaps): the skill-completeness ratio. A low
 *                  ratio is the "terrible ratio" signal — a related skill unused/missing.
 *
 * Loading the subgraph ENFORCES "use all related skills" by construction; a non-empty
 * gap set is the enforcement firing. Pure: operates on the SkillNode index
 * (resolve.ts), no IO — trivially testable, the same pure gate as the rest of the router.
 *
 * @standard ISO/IEC 25010 §5.5 testability (pure, deterministic)
 */
import { resolveSkill, type ParsedRequest, type ResolveResult, type SkillNode } from '@/skill/router/resolve'

export interface Subgraph {
  /** the seed + its related subgraph, BFS order — the skills the message loads. */
  readonly atoms: readonly SkillNode[]
  /** referenced neighbour leaf-words absent from the index — the dynamic gaps (live aura). */
  readonly gaps: readonly string[]
  /** loaded / (loaded + gaps): the skill-completeness ratio (1 = every neighbour present). */
  readonly coverage: number
}

/** Canonical key — mirrors the gates' norm (lowercase + strip -/_). */
const norm = (s: string): string => s.toLowerCase().replace(/[-_]/g, '')

/** Leaf word of a ref, whether it is a route (`/a/b/SKILL`) or a bare name (`flow`). */
const leafOf = (ref: string): string => {
  const segs = ref.replace(/\/SKILL$/i, '').split('/').filter(Boolean)
  return segs.length ? segs[segs.length - 1] : ''
}

/**
 * Resolve the related subgraph of `seed`: BFS over related ∪ ancestors ∪ children
 * to `depth` hops (default 1 — the immediate harmonic neighbourhood). Every
 * neighbour reference either resolves to an indexed atom (loaded) or is recorded
 * as a gap. Returns the atoms to load, the absent-neighbour gaps, and the coverage.
 */
export function relatedSubgraph(seed: SkillNode, index: readonly SkillNode[], depth = 1): Subgraph {
  const byKey = new Map<string, SkillNode>()
  for (const n of index) byKey.set(norm(n.name), n)

  const visited = new Map<string, SkillNode>([[norm(seed.name), seed]])
  const gaps = new Set<string>()
  let frontier: SkillNode[] = [seed]

  for (let d = 0; d < Math.max(0, depth); d++) {
    const next: SkillNode[] = []
    for (const node of frontier) {
      for (const ref of [...node.related, ...node.ancestors, ...node.children]) {
        const key = norm(leafOf(ref))
        if (!key || key === norm(seed.name)) continue
        const hit = byKey.get(key)
        if (!hit) {
          gaps.add(key) // referenced but not in the index — a dynamic gap
          continue
        }
        if (!visited.has(key)) {
          visited.set(key, hit)
          next.push(hit)
        }
      }
    }
    frontier = next
  }

  const atoms = [...visited.values()]
  const referenced = atoms.length + gaps.size
  const coverage = referenced > 0 ? atoms.length / referenced : 1
  return { atoms, gaps: [...gaps].sort(), coverage }
}

/** A resolution PLUS its harmonic context — the matched skill, the candidates, and the loaded subgraph. */
export interface HarmonicContext extends ResolveResult {
  /** the matched skill's related neighbourhood to LOAD + the gap/coverage verdict (the per-message aura). */
  readonly subgraph: Subgraph
}

/**
 * The wired enforcement: resolve a request to its skill AND its harmonic context.
 * `resolveSkill` finds the match (the top-k candidates, the static gate); this then
 * loads the matched skill's related subgraph — so a resolution doesn't return one
 * atom, it returns the skills the message should LOAD plus the coverage verdict and
 * any absent neighbour (the gap discovered by use). The window IS the skills.
 */
export function resolveHarmonicContext(
  req: ParsedRequest,
  index: readonly SkillNode[],
  depth = 1,
): HarmonicContext {
  const result = resolveSkill(req, index)
  const subgraph: Subgraph = result.matched
    ? relatedSubgraph(result.matched, index, depth)
    : { atoms: [], gaps: [], coverage: 1 }
  return { ...result, subgraph }
}
