---
name: goldbach
description: "Use when reasoning about goldbach — Goldbach Conjecture via basis decomposition - number theory"
atomPath: goldbach
coordinate: "goldbach · 4/weave · c2e2381e"
contentUuid: "7171df74-eb38-5dac-9bf3-f5d63c6acc92"
diamondUuid: "822e6b3b-eda3-82fc-bc22-7d4f2d2de4f2"
uuid: "c2e2381e-422b-84b3-a3c7-e3923c5dfcba"
horo: 4
typography:
  partition: goldbach
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "8f6cc213-07f5-8c09-b2f4-579dc112975c"
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
      stageUuid: "d7950dd1-b6a6-85b0-8e30-dd5dbd709a0b"
    - stage: seal
      stageUuid: "d874855a-fa99-8de7-bfb7-1baa5f4a6d35"
    - stage: uuid
      stageUuid: "27dcf588-e665-80d9-8994-5fa86cc99d71"
version: 2
---
# goldbach — Goldbach Conjecture via basis decomposition

Every even integer > 2 is sum of two primes. Decomposed via Riemann (distribution of primes).

## code

entry `@/goldbach` · sealed `0` (emerging) · trinity `1·1·1`
exports goldbachConjecture, verifyGoldbach
imports @/basis, @/millennium

Composes: [[millennium]] · [[basis]].
