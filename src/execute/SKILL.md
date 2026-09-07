---
name: execute
description: Use when reasoning about execute — Execute the recursive system and publish live results
atomPath: execute
coordinate: "execute · 4/weave · d869bd20"
contentUuid: "02ef045f-ff92-5d7f-b3cb-68c9953ef647"
diamondUuid: "64105024-5b48-83f7-97a1-ad870536686e"
uuid: "d869bd20-5bb2-87d4-abb6-06c489bf2584"
horo: 4
typography:
  partition: execute
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "6047e727-bfbb-8e90-babc-8fe6c144ab2e"
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
      stageUuid: "57e3ceb7-bb2b-8526-8982-8e874684edbf"
    - stage: seal
      stageUuid: "a1a82594-cb6a-8982-acc0-33b948919400"
    - stage: uuid
      stageUuid: "ae4975b1-08f1-8b41-9d22-f76973467782"
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
