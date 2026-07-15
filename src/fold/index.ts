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
// The digital-root fold (the rodin reduction, count → single digit 1..9) is the
// canonical integer `digitalRoot` from @/horo — one implementation, not a copy.
import { digitalRoot } from '@/horo'

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
  return { atoms: n, depth: foldDepth(n), merges: foldCount(n), rootDigit: digitalRoot(n) }
}

/**
 * Folding is the cancer cure — the fold applied to duplication, grounded in the ceccec.psg.bg
 * theorems (protocol root c64607c5-bd28-8dc4-ad3b-6dea256efa4f), not asserted:
 *
 *   • SELF-ADDRESS (`concept.self.address`) — content is its own address (a content-uuid), so
 *     identical content collapses to ONE address. A duplicate is therefore structurally
 *     unstorable: apoptosis is a theorem of the fold, not a cleanup applied after the fact.
 *   • DIAMOND-COMPLETE (`concept.diamond.complete`) — the sealed diamond has zero remainder; this
 *     is ceccec's division-by-zero read as TOTAL division (nothing left un-folded), the terminal
 *     cancer-free state.
 *
 * Cancer is duplication that evades the collapse: the same content copied into many places,
 * proliferating as functionless mass (entropy). The malignant remainder is the excess-copy count
 * the fold excises — total bodies minus distinct-by-content, where the distinct set is the
 * self-address equivalence class (equal content ⟺ equal address). cancerFree ⟺ remainder 0 ⟺
 * diamond-complete. Isomorphism only — duplication↔proliferation, folding↔apoptosis — never an
 * oncology claim.
 */
const selfAddress = (body: string): string => body.replace(/\s+/g, ' ').trim()

/** The malignant remainder — the copies the fold excises: total − distinct-by-content (self-address). */
export function malignantRemainder(bodies: readonly string[]): number {
  return bodies.length - new Set(bodies.map(selfAddress)).size
}

/** Cancer-free ⟺ zero malignant remainder ⟺ every content lives at exactly one address (diamond-complete). */
export function cancerFree(bodies: readonly string[]): boolean {
  return malignantRemainder(bodies) === 0
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const f = corpusFold()
  console.log('fold — the math of the folding (' + f.atoms + ' atoms → one root):')
  console.log('  depth ' + f.depth + ' folds · ' + f.merges + ' merges · halving ' + halving(f.atoms).join('→'))
  console.log('  digital-root fold: dr(atoms)=' + digitalRoot(f.atoms) + ' dr(merges)=' + digitalRoot(f.merges) + ' dr(108)=' + digitalRoot(108))
}
