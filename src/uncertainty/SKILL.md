---
name: uncertainty
description: "Use when reasoning about the Heisenberg uncertainty floor — two conjugate quantities (position⊗momentum, energy⊗time) can never both be sharp, their spreads obey Δa·Δb ≥ ħ/2. It is the wave nature of the state, not a measurement defect. In erpax it is a real design limit: the irreducible slack that can never reach zero, and the natural linewidth that broadens every spectrum line (a leap living only Δt has ΔE ≥ ħ/2Δt)."
atomPath: uncertainty
coordinate: uncertainty · 2/share · bc2b7303
contentUuid: "39bd9f9b-41bb-53fd-a70f-21a0f2bebaa7"
diamondUuid: "ac79e6f8-f02f-857c-b411-48b8cd489f41"
uuid: "bc2b7303-2edf-8478-a6a9-d512a128ff0b"
horo: 2
bonds:
  in:
    - design
    - entropy
    - law
    - leap
    - limit
    - photon
    - quantum
    - spectrum
    - wave
  out:
    - design
    - entropy
    - law
    - leap
    - limit
    - photon
    - quantum
    - spectrum
    - wave
typography:
  partition: uncertainty
  bondDegree: 27
  neighbors: []
standards:
  - "SI-2019 / CODATA-2018: ħ = h/2π (via ../photon)"
  - "the bound ħ/2 is computed from Planck's h; the linewidth is the energy–time relation"
bindings: []
neighbors:
  wikilink:
    - design
    - entropy
    - law
    - leap
    - limit
    - photon
    - quantum
    - spectrum
    - wave
  matrix:
    - design
    - entropy
    - law
    - leap
    - limit
    - photon
    - quantum
    - spectrum
    - wave
  backlinks:
    - design
    - entropy
    - law
    - leap
    - limit
    - photon
    - quantum
    - spectrum
    - wave
signatures:
  computationUuid: "8452d6cc-0772-8cd2-aa79-f01929a4b848"
  stages:
    - stage: path
      stageUuid: "8c8906b1-b333-8e5d-b9d3-bfd5aa771a29"
    - stage: trinity
      stageUuid: "b2ca2bee-3aab-8a16-9ab6-099c943d48f5"
    - stage: boundary
      stageUuid: "a174f716-53fd-891b-8efc-416c2fe208be"
    - stage: links
      stageUuid: "e5cbcbe3-b808-8df2-b587-46adfec66293"
    - stage: horo
      stageUuid: "022d083d-0a5b-800a-9e6d-c85a3a8ab9b9"
    - stage: seal
      stageUuid: "ef05133c-2cfe-8ea3-bec5-6b8f074a37b1"
    - stage: uuid
      stageUuid: "9872bff4-b333-8f30-b1fb-6e9ba76e2ac1"
version: 2
---
# uncertainty — the irreducible floor ħ/2

The **Heisenberg uncertainty** floor: two conjugate quantities — position ⊗ momentum, energy ⊗ time — can never both be sharp; their spreads obey **Δa·Δb ≥ ħ/2**. Pin one and the other must spread; the product cannot fall below ħ/2. This is not a measurement defect — it is the [[wave]] nature of the state itself: a wave localised in one variable is spread in its Fourier conjugate.

In erpax it is a real [[design]] [[limit]] — one of the things the system **cannot** do by construction: an irreducible slack that can never be driven to zero ([[entropy]] has a floor, not a zero), and the natural linewidth that blurs every [[spectrum]] line. A [[leap]] that lives only Δt has an energy spread ΔE ≥ ħ/2Δt — so a sharper line costs a longer-lived state, the same ħ (the quantum of action, from [[photon]]) that fixed E = hν now fixing the floor.

Matter-twin: `src/uncertainty/index.ts` (`bound` / `conjugate` / `allowed` / `linewidth` / `linewidthHz`).

Composes [[photon]] · [[spectrum]] · [[leap]] · [[wave]] · [[design]] · [[limit]] · [[entropy]] · [[quantum]].

**Law — [[law]]: conjugate spreads obey Δa·Δb ≥ ħ/2 — a hard floor computed from Planck's h, never zero; it is a design limit (the irreducible slack) and the natural linewidth ΔE ≥ ħ/2Δt that broadens every spectral line.**
