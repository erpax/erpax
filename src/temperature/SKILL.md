---
name: temperature
description: "Use when reasoning about temperature as the exchange rate between energy and order (1/T = ∂S/∂E). It sets level populations via the Boltzmann factor e^(−E/kT), normalised by the partition function Z = Σ e^(−Eₙ/kT). Cold (T→0) falls to the ground state; hot (T→∞) makes every level equally likely (maximum entropy). The equilibrium distribution pᵢ = e^(−Eᵢ/kT)/Z is the max-entropy distribution at fixed average energy — the balance the ledger settles to."
atomPath: temperature
coordinate: "temperature · 8/crest · f9bddbdb"
contentUuid: "ad889236-a768-5376-9b77-23708519f1ae"
diamondUuid: "34bd9690-032a-826e-a0b6-16224c33d113"
uuid: "f9bddbdb-53f5-8b19-b97e-99c79bea2e2d"
horo: 8
typography:
  partition: temperature
  bondDegree: 26
standards:
  - "SI-2019 k_B (via ../boltzmann); Maxwell–Boltzmann statistics"
bindings: []
signatures:
  computationUuid: "2f2fbf5f-cbd6-84d6-8923-2689caf31549"
  stages:
    - stage: path
      stageUuid: "5f871843-d3bf-80e5-a93a-068bcf7ca06b"
    - stage: trinity
      stageUuid: "dbb7a191-626a-8017-a7ae-c2e1e66811e4"
    - stage: boundary
      stageUuid: "14efdaed-c020-836e-98fb-0be50d0c1fb8"
    - stage: links
      stageUuid: "b5b576c7-b74f-8932-80a1-971ec966b41f"
    - stage: horo
      stageUuid: "2b9b29de-f8f7-877e-96fd-d31578c11754"
    - stage: seal
      stageUuid: "349e4425-7ab7-816b-b229-006a342c0268"
    - stage: uuid
      stageUuid: "f34efd0c-9799-8b05-abfe-6b072f5d6727"
version: 2
---
# temperature — the dial between order and disorder

**Temperature** is the exchange rate between energy and order: **1/T = ∂S/∂E**. It sets how a system populates its energy levels through the Boltzmann factor **e^(−E/kT)** ([[boltzmann]]'s k), normalised by the partition function **Z = Σ e^(−Eₙ/kT)**. Cold (T→0): the system falls to its ground state ([[hamiltonian]]'s lowest rung). Hot (T→∞): every level is equally likely — maximum [[entropy]].

The equilibrium distribution **pᵢ = e^(−Eᵢ/kT)/Z** is the **maximum-entropy** distribution at a fixed average [[energy]] — the [[balance]] the ledger settles to. The occupancy ratio pᵢ/pⱼ = e^(−(Eᵢ−Eⱼ)/kT) is exactly the detailed-balance ratio of [[equilibrium]], so temperature is the single dial between frozen order (one configuration, low entropy) and hot disorder (uniform, max entropy) — the [[gravity]] of the energy landscape set against the spreading of [[boltzmann]] counting.

Matter-twin: `src/temperature/index.ts` (`factor` / `partition` / `distribution` / `ratio`).

Composes [[boltzmann]] · [[equilibrium]] · [[hamiltonian]] · [[entropy]] · [[energy]] · [[balance]] · [[gravity]].

**Law — [[law]]: temperature is the energy↔order exchange rate (1/T = ∂S/∂E); it populates levels by e^(−E/kT)/Z — the max-entropy distribution at fixed average energy — collapsing to the ground state as T→0 and spreading uniform as T→∞.**
