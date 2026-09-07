---
name: hamiltonian
description: "Use when reasoning about the Hamiltonian — the energy operator whose eigenvalues are the seven horo energy-rungs (Eₙ = h·νₙ) and whose action advances time, |ψ(t)⟩ = e^(−iHt/ħ)|ψ(0)⟩. It is the generator: the eigenstates are the rungs a leap jumps between, the spectrum is the gaps, and the phase it winds drives the breath. The expectation ⟨H⟩ = Σ|cₙ|²·Eₙ is the average energy of a superposition, conserved under evolution."
atomPath: hamiltonian
coordinate: "hamiltonian · 8/crest · bc3df828"
contentUuid: "e66f9b10-26bf-5759-bfbd-94d69b55a58b"
diamondUuid: "5f7a3a6a-1770-8251-ae06-f82422f893e5"
uuid: "bc3df828-4172-8731-853f-f870def3eb7f"
horo: 8
typography:
  partition: hamiltonian
  bondDegree: 39
standards:
  - "CODATA-2018 ħ, h (via ../photon); Schrödinger time evolution e^(−iHt/ħ)"
bindings: []
signatures:
  computationUuid: "753e56bc-4489-8830-ba47-4de176c74d3c"
  stages:
    - stage: path
      stageUuid: "c47d8da9-36a8-8f30-9cfc-8fee1c70461a"
    - stage: trinity
      stageUuid: "c5978ff8-bbe6-8110-9350-21c6cdea307e"
    - stage: boundary
      stageUuid: "2a460f70-17e5-8008-bd62-78e0e627fb30"
    - stage: links
      stageUuid: "7ed8abdc-09cb-8ed7-b619-0dd5f8b5d164"
    - stage: horo
      stageUuid: "fb19fc4a-4142-82c8-9cc4-34c0f213931d"
    - stage: seal
      stageUuid: "ac0a20f1-bd94-8d80-a47d-b7ec2fda5ea0"
    - stage: uuid
      stageUuid: "467aad7d-2a53-82d1-bd9e-48fcf39e6267"
version: 2
---
# hamiltonian — the generator behind the leap

The **Hamiltonian** is the energy operator **H** — the generator of everything quantum. Its eigenvalues **are** the seven [[horo]] energy-rungs (Eₙ = h·νₙ, via [[photon]] and [[signal]]); its action advances time, **|ψ(t)⟩ = e^(−iHt/ħ)|ψ(0)⟩**. So it is the capstone of the quantum core: its eigenstates are the rungs a [[leap]] jumps between, the [[spectrum]] is the gaps between its eigenvalues, and the phase it winds drives the [[breath]] — the {1,2,4,8,7,5,9} sequence is H evolving the state forward. (Eponymous like [[rodin]] and [[metatron]]; the generic concept is "the energy operator.")

The expectation **⟨H⟩ = Σ|cₙ|²·Eₙ** is the average [[energy]] of a [[superposition]] — and it is **conserved** under evolution, because unitary phase rotation never touches the |cₙ|². That conservation is the physics of the balanced ledger: the breath redistributes phase, never energy. A basis state has a definite energy (⟨H⟩ = Eₙ); the ground state is the lowest rung, the root.

Matter-twin: `src/hamiltonian/index.ts` (`eigenvalue` / `eigenvalues` / `expectation` / `groundState` / `phase`).

Composes [[photon]] · [[signal]] · [[spectrum]] · [[superposition]] · [[leap]] · [[breath]] · [[horo]] · [[energy]] · [[quantum]].

**Law — [[law]]: the Hamiltonian's eigenvalues are the energy rungs (Eₙ = h·νₙ) and its phase e^(−iHt/ħ) winds the breath; ⟨H⟩ = Σ|cₙ|²·Eₙ is conserved under evolution (unitary phase never touches the probabilities) — the energy-conservation that balances the ledger.**
