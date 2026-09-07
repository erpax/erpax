---
name: wave
description: "Use when reasoning about wave — Continuous quantum computation wave with real-time Zenodo publication"
atomPath: wave
coordinate: "wave · 2/share · a74479d2"
contentUuid: "e9e462e7-f372-5db4-b9fa-e376e948e794"
diamondUuid: "45daa10d-bda8-8c6f-8094-de9e9456d9df"
uuid: "a74479d2-24f9-8d10-a7bd-d56229d36f93"
horo: 2
typography:
  partition: wave
  bondDegree: 107
standards: []
bindings: []
signatures:
  computationUuid: "e9f29585-1450-8e80-a70f-b495e2712b9b"
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
      stageUuid: "940a0414-e716-869a-8a4a-d66d4d60c5aa"
    - stage: seal
      stageUuid: "50cbcbd5-86c3-8109-a02c-d063e9c97858"
    - stage: uuid
      stageUuid: "294841f1-fd33-835f-ab30-339edf7e077d"
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
