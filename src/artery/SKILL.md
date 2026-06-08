---
name: artery
description: "Use when reasoning about erpax's outbound vessel — the Windkessel organ. The artery carries value away from the heart, its elastic wall storing systolic volume and recoiling in diastole to smooth pulsatile output into steady peripheral flow: the cache/buffer in flesh. Three properties (Windkessel smoothing · elastic recoil · conserved mass balance) are computed and mapped — a structural isomorphism — onto erpax."
atomPath: artery
coordinate: artery · 7/descent · 5bb32f58
contentUuid: "7868a1c6-1a8d-57a1-a536-8cfe7d73e28c"
diamondUuid: "7a5989df-196e-80bf-b909-1321c1ea3be3"
uuid: "5bb32f58-1ceb-82ed-b4e7-388c5531e086"
horo: 7
bonds:
  in:
    - artery
    - body
    - cache
    - conservation
    - heart
    - law
    - vein
  out:
    - artery
    - body
    - cache
    - conservation
    - heart
    - law
    - vein
typography:
  partition: artery
  bondDegree: 26
  neighbors: []
standards:
  - "Frank's Windkessel model — aortic elastic storage smooths cardiac output; arterial pressure ≈120/80 mmHg"
  - "Frank's Windkessel model; aortic elastic storage smooths cardiac output"
  - "computed (a two-element Windkessel: compliant reservoir + peripheral resistance)"
bindings: []
neighbors:
  wikilink:
    - cache
    - conservation
    - heart
    - law
    - vein
  matrix:
    - artery
    - body
    - cache
    - conservation
    - heart
    - law
    - vein
  backlinks:
    - artery
    - body
    - cache
    - conservation
    - heart
    - law
    - vein
signatures:
  computationUuid: "0f288c0d-54c9-8919-a771-43bcd9da4afd"
  stages:
    - stage: path
      stageUuid: "bb25bd6b-a438-873d-8574-72e2b8171b2e"
    - stage: trinity
      stageUuid: "e5a76d60-50e0-8644-881e-003dd2e82eac"
    - stage: boundary
      stageUuid: "5af9d5f2-e38e-83cb-9862-e9f9fa0513c8"
    - stage: links
      stageUuid: "a6225074-0316-8293-bb5f-7dff3a4d819e"
    - stage: horo
      stageUuid: "87df5fe1-b348-804b-a793-fcf4ff47bc99"
    - stage: seal
      stageUuid: "f12b6c7a-37d4-8461-a586-8625581d8a98"
    - stage: uuid
      stageUuid: "869e8d2b-103f-8fbe-8839-bc65ac4351bf"
version: 2
---
# artery — the Windkessel (the elastic buffer)

An artery carries blood *away* from the [[heart]] — and the large arteries do more than conduct: their elastic walls **buffer** the heart's pulses into steady flow. Three properties of the living artery map — as a *structural isomorphism*, each computed in the matter-twin — onto erpax's [[cache]] / buffer:

## 1. Windkessel — pulsatile in, steady out
The **Windkessel effect**: during systole the elastic aortic wall *expands to store* part of the stroke volume; during diastole it *recoils to release* it, converting the heart's **pulsatile output into a more continuous flow** and damping pressure swings (Windkessel model, Frank; ScienceDirect). Computed, the reservoir lowers the waveform's peak-to-trough — exactly a **buffer that turns bursty writes into steady throughput**.

## 2. Elastic recoil — perfusion between beats
Because the recoil releases stored volume *during diastole*, peripheral **outflow stays > 0 even when inflow is zero** (between beats). The downstream is never starved — the buffer maintains delivery across the gaps in the pulsatile source, the way a [[cache]] serves reads between writes.

## 3. Conserves — the mass balance
Across the cycle, **Σ inflow = Σ outflow + what the reservoir still holds**: nothing is created or lost, only delayed. The double-entry of carried value ([[conservation]]) — the same closed-loop balance the [[heart]] proves and the [[vein]] returns.

**HONEST.** A structural isomorphism between the cited Windkessel model and a computed construct — not a claim that erpax has an aorta; each boolean (`smoothsPulsatile` · `elasticRecoil` · `conservesFlow`) is computed live (a two-element Windkessel: compliant reservoir + peripheral resistance).

Matter-twin: `src/artery/index.ts` (`windkessel` · `pulsatility` · `pulsatileSource` · `smoothsPulsatile` · `elasticRecoil` · `conservesFlow` · `arteryWindkessel` · `isWindkessel`). Composes [[heart]] · [[vein]] · [[cache]] · [[conservation]].

**Law — [[law]]: the artery is the outbound Windkessel — its elastic reservoir smooths pulsatile ejection into steady peripheral flow (the buffer), recoils to perfuse between beats (never starving the downstream), and conserves (Σ in = Σ out + held); direction is its essence — a vessel that reverses is no longer an artery.**

@standard Frank's Windkessel model — aortic elastic storage smooths cardiac output; arterial pressure ≈120/80 mmHg
