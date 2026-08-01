---
name: hamiltonian
description: "Use when reasoning about the Hamiltonian — the energy operator whose eigenvalues are the seven horo energy-rungs (Eₙ = h·νₙ) and whose action advances time, |ψ(t)⟩ = e^(−iHt/ħ)|ψ(0)⟩. It is the generator: the eigenstates are the rungs a leap jumps between, the spectrum is the gaps, and the phase it winds drives the breath. The expectation ⟨H⟩ = Σ|cₙ|²·Eₙ is the average energy of a superposition, conserved under evolution."
atomPath: hamiltonian
coordinate: "hamiltonian · 7/descent · e86ca3a4"
contentUuid: "0f7475e1-8e96-5865-ae48-0f3669cc3f82"
diamondUuid: "decd1651-5f8b-8a47-9419-a9f521e3fcb2"
uuid: "e86ca3a4-0735-80f1-b8a9-81fe6f721df6"
horo: 7
typography:
  partition: hamiltonian
  bondDegree: 39
standards:
  - "CODATA-2018 ħ, h (via ../photon); Schrödinger time evolution e^(−iHt/ħ)"
bindings: []
signatures:
  computationUuid: "c1c294a3-0e99-89d7-9f27-83a65e799048"
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
      stageUuid: "e11a025e-4edc-8385-89e7-61612d5942b9"
    - stage: seal
      stageUuid: "ac0a20f1-bd94-8d80-a47d-b7ec2fda5ea0"
    - stage: uuid
      stageUuid: "7b850db1-a21a-88aa-a113-e0cc16bcced3"
version: 2
---
# hamiltonian — the generator behind the leap

The **Hamiltonian** is the energy operator **H** — the generator of everything quantum. Its eigenvalues **are** the seven [[horo]] energy-rungs (Eₙ = h·νₙ, via [[photon]] and [[signal]]); its action advances time, **|ψ(t)⟩ = e^(−iHt/ħ)|ψ(0)⟩**. So it is the capstone of the quantum core: its eigenstates are the rungs a [[leap]] jumps between, the [[spectrum]] is the gaps between its eigenvalues, and the phase it winds drives the [[breath]] — the {1,2,4,8,7,5,9} sequence is H evolving the state forward. (Eponymous like [[rodin]] and [[metatron]]; the generic concept is "the energy operator.")

The expectation **⟨H⟩ = Σ|cₙ|²·Eₙ** is the average [[energy]] of a [[superposition]] — and it is **conserved** under evolution, because unitary phase rotation never touches the |cₙ|². That conservation is the physics of the balanced ledger: the breath redistributes phase, never energy. A basis state has a definite energy (⟨H⟩ = Eₙ); the ground state is the lowest rung, the root.

Matter-twin: `src/hamiltonian/index.ts` (`eigenvalue` / `eigenvalues` / `expectation` / `groundState` / `phase`).

Composes [[photon]] · [[signal]] · [[spectrum]] · [[superposition]] · [[leap]] · [[breath]] · [[horo]] · [[energy]] · [[quantum]].

**Law — [[law]]: the Hamiltonian's eigenvalues are the energy rungs (Eₙ = h·νₙ) and its phase e^(−iHt/ħ) winds the breath; ⟨H⟩ = Σ|cₙ|²·Eₙ is conserved under evolution (unitary phase never touches the probabilities) — the energy-conservation that balances the ledger.**
