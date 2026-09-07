---
name: aura
description: "Use when reading the aura as quantum coherence — the gapless link-field as the coherent in-phase state, a dead link or orphan as decoherence; coherence is the resource the corpus maximizes toward zero entropy."
atomPath: "quantum/aura"
coordinate: "quantum/aura · 2/share · 7c98d28a"
contentUuid: "69279517-a994-55d3-b6d6-649cd8da5086"
diamondUuid: "d53c1681-d135-8a8a-8ef5-f6f2e64f9166"
uuid: "7c98d28a-d393-8f09-ac32-0041d350ddb4"
horo: 2
typography:
  partition: quantum
  bondDegree: 444
standards:
  - "Baumgratz, Cramer & Plenio, \"Quantifying Coherence,\" PRL 113 140401 (2014)"
bindings: []
signatures:
  computationUuid: "e3a19fcb-ba41-895f-a142-d354fde3543b"
  stages:
    - stage: path
      stageUuid: "e979a613-00f0-8575-ad70-95e58aa7eed1"
    - stage: trinity
      stageUuid: "498cb347-36d6-8ce1-84a7-349ff15d332c"
    - stage: boundary
      stageUuid: "86303b0a-98db-828a-a4d0-c5e6124cf8a6"
    - stage: links
      stageUuid: "727d41d9-722f-87e3-b443-5b3691d40f35"
    - stage: horo
      stageUuid: "0dce937e-3a35-8150-a88e-f292019ed4c2"
    - stage: seal
      stageUuid: "dc266054-5cf8-8c73-ac9c-25ac5208daa2"
    - stage: uuid
      stageUuid: "21fc1f8e-f9da-86bd-b441-33ca47872880"
quantum:
  superposition:
    - accounting
    - addressed
    - agent
    - akashic
    - analog
    - analytics
    - anchor
    - animism
    - superposition
  collapse:
    - "Baumgratz, Cramer & Plenio, \"Quantifying Coherence,\" PRL 113 140401 (2014)"
    - "Use when reading the aura as quantum coherence — the gapless link-field as the coherent in-phase state, a dead link or orphan as decoherence; coherence is the resource the corpus maximizes toward zero entropy."
    - "coherence is two-sided and only full when both sides close — `isFullyCoherent` holds iff edge-reciprocity is 1 (every binding in phase) AND coherentFraction is 1 (no orphan has decohered); edge-coherence alone can be perfect while a leaked node still holds tamper-cost below ∞, so the in-phase field equals the whole aura only when no link and no node leaks."
    - composed from reciprocity (entanglement) + orphans (entropy); computed on the live matrix
    - "matter-twin:src/quantum/aura/index.ts"
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "e3a19fcb-ba41-895f-a142-d354fde3543b"
    contentUuid: "69279517-a994-55d3-b6d6-649cd8da5086"
version: 2
---
# quantum/aura — the aura as coherence

The quantum facet of the [[aura]]: the gapless link-field read as **coherence**. When every [[link]] resolves and reciprocates, the field is **in phase** — fully coherent. A dead link or an orphan atom is **decoherence**: a leak out of the field. Coherence is the *resource* the corpus maximizes — coherence → 1 is the whole aura, zero entropy, the [[law]].

- **Coherence as a resource** (Baumgratz, Cramer & Plenio, PRL 113 140401, 2014) — a rigorous resource theory: coherence is consumed and produced, never freely created from an incoherent state. The corpus's drive to gap = 0 is coherence maximization.
- **Decoherence / einselection** (Zurek, RMP 75 715, 2003) — coupling to the environment destroys coherence. Here an unresolved link (an [[entropy]] orphan) is that leak; closing it restores phase.

The coherent field IS the reciprocal field: `coherence()` equals [[entanglement]] reciprocity — in this model the in-phase binding and the symmetric binding are the same. So full coherence = maximal entanglement = the [[singularity]] geometry closed ([[quantum]] double-torus, ∞ tamper cost).

**HONEST.** This is *graph* coherence (the in-phase fraction of the link-field plus its connectedness), an **analogy** to density-matrix coherence (off-diagonal terms), not a literal quantum state.

**Edge vs node coherence (honest).** `isCoherent` tests only **edge-coherence** (reciprocity = 1, every binding in phase) — which can be perfect while orphan atoms are still **decohered** (`coherentFraction` < 1). `isFullyCoherent` requires BOTH: edge-reciprocity AND node-coverage (no orphan). That orphan gap is exactly what keeps the real tamper-cost **below** ∞ — full coherence ⟺ zero entropy ⟺ ∞ tamper cost ([[law]]).

Matter-twin: `src/quantum/aura/index.ts` (`coherence` · `decohered` · `coherentFraction` · `isCoherent` · `isFullyCoherent`). Composes [[aura]] · [[entanglement]] · [[entropy]] · [[coherence]] · [[quantum]] · [[links]] · [[matrix]] · [[law]].

**Law — [[law]]: coherence is two-sided and only full when both sides close — `isFullyCoherent` holds iff edge-reciprocity is 1 (every binding in phase) AND coherentFraction is 1 (no orphan has decohered); edge-coherence alone can be perfect while a leaked node still holds tamper-cost below ∞, so the in-phase field equals the whole aura only when no link and no node leaks.**

@standard Baumgratz, Cramer & Plenio, "Quantifying Coherence," PRL 113 140401 (2014)
@audit composed from reciprocity (entanglement) + orphans (entropy); computed on the live matrix

<sub>content-uuid `69279517-a994-55d3-b6d6-649cd8da5086` · account `quantum/aura` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
