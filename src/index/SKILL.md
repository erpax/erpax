---
name: index
description: "Use when sealing folder paths — index.ts is the cross; subfolders are double-wired A/B ↔ B/A."
atomPath: index
coordinate: "index · 5/round · 1fc9e5b6"
contentUuid: "5f357774-1b16-514f-bb6d-feb6c691cb89"
diamondUuid: "a63abc1f-0156-8b64-9c6b-3ac623d20794"
uuid: "1fc9e5b6-b07d-8d82-820e-20772163a1aa"
horo: 5
typography:
  partition: index
  bondDegree: 11
standards: []
bindings: []
signatures:
  computationUuid: "cbce52d9-8f0a-8060-a8bf-7cab221a67bc"
  stages:
    - stage: path
      stageUuid: "b023ebf4-50e2-8379-99ec-b0c91a1bbddb"
    - stage: trinity
      stageUuid: "be3d1e16-0147-8307-89c6-db69f5671e0f"
    - stage: boundary
      stageUuid: "0206940a-eb94-8148-84f5-748aa2751edf"
    - stage: links
      stageUuid: "a9165243-ac5b-80fa-aae5-9a15b328ddcc"
    - stage: horo
      stageUuid: "c4c786da-d12b-8585-9224-11865d4d27a1"
    - stage: seal
      stageUuid: "816003ae-981d-81c5-b7b4-6bbd16346b77"
    - stage: uuid
      stageUuid: "6c78fd2c-80b4-8896-a0a5-41c83037b6ad"
version: 2
---
# index

Path lattice seal: `index/cross` audits and migrates stray siblings into distributed `index.ts` crosses.

Composes: [[path]] · [[cross]] · [[seal]].
