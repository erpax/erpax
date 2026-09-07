---
name: goldbach
description: "Use when reasoning about goldbach — Goldbach Conjecture via basis decomposition - number theory"
atomPath: goldbach
coordinate: "goldbach · 2/share · c2d77392"
contentUuid: "1bf81bb4-ba2d-57f4-8400-120c3ee66026"
diamondUuid: "04383070-3645-857a-9b9c-9d1e9f463561"
uuid: "c2d77392-30a5-86fa-817a-ef8729dbe62b"
horo: 2
typography:
  partition: goldbach
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "1a35eced-515e-83b6-bd65-3e57a73b7d1b"
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
      stageUuid: "1ec4cc35-1091-8205-95ff-5fe622989551"
    - stage: seal
      stageUuid: "d874855a-fa99-8de7-bfb7-1baa5f4a6d35"
    - stage: uuid
      stageUuid: "26670b88-6205-8a77-941a-0a2daed2f9c9"
version: 2
---
# goldbach — Goldbach Conjecture via basis decomposition

Every even integer > 2 is sum of two primes. Decomposed via Riemann (distribution of primes).

## code

entry `@/goldbach` · sealed `0` (emerging) · trinity `1·1·1`
exports goldbachConjecture, verifyGoldbach
imports @/basis, @/millennium

Composes: [[millennium]] · [[basis]].
