---
name: temperature
description: "Use when reasoning about temperature as the exchange rate between energy and order (1/T = ∂S/∂E). It sets level populations via the Boltzmann factor e^(−E/kT), normalised by the partition function Z = Σ e^(−Eₙ/kT). Cold (T→0) falls to the ground state; hot (T→∞) makes every level equally likely (maximum entropy). The equilibrium distribution pᵢ = e^(−Eᵢ/kT)/Z is the max-entropy distribution at fixed average energy — the balance the ledger settles to."
atomPath: temperature
coordinate: temperature · 4/weave · 382e6683
contentUuid: "a976cfa6-a4aa-5fb7-80af-1f48ddba02ec"
diamondUuid: "8cfd214d-3d0f-8148-957c-57d92919a937"
uuid: "382e6683-1228-8197-be8c-0b318c1498f1"
horo: 4
bonds:
  in:
    - balance
    - boltzmann
    - energy
    - entropy
    - equilibrium
    - gravity
    - hamiltonian
    - law
  out:
    - balance
    - boltzmann
    - energy
    - entropy
    - equilibrium
    - gravity
    - hamiltonian
    - law
typography:
  partition: temperature
  bondDegree: 26
  neighbors: []
standards:
  - "Boltzmann factor e^(−E/kT), partition Z=Σe^(−Eₙ/kT), distribution pᵢ -- computed"
  - "SI-2019 k_B (via ../boltzmann); Maxwell–Boltzmann statistics"
bindings: []
neighbors:
  wikilink:
    - balance
    - boltzmann
    - energy
    - entropy
    - equilibrium
    - gravity
    - hamiltonian
    - law
  matrix:
    - balance
    - boltzmann
    - energy
    - entropy
    - equilibrium
    - gravity
    - hamiltonian
    - law
  backlinks:
    - balance
    - boltzmann
    - energy
    - entropy
    - equilibrium
    - gravity
    - hamiltonian
    - law
signatures:
  computationUuid: "54a66591-b1ce-8a31-abb1-4653ab518ad5"
  stages:
    - stage: path
      stageUuid: "5f871843-d3bf-80e5-a93a-068bcf7ca06b"
    - stage: trinity
      stageUuid: "dbb7a191-626a-8017-a7ae-c2e1e66811e4"
    - stage: boundary
      stageUuid: "11740df9-c066-8b27-8650-8804d61d783a"
    - stage: links
      stageUuid: "b5b576c7-b74f-8932-80a1-971ec966b41f"
    - stage: horo
      stageUuid: "d6e44dcf-b1dc-81ca-94b4-aa0c6598daed"
    - stage: seal
      stageUuid: "352cec17-73ff-8a41-b623-605e9d16a34e"
    - stage: uuid
      stageUuid: "8446bacd-3298-89c3-824f-d11b53869dcb"
version: 2
---
# temperature — the dial between order and disorder

**Temperature** is the exchange rate between energy and order: **1/T = ∂S/∂E**. It sets how a system populates its energy levels through the Boltzmann factor **e^(−E/kT)** ([[boltzmann]]'s k), normalised by the partition function **Z = Σ e^(−Eₙ/kT)**. Cold (T→0): the system falls to its ground state ([[hamiltonian]]'s lowest rung). Hot (T→∞): every level is equally likely — maximum [[entropy]].

The equilibrium distribution **pᵢ = e^(−Eᵢ/kT)/Z** is the **maximum-entropy** distribution at a fixed average [[energy]] — the [[balance]] the ledger settles to. The occupancy ratio pᵢ/pⱼ = e^(−(Eᵢ−Eⱼ)/kT) is exactly the detailed-balance ratio of [[equilibrium]], so temperature is the single dial between frozen order (one configuration, low entropy) and hot disorder (uniform, max entropy) — the [[gravity]] of the energy landscape set against the spreading of [[boltzmann]] counting.

Matter-twin: `src/temperature/index.ts` (`factor` / `partition` / `distribution` / `ratio`).

Composes [[boltzmann]] · [[equilibrium]] · [[hamiltonian]] · [[entropy]] · [[energy]] · [[balance]] · [[gravity]].

**Law — [[law]]: temperature is the energy↔order exchange rate (1/T = ∂S/∂E); it populates levels by e^(−E/kT)/Z — the max-entropy distribution at fixed average energy — collapsing to the ground state as T→0 and spreading uniform as T→∞.**
