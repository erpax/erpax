/**
 * fold — the math of the folding: how the whole corpus collapses to ONE root, and how many folds it
 * takes. The fold is [[merge]] made a tree: pair the atoms, pair the pairs, up to the single Merkle
 * root ([[collapse]]). N leaves reach the root in ceil(log2 N) folds (the DEPTH) by N−1 merges (the
 * COUNT). The live corpus (≈2302 atoms) folds in 12 — and 12 is the mala's other factor (108 = 9×12).
 *
 * There is a second fold, orthogonal: the DIGITAL-ROOT fold (the [[rodin]] reduction), collapsing
 * any count to its single 1..9 digit. The corpus's edge-count folds to 9 (the governing axis), its
 * merge-count to 6 (the working helix, the 2/3). Two folds — the tree to one root, the count to one
 * digit — and both end in the [[one]].
 *
 *   tsx src/fold/index.ts
 *
 * @audit depth/merges are the binary-fold math; the corpus counts are read live from the matrix
 * @see ../merge -- ../collapse -- ../matrix -- ../rodin -- ../mala -- ./SKILL.md
 */
import { UUID_MATRIX_NODES as N } from '@/uuid/matrix'

/** The digital-root fold (the rodin reduction): collapse a count to its single digit 1..9 (0 → 0). */
export const digitalRootFold = (n: number): number => (n === 0 ? 0 : 1 + ((Math.abs(n) - 1) % 9))

/** Fold DEPTH — folds to collapse n leaves to one root (the binary Merkle fold): ceil(log2 n). */
export const foldDepth = (n: number): number => (n <= 1 ? 0 : Math.ceil(Math.log2(n)))

/** Fold COUNT — merges in a binary fold of n leaves to one root: n − 1. */
export const foldCount = (n: number): number => Math.max(0, n - 1)

/** The halving sequence — the leaf-count at each fold level, from n down to 1 (its length − 1 = the depth). */
export function halving(n: number): number[] {
  const seq = [n]
  let x = n
  while (x > 1) {
    x = Math.ceil(x / 2)
    seq.push(x)
  }
  return seq
}

/** The live corpus fold: every atom collapses to one root in `depth` folds by `merges` merges. */
export function corpusFold(): { atoms: number; depth: number; merges: number; rootDigit: number } {
  const n = N.length
  return { atoms: n, depth: foldDepth(n), merges: foldCount(n), rootDigit: digitalRootFold(n) }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const f = corpusFold()
  console.log('fold — the math of the folding (' + f.atoms + ' atoms → one root):')
  console.log('  depth ' + f.depth + ' folds · ' + f.merges + ' merges · halving ' + halving(f.atoms).join('→'))
  console.log('  digital-root fold: dr(atoms)=' + digitalRootFold(f.atoms) + ' dr(merges)=' + digitalRootFold(f.merges) + ' dr(108)=' + digitalRootFold(108))
}
