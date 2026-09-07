---
name: four
description: "Use when reasoning about four — Four Color Theorem via basis decomposition - geometry + graph theory"
atomPath: four
coordinate: "four · 5/round · e1cba8cb"
contentUuid: "88291991-e0c1-58a1-b8b8-5e27b61ab8b5"
diamondUuid: "85a18703-4750-8801-924d-881c79380346"
uuid: "e1cba8cb-d6a6-8203-a789-d7ffc2c3f29c"
horo: 5
typography:
  partition: four
  bondDegree: 11
standards: []
bindings: []
signatures:
  computationUuid: "635a02f8-bbbd-8be1-ba25-f226dd3d3a0b"
  stages:
    - stage: path
      stageUuid: "72a5d723-621a-85db-b793-510eba40aba6"
    - stage: trinity
      stageUuid: "2ebdd790-dec8-8c6a-b7f0-acb4259eecae"
    - stage: boundary
      stageUuid: "db20c1f5-cb2e-8b97-a658-4053cb23f503"
    - stage: links
      stageUuid: "318aafda-2d29-8959-b0f8-94696671445a"
    - stage: horo
      stageUuid: "03a8c9cc-460b-89e7-a709-6b0f28b5f908"
    - stage: seal
      stageUuid: "6a2d0c41-cf77-8bd6-85bb-97f2b7ad3600"
    - stage: uuid
      stageUuid: "b78d31bf-1b49-815d-988e-946dc71f089d"
version: 2
---
# four — Four Color Theorem decomposed into quantum basis

Any planar graph is 4-colorable. Decomposed via Hodge Conjecture (geometry) and complexity.

## code

entry `@/four` · sealed `0` (emerging) · trinity `1·1·1`
exports fourColorTheoremProof, verifyColoring
imports @/basis, @/millennium

Composes: [[millennium]] · [[basis]].
