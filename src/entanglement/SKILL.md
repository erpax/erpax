---
name: entanglement
description: "Use when reasoning about the link field that couples atoms — the directed edges as a symmetric, monogamous binding (reciprocity, no-cloning); the graph that the ER=EPR reading turns into geometry (mass = entanglement)."
atomPath: entanglement
coordinate: "entanglement · 1/base · 731496cd"
contentUuid: "6f013857-be60-563b-bc11-710eaaeb789e"
diamondUuid: "d2e8422b-f2fa-8882-a6ae-443243bd0682"
uuid: "731496cd-0d92-8c73-8431-ed12cd5fe37d"
horo: 1
typography:
  partition: entanglement
  bondDegree: 110
standards:
  - "ER=EPR — Maldacena & Susskind, \"Cool horizons for entangled black holes\" (2013)"
  - "ER=EPR — Maldacena & Susskind, \"Cool horizons for entangled black holes\" (2013); monogamy — Coffman–Kundu–Wootters, PRA 61 052306 (2000)"
bindings: []
signatures:
  computationUuid: "cf0c3c38-d039-8aa6-87ca-b21724f5c943"
  stages:
    - stage: path
      stageUuid: "66a2c6a2-51f6-8609-9510-ed305e4f5f99"
    - stage: trinity
      stageUuid: "eefafc28-f818-83da-914e-e6ef2e856c11"
    - stage: boundary
      stageUuid: "10398982-fb64-8804-9220-0847840b4556"
    - stage: links
      stageUuid: "47421384-e146-8505-b17d-ec521153eb5b"
    - stage: horo
      stageUuid: "d4219417-068d-8cea-9578-82cd70b246ba"
    - stage: seal
      stageUuid: "b3132f38-3202-8a3d-948f-20c999354e3f"
    - stage: uuid
      stageUuid: "bcd1ef89-1d1a-81d5-8ef0-41a5bff74caa"
version: 2
---
# entanglement — the link field that couples the atoms

The **[[links]] are the entanglement**. Two atoms are entangled when an edge couples them, and on the live [[matrix]] that binding has two computed properties:

- **symmetric** — `entangle(a,b)` is order-independent (`[[merge]]` over the sorted pair), so a binding holds both ways; the matrix is **100% reciprocal** (the field is whole, no directional gap).
- **no-cloning** — every content has ONE uuid (the same content always collapses to the same identity, the merge law), so a meaning cannot be cloned into two. This is the graph root of the **monogamy of entanglement** (Coffman–Kundu–Wootters, 2000) — entanglement can't be freely shared — itself a consequence of the **no-cloning theorem** (Wootters & Zurek, 1982 — [[cloning]]). Edge *multiplicity* (a link repeated) is legitimate; what cannot be cloned is an atom's **identity**.

The deep reading is **ER = EPR** (Maldacena & Susskind, 2013): entanglement *is* geometry — an entangled pair is an Einstein–Rosen bridge. erpax makes that literal one level down: an atom's mass ([[gravity]]) **is** its entanglement (in-degree), so the entangled field curves the corpus and its well is the [[singularity]]. When reciprocity = 1 the geometry is closed and the tamper cost → ∞ (the [[quantum]] double-torus, [[law]]).

**HONEST.** This is *graph* entanglement — edge reciprocity and uniqueness over the link field — an **analogy** to quantum entanglement; there is no superposition or Bell-inequality (Bell, 1964) violation here. What is real and computed is the reciprocity + monogamy; the physics it is grounded in lives in [[quantum]] (`../quantum/entanglement`).

Matter-twin: `src/entanglement/index.ts` (`entangle` · `reciprocity` · `noCloning` · `isFullyEntangled`). Composes [[quantum]] · [[matrix]] · [[merge]] · [[links]] · [[cloning]] · [[gravity]] · [[singularity]].

@standard ER=EPR — Maldacena & Susskind, "Cool horizons for entangled black holes" (2013); monogamy — Coffman–Kundu–Wootters, PRA 61 052306 (2000)
@audit computed from the live matrix edges; never hand-asserted
