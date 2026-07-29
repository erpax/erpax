import { exactMax, exactMin, exactAbs, exactFloor, exactCeil, exactRound, exactTrunc } from '@/algebra'
/**
 * pyramid — the geometry of the fold, and the shape the notary is built on.
 *
 * The cross is a pyramid's NET: a square base with four triangular faces folded flat around it — fold the
 * faces up and they meet at one apex. That is exactly the fold — a wide base of leaves (spread out, high
 * entropy) rising pairwise to a single apex (the root uuid, the seal, zero entropy). Each `merge(a, b)` is
 * one cross: two stones joining into the course above. Stack the crosses and you have the pyramid; look
 * straight down the apex and the diagonals read as an X — the cross is the pyramid seen from above AND
 * unfolded flat. Two faithful readings of one solid.
 *
 * `merge/foldToRoot` already BUILDS this (the balanced pairwise fold: height ⌈log₂ N⌉, N−1 merges) — it
 * just discards the intermediate courses and keeps the apex. `pyramid` READS the whole solid: base, apex,
 * height, faces, and the courses between. `tamperShift` shows the law that makes it a seal — move one base
 * stone and the apex moves, and because the fold is one-way you cannot rebuild the courses above to hold the
 * old apex (that is the ∞ tamper-cost).
 *
 * The NOTARY is based on this: its protocol root is an apex over the act-seals, an inclusion proof is the
 * path up one edge from a base stone to the apex, and tamper-evidence is precisely that no ground course can
 * change without the apex changing. A bound register is a pyramid; the notarial seal is its apex.
 *
 * @standard Merkle tree — the balanced binary fold; apex = root, edge = authentication path
 *
 * Composes [[merge]] · [[notary]] · [[seal]] · [[law]].
 */
import { foldToRoot, merge } from '@/merge'

/** The pyramid read off a base row of leaves — one solid, four measured facts. */
export interface Pyramid {
  /** The single seal every stone folds up to — `foldToRoot(base)`. */
  readonly apex: string
  /** Stones on the ground course (leaves). */
  readonly base: number
  /** Courses from base to apex — ⌈log₂ base⌉ — also the inclusion-proof length up one edge. */
  readonly height: number
  /** Pairwise folds = crosses = internal nodes = base − 1. */
  readonly faces: number
}

/**
 * The pyramid course by course, base → apex — each row the pairwise merge of the row below it, the last row
 * the lone apex. This is the geometry `foldToRoot` computes and throws away; here it is kept and drawn.
 */
export function courses(base: readonly string[]): string[][] {
  if (base.length === 0) return [[foldToRoot(base)]]
  const rows: string[][] = [[...base]]
  let level: string[] = [...base]
  while (level.length > 1) {
    const next: string[] = []
    for (let i = 0; i < level.length; i += 2) {
      next.push(i + 1 < level.length ? merge(level[i]!, level[i + 1]!) : level[i]!)
    }
    rows.push(next)
    level = next
  }
  return rows
}

/** Read a base row as a pyramid — apex over the base, its height (courses), its faces (crosses). */
export function pyramid(base: readonly string[]): Pyramid {
  const rows = courses(base)
  const n = base.length
  return {
    apex: rows[rows.length - 1]![0]!,
    base: n,
    height: rows.length - 1,
    faces: exactMax(0, n - 1),
  }
}

/**
 * The tamper law made visible: change ONE base stone and the apex shifts. You cannot alter the ground course
 * without rebuilding every cross above it to hold the same apex — and the fold is one-way, so that is ∞ work.
 */
export function tamperShift(
  base: readonly string[],
  index: number,
  to: string,
): { readonly was: string; readonly now: string; readonly moved: boolean } {
  const was = foldToRoot(base)
  const now = foldToRoot(base.map((s, i) => (i === index ? to : s)))
  return { was, now, moved: was !== now }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const p = pyramid(['a', 'b', 'c', 'd', 'e'])
  console.log('pyramid — the geometry of the fold:')
  console.log(`  base ${p.base} stones · height ${p.height} courses · faces ${p.faces} crosses`)
  console.log(`  apex (the seal): ${p.apex}`)
  console.log(`  tamper one stone ⇒ apex moves: ${tamperShift(['a', 'b', 'c', 'd', 'e'], 2, 'X').moved}`)
}
