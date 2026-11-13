---
name: wave
description: "Use when reasoning about wave — Continuous quantum computation wave with real-time Zenodo publication"
atomPath: wave
coordinate: "wave · 4/weave · a4c754ed"
contentUuid: "6a729ec0-2528-5d09-a26b-d2c0b6a60320"
diamondUuid: "506eeb71-570e-864b-b746-44403ff9bf61"
uuid: "a4c754ed-81c6-85b1-9f82-9e7c67dac5a0"
horo: 4
typography:
  partition: wave
  bondDegree: 83
standards: []
bindings: []
signatures:
  computationUuid: "3e20343f-8121-8394-9ed9-d6352a161468"
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
      stageUuid: "7fb74582-45ce-81f5-8bd1-2bc90dc0a544"
    - stage: seal
      stageUuid: "50cbcbd5-86c3-8109-a02c-d063e9c97858"
    - stage: uuid
      stageUuid: "4de55c24-e103-814f-8c55-3866adf54029"
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
