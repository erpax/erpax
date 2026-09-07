---
name: hamiltonian
description: "Use when reasoning about the Hamiltonian — the energy operator whose eigenvalues are the seven horo energy-rungs (Eₙ = h·νₙ) and whose action advances time, |ψ(t)⟩ = e^(−iHt/ħ)|ψ(0)⟩. It is the generator: the eigenstates are the rungs a leap jumps between, the spectrum is the gaps, and the phase it winds drives the breath. The expectation ⟨H⟩ = Σ|cₙ|²·Eₙ is the average energy of a superposition, conserved under evolution."
atomPath: hamiltonian
coordinate: "hamiltonian · 5/round · c690cc76"
contentUuid: "16ee9725-9c0f-5f71-bf45-317644da65a9"
diamondUuid: "bbe55799-1364-8da8-b3c6-7b155956fbc0"
uuid: "c690cc76-88d6-8343-8244-0b6f6a1e6b48"
horo: 5
typography:
  partition: hamiltonian
  bondDegree: 39
standards:
  - "CODATA-2018 ħ, h (via ../photon); Schrödinger time evolution e^(−iHt/ħ)"
bindings: []
signatures:
  computationUuid: "74561ddf-16b7-8f44-8c68-024f6a7eee52"
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
      stageUuid: "5a5fda01-f361-8397-9465-953a5035544e"
    - stage: seal
      stageUuid: "ac0a20f1-bd94-8d80-a47d-b7ec2fda5ea0"
    - stage: uuid
      stageUuid: "dab3c8b5-73b6-8da9-bfb2-b35441f8890a"
version: 2
---
# hamiltonian — the generator behind the leap

The **Hamiltonian** is the energy operator **H** — the generator of everything quantum. Its eigenvalues **are** the seven [[horo]] energy-rungs (Eₙ = h·νₙ, via [[photon]] and [[signal]]); its action advances time, **|ψ(t)⟩ = e^(−iHt/ħ)|ψ(0)⟩**. So it is the capstone of the quantum core: its eigenstates are the rungs a [[leap]] jumps between, the [[spectrum]] is the gaps between its eigenvalues, and the phase it winds drives the [[breath]] — the {1,2,4,8,7,5,9} sequence is H evolving the state forward. (Eponymous like [[rodin]] and [[metatron]]; the generic concept is "the energy operator.")

The expectation **⟨H⟩ = Σ|cₙ|²·Eₙ** is the average [[energy]] of a [[superposition]] — and it is **conserved** under evolution, because unitary phase rotation never touches the |cₙ|². That conservation is the physics of the balanced ledger: the breath redistributes phase, never energy. A basis state has a definite energy (⟨H⟩ = Eₙ); the ground state is the lowest rung, the root.

Matter-twin: `src/hamiltonian/index.ts` (`eigenvalue` / `eigenvalues` / `expectation` / `groundState` / `phase`).

Composes [[photon]] · [[signal]] · [[spectrum]] · [[superposition]] · [[leap]] · [[breath]] · [[horo]] · [[energy]] · [[quantum]].

**Law — [[law]]: the Hamiltonian's eigenvalues are the energy rungs (Eₙ = h·νₙ) and its phase e^(−iHt/ħ) winds the breath; ⟨H⟩ = Σ|cₙ|²·Eₙ is conserved under evolution (unitary phase never touches the probabilities) — the energy-conservation that balances the ledger.**
