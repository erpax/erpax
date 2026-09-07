---
name: goldbach
description: "Use when reasoning about goldbach — Goldbach Conjecture via basis decomposition - number theory"
atomPath: goldbach
coordinate: "goldbach · 7/descent · 70dcbf36"
contentUuid: "c76e82fc-e674-54a1-9b70-edf77e891e4f"
diamondUuid: "9029e641-82d7-8452-a93b-6fc6207ad70f"
uuid: "70dcbf36-7f1c-8156-a909-77fa5a2990d1"
horo: 7
typography:
  partition: goldbach
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "8825b41b-c5c5-85e5-820e-bd12d9f44666"
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
      stageUuid: "f58fa3e3-1ce8-8eb1-b52e-4d0273d6b1d9"
    - stage: seal
      stageUuid: "d874855a-fa99-8de7-bfb7-1baa5f4a6d35"
    - stage: uuid
      stageUuid: "c9ec6e1b-3d0a-8a43-943f-7951acbbc697"
version: 2
---
# goldbach — Goldbach Conjecture via basis decomposition

Every even integer > 2 is sum of two primes. Decomposed via Riemann (distribution of primes).

## code

entry `@/goldbach` · sealed `0` (emerging) · trinity `1·1·1`
exports goldbachConjecture, verifyGoldbach
imports @/basis, @/millennium

Composes: [[millennium]] · [[basis]].
