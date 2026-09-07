---
name: hamiltonian
description: "Use when reasoning about the Hamiltonian — the energy operator whose eigenvalues are the seven horo energy-rungs (Eₙ = h·νₙ) and whose action advances time, |ψ(t)⟩ = e^(−iHt/ħ)|ψ(0)⟩. It is the generator: the eigenstates are the rungs a leap jumps between, the spectrum is the gaps, and the phase it winds drives the breath. The expectation ⟨H⟩ = Σ|cₙ|²·Eₙ is the average energy of a superposition, conserved under evolution."
atomPath: hamiltonian
coordinate: "hamiltonian · 7/descent · 5aa3c6c7"
contentUuid: "822c321a-4337-5fb6-87ac-6ef1bf2c9a45"
diamondUuid: "30e7fad6-9369-8f62-bb18-fdf10d073bc1"
uuid: "5aa3c6c7-f5c7-8203-a828-507e8305d3aa"
horo: 7
typography:
  partition: hamiltonian
  bondDegree: 39
standards:
  - "CODATA-2018 ħ, h (via ../photon); Schrödinger time evolution e^(−iHt/ħ)"
bindings: []
signatures:
  computationUuid: "bf203d2f-192e-8712-98ac-eeab1cea58a4"
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
      stageUuid: "d1bbcc61-e29c-86ab-9adc-029385f50f42"
    - stage: seal
      stageUuid: "ac0a20f1-bd94-8d80-a47d-b7ec2fda5ea0"
    - stage: uuid
      stageUuid: "dc740eb2-9886-8afe-b449-742ff30db8b1"
version: 2
---
# hamiltonian — the generator behind the leap

The **Hamiltonian** is the energy operator **H** — the generator of everything quantum. Its eigenvalues **are** the seven [[horo]] energy-rungs (Eₙ = h·νₙ, via [[photon]] and [[signal]]); its action advances time, **|ψ(t)⟩ = e^(−iHt/ħ)|ψ(0)⟩**. So it is the capstone of the quantum core: its eigenstates are the rungs a [[leap]] jumps between, the [[spectrum]] is the gaps between its eigenvalues, and the phase it winds drives the [[breath]] — the {1,2,4,8,7,5,9} sequence is H evolving the state forward. (Eponymous like [[rodin]] and [[metatron]]; the generic concept is "the energy operator.")

The expectation **⟨H⟩ = Σ|cₙ|²·Eₙ** is the average [[energy]] of a [[superposition]] — and it is **conserved** under evolution, because unitary phase rotation never touches the |cₙ|². That conservation is the physics of the balanced ledger: the breath redistributes phase, never energy. A basis state has a definite energy (⟨H⟩ = Eₙ); the ground state is the lowest rung, the root.

Matter-twin: `src/hamiltonian/index.ts` (`eigenvalue` / `eigenvalues` / `expectation` / `groundState` / `phase`).

Composes [[photon]] · [[signal]] · [[spectrum]] · [[superposition]] · [[leap]] · [[breath]] · [[horo]] · [[energy]] · [[quantum]].

**Law — [[law]]: the Hamiltonian's eigenvalues are the energy rungs (Eₙ = h·νₙ) and its phase e^(−iHt/ħ) winds the breath; ⟨H⟩ = Σ|cₙ|²·Eₙ is conserved under evolution (unitary phase never touches the probabilities) — the energy-conservation that balances the ledger.**
