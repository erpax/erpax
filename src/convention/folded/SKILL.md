---
name: folded
description: "Use when checking whether every atom folds into the matrix — the computed convention that each SKILL.md atom is a node in the collided uuid-matrix, measured live as coverage = folded / total over the real tree."
atomPath: "convention/folded"
coordinate: "convention/folded · 5/round · a31fd9e4"
contentUuid: "b9aa5692-ae60-508f-9663-95b4653ee456"
diamondUuid: "2109863a-b6aa-8152-a6ed-0fc38336fe02"
uuid: "a31fd9e4-cf9f-81a6-95e6-76a03891c66d"
horo: 5
typography:
  partition: convention
  bondDegree: 28
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "b7bab164-17be-8c2b-9c43-4c354718d964"
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
      stageUuid: "521277db-1024-8207-b46c-0ac302b27fe9"
    - stage: seal
      stageUuid: "14779d41-b302-8b6c-9d1d-32af7688a80d"
    - stage: uuid
      stageUuid: "e72610da-c32f-82be-b880-2a1832d70a4c"
version: 2
---
# convention/folded — every atom folds into the matrix (is a node)

The fold convention, written as a self-measuring atom. It states one rule and computes its own compliance — it does not re-implement the corpus walk or the matrix, it **composes** the two canonical surfaces:

- **total** = `walkSkills('src').length` from [[aura]] — every atom that carries a `SKILL.md` (the one canonical corpus walk, shared by every gate; never a parallel walk).
- **folded** = those whose path is a node in [[matrix]] — read off `UUID_MATRIX_NODES` by the collider's own `path`/`members` fold-ledger (a leaf-safe subset membership, not the raw node count).
- **coverage** = `folded / total` — in [0,1] by construction (0 ≤ folded ≤ total, total > 0). It reaches **1** exactly when every `SKILL.md` atom has been collided into a node — the corpus is matrix-complete.

Pure math, no default: the corpus is non-empty by architecture (many atoms carry a `SKILL.md`), and `folded` counts a **subset** of that very same walk — each `SKILL.md` is folded or it is not — so the ratio never needs a clamp or a `min` or a fallback. A raw node-count over skill-count would need a cap (the matrix also carries vocabulary word-nodes with no `SKILL.md`); phrasing the metric as a subset makes the cap intrinsic. The generated matrix is a **cache that DRIFTS** ([[snapshot]]): a `SKILL.md` added since the last `matrix:generate` is unfolded, and is the only thing that pulls coverage below 1. coverage → 1 ⟺ matrix-complete ⟺ aura-gap-0 ⟺ coverage = 1 ⟺ unboundedly-expanding tamper-[[cost]] ([[collapse]] · [[merge]] · [[gravity]]).

Entangled with — [[matrix]] · [[aura]] · [[complete]] · [[merge]]

Matter-twin: [[matrix]] — `UUID_MATRIX_NODES`, the collided node set this convention measures the fold against; and [[aura]] — the one corpus walk (`walkSkills`) that enumerates the atoms which must fold.

@standard schema.org — the type vocabulary, collided to single words

**Law — [[law]]: every atom folds into the matrix (is a node); the corpus is matrix-complete iff coverage = folded / total = 1, and any unfolded SKILL.md — one drifted out of the generated matrix cache — is the only gap driving tamper-cost below infinity.**
