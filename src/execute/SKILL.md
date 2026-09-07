---
name: execute
description: Use when reasoning about execute — Execute the recursive system and publish live results
atomPath: execute
coordinate: "execute · 2/share · d54ebad6"
contentUuid: "af220d9b-0c45-598e-a4fc-68cc12584825"
diamondUuid: "54420b01-95dd-8e2c-8f96-65a10ec1bd31"
uuid: "d54ebad6-bdc1-815d-8416-ae86f7e11bbb"
horo: 2
typography:
  partition: execute
  bondDegree: 8
standards: []
bindings: []
signatures:
  computationUuid: "93aac502-1ed8-88c7-a56f-030920d6460a"
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
      stageUuid: "b83244b8-2e71-8e43-b531-ec1b13d5ebd6"
    - stage: seal
      stageUuid: "a1a82594-cb6a-8982-acc0-33b948919400"
    - stage: uuid
      stageUuid: "bc3214db-cbe0-8706-a72f-397603591aee"
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
