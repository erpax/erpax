---
name: wave
description: "Use when reasoning about wave — Continuous quantum computation wave with real-time Zenodo publication"
atomPath: wave
coordinate: "wave · 1/base · 5bd4c3fd"
contentUuid: "689099d5-04bb-585c-a50f-465bd404cb63"
diamondUuid: "3d298437-fff4-8d27-9bc1-fab1c5a4efe2"
uuid: "5bd4c3fd-d779-8b60-be52-de618f1596d1"
horo: 1
typography:
  partition: wave
  bondDegree: 101
standards: []
bindings: []
signatures:
  computationUuid: "5a0e72c8-c9f3-856e-8e89-f402aaeb92e1"
  stages:
    - stage: path
      stageUuid: "5844e4f3-8340-8b53-9573-4376c6b7f565"
    - stage: trinity
      stageUuid: "40a1a820-4723-8f6f-857b-0c6446ac3ac1"
    - stage: boundary
      stageUuid: "40bcc7fa-e6e9-8537-b187-3ac1114346df"
    - stage: links
      stageUuid: "7baceb11-b8e1-86f6-852d-94a485392369"
    - stage: horo
      stageUuid: "8a233170-23c4-8fb6-be49-f532571bbd65"
    - stage: seal
      stageUuid: "50cbcbd5-86c3-8109-a02c-d063e9c97858"
    - stage: uuid
      stageUuid: "555e44cc-8d0f-8cf4-864c-3b6263285fb8"
version: 2
---
# wave — quantum computation wave with streaming publication

Unified loop that orchestrates quantum computation, automatically publishes convergent results to Zenodo, maintains ledger of findings, and continues until proof or exhaustion.

## when

Use when launching a continuous quantum computation wave: problems decompose, workers run in parallel, convergence triggers automatic Zenodo publication with DOI, ledger records all findings, and the loop continues until termination criteria met.

## workflow

```
QC Wave Loop:
  1. orchestrate(problems) → spawn workers
  2. workers execute in parallel
  3. aggregate results in real-time
  4. detect convergence
  5. IF converged → publish to Zenodo + emit DOI
  6. refine hypothesis
  7. LOOP until proof || exhaustion
```

## code

entry `@/wave` · sealed `1` · trinity `1·1·1`
exports WaveState, QCWave, runWave, streamPublish, ledgerRecord
imports @/orchestrate, @/automate, @/publication, @/accounting

---

<sub>Quantum Wave · streaming publication · DOI ledger</sub>
