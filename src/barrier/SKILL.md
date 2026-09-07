---
name: barrier
description: "Use when reasoning about quantum tunnelling — a particle penetrating a potential barrier it classically cannot surmount (E < V0), the wave decaying exponentially inside so transmission T ≈ e^(−2κa) leaks out. (The word tunnel is taken — it is agriculture's season-extension structure; this is the physics.) In erpax the barrier IS tamper-cost: the work to tunnel through (forge) is −log2(T) = 2κa/ln2 bits, exponentially large in the barrier, yet never quite infinite — the residual forge-probability is the design limit."
atomPath: barrier
coordinate: "barrier · 2/share · ff7fc27f"
contentUuid: "249a802b-e622-55b8-a776-6ab2662118c6"
diamondUuid: "f5c4fbe3-3b01-8cc0-9eef-e42b25069a3b"
uuid: "ff7fc27f-4491-8f23-9119-ec540592c777"
horo: 2
typography:
  partition: barrier
  bondDegree: 30
standards:
  - "CODATA-2018 ħ (via ../photon); WKB + exact rectangular-barrier transmission"
bindings: []
signatures:
  computationUuid: "d1447330-9221-86f7-945c-5161c3ff00f6"
  stages:
    - stage: path
      stageUuid: "1cd2be0d-8cb8-8f6a-935b-9ce1af6d79ad"
    - stage: trinity
      stageUuid: "5fb48cb7-5124-8327-804a-eb22cfdd05bb"
    - stage: boundary
      stageUuid: "d1dc1fd5-d0e9-80bc-b444-486b4cedbdad"
    - stage: links
      stageUuid: "68fc3bc3-95c7-88f6-bcdb-b71c850769f2"
    - stage: horo
      stageUuid: "9827a5e3-bc75-8e06-9367-99175882f0d1"
    - stage: seal
      stageUuid: "4a46691a-94f5-8123-bf88-4c2583818067"
    - stage: uuid
      stageUuid: "95d9f859-2145-882b-8c7c-b1bec9af9c92"
version: 2
---
# barrier — quantum tunnelling, the exponential of tamper-cost

A **barrier** is a potential wall of height V0 a particle of energy E < V0 **classically cannot cross**. Quantum-mechanically the [[wave]] does not stop at the wall — it decays exponentially inside it (evanescent), so a nonzero amplitude leaks out the far side. The transmission is **T ≈ e^(−2κa)** (WKB), with decay constant κ = √(2m(V0−E))/ħ ([[photon]]'s ħ) and width a — forbidden classically, merely *exponentially unlikely* quantum-mechanically. (The word `tunnel` is taken — it is agriculture's season-extension structure — so quantum **tunnelling** lives here as `barrier`, named for what it penetrates.)

In erpax the barrier **IS** tamper-[[cost]]: to forge is to tunnel through the forbidden region, and the work is **−log2(T) = 2κa/ln2 bits** — exponentially large in the barrier (height·width), the same forge≫verify asymmetry the [[anchor]] buys. Fast and compact, yet the residual forge-probability is never quite zero (a [[leap]]'s `[[limit]]`): tunnelling is precisely why **no barrier is absolute** — the honest ceiling on tamper-cost.

Matter-twin: `src/barrier/index.ts` (`decay` / `transmission` / `transmissionWKB` / `tamperCostBits`).

Composes [[photon]] · [[wave]] · [[leap]] · [[tamper]] · [[cost]] · [[anchor]] · [[limit]] · [[quantum]].

**Law — [[law]]: tunnelling makes no barrier absolute — transmission T ≈ e^(−2κa) is exponentially small but nonzero, so tamper-cost = −log2(T) = 2κa/ln2 bits is exponentially large yet finite; the barrier prices the forge≫verify asymmetry and the residual forge-probability is the irreducible limit.**
