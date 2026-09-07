---
name: nerve
description: "Use when reasoning about erpax's signal pathway — the nervous organ that fires ALL-OR-NOTHING. The action potential is the gate in flesh: a threshold crossed or not, never partial; idempotent within its refractory window; and leaping node-to-node by saltatory conduction. Three properties of the living nerve are computed and mapped — a structural isomorphism — onto erpax's gate and signal."
atomPath: nerve
coordinate: "nerve · 5/round · f22122a8"
contentUuid: "26b04738-69bf-508a-a5fa-6105a079045c"
diamondUuid: "0b4a89bb-7654-80ed-9ad7-5465614172ca"
uuid: "f22122a8-f9b7-84a3-b998-7ae22ee086d6"
horo: 5
typography:
  partition: nerve
  bondDegree: 26
standards:
  - "Hodgkin–Huxley action potential · resting ≈−70 mV, threshold ≈−55 mV, spike ≈+40 mV"
  - "Hodgkin–Huxley action potential · resting ≈−70 mV, threshold ≈−55 mV, spike ≈+40 mV, refractory ~2 ms, saltatory up to ≈120 m/s"
bindings: []
signatures:
  computationUuid: "68d9aea8-1163-8992-a7a8-f633fda2e0b8"
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
      stageUuid: "1da1c2f8-e5e3-8966-a6d8-753fca6cb4df"
    - stage: seal
      stageUuid: "c12c8ff0-61dc-8f9c-964c-f0151d594f37"
    - stage: uuid
      stageUuid: "ab80c022-c3c3-8409-b84b-15936d7f68f8"
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
