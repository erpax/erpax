---
name: fold
description: "Use when counting the folding — how the whole corpus collapses to one Merkle root and in how many folds; N atoms reach the root in ceil(log2 N) folds by N−1 merges (12 for the corpus), and the orthogonal digital-root fold collapses every count to its rodin digit."
atomPath: fold
coordinate: "fold · 7/descent · ce5a9b31"
contentUuid: "00312dbf-17cf-5089-9e98-694a122c3457"
diamondUuid: "c0f64429-7c26-8a3c-bcfc-1227abfee385"
uuid: "ce5a9b31-6d1a-8c67-9eaf-ebde520f9b8e"
horo: 7
bonds:
  in:
    - agent
    - angle
    - collapse
    - conservation
    - db
    - diamond
    - e
    - entropy
    - horo
    - law
    - mala
    - matrix
    - merge
    - mortality
    - name
    - notary
    - one
    - phi
    - pi
    - rodin
    - rosetta
    - stack
    - uuid
  out:
    - agent
    - angle
    - collapse
    - conservation
    - db
    - diamond
    - e
    - entropy
    - horo
    - law
    - mala
    - matrix
    - merge
    - mortality
    - name
    - notary
    - one
    - phi
    - pi
    - rodin
    - rosetta
    - stack
    - uuid
typography:
  partition: fold
  bondDegree: 72
  neighbors:
    - diamond
standards:
  - "ceccec.psg.bg theorems — self-address (`concept.self.address`) · diamond-complete (`concept.diamond.complete`): folding excises duplication to zero remainder (the cancer cure)"
  - "the Merkle binary fold (depth ⌈log2 N⌉) · the base-10 digital root (the rodin reduction)"
bindings: []
neighbors:
  wikilink:
    - collapse
    - conservation
    - diamond
    - entropy
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
    - angle
    - collapse
    - conservation
    - db
    - diamond
    - e
    - entropy
    - horo
    - law
    - mala
    - matrix
    - merge
    - mortality
    - name
    - notary
    - one
    - phi
    - pi
    - rodin
    - rosetta
    - stack
    - uuid
  backlinks:
    - agent
    - angle
    - collapse
    - conservation
    - db
    - diamond
    - e
    - entropy
    - horo
    - law
    - mala
    - matrix
    - merge
    - mortality
    - name
    - notary
    - one
    - phi
    - pi
    - rodin
    - rosetta
    - stack
    - uuid
signatures:
  computationUuid: "96e024ed-bb08-8640-8629-4152edef0a87"
  stages:
    - stage: path
      stageUuid: "37834c64-da0b-8010-85d6-f62831a39992"
    - stage: trinity
      stageUuid: "41f55f96-dd84-81a1-bbe3-52509b1b5da8"
    - stage: boundary
      stageUuid: "502655f6-c0f2-8093-97a1-38a382299256"
    - stage: links
      stageUuid: "07ebed05-1d09-8888-b658-756a2c994136"
    - stage: horo
      stageUuid: "67bdd4d7-792e-8f1b-89b2-6cb359198186"
    - stage: seal
      stageUuid: "432ca860-c728-8001-a70b-ce3e78142f27"
    - stage: uuid
      stageUuid: "9c52d944-f90b-8b35-83b3-bed6532a6271"
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
