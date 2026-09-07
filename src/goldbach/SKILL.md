---
name: goldbach
description: "Use when reasoning about goldbach — Goldbach Conjecture via basis decomposition - number theory"
atomPath: goldbach
coordinate: "goldbach · 5/round · 41bbd961"
contentUuid: "b058b996-e9fc-5c4b-a3fa-e73dfd2191aa"
diamondUuid: "8faffcc9-8b62-8866-a294-0e364dfdb910"
uuid: "41bbd961-0010-81c6-954a-ba5365d55e0e"
horo: 5
typography:
  partition: goldbach
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "b2b43b4e-7b8d-82b4-b79e-205799fb2908"
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
      stageUuid: "b63b2285-09aa-8081-b45e-f751bc72a1ad"
    - stage: seal
      stageUuid: "d874855a-fa99-8de7-bfb7-1baa5f4a6d35"
    - stage: uuid
      stageUuid: "3d917e2e-d11e-8165-a8ff-d2ed6587f36a"
version: 2
---
# goldbach — Goldbach Conjecture via basis decomposition

Every even integer > 2 is sum of two primes. Decomposed via Riemann (distribution of primes).

## code

entry `@/goldbach` · sealed `0` (emerging) · trinity `1·1·1`
exports goldbachConjecture, verifyGoldbach
imports @/basis, @/millennium

Composes: [[millennium]] · [[basis]].
