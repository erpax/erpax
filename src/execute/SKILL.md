---
name: execute
description: Use when reasoning about execute — Execute the recursive system and publish live results
atomPath: execute
coordinate: "execute · 8/crest · 0dbdb3d0"
contentUuid: "f135d605-86e8-5c48-b9a5-90b0ce498459"
diamondUuid: "cb737ff9-3db5-86ff-b5fc-693b3d792113"
uuid: "0dbdb3d0-cc6d-8edd-88a1-5e3dfe5b79a0"
horo: 8
typography:
  partition: execute
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "ec17543a-28a8-8052-8874-18fd22b672eb"
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
      stageUuid: "6cd31fd3-1b2f-8e7a-b567-a84f5469487c"
    - stage: seal
      stageUuid: "a1a82594-cb6a-8982-acc0-33b948919400"
    - stage: uuid
      stageUuid: "ab101cca-369b-8d51-9efc-9b8cfea0dd3a"
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
