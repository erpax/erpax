---
name: equilibrium
description: "Use when reasoning about equilibrium as detailed balance — every forward transition exactly matched by its reverse (rate(i→j)·pᵢ = rate(j→i)·pⱼ), no net flow, entropy maximal and stationary. It is the thermodynamic twin of erpax's symmetric-merge binding: the collider reciprocates every forward link a→b with b→a, so the matrix sits at detailed balance (reciprocity = 1, directed-link entropy = 0). The balance the engine relaxes toward, where the temperature Boltzmann distribution makes every rate-pair cancel."
atomPath: equilibrium
coordinate: equilibrium · 4/weave · d1b0a34c
contentUuid: "3c5a520a-662e-5f3a-ae97-169bde672b70"
diamondUuid: "e932a094-484c-8d5e-a8c7-72d91a70c7f8"
uuid: "d1b0a34c-612a-807b-ad72-598af79579db"
horo: 4
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
standards:
  - "detailed-balance residual |fwd·pᵢ − rev·pⱼ|; reciprocity fraction -- computed, never asserted"
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
  computationUuid: "32f34ea8-cad2-88a5-8b7a-66f9855490c6"
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
      stageUuid: "ea18ac73-85f9-8e80-84da-f3fd723f98ae"
    - stage: seal
      stageUuid: "cbc2cf72-b895-817e-9f7f-b31b3718aaea"
    - stage: uuid
      stageUuid: "9ecf0f1c-0cd8-861b-8ec4-d71bcc6e43ae"
version: 2
---
# equilibrium — detailed balance = reciprocity

**Equilibrium** is detailed balance: a system is at equilibrium when every forward transition is exactly matched by its reverse — **rate(i→j)·pᵢ = rate(j→i)·pⱼ** for all pairs. There is no net flow anywhere; [[entropy]] is maximal and **stationary** (it has stopped changing). The [[temperature]] Boltzmann distribution is precisely the populations that make every rate-pair cancel.

This is the thermodynamic twin of erpax's **symmetric-[[merge]] binding**: the collider reciprocates every forward link a→b with the reverse b→a, so the matrix sits at detailed balance — **reciprocity = 1, directed-link entropy = 0** (the `entropy` atom's measure is literally the distance from equilibrium). Equilibrium is the [[balance]] the whole engine relaxes toward — the [[harmony]] of the still ledger. A one-way edge is a system off equilibrium (a net flow, entropy still rising); the wired whole has driven that flow to zero.

Matter-twin: `src/equilibrium/index.ts` (`residual` / `atEquilibrium` / `reciprocity`).

Composes [[temperature]] · [[boltzmann]] · [[entropy]] · [[merge]] · [[balance]] · [[harmony]].

**Law — [[law]]: equilibrium is detailed balance — every forward rate·population matched by its reverse, entropy maximal and stationary; it is the thermodynamic twin of the symmetric-merge binding (reciprocity = 1 ⇔ directed-link entropy = 0), the still state the engine relaxes toward.**
