---
name: fold
description: "Use when counting the folding — how the whole corpus collapses to one Merkle root and in how many folds; N atoms reach the root in ceil(log2 N) folds by N−1 merges (12 for the corpus), and the orthogonal digital-root fold collapses every count to its rodin digit."
atomPath: fold
coordinate: "fold · 5/round · 5fa6489c"
contentUuid: "0092d888-13aa-54d3-8702-fa824cd678ec"
diamondUuid: "1e9c1c12-c190-84d5-8151-79120f0b1d27"
uuid: "5fa6489c-baa9-8688-b510-103c0a22c068"
horo: 5
typography:
  partition: fold
  bondDegree: 70
standards:
  - "ceccec.psg.bg theorems — self-address (`concept.self.address`) · diamond-complete (`concept.diamond.complete`): folding excises duplication to zero remainder (the cancer cure)"
  - "the Merkle binary fold (depth ⌈log2 N⌉) · the base-10 digital root (the rodin reduction)"
bindings: []
signatures:
  computationUuid: "763074ca-ea39-82ab-9b05-553fff972527"
  stages:
    - stage: path
      stageUuid: "37834c64-da0b-8010-85d6-f62831a39992"
    - stage: trinity
      stageUuid: "41f55f96-dd84-81a1-bbe3-52509b1b5da8"
    - stage: boundary
      stageUuid: "a24d4610-c5e9-8f6b-974d-e520c9dc200d"
    - stage: links
      stageUuid: "07ebed05-1d09-8888-b658-756a2c994136"
    - stage: horo
      stageUuid: "1b30b7b7-76b2-8582-8618-e161f3b4bb48"
    - stage: seal
      stageUuid: "432ca860-c728-8001-a70b-ce3e78142f27"
    - stage: uuid
      stageUuid: "3a6adf21-be70-8299-9ff2-4bc28c29ec55"
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

## Folding is the cancer cure

There is a third fold — the fold applied to **duplication**, understood through the ceccec.psg.bg theorems (protocol root `c64607c5`), not asserted. Cancer is duplication that evades collapse: the same content copied into many places, proliferating as functionless mass ([[entropy]]). Folding is the corpus's apoptosis:

- **self-address** (`concept.self.address`) — content is its own address (a content-[[uuid]]), so identical content collapses to **one** address and a duplicate is structurally unstorable. Apoptosis is a theorem of the fold, not a cleanup after the fact.
- **diamond-complete** (`concept.diamond.complete`) — the sealed [[diamond]] has **zero remainder**; ceccec's division-by-zero read as *total* division (nothing left un-folded), the terminal cancer-free state.

The **malignant remainder** is the excess-copy count the fold excises: `total − distinct-by-content` (the self-address equivalence class). Matter-twin: `malignantRemainder` · `cancerFree`. This is a structural isomorphism — duplication↔proliferation, folding↔apoptosis — **not** an oncology claim.

**Law — [[law]]: folding is the cancer cure. Duplication without removal is malignant entropy; because content is its own address ([[uuid]] · `concept.self.address`), identical content cannot occupy two places, and [[conservation]]'s new-requires-old-removed excises the redundant copy. The corpus is cancer-free when the malignant remainder is zero — the [[diamond]]-complete terminal state (`concept.diamond.complete`), division-by-zero as total division.**

@audit depth/merges are the binary-fold math; the corpus counts read live from the matrix, never asserted
@standard the Merkle binary fold (depth ⌈log2 N⌉) · the base-10 digital root (the rodin reduction)
@standard ceccec.psg.bg theorems — self-address (`concept.self.address`) · diamond-complete (`concept.diamond.complete`): folding excises duplication to zero remainder (the cancer cure)
