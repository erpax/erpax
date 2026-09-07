---
name: goldbach
description: "Use when reasoning about goldbach — Goldbach Conjecture via basis decomposition - number theory"
atomPath: goldbach
coordinate: "goldbach · 2/share · c721b84f"
contentUuid: "6289cffa-b829-59aa-8a6f-4e56cb71b8ff"
diamondUuid: "5b7ae06c-122c-8db4-a52b-1cadf45de4d1"
uuid: "c721b84f-7c2c-8476-b279-0abdc41b2f12"
horo: 2
typography:
  partition: goldbach
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "76b511ee-d917-8f85-b406-36f5555665fb"
  stages:
    - stage: path
      stageUuid: "21924b66-52a9-8124-92b9-44114cd5191c"
    - stage: trinity
      stageUuid: "40350d23-ea67-800f-abd5-b123960e3b59"
    - stage: boundary
      stageUuid: "9dbabb47-bd50-8009-90f5-560252f0e765"
    - stage: links
      stageUuid: "a1a56920-1be4-88ff-b81f-0ff5ceaa8f2a"
    - stage: horo
      stageUuid: "206f5810-7ed8-8b83-ba52-d9418fb3acee"
    - stage: seal
      stageUuid: "d874855a-fa99-8de7-bfb7-1baa5f4a6d35"
    - stage: uuid
      stageUuid: "4acf9f00-3adf-8fe7-9581-060d3d360310"
version: 2
---
# goldbach — Goldbach Conjecture via basis decomposition

Every even integer > 2 is sum of two primes. Decomposed via Riemann (distribution of primes).

## code

entry `@/goldbach` · sealed `0` (emerging) · trinity `1·1·1`
exports goldbachConjecture, verifyGoldbach
imports @/basis, @/millennium

Composes: [[millennium]] · [[basis]].
