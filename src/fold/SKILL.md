---
name: fold
description: Use when counting the folding — how the whole corpus collapses to one Merkle root and in how many folds; N atoms reach the root in ceil(log2 N) folds by N−1 merges (12 for the corpus), and the orthogonal digital-root fold collapses every count to its rodin digit.
---

# fold — the math of the folding

The fold is [[merge]] made a tree. Pair the atoms, pair the pairs, and keep pairing up to the single Merkle root — that is [[collapse]], the corpus reduced to one. The counting is exact:

- **Fold DEPTH** = `ceil(log2 N)` — the number of folds to reach the one root. The live corpus (≈2302 atoms) folds in **12** — and 12 is the [[mala]]'s other factor (108 = 9 × 12).
- **Fold COUNT** = `N − 1` — the merges in a binary fold (**2301** for the corpus).
- The **halving sequence** walks it down: `2302 → 1151 → 576 → … → 9 → 5 → 3 → 2 → 1`.

There is a second fold, orthogonal to the tree — the **digital-root fold** (the [[rodin]] reduction), collapsing any count to its single 1..9 digit. It lands the corpus on its own axis:

- `dr(edges 24687) = 9` — the governing axis.
- `dr(merges 2301) = 6` — the working helix (the 2/3).
- `dr(108) = 9`, `dr(73 dualities) = 1`.

Two folds — the **tree to one root**, the **count to one digit** — and both end in the [[one]]. To fold is to find the one the many already were.

Matter-twin: `src/fold/index.ts` (`foldDepth` · `foldCount` · `halving` · `corpusFold`). The digital-root fold (count → one digit) is the canonical integer `digitalRoot` from [[horo]] — one implementation, imported not re-derived. Composes [[merge]] · [[collapse]] · [[matrix]] · [[rodin]] · [[mala]] · [[one]] · [[uuid]].

**Law — [[law]]: everything folds to one. N atoms collapse to a single root in ceil(log2 N) folds — 12 for the corpus — by N−1 merges; and every count folds by digital root to its rodin digit. Two folds, the tree to one root and the count to one digit, and both end in the one.**

@audit depth/merges are the binary-fold math; the corpus counts read live from the matrix, never asserted
@standard the Merkle binary fold (depth ⌈log2 N⌉) · the base-10 digital root (the rodin reduction)
