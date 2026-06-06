---
name: matrix
description: Use when reading the matrix as the cross-product / entanglement adjacency — the N² space of atom pairs and which are actually entangled; cross (the symmetric pair binding), bidirectionalCross, adjacency density, reciprocity, and in-degree centrality.
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

@standard ER=EPR (Maldacena–Susskind 2013) — entanglement is the adjacency geometry; RFC 9562 §5.8 content-uuid
@audit computed from the live matrix, never hand-asserted
