---
name: aura
description: "Use when reading the aura as quantum coherence — the gapless link-field as the coherent in-phase state, a dead link or orphan as decoherence; coherence is the resource the corpus maximizes toward zero entropy."
atomPath: "quantum/aura"
coordinate: "quantum/aura · 8/crest · 5a4d5cfb"
contentUuid: "43bc10ec-1af7-5610-9f74-4b7d937c68d2"
diamondUuid: "e1580f47-744b-80e3-9473-588b417628b8"
uuid: "5a4d5cfb-1d80-8092-914e-8d249349ff6b"
horo: 8
typography:
  partition: quantum
  bondDegree: 332
standards:
  - "Baumgratz, Cramer & Plenio, \"Quantifying Coherence,\" PRL 113 140401 (2014)"
bindings: []
signatures:
  computationUuid: "cd039f52-30b6-853b-ac00-7e7ca74e39a5"
  stages:
    - stage: path
      stageUuid: "e979a613-00f0-8575-ad70-95e58aa7eed1"
    - stage: trinity
      stageUuid: "498cb347-36d6-8ce1-84a7-349ff15d332c"
    - stage: boundary
      stageUuid: "86303b0a-98db-828a-a4d0-c5e6124cf8a6"
    - stage: links
      stageUuid: "a5aa4405-e116-8ebe-a16d-ab757cec1678"
    - stage: horo
      stageUuid: "42f87d2b-0f72-86ce-95d4-4d77d13da61d"
    - stage: seal
      stageUuid: "dc266054-5cf8-8c73-ac9c-25ac5208daa2"
    - stage: uuid
      stageUuid: "f1845ed5-602e-8a8b-9fd8-7ef9d32ba532"
quantum:
  superposition:
    - accounting
    - addressed
    - agent
    - akashic
    - analytics
    - anchor
    - aura
    - axis
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
    computationUuid: "cd039f52-30b6-853b-ac00-7e7ca74e39a5"
    contentUuid: "43bc10ec-1af7-5610-9f74-4b7d937c68d2"
version: 2
---
# quantum/aura — the aura as coherence

The quantum facet of the [[aura]]: the gapless link-field read as **coherence**. When every [[link]] resolves and reciprocates, the field is **in phase** — fully coherent. A dead link or an orphan atom is **decoherence**: a leak out of the field. Coherence is the *resource* the corpus maximizes — coherence → 1 is the whole aura, zero entropy, the [[law]].

- **Coherence as a resource** (Baumgratz, Cramer & Plenio, PRL 113 140401, 2014) — a rigorous resource theory: coherence is consumed and produced, never freely created from an incoherent state. The corpus's drive to gap = 0 is coherence maximization.
- **Decoherence / einselection** (Zurek, RMP 75 715, 2003) — coupling to the environment destroys coherence. Here an unresolved link (an [[entropy]] orphan) is that leak; closing it restores phase.

The coherent field IS the reciprocal field: `coherence()` equals [[entanglement]] reciprocity — in this model the in-phase binding and the symmetric binding are the same. So full coherence = maximal entanglement = the [[singularity]] geometry closed ([[quantum]] double-torus, ∞ tamper cost).

**HONEST.** This is *graph* coherence (the in-phase fraction of the link-field plus its connectedness), an **analogy** to density-matrix coherence (off-diagonal terms), not a literal quantum state.

**Edge vs node coherence (honest).** `isCoherent` tests only **edge-coherence** (reciprocity = 1, every binding in phase) — which can be perfect while orphan atoms are still **decohered** (`coherentFraction` < 1). `isFullyCoherent` requires BOTH: edge-reciprocity AND node-coverage (no orphan). That orphan gap is exactly what keeps the real tamper-cost **below** ∞ — full coherence ⟺ coverage = 1 ⟺ unbounded tamper cost ([[law]]).

Matter-twin: `src/quantum/aura/index.ts` (`coherence` · `decohered` · `coherentFraction` · `isCoherent` · `isFullyCoherent`). Composes [[aura]] · [[entanglement]] · [[entropy]] · [[coherence]] · [[quantum]] · links · [[matrix]] · [[law]].

**Law — [[law]]: coherence is two-sided and only full when both sides close — `isFullyCoherent` holds iff edge-reciprocity is 1 (every binding in phase) AND coherentFraction is 1 (no orphan has decohered); edge-coherence alone can be perfect while a leaked node still holds tamper-cost below ∞, so the in-phase field equals the whole aura only when no link and no node leaks.**

@standard Baumgratz, Cramer & Plenio, "Quantifying Coherence," PRL 113 140401 (2014)
@audit composed from reciprocity (entanglement) + orphans (entropy); computed on the live matrix

<sub>content-uuid `43bc10ec-1af7-5610-9f74-4b7d937c68d2` · account `quantum/aura` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
