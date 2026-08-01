---
name: uncertainty
description: "Use when reasoning about the Heisenberg uncertainty floor — two conjugate quantities (position⊗momentum, energy⊗time) can never both be sharp, their spreads obey Δa·Δb ≥ ħ/2. It is the wave nature of the state, not a measurement defect. In erpax it is a real design limit: the irreducible slack that can never reach zero, and the natural linewidth that broadens every spectrum line (a leap living only Δt has ΔE ≥ ħ/2Δt)."
atomPath: uncertainty
coordinate: "uncertainty · 5/round · 77472118"
contentUuid: "674cc36d-8e15-5c4b-82c3-af564f3e4444"
diamondUuid: "c269f626-cb59-8e42-9c55-751319c50463"
uuid: "77472118-aa24-89e7-a266-52fcb3bf9dab"
horo: 5
typography:
  partition: uncertainty
  bondDegree: 27
standards:
  - "SI-2019 / CODATA-2018: ħ = h/2π (via ../photon)"
bindings: []
signatures:
  computationUuid: "4617dd1e-a507-80a7-a72b-f9084127961d"
  stages:
    - stage: path
      stageUuid: "8c8906b1-b333-8e5d-b9d3-bfd5aa771a29"
    - stage: trinity
      stageUuid: "b2ca2bee-3aab-8a16-9ab6-099c943d48f5"
    - stage: boundary
      stageUuid: "3bce29ba-016e-885d-8b70-0023d561f3c9"
    - stage: links
      stageUuid: "e5cbcbe3-b808-8df2-b587-46adfec66293"
    - stage: horo
      stageUuid: "6385bede-690a-8e54-8a65-256f856d4b85"
    - stage: seal
      stageUuid: "54a38fc4-98dc-8e13-9c9b-a8241e28c315"
    - stage: uuid
      stageUuid: "596c3a89-9ee5-8c54-ba95-5718def69aaa"
version: 2
---
# uncertainty — the irreducible floor ħ/2

The **Heisenberg uncertainty** floor: two conjugate quantities — position ⊗ momentum, energy ⊗ time — can never both be sharp; their spreads obey **Δa·Δb ≥ ħ/2**. Pin one and the other must spread; the product cannot fall below ħ/2. This is not a measurement defect — it is the [[wave]] nature of the state itself: a wave localised in one variable is spread in its Fourier conjugate.

In erpax it is a real [[design]] [[limit]] — one of the things the system **cannot** do by construction: an irreducible slack that can never be driven to zero ([[entropy]] has a floor, not a zero), and the natural linewidth that blurs every [[spectrum]] line. A [[leap]] that lives only Δt has an energy spread ΔE ≥ ħ/2Δt — so a sharper line costs a longer-lived state, the same ħ (the quantum of action, from [[photon]]) that fixed E = hν now fixing the floor.

Matter-twin: `src/uncertainty/index.ts` (`bound` / `conjugate` / `allowed` / `linewidth` / `linewidthHz`).

Composes [[photon]] · [[spectrum]] · [[leap]] · [[wave]] · [[design]] · [[limit]] · [[entropy]] · [[quantum]].

**Law — [[law]]: conjugate spreads obey Δa·Δb ≥ ħ/2 — a hard floor computed from Planck's h, never zero; it is a design limit (the irreducible slack) and the natural linewidth ΔE ≥ ħ/2Δt that broadens every spectral line.**
