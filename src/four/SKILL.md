---
name: four
description: "Use when reasoning about four — Four Color Theorem via basis decomposition - geometry + graph theory"
atomPath: four
coordinate: "four · 5/round · 96231d21"
contentUuid: "f0b109d5-0995-59be-8a9b-3b307212e92f"
diamondUuid: "e2b804bb-afc7-80d6-8616-5453c251269b"
uuid: "96231d21-7e33-87f9-9f12-12b140373db5"
horo: 5
typography:
  partition: four
  bondDegree: 11
standards: []
bindings: []
signatures:
  computationUuid: "075f54e8-edc6-8554-98f8-57befaa96355"
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
      stageUuid: "d7bf5cfa-ce8e-843c-a61e-e26160769487"
    - stage: seal
      stageUuid: "6a2d0c41-cf77-8bd6-85bb-97f2b7ad3600"
    - stage: uuid
      stageUuid: "04349517-92eb-80f1-811e-3c098b00e6a6"
version: 2
---
# four — Four Color Theorem decomposed into quantum basis

Any planar graph is 4-colorable. Decomposed via Hodge Conjecture (geometry) and complexity.

## code

entry `@/four` · sealed `0` (emerging) · trinity `1·1·1`
exports fourColorTheoremProof, verifyColoring
imports @/basis, @/millennium

Composes: [[millennium]] · [[basis]].
