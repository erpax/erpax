---
name: fold
description: "Use when counting the folding — how the whole corpus collapses to one Merkle root and in how many folds; N atoms reach the root in ceil(log2 N) folds by N−1 merges (12 for the corpus), and the orthogonal digital-root fold collapses every count to its rodin digit."
atomPath: fold
coordinate: fold · 8/crest · 1e7ff9dc
contentUuid: "43e22a63-ca25-5bc4-b105-d317cdf79c53"
diamondUuid: "6eb58bc4-c40a-89cb-98ba-cd8d0feb944c"
uuid: "1e7ff9dc-0da4-8861-b564-16a8f1fd8b41"
horo: 8
bonds:
  in:
    - agent
    - collapse
    - db
    - horo
    - law
    - mala
    - matrix
    - merge
    - name
    - one
    - rodin
    - stack
    - uuid
  out:
    - agent
    - collapse
    - db
    - horo
    - law
    - mala
    - matrix
    - merge
    - name
    - one
    - rodin
    - stack
    - uuid
typography:
  partition: fold
  bondDegree: 39
  neighbors: []
standards:
  - "depth/merges are the binary-fold math; the corpus counts are read live from the matrix"
  - "depth/merges are the binary-fold math; the corpus counts read live from the matrix, never asserted"
  - "the Merkle binary fold (depth ⌈log2 N⌉) · the base-10 digital root (the rodin reduction)"
bindings: []
neighbors:
  wikilink:
    - collapse
    - horo
    - law
    - mala
    - matrix
    - merge
    - one
    - rodin
    - uuid
  matrix:
    - agent
    - collapse
    - db
    - horo
    - law
    - mala
    - matrix
    - merge
    - name
    - one
    - rodin
    - stack
    - uuid
  backlinks:
    - agent
    - collapse
    - db
    - horo
    - law
    - mala
    - matrix
    - merge
    - name
    - one
    - rodin
    - stack
    - uuid
signatures:
  computationUuid: "f4c6bfd5-3f4e-8746-9cd0-8d1d48821d30"
  stages:
    - stage: path
      stageUuid: "37834c64-da0b-8010-85d6-f62831a39992"
    - stage: trinity
      stageUuid: "41f55f96-dd84-81a1-bbe3-52509b1b5da8"
    - stage: boundary
      stageUuid: "21b5528a-4471-8658-8d46-ecd481d45f0e"
    - stage: links
      stageUuid: "52a5296d-f8a1-898d-b519-29da34bd7522"
    - stage: horo
      stageUuid: "402757ba-d539-83ab-ab8d-b529aaac6e53"
    - stage: seal
      stageUuid: "c0acc967-7792-8949-93e8-5b31b39aa7aa"
    - stage: uuid
      stageUuid: "05914da6-340e-8753-97d6-44361aecd434"
version: 2
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
