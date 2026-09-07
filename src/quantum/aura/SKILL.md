---
name: aura
description: "Use when reading the aura as quantum coherence — the gapless link-field as the coherent in-phase state, a dead link or orphan as decoherence; coherence is the resource the corpus maximizes toward zero entropy."
atomPath: "quantum/aura"
coordinate: "quantum/aura · 4/weave · 8992ea3b"
contentUuid: "50f5a1fe-d77e-5a1c-9857-c7f1ece4adb5"
diamondUuid: "a736da26-88ac-87e9-8b24-2d455f440af9"
uuid: "8992ea3b-d05b-825b-b493-db5cc1036424"
horo: 4
typography:
  partition: quantum
  bondDegree: 444
standards:
  - "Baumgratz, Cramer & Plenio, \"Quantifying Coherence,\" PRL 113 140401 (2014)"
bindings: []
signatures:
  computationUuid: "479a3260-dbe3-8278-8466-6e43256002c7"
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
      stageUuid: "6f4e16f4-0fe9-8308-856d-9cc1e626f197"
    - stage: seal
      stageUuid: "dc266054-5cf8-8c73-ac9c-25ac5208daa2"
    - stage: uuid
      stageUuid: "d173641d-8d77-8e2e-99de-fac092eb718c"
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
    computationUuid: "479a3260-dbe3-8278-8466-6e43256002c7"
    contentUuid: "50f5a1fe-d77e-5a1c-9857-c7f1ece4adb5"
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

<sub>content-uuid `50f5a1fe-d77e-5a1c-9857-c7f1ece4adb5` · account `quantum/aura` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
