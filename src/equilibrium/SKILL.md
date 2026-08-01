---
name: equilibrium
description: "Use when reasoning about equilibrium as detailed balance — every forward transition exactly matched by its reverse (rate(i→j)·pᵢ = rate(j→i)·pⱼ), no net flow, entropy maximal and stationary. It is the thermodynamic twin of erpax's symmetric-merge binding: the collider reciprocates every forward link a→b with b→a, so the matrix sits at detailed balance (reciprocity = 1, directed-link entropy = 0). The balance the engine relaxes toward, where the temperature Boltzmann distribution makes every rate-pair cancel."
atomPath: equilibrium
coordinate: "equilibrium · 8/crest · 0a3c17db"
contentUuid: "64039dc8-daa2-53d9-a778-d840244ce431"
diamondUuid: "2c00d503-7eea-89e0-81ee-9f7833be941e"
uuid: "0a3c17db-416f-8502-ae86-51e835c88664"
horo: 8
typography:
  partition: equilibrium
  bondDegree: 23
standards: []
bindings: []
signatures:
  computationUuid: "550356c9-f7db-854e-9b74-d40be718d38f"
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
      stageUuid: "fa392f73-2e6e-8dff-8777-b3fa11a6638e"
    - stage: seal
      stageUuid: "79f8b31a-2d7b-8dff-a11a-d0768203d684"
    - stage: uuid
      stageUuid: "d2e4814d-eb4e-8139-9fff-544c154355e0"
version: 2
---
# equilibrium — detailed balance = reciprocity

**Equilibrium** is detailed balance: a system is at equilibrium when every forward transition is exactly matched by its reverse — **rate(i→j)·pᵢ = rate(j→i)·pⱼ** for all pairs. There is no net flow anywhere; [[entropy]] is maximal and **stationary** (it has stopped changing). The [[temperature]] Boltzmann distribution is precisely the populations that make every rate-pair cancel.

This is the thermodynamic twin of erpax's **symmetric-[[merge]] binding**: the collider reciprocates every forward link a→b with the reverse b→a, so the matrix sits at detailed balance — **reciprocity = 1, directed-link entropy = 0** (the `entropy` atom's measure is literally the distance from equilibrium). Equilibrium is the [[balance]] the whole engine relaxes toward — the [[harmony]] of the still ledger. A one-way edge is a system off equilibrium (a net flow, entropy still rising); the wired whole has driven that flow to zero.

Matter-twin: `src/equilibrium/index.ts` (`residual` / `atEquilibrium` / `reciprocity`).

Composes [[temperature]] · [[boltzmann]] · [[entropy]] · [[merge]] · [[balance]] · [[harmony]].

**Law — [[law]]: equilibrium is detailed balance — every forward rate·population matched by its reverse, entropy maximal and stationary; it is the thermodynamic twin of the symmetric-merge binding (reciprocity = 1 ⇔ directed-link entropy = 0), the still state the engine relaxes toward.**
