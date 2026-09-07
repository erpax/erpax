---
name: execute
description: Use when reasoning about execute — Execute the recursive system and publish live results
atomPath: execute
coordinate: "execute · 1/base · 5428b63a"
contentUuid: "8798b2b5-78b7-5e0b-a70d-6b9b53a554cf"
diamondUuid: "9a177038-70fe-86d7-a3d9-48ea01da0670"
uuid: "5428b63a-9a1f-8528-b14b-507ad7bd06b8"
horo: 1
typography:
  partition: execute
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "1535a991-85e2-883f-832b-922b7da31686"
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
      stageUuid: "c1bf576b-83f6-85cf-a5b6-e509287b9f58"
    - stage: seal
      stageUuid: "a1a82594-cb6a-8982-acc0-33b948919400"
    - stage: uuid
      stageUuid: "5353cd04-5d89-8b32-94a7-8f026f227b6f"
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
