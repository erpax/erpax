---
name: nerve
description: "Use when reasoning about erpax's signal pathway — the nervous organ that fires ALL-OR-NOTHING. The action potential is the gate in flesh: a threshold crossed or not, never partial; idempotent within its refractory window; and leaping node-to-node by saltatory conduction. Three properties of the living nerve are computed and mapped — a structural isomorphism — onto erpax's gate and signal."
atomPath: nerve
coordinate: "nerve · 5/round · 7b8d3935"
contentUuid: "542a3ee6-95c5-5d91-b0f7-36c8209d35d6"
diamondUuid: "e8ddeece-a4c0-8b41-9922-31c79f8dbe41"
uuid: "7b8d3935-f23f-8767-b78d-4d9bf04812ec"
horo: 5
typography:
  partition: nerve
  bondDegree: 26
standards:
  - "Hodgkin–Huxley action potential · resting ≈−70 mV, threshold ≈−55 mV, spike ≈+40 mV"
  - "Hodgkin–Huxley action potential · resting ≈−70 mV, threshold ≈−55 mV, spike ≈+40 mV, refractory ~2 ms, saltatory up to ≈120 m/s"
bindings: []
signatures:
  computationUuid: "f983e0ec-5210-8aad-b71e-70fc4b462774"
  stages:
    - stage: path
      stageUuid: "a95ca7a3-ff2f-84e8-8ad9-b0120e5233c5"
    - stage: trinity
      stageUuid: "608ad6e1-4d61-8202-bb2b-02ff474cd3e3"
    - stage: boundary
      stageUuid: "c3aaae05-7411-819e-abcd-1e655fb4ad22"
    - stage: links
      stageUuid: "94746510-e24f-81d0-8340-d53f02466756"
    - stage: horo
      stageUuid: "8d2a86f6-376f-84f9-a894-86df20f5b291"
    - stage: seal
      stageUuid: "c12c8ff0-61dc-8f9c-964c-f0151d594f37"
    - stage: uuid
      stageUuid: "621061b0-03fb-8eb5-84b8-7da20f727c64"
version: 2
---
# nerve — the all-or-nothing signal (the gate)

A nerve carries electrochemical impulses along its axons — and the way it fires *is* erpax's [[gate]]: a threshold crossed or not, never partial. Three properties of the living nerve map — as a *structural isomorphism*, each computed in the matter-twin — onto erpax's [[gate]] / [[signal]]:

## 1. All-or-nothing — the threshold step
The action potential is an **"all-or-nothing" event**: once the membrane reaches **threshold (≈−55 mV** from a resting **≈−70 mV)** the neuron *fully* depolarises to a constant-amplitude spike (≈+40 mV peak), regardless of how far past threshold the stimulus went (Foundations of Neuroscience; Kenhub). This is the [[gate]] exactly: a proof **passes or it does not** — `tsc · lint · vitest · aura 0` is green or red, never "mostly green". The signal is digital, not graded.

## 2. Refractory — the idempotent spike
For the **absolute refractory period (~2 ms)** after a spike the Na⁺ channels cannot reopen, so the same stimulus **cannot re-fire** (TeachMePhysiology). The spike is **idempotent / debounced** — fire once per crossing, exactly like a gate that records one verdict per change and will not double-count it.

## 3. Saltatory — the myelinated leap
Myelin insulates the axon so the impulse **'jumps' node to node** (saltatory conduction), reaching **up to ≈120 m/s** versus the slow continuous propagation of unmyelinated fibres (NCBI Neuroscience). The signal **leaps the inert span** rather than crawling it — the [[fractal]] reach, not step-by-step.

**HONEST.** A structural isomorphism between cited neurophysiology (Hodgkin–Huxley) and a computed construct — not a claim that erpax has axons; each boolean (`allOrNothing` · `refractory` · `saltatoryFaster`) is computed live (threshold step · refractory window · saltatory speed).

Matter-twin: `src/nerve/index.ts` (`fire` · `spikeAmplitude` · `allOrNothing` · `canFire` · `refractory` · `conductionSpeed` · `saltatoryFaster` · `nerveSignal` · `fires`). Composes [[gate]] · [[signal]] · [[fractal]] · [[motor]].

**Law — [[law]]: the nerve is the all-or-nothing signal — it fires fully at threshold or not at all (the gate: pass/fail, never partial), cannot re-fire within its refractory window (idempotent), and leaps node-to-node by saltatory conduction (the fractal reach).**

@standard Hodgkin–Huxley action potential · resting ≈−70 mV, threshold ≈−55 mV, spike ≈+40 mV, refractory ~2 ms, saltatory up to ≈120 m/s
