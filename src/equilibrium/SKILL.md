---
name: equilibrium
description: "Use when reasoning about equilibrium as detailed balance — every forward transition exactly matched by its reverse (rate(i→j)·pᵢ = rate(j→i)·pⱼ), no net flow, entropy maximal and stationary. It is the thermodynamic twin of erpax's symmetric-merge binding: the collider reciprocates every forward link a→b with b→a, so the matrix sits at detailed balance (reciprocity = 1, directed-link entropy = 0). The balance the engine relaxes toward, where the temperature Boltzmann distribution makes every rate-pair cancel."
atomPath: equilibrium
coordinate: "equilibrium · 2/share · 57b78b4c"
contentUuid: "e324cb47-79f6-5ca5-85f1-ad746651b6e8"
diamondUuid: "786abca4-4273-819d-b0cd-ea04a2526c84"
uuid: "57b78b4c-afad-8886-93bd-5a2d26dba626"
horo: 2
bonds:
  in:
    - balance
    - boltzmann
    - entropy
    - harmony
    - law
    - merge
    - temperature
  out:
    - balance
    - boltzmann
    - entropy
    - harmony
    - law
    - merge
    - temperature
typography:
  partition: equilibrium
  bondDegree: 23
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - balance
    - boltzmann
    - entropy
    - harmony
    - law
    - merge
    - temperature
  matrix:
    - balance
    - boltzmann
    - entropy
    - harmony
    - law
    - merge
    - temperature
  backlinks:
    - balance
    - boltzmann
    - entropy
    - harmony
    - law
    - merge
    - temperature
signatures:
  computationUuid: "78cca054-4cb4-841f-b4d0-d523dc0d0f0f"
  stages:
    - stage: path
      stageUuid: "250729d5-051e-82fb-bcc6-2ba800d9c676"
    - stage: trinity
      stageUuid: "6ed3f4b8-d663-8185-9a2e-01bf50881bd1"
    - stage: boundary
      stageUuid: "8f6827f8-4e73-8ca6-bf11-4b086079317c"
    - stage: links
      stageUuid: "a15ff6cf-f37a-825f-8c55-57e9b5ace912"
    - stage: horo
      stageUuid: "ee52eeb4-143a-876a-a226-e3a861117209"
    - stage: seal
      stageUuid: "79f8b31a-2d7b-8dff-a11a-d0768203d684"
    - stage: uuid
      stageUuid: "380b2239-7175-83db-8be1-47c4f99a04c8"
version: 2
---
# equilibrium — detailed balance = reciprocity

**Equilibrium** is detailed balance: a system is at equilibrium when every forward transition is exactly matched by its reverse — **rate(i→j)·pᵢ = rate(j→i)·pⱼ** for all pairs. There is no net flow anywhere; [[entropy]] is maximal and **stationary** (it has stopped changing). The [[temperature]] Boltzmann distribution is precisely the populations that make every rate-pair cancel.

This is the thermodynamic twin of erpax's **symmetric-[[merge]] binding**: the collider reciprocates every forward link a→b with the reverse b→a, so the matrix sits at detailed balance — **reciprocity = 1, directed-link entropy = 0** (the `entropy` atom's measure is literally the distance from equilibrium). Equilibrium is the [[balance]] the whole engine relaxes toward — the [[harmony]] of the still ledger. A one-way edge is a system off equilibrium (a net flow, entropy still rising); the wired whole has driven that flow to zero.

Matter-twin: `src/equilibrium/index.ts` (`residual` / `atEquilibrium` / `reciprocity`).

Composes [[temperature]] · [[boltzmann]] · [[entropy]] · [[merge]] · [[balance]] · [[harmony]].

**Law — [[law]]: equilibrium is detailed balance — every forward rate·population matched by its reverse, entropy maximal and stationary; it is the thermodynamic twin of the symmetric-merge binding (reciprocity = 1 ⇔ directed-link entropy = 0), the still state the engine relaxes toward.**
