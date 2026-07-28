---
name: barrier
description: "Use when reasoning about quantum tunnelling — a particle penetrating a potential barrier it classically cannot surmount (E < V0), the wave decaying exponentially inside so transmission T ≈ e^(−2κa) leaks out. (The word tunnel is taken — it is agriculture's season-extension structure; this is the physics.) In erpax the barrier IS tamper-cost: the work to tunnel through (forge) is −log2(T) = 2κa/ln2 bits, exponentially large in the barrier, yet never quite infinite — the residual forge-probability is the design limit."
atomPath: barrier
coordinate: "barrier · 5/round · c64bbaca"
contentUuid: "fb3f477e-a0a5-576d-9649-95f790b31073"
diamondUuid: "0a5235b5-6c8e-8542-aac7-e1f836ee58f6"
uuid: "c64bbaca-30a4-886c-8558-9a8e29fda3a4"
horo: 5
bonds:
  in:
    - anchor
    - cost
    - law
    - leap
    - limit
    - photon
    - quantum
    - surprisal
    - tamper
    - wave
  out:
    - anchor
    - cost
    - law
    - leap
    - limit
    - photon
    - quantum
    - surprisal
    - tamper
    - wave
typography:
  partition: barrier
  bondDegree: 30
  neighbors: []
standards:
  - "CODATA-2018 ħ (via ../photon); WKB + exact rectangular-barrier transmission"
  - "EU-2018/1673"
  - "EU-2018/1725"
  - "EU-2018/302"
  - "EU-2018/389-SCA-RTS"
  - "EU-2018/843"
  - "EU-2018/957"
bindings: []
neighbors:
  wikilink:
    - anchor
    - cost
    - law
    - leap
    - limit
    - photon
    - quantum
    - tamper
    - wave
  matrix:
    - anchor
    - cost
    - law
    - leap
    - limit
    - photon
    - quantum
    - surprisal
    - tamper
    - wave
  backlinks:
    - anchor
    - cost
    - law
    - leap
    - limit
    - photon
    - quantum
    - surprisal
    - tamper
    - wave
signatures:
  computationUuid: "fc24b897-3c02-8406-8b5a-32fe5e5ee880"
  stages:
    - stage: path
      stageUuid: "1cd2be0d-8cb8-8f6a-935b-9ce1af6d79ad"
    - stage: trinity
      stageUuid: "5fb48cb7-5124-8327-804a-eb22cfdd05bb"
    - stage: boundary
      stageUuid: "72c924fb-f099-87a3-b082-dd72316dafdd"
    - stage: links
      stageUuid: "68fc3bc3-95c7-88f6-bcdb-b71c850769f2"
    - stage: horo
      stageUuid: "89e342ab-af5d-8cd8-a740-b75fa5b07cb1"
    - stage: seal
      stageUuid: "4a46691a-94f5-8123-bf88-4c2583818067"
    - stage: uuid
      stageUuid: "a8258fd5-6fe7-8e16-8e0b-f6933f67b1f3"
version: 2
---
# barrier — quantum tunnelling, the exponential of tamper-cost

A **barrier** is a potential wall of height V0 a particle of energy E < V0 **classically cannot cross**. Quantum-mechanically the [[wave]] does not stop at the wall — it decays exponentially inside it (evanescent), so a nonzero amplitude leaks out the far side. The transmission is **T ≈ e^(−2κa)** (WKB), with decay constant κ = √(2m(V0−E))/ħ ([[photon]]'s ħ) and width a — forbidden classically, merely *exponentially unlikely* quantum-mechanically. (The word `tunnel` is taken — it is agriculture's season-extension structure — so quantum **tunnelling** lives here as `barrier`, named for what it penetrates.)

In erpax the barrier **IS** tamper-[[cost]]: to forge is to tunnel through the forbidden region, and the work is **−log2(T) = 2κa/ln2 bits** — exponentially large in the barrier (height·width), the same forge≫verify asymmetry the [[anchor]] buys. Fast and compact, yet the residual forge-probability is never quite zero (a [[leap]]'s `[[limit]]`): tunnelling is precisely why **no barrier is absolute** — the honest ceiling on tamper-cost.

Matter-twin: `src/barrier/index.ts` (`decay` / `transmission` / `transmissionWKB` / `tamperCostBits`).

Composes [[photon]] · [[wave]] · [[leap]] · [[tamper]] · [[cost]] · [[anchor]] · [[limit]] · [[quantum]].

**Law — [[law]]: tunnelling makes no barrier absolute — transmission T ≈ e^(−2κa) is exponentially small but nonzero, so tamper-cost = −log2(T) = 2κa/ln2 bits is exponentially large yet finite; the barrier prices the forge≫verify asymmetry and the residual forge-probability is the irreducible limit.**
