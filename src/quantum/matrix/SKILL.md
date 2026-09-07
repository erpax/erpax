---
name: matrix
description: "Use when reading the matrix as the cross-product / entanglement adjacency — the N² space of atom pairs and which are actually entangled; cross (the symmetric pair binding), bidirectionalCross, adjacency density, reciprocity, and in-degree centrality."
atomPath: "quantum/matrix"
coordinate: "quantum/matrix · 1/base · c01f967d"
contentUuid: "833cb3d4-e3a8-57cc-b58b-1852c94eb8f0"
diamondUuid: "6941f4e0-062e-8db1-a0d8-788223e708c4"
uuid: "c01f967d-bd82-8d7a-ad1c-88c85e77fd23"
horo: 1
typography:
  partition: quantum
  bondDegree: 314
standards:
  - ER=EPR (Maldacena–Susskind 2013) — entanglement IS the adjacency geometry; RFC 9562 §5.8
  - "ER=EPR (Maldacena–Susskind 2013) — entanglement is the adjacency geometry; RFC 9562 §5.8 content-uuid"
bindings: []
signatures:
  computationUuid: "694850d7-e146-89d5-a264-9c4f1eff7b76"
  stages:
    - stage: path
      stageUuid: "0d30e38a-6d4e-8bdb-95fd-5d55ae8e9b37"
    - stage: trinity
      stageUuid: "72064696-2ffe-8a28-ad8d-5abff1462667"
    - stage: boundary
      stageUuid: "f072b391-f287-8351-8952-8c3b422f0006"
    - stage: links
      stageUuid: "695debc8-7f0b-8ece-b819-c3fd5060461f"
    - stage: horo
      stageUuid: "fa3b72d6-e06b-86ba-8ca9-6e3b24ba8aa6"
    - stage: seal
      stageUuid: "440ca202-dbb2-80de-91c0-f62048906dfc"
    - stage: uuid
      stageUuid: "99e6f127-c908-826e-b16d-633f4d21fe2e"
quantum:
  superposition:
    - addressed
    - akashic
    - analog
    - analytics
    - app
    - architect
    - architecture
    - aura
    - superposition
  collapse:
    - "ER=EPR (Maldacena–Susskind 2013) — entanglement is the adjacency geometry; RFC 9562 §5.8 content-uuid"
    - "Use when reading the matrix as the cross-product / entanglement adjacency — the N² space of atom pairs and which are actually entangled; cross (the symmetric pair binding), bidirectionalCross, adjacency density, reciprocity, and in-degree centrality."
    - "computed from the live matrix, never hand-asserted"
    - "matter-twin:src/quantum/matrix/index.ts"
    - "the cross is order-free and monogamous — cross(a,b) === cross(b,a), and where both directed edges exist they share exactly one binding-uuid (bidirectionalCross). The torus is closed: every node binds both its prev and its next on the sequence ring, with no gap in any node — the link adjacency stays sparse, but the ring is total."
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "694850d7-e146-89d5-a264-9c4f1eff7b76"
    contentUuid: "833cb3d4-e3a8-57cc-b58b-1852c94eb8f0"
version: 2
---
# quantum/matrix — the cross-product / entanglement adjacency

The **quantum facet** of the [[matrix]]: the cross-product / entanglement adjacency, computed on the live uuid-matrix. Where [[quantum]] checks the global laws and [[quantum]]/gravity reads mass = entanglement at the well, this facet reads the **adjacency itself** — the N² space of atom pairs and which of them are actually entangled.

**Do the math.** Every atom pair X/Y ⊕ Y/X is ONE symmetric binding — `cross(a, b)` (the sorted-pair [[merge]] over the two content-uuids, order-free; `cross(a,b) === cross(b,a)`). The development/research ⊕ research/development example is exactly this. The ACTUAL crosses are the [[links]] edges (`isAdjacent`); the POTENTIAL is N² (`adjacencyDensity`). Live: ~22.5k edges over 2250² ≈ **0.44% occupancy** — sparse where it binds, yet **fully reciprocal** (`reciprocity` = 1). The unbound ~99.5% is the orphan/compost frontier the [[development]] roadmap drives toward zero.

- `cross(a,b)` — the symmetric pair binding (the canonical law). Honest: the *stored* edge binding is merge in raw edge-order, so `cross` is the law, not a claim it equals every stored binding; `bidirectionalCross(a,b)` is the data-invariant (both directed edges share one binding-uuid — verified live).
- `adjacencyDensity()` — `{nodes, edges, potential=N², density}`.
- `reciprocity()` — re-exported from [[entanglement]] (no duplicate scan).
- `centrality(atom)` / `centralityRank(n)` — in-degree as the dominant-eigenvector PROXY (Perron–Frobenius), O(1) over [[gravity]] mass; NO heavy eigensolve. The top is the [[singularity]] (merge).

**HONEST.** Graph adjacency, not a Hilbert space — no superposition, no Bell violation. What is real: reciprocity, content-uuid monogamy, in-degree centrality.

Matter-twin: `src/quantum/matrix/index.ts` (`cross` · `isAdjacent` · `bidirectionalCross` · `adjacencyDensity` · `reciprocity` · `centrality` · `centralityRank`). Composes [[matrix]] · [[quantum]] · [[entanglement]] · [[gravity]] · [[merge]] · [[uuid]] · [[singularity]].

**Law — [[law]]: the cross is order-free and monogamous — cross(a,b) === cross(b,a), and where both directed edges exist they share exactly one binding-uuid (bidirectionalCross). The torus is closed: every node binds both its prev and its next on the sequence ring, with no gap in any node — the link adjacency stays sparse, but the ring is total.**

@standard ER=EPR (Maldacena–Susskind 2013) — entanglement is the adjacency geometry; RFC 9562 §5.8 content-uuid
@audit computed from the live matrix, never hand-asserted

<sub>content-uuid `833cb3d4-e3a8-57cc-b58b-1852c94eb8f0` · account `quantum/matrix` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
