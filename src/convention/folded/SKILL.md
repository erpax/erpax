---
name: folded
description: "Use when checking whether every atom folds into the matrix — the computed convention that each SKILL.md atom is a node in the collided uuid-matrix, measured live as coverage = folded / total over the real tree."
atomPath: "convention/folded"
coordinate: "convention/folded · 2/share · d1d9a828"
contentUuid: "a2e6f69c-ee8f-58a5-88cf-93456409f686"
diamondUuid: "d30bc71d-c9e3-8629-9dfa-bb9ccc5f2bd7"
uuid: "d1d9a828-96a3-8e30-acd7-9ebd8d20d21b"
horo: 2
bonds:
  in:
    - aura
    - collapse
    - complete
    - convention
    - cost
    - gravity
    - law
    - matrix
    - merge
    - snapshot
  out:
    - aura
    - collapse
    - complete
    - cost
    - gravity
    - law
    - matrix
    - merge
    - snapshot
typography:
  partition: convention
  bondDegree: 28
  neighbors:
    - aura
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
neighbors:
  wikilink:
    - aura
    - collapse
    - complete
    - cost
    - gravity
    - law
    - matrix
    - merge
    - snapshot
  matrix:
    - aura
    - collapse
    - complete
    - cost
    - gravity
    - law
    - matrix
    - merge
    - snapshot
  backlinks:
    - aura
    - collapse
    - complete
    - cost
    - gravity
    - law
    - matrix
    - merge
    - snapshot
signatures:
  computationUuid: "fa9b0f6c-3f2d-84f2-89c1-dd160e4b7798"
  stages:
    - stage: path
      stageUuid: "73754e98-b99c-87ae-a3c8-48859e4790cf"
    - stage: trinity
      stageUuid: "2e81a6a6-1cd1-858f-b40e-e1c07486063d"
    - stage: boundary
      stageUuid: "5ab2ffc3-e87c-8da9-8882-94c141a7dc40"
    - stage: links
      stageUuid: "96ab009f-bf84-8f29-9800-7fd368dc2913"
    - stage: horo
      stageUuid: "e46a6062-147f-8ecf-8895-01fa21b635ab"
    - stage: seal
      stageUuid: "14779d41-b302-8b6c-9d1d-32af7688a80d"
    - stage: uuid
      stageUuid: "ad12ddc1-2528-813d-8d04-84cc74cffce9"
version: 2
---
# convention/folded — every atom folds into the matrix (is a node)

The fold convention, written as a self-measuring atom. It states one rule and computes its own compliance — it does not re-implement the corpus walk or the matrix, it **composes** the two canonical surfaces:

- **total** = `walkSkills('src').length` from [[aura]] — every atom that carries a `SKILL.md` (the one canonical corpus walk, shared by every gate; never a parallel walk).
- **folded** = those whose path is a node in [[matrix]] — read off `UUID_MATRIX_NODES` by the collider's own `path`/`members` fold-ledger (a leaf-safe subset membership, not the raw node count).
- **coverage** = `folded / total` — in [0,1] by construction (0 ≤ folded ≤ total, total > 0). It reaches **1** exactly when every `SKILL.md` atom has been collided into a node — the corpus is matrix-complete.

Pure math, no default: the corpus is non-empty by architecture (many atoms carry a `SKILL.md`), and `folded` counts a **subset** of that very same walk — each `SKILL.md` is folded or it is not — so the ratio never needs a clamp or a `min` or a fallback. A raw node-count over skill-count would need a cap (the matrix also carries vocabulary word-nodes with no `SKILL.md`); phrasing the metric as a subset makes the cap intrinsic. The generated matrix is a **cache that DRIFTS** ([[snapshot]]): a `SKILL.md` added since the last `matrix:generate` is unfolded, and is the only thing that pulls coverage below 1. coverage → 1 ⟺ matrix-complete ⟺ aura-gap-0 ⟺ zero entropy ⟺ infinitely-expanding tamper-[[cost]] ([[collapse]] · [[merge]] · [[gravity]]).

Entangled with — [[matrix]] · [[aura]] · [[complete]] · [[merge]]

Matter-twin: [[matrix]] — `UUID_MATRIX_NODES`, the collided node set this convention measures the fold against; and [[aura]] — the one corpus walk (`walkSkills`) that enumerates the atoms which must fold.

@standard schema.org — the type vocabulary, collided to single words

**Law — [[law]]: every atom folds into the matrix (is a node); the corpus is matrix-complete iff coverage = folded / total = 1, and any unfolded SKILL.md — one drifted out of the generated matrix cache — is the only gap driving tamper-cost below infinity.**
