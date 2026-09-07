---
name: equilibrium
description: "Use when reasoning about equilibrium as detailed balance — every forward transition exactly matched by its reverse (rate(i→j)·pᵢ = rate(j→i)·pⱼ), no net flow, entropy maximal and stationary. It is the thermodynamic twin of erpax's symmetric-merge binding: the collider reciprocates every forward link a→b with b→a, so the matrix sits at detailed balance (reciprocity = 1, directed-link entropy = 0). The balance the engine relaxes toward, where the temperature Boltzmann distribution makes every rate-pair cancel."
atomPath: equilibrium
coordinate: "equilibrium · 1/base · f3731601"
contentUuid: "1d62b599-9d15-52d5-8511-7843eba8b392"
diamondUuid: "488e9ccc-c1ae-89ce-9e63-efcf639f41d8"
uuid: "f3731601-a6ea-88cd-b8b0-cd9cf43c4075"
horo: 1
typography:
  partition: equilibrium
  bondDegree: 23
standards: []
bindings: []
signatures:
  computationUuid: "ecd264ac-ca44-8a59-b0f0-a841f1b25e4e"
  stages:
    - stage: path
      stageUuid: "250729d5-051e-82fb-bcc6-2ba800d9c676"
    - stage: trinity
      stageUuid: "6ed3f4b8-d663-8185-9a2e-01bf50881bd1"
    - stage: boundary
      stageUuid: "f0538515-c475-8f0a-852e-7d906b705986"
    - stage: links
      stageUuid: "a15ff6cf-f37a-825f-8c55-57e9b5ace912"
    - stage: horo
      stageUuid: "f8dae27a-65e6-8991-80a1-953fe7edd463"
    - stage: seal
      stageUuid: "79f8b31a-2d7b-8dff-a11a-d0768203d684"
    - stage: uuid
      stageUuid: "ad216cb3-c0ab-8b0d-b0ae-e697feec77cb"
version: 2
---
# equilibrium — detailed balance = reciprocity

**Equilibrium** is detailed balance: a system is at equilibrium when every forward transition is exactly matched by its reverse — **rate(i→j)·pᵢ = rate(j→i)·pⱼ** for all pairs. There is no net flow anywhere; [[entropy]] is maximal and **stationary** (it has stopped changing). The [[temperature]] Boltzmann distribution is precisely the populations that make every rate-pair cancel.

This is the thermodynamic twin of erpax's **symmetric-[[merge]] binding**: the collider reciprocates every forward link a→b with the reverse b→a, so the matrix sits at detailed balance — **reciprocity = 1, directed-link entropy = 0** (the `entropy` atom's measure is literally the distance from equilibrium). Equilibrium is the [[balance]] the whole engine relaxes toward — the [[harmony]] of the still ledger. A one-way edge is a system off equilibrium (a net flow, entropy still rising); the wired whole has driven that flow to zero.

Matter-twin: `src/equilibrium/index.ts` (`residual` / `atEquilibrium` / `reciprocity`).

Composes [[temperature]] · [[boltzmann]] · [[entropy]] · [[merge]] · [[balance]] · [[harmony]].

**Law — [[law]]: equilibrium is detailed balance — every forward rate·population matched by its reverse, entropy maximal and stationary; it is the thermodynamic twin of the symmetric-merge binding (reciprocity = 1 ⇔ directed-link entropy = 0), the still state the engine relaxes toward.**
