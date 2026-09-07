---
name: wave
description: "Use when reasoning about wave — Continuous quantum computation wave with real-time Zenodo publication"
atomPath: wave
coordinate: "wave · 5/round · e8d841dd"
contentUuid: "406a4c96-dd99-5057-a958-eb3b0ae42aca"
diamondUuid: "c9269f89-fbde-82de-b36b-01df064a3213"
uuid: "e8d841dd-9ce6-81ec-b258-1be2f2e695c8"
horo: 5
typography:
  partition: wave
  bondDegree: 107
standards: []
bindings: []
signatures:
  computationUuid: "d97db0e0-b085-81ae-840e-556031b1e684"
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
      stageUuid: "77526aae-9b10-8f24-89ee-346b2ca4a1ab"
    - stage: seal
      stageUuid: "50cbcbd5-86c3-8109-a02c-d063e9c97858"
    - stage: uuid
      stageUuid: "039b07e7-a668-859f-bf88-cb83042c36b1"
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
