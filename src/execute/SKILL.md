---
name: execute
description: Use when reasoning about execute — Execute the recursive system and publish live results
atomPath: execute
coordinate: "execute · 2/share · a09aa964"
contentUuid: "c50230c0-3066-534b-b8ad-61200a41d734"
diamondUuid: "1de851b9-5b6c-8c62-b2e8-471c9164a989"
uuid: "a09aa964-4930-8743-974c-1abd15d9e843"
horo: 2
typography:
  partition: execute
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "9f2a7b7e-8c43-8b4d-9723-2d4756c31639"
  stages:
    - stage: path
      stageUuid: "27fb1557-f424-85c8-9e0b-71cc9bee9ebd"
    - stage: trinity
      stageUuid: "d338291b-e09b-8de9-815e-3b641f4ab971"
    - stage: boundary
      stageUuid: "8a431c40-a737-8f93-a5ea-bc18c6b2ba26"
    - stage: links
      stageUuid: "943b3c44-1596-83d6-a399-38a27b803904"
    - stage: horo
      stageUuid: "f3382a59-8a5d-809d-87a4-a27f69be2e90"
    - stage: seal
      stageUuid: "a1a82594-cb6a-8982-acc0-33b948919400"
    - stage: uuid
      stageUuid: "8b87dcdb-3f02-8353-a86e-183625e6de3c"
version: 2
---
# execute — Run the system and watch it compute

The recursive generation + observation pair runs. Waves propagate. Results flow to Zenodo.

## code

entry `@/execute` · sealed `0` (running) · trinity `1·0·0`
exports executeSystem, publishResults, captureWaveTree
imports @/recursive, @/wave, @/publication

---

<sub>Execution phase · live computation · streaming DOIs</sub>

Composes: [[orchestrate]] · [[wave]].
