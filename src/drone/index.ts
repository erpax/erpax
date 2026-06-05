/**
 * drone — a scout that flies the content-uuid matrix in coordinated self-learning
 * to support the agents. Warfare tactics for peace ([[war]] · [[peace]]):
 * reconnaissance over the graph, finding the gaps the society must weave — never
 * tampering, only revealing. Read-only over the matrix.
 *
 * - flyMatrix: breadth-first over both coils (outgoing [[links]] + incoming
 *   backlinks) — the terrain a drone reconnoiters around an atom.
 * - squadron: partition the matrix into sectors so a [[team]] of drones covers
 *   the whole in parallel formation (identical drones [[merge]] — no command).
 * - scout: a sector's orphans (atoms with no backlink) — the gaps the agents eat.
 *
 * @standard RFC 9562 §5.8 content-uuid (the nodes a drone flies)
 * @audit ISO 19011:2018 §6.4 reconnaissance is read-only evidence-gathering
 * @see ./SKILL.md · [[war]] · [[peace]] · [[society]] · src/schema/test (the entropy)
 */
import { nodeOf, neighborsOf, backlinksOf, UUID_MATRIX_NODES } from '@/uuid/matrix'

/**
 * A drone's flight: breadth-first from `start` up to `maxHops`, following BOTH
 * coils (out + in edges) — the connected terrain it reconnoiters. Unknown start ⇒
 * empty (nowhere to fly).
 */
export function flyMatrix(start: string, maxHops = 2): string[] {
  const seed = nodeOf(start)
  if (!seed) return []
  const seen = new Set<string>([seed.atom])
  let frontier: string[] = [seed.atom]
  for (let hop = 0; hop < maxHops && frontier.length > 0; hop++) {
    const next: string[] = []
    for (const atom of frontier) {
      for (const nb of [...neighborsOf(atom), ...backlinksOf(atom)]) {
        if (!seen.has(nb.atom)) {
          seen.add(nb.atom)
          next.push(nb.atom)
        }
      }
    }
    frontier = next
  }
  return [...seen]
}

/**
 * A coordinated squadron: partition every matrix atom into `n` sectors (round-
 * robin, so each sector samples the whole alphabet) — one drone per sector covers
 * the matrix in parallel. `n < 1` ⇒ a single sector (one drone, the whole).
 */
export function squadron(n: number): string[][] {
  const count = Math.max(1, Math.floor(n))
  const sectors: string[][] = Array.from({ length: count }, () => [])
  UUID_MATRIX_NODES.forEach((node, i) => {
    sectors[i % count]!.push(node.atom)
  })
  return sectors
}

/** A drone's recon report over its sector. */
export interface ReconReport {
  /** atoms reconnoitered in the sector */
  readonly atoms: number
  /** orphans — atoms nothing links to (the gaps the agents must weave) */
  readonly gaps: readonly string[]
}

/**
 * Scout a sector: report the orphans (no incoming backlink) — the gaps the agents
 * eat ([[peace]]: build them up, never tear down). Read-only reconnaissance.
 */
export function scout(sectorAtoms: readonly string[]): ReconReport {
  const gaps = sectorAtoms.filter((atom) => backlinksOf(atom).length === 0)
  return { atoms: sectorAtoms.length, gaps }
}
