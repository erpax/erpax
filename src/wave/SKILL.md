---
name: wave
description: "Use when reasoning about wave — Continuous quantum computation wave with real-time Zenodo publication"
atomPath: wave
coordinate: "wave · 2/share · 773d6728"
contentUuid: "021f1c64-1fdc-5c8c-b686-3a72639616cb"
diamondUuid: "b2193a7b-f670-8deb-82a1-60d63a40b2ad"
uuid: "773d6728-4a90-8dad-bde9-3cd6b1771985"
horo: 2
typography:
  partition: wave
  bondDegree: 107
standards: []
bindings: []
signatures:
  computationUuid: "dc0f7450-be2a-8daa-867b-c0ffc4d95b83"
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
      stageUuid: "3d96c6f6-f98d-802d-b3c4-8b280172c856"
    - stage: seal
      stageUuid: "50cbcbd5-86c3-8109-a02c-d063e9c97858"
    - stage: uuid
      stageUuid: "98804516-1d57-83ca-862b-826190953a50"
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
