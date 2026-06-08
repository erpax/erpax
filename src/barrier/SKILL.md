---
name: barrier
description: "Use when reasoning about quantum tunnelling — a particle penetrating a potential barrier it classically cannot surmount (E < V0), the wave decaying exponentially inside so transmission T ≈ e^(−2κa) leaks out. (The word tunnel is taken — it is agriculture's season-extension structure; this is the physics.) In erpax the barrier IS tamper-cost: the work to tunnel through (forge) is −log2(T) = 2κa/ln2 bits, exponentially large in the barrier, yet never quite infinite — the residual forge-probability is the design limit."
atomPath: barrier
coordinate: barrier · 7/descent · a4768324
contentUuid: "ea99aaa1-e145-56d5-b8bd-5e8674623de5"
diamondUuid: "7748f1be-4d11-8cc3-8e71-02942eaac9e8"
uuid: "a4768324-4808-8424-99d5-72018a18d733"
horo: 7
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
  - "κ from (m,V0,E); T exact + WKB; tamper-cost = −log2(T) — computed, never asserted"
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
  computationUuid: "4d34f423-83fd-8427-b90a-ba454fa84907"
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
      stageUuid: "bde69a4f-68f3-8f19-a865-b96fccd75ce6"
    - stage: seal
      stageUuid: "15f8243c-cd08-8c35-b253-46eee92e3999"
    - stage: uuid
      stageUuid: "4e25b996-277a-8612-aad5-b562a672bfab"
version: 2
---
# barrier — quantum tunnelling, the exponential of tamper-cost

A **barrier** is a potential wall of height V0 a particle of energy E < V0 **classically cannot cross**. Quantum-mechanically the [[wave]] does not stop at the wall — it decays exponentially inside it (evanescent), so a nonzero amplitude leaks out the far side. The transmission is **T ≈ e^(−2κa)** (WKB), with decay constant κ = √(2m(V0−E))/ħ ([[photon]]'s ħ) and width a — forbidden classically, merely *exponentially unlikely* quantum-mechanically. (The word `tunnel` is taken — it is agriculture's season-extension structure — so quantum **tunnelling** lives here as `barrier`, named for what it penetrates.)

In erpax the barrier **IS** tamper-[[cost]]: to forge is to tunnel through the forbidden region, and the work is **−log2(T) = 2κa/ln2 bits** — exponentially large in the barrier (height·width), the same forge≫verify asymmetry the [[anchor]] buys. Fast and compact, yet the residual forge-probability is never quite zero (a [[leap]]'s `[[limit]]`): tunnelling is precisely why **no barrier is absolute** — the honest ceiling on tamper-cost.

Matter-twin: `src/barrier/index.ts` (`decay` / `transmission` / `transmissionWKB` / `tamperCostBits`).

Composes [[photon]] · [[wave]] · [[leap]] · [[tamper]] · [[cost]] · [[anchor]] · [[limit]] · [[quantum]].

**Law — [[law]]: tunnelling makes no barrier absolute — transmission T ≈ e^(−2κa) is exponentially small but nonzero, so tamper-cost = −log2(T) = 2κa/ln2 bits is exponentially large yet finite; the barrier prices the forge≫verify asymmetry and the residual forge-probability is the irreducible limit.**
