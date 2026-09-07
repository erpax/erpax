---
name: four
description: "Use when reasoning about four — Four Color Theorem via basis decomposition - geometry + graph theory"
atomPath: four
coordinate: "four · 2/share · aee1f5dc"
contentUuid: "9a9323d5-d444-5b4f-a41e-526a84c2517b"
diamondUuid: "b5d4bb77-90b2-8285-b26d-d80c65307896"
uuid: "aee1f5dc-0c61-8f10-962d-fdfe40a32278"
horo: 2
typography:
  partition: four
  bondDegree: 11
standards: []
bindings: []
signatures:
  computationUuid: "6a7531c1-802a-8dd4-8892-757b5c25d070"
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
      stageUuid: "249d2dac-15f6-8036-8b11-787d5a6dcd55"
    - stage: seal
      stageUuid: "6a2d0c41-cf77-8bd6-85bb-97f2b7ad3600"
    - stage: uuid
      stageUuid: "c7386f25-4d23-88ed-b999-d500d2a973dd"
version: 2
---
# four — Four Color Theorem decomposed into quantum basis

Any planar graph is 4-colorable. Decomposed via Hodge Conjecture (geometry) and complexity.

## code

entry `@/four` · sealed `0` (emerging) · trinity `1·1·1`
exports fourColorTheoremProof, verifyColoring
imports @/basis, @/millennium

Composes: [[millennium]] · [[basis]].
