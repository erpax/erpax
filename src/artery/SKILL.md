---
name: artery
description: "Use when reasoning about erpax's outbound vessel — the Windkessel organ. The artery carries value away from the heart, its elastic wall storing systolic volume and recoiling in diastole to smooth pulsatile output into steady peripheral flow: the cache/buffer in flesh. Three properties (Windkessel smoothing · elastic recoil · conserved mass balance) are computed and mapped — a structural isomorphism — onto erpax."
atomPath: artery
coordinate: "artery · 1/base · d4bd1fbc"
contentUuid: "54c00b77-34c8-5635-bb7d-13886d819708"
diamondUuid: "cfa501ab-9c34-84fc-923c-2c9d35c3c670"
uuid: "d4bd1fbc-d3ab-89f8-887a-84878ee25e02"
horo: 1
typography:
  partition: artery
  bondDegree: 26
standards:
  - "Frank's Windkessel model — aortic elastic storage smooths cardiac output; arterial pressure ≈120/80 mmHg"
  - "Frank's Windkessel model; aortic elastic storage smooths cardiac output"
bindings: []
signatures:
  computationUuid: "2b5f2d09-e8a0-84e5-b304-9456083beae2"
  stages:
    - stage: path
      stageUuid: "bb25bd6b-a438-873d-8574-72e2b8171b2e"
    - stage: trinity
      stageUuid: "e5a76d60-50e0-8644-881e-003dd2e82eac"
    - stage: boundary
      stageUuid: "e87ba419-4d88-843d-9fd9-3462dcc7f2be"
    - stage: links
      stageUuid: "a6225074-0316-8293-bb5f-7dff3a4d819e"
    - stage: horo
      stageUuid: "785691a9-47a3-89a5-a2dd-4afd3c073d23"
    - stage: seal
      stageUuid: "7218e814-3113-8169-b0c2-4308cb893515"
    - stage: uuid
      stageUuid: "0754f2ee-c854-858b-ae67-3b15e8c5c697"
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
