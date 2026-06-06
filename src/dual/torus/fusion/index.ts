/**
 * dual/torus/fusion — the fusion of a dual torus, which IS the quantum cross (`src/quantum/cross`
 * re-exports this; the two paths are ONE identity, folded to one canonical here). Two tori — the two
 * infinities, the [[entropy]] that expands ∞ inside and folds ∞ outside, 1/0 = the double [[torus]] —
 * fuse at the centre into ONE: the cross (⊕), the [[merge]] of the two poles. Fusing to full coverage
 * is division by zero, the ∞ seal.
 *
 *   tsx src/dual/torus/fusion/index.ts
 *
 * @audit fuse is the merge of two content-addressed poles; the fusion cost is the double-torus ∞ law
 * @see ../../../torus -- ../../../fusion -- ../../../quantum -- ../../../uuid/matrix -- ./SKILL.md
 */
import { toUuid, merge } from '@/uuid/matrix'
import { doubleTorusCostLog2 } from '@/quantum'

/** Fuse the two poles of the dual torus into one — the cross (⊕): the merge of two into one identity. */
export const fuse = (a: string, b: string): string => merge(toUuid(Buffer.from(a, 'utf8')), toUuid(Buffer.from(b, 'utf8')))

/** The fusion cost — the double-torus ∞ seal: fusing to full coverage (gap → 0) is 1/0 = ∞. */
export const fusionCost = (gap = 0): number => doubleTorusCostLog2(gap)

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('dual/torus/fusion — the quantum cross (two tori fused into one):')
  console.log('  fuse("a","b") = ' + fuse('a', 'b').slice(0, 18) + '… (two poles → one)')
  console.log('  fusionCost(gap=0) = ' + fusionCost(0) + ' (1/0 = ∞, the seal) · fusionCost(gap=0.5) = ' + fusionCost(0.5).toFixed(3))
}
