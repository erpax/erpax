---
name: execute
description: Use when reasoning about execute — Execute the recursive system and publish live results
atomPath: execute
coordinate: "execute · 5/round · 674c0756"
contentUuid: "d2483ff6-b511-56da-a364-6e84a4572beb"
diamondUuid: "9182ec2e-5caf-86e9-b47f-61c43e7e67bc"
uuid: "674c0756-4e45-8a99-984b-798af04e2724"
horo: 5
typography:
  partition: execute
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "3b43b9d9-cd8b-826b-8634-e4a20f7b9b42"
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
      stageUuid: "4099b9d6-20a3-8dcd-a299-16e58fef0b65"
    - stage: seal
      stageUuid: "a1a82594-cb6a-8982-acc0-33b948919400"
    - stage: uuid
      stageUuid: "20b1aecd-6cea-8b68-89ef-4bf6c59e6f82"
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
