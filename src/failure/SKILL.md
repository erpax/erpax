---
name: failure
description: Use when modelling one failure — the singular model of the failures collection (the plural store); a recorded instance of something not meeting its requirement.
atomPath: failure
coordinate: failure · 8/crest · 8d0f31cd
contentUuid: "e78257f1-90b5-587c-bca6-deb446406308"
diamondUuid: "b5f34cbe-c425-8739-bfb3-e588ad952bf9"
uuid: "8d0f31cd-bba4-87d4-8d6c-e6b64a9c4769"
horo: 8
bonds:
  in:
    - balance
    - failures
    - quality
  out:
    - balance
    - failures
    - quality
typography:
  partition: failure
  bondDegree: 9
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - balance
    - failures
    - quality
  matrix:
    - balance
    - failures
    - quality
  backlinks:
    - balance
    - failures
    - quality
signatures:
  computationUuid: "e5de48a1-4dcd-82b2-b6e6-b74c560992c1"
  stages:
    - stage: path
      stageUuid: "f2691e09-0d29-8b4e-af77-11d1949917de"
    - stage: trinity
      stageUuid: "80caf8ee-5613-896c-8c1b-81cc716966cc"
    - stage: boundary
      stageUuid: "2a46d9c9-5973-8ae7-8bf0-b66e5507246e"
    - stage: links
      stageUuid: "ee7a9525-2736-878f-a77e-0c5cb027fe88"
    - stage: horo
      stageUuid: "6395d389-8914-8ead-b755-24f3b259bd8f"
    - stage: seal
      stageUuid: "8d0b2ec9-20bd-8ff2-882e-f833b20ce6cd"
    - stage: uuid
      stageUuid: "6854fe29-0cbe-8fe0-bdbd-cfb5967d5ac9"
version: 2
---
# failure — the model of one [[failures]] row

A recorded instance of something not meeting its requirement. The singular model whose plural store is the [[failures]] collection ([[balance]]: every collection has its model).

Composes [[failures]] · [[quality]] · [[balance]].
