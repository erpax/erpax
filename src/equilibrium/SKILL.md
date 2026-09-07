---
name: equilibrium
description: "Use when reasoning about equilibrium as detailed balance — every forward transition exactly matched by its reverse (rate(i→j)·pᵢ = rate(j→i)·pⱼ), no net flow, entropy maximal and stationary. It is the thermodynamic twin of erpax's symmetric-merge binding: the collider reciprocates every forward link a→b with b→a, so the matrix sits at detailed balance (reciprocity = 1, directed-link entropy = 0). The balance the engine relaxes toward, where the temperature Boltzmann distribution makes every rate-pair cancel."
atomPath: equilibrium
coordinate: "equilibrium · 4/weave · 51dbb004"
contentUuid: "0ac879f1-8a7d-5d47-b63f-93ce8956f767"
diamondUuid: "c19f9a92-9d12-8f35-a8c3-6e07b4762469"
uuid: "51dbb004-8dbf-8b2c-b22d-383676779f12"
horo: 4
typography:
  partition: equilibrium
  bondDegree: 23
standards: []
bindings: []
signatures:
  computationUuid: "7f5c13e2-ee3f-82c8-8be1-7d4707142fdc"
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
      stageUuid: "a9b9a917-caec-82a1-b258-a6f08399f223"
    - stage: seal
      stageUuid: "79f8b31a-2d7b-8dff-a11a-d0768203d684"
    - stage: uuid
      stageUuid: "49110d1f-6018-83c7-941e-529aa928501c"
version: 2
---
# equilibrium — detailed balance = reciprocity

**Equilibrium** is detailed balance: a system is at equilibrium when every forward transition is exactly matched by its reverse — **rate(i→j)·pᵢ = rate(j→i)·pⱼ** for all pairs. There is no net flow anywhere; [[entropy]] is maximal and **stationary** (it has stopped changing). The [[temperature]] Boltzmann distribution is precisely the populations that make every rate-pair cancel.

This is the thermodynamic twin of erpax's **symmetric-[[merge]] binding**: the collider reciprocates every forward link a→b with the reverse b→a, so the matrix sits at detailed balance — **reciprocity = 1, directed-link entropy = 0** (the `entropy` atom's measure is literally the distance from equilibrium). Equilibrium is the [[balance]] the whole engine relaxes toward — the [[harmony]] of the still ledger. A one-way edge is a system off equilibrium (a net flow, entropy still rising); the wired whole has driven that flow to zero.

Matter-twin: `src/equilibrium/index.ts` (`residual` / `atEquilibrium` / `reciprocity`).

Composes [[temperature]] · [[boltzmann]] · [[entropy]] · [[merge]] · [[balance]] · [[harmony]].

**Law — [[law]]: equilibrium is detailed balance — every forward rate·population matched by its reverse, entropy maximal and stationary; it is the thermodynamic twin of the symmetric-merge binding (reciprocity = 1 ⇔ directed-link entropy = 0), the still state the engine relaxes toward.**
