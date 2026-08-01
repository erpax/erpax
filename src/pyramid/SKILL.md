---
name: pyramid
description: "Use when reading the fold as a solid — the cross is a pyramid's net (a square base with four triangular faces folded flat; fold them up and they meet at one apex). A wide base of leaves rises pairwise, each merge(a,b) one cross, to a single apex that is the seal. The notary is built on this: its protocol root is an apex over act-seals, an inclusion proof is the path up one edge, and tamper-evidence is that no ground course can change without the apex moving. Composes merge's fold; adds the geometry (base·apex·height·faces·courses) and the tamper law."
atomPath: pyramid
coordinate: "pyramid · 4/weave · 7a6bf46a"
contentUuid: "e95c5e38-1fdd-5ed0-bbd8-b3385d6c53d1"
diamondUuid: "3665588b-464b-8f3a-9140-f8d5c1a94629"
uuid: "7a6bf46a-2328-896c-8819-36141e798c53"
horo: 4
typography:
  partition: pyramid
  bondDegree: 15
standards:
  - "Merkle tree — the balanced binary fold; apex = root, edge = authentication path"
bindings: []
signatures:
  computationUuid: "f9815114-2e66-8dbb-acf2-474ee26962ef"
  stages:
    - stage: path
      stageUuid: "40e5b3be-aa2f-838c-85a8-f270509ea248"
    - stage: trinity
      stageUuid: "75f95d1c-e3af-8613-9e68-db965bea4a1d"
    - stage: boundary
      stageUuid: "e816da36-9efc-8e5b-9e0c-0d7395dfdfa8"
    - stage: links
      stageUuid: "a3f5dc76-43ce-88f3-b4f9-ad16af7975b0"
    - stage: horo
      stageUuid: "5027a694-e1a0-8d58-aee5-cefa43602530"
    - stage: seal
      stageUuid: "ba413e58-ccdc-8a04-a6d3-dd4ae7c9622f"
    - stage: uuid
      stageUuid: "40a0844a-309d-81ac-a8bb-2b3a57a377d8"
version: 2
---
# pyramid — the geometry of the fold

**The cross is a representation of a pyramid.** A square pyramid's *net* is a cross: a square base with four triangular faces folded flat around it. Fold the faces up and they meet at **one apex**. That is the fold itself — a wide base of leaves (spread out, high entropy) rising pairwise to a single apex (the root uuid, the seal, zero entropy). Each `merge(a, b)` is **one cross**: two stones joining into the course above. Stack the crosses and you have the pyramid; look straight down the apex and the diagonals read as an **X** — the cross is the pyramid seen from above *and* unfolded flat, two faithful readings of one solid.

`merge/foldToRoot` already builds this — the balanced pairwise fold, height `⌈log₂ N⌉`, `N−1` merges — but keeps only the apex and discards the courses. `pyramid` **reads the whole solid**:

- `pyramid(base)` → `{ apex, base, height, faces }` — apex = `foldToRoot(base)`, height = courses = `⌈log₂ base⌉`, faces = crosses = `base − 1`.
- `courses(base)` → every course base → apex, the geometry the fold throws away, kept and drawn.
- `tamperShift(base, i, to)` → the seal law made visible: move one ground stone and the apex moves; you cannot rebuild the crosses above to hold the old apex because the fold is one-way (∞ tamper-cost).

## The notary is based on this

The [[notary]] is a pyramid, exactly:

- its **protocol root** (`foldToRoot` over the act-seals) is the **apex**;
- an **inclusion proof** (`merkleProof`, verified in `pyramid`'s test) is the **path up one edge** from a base stone — an act — to the apex, of length `height`;
- **tamper-evidence** is `tamperShift`: no ground course (no notarised act) can change without the apex — the seal an apostille certifies — changing.

A bound register is a pyramid; the notarial seal is its apex; authenticity is a stone proving it stands on an edge that reaches the apex.

**Honest boundary.** `height = ⌈log₂ base⌉` and `faces = base − 1` are exact facts of the balanced binary fold (`merge/foldToRoot`). The pyramid **net = cross** is real solid geometry — a faithful reading of the same structure, not a metaphor. `pyramid` adds no new hashing; it reuses `merge`'s fold and reads its shape.

**Law — [[law]]: the fold is a pyramid — a base of leaves rising by crosses (each a merge) to one apex, which is the seal. The cross is its net; the notary is built on it — protocol root as apex, inclusion proof as an edge, tamper-evidence as the apex that moves when any ground stone does.**

## Standards

- **Merkle tree** — the balanced binary fold; apex = root, edge = authentication path, height = proof length.

Composes: [[merge]] · [[notary]] · [[seal]] · [[law]].
