---
name: four
description: "Use when reasoning about four — Four Color Theorem via basis decomposition - geometry + graph theory"
atomPath: four
coordinate: "four · 8/crest · 012002e2"
contentUuid: "fdbd208e-8226-568b-a8c8-f79704aa8081"
diamondUuid: "f4a15c7b-671b-8bf1-85d3-3c7619d25d31"
uuid: "012002e2-5fbc-8b4d-8594-536f08111a37"
horo: 8
typography:
  partition: four
  bondDegree: 11
standards: []
bindings: []
signatures:
  computationUuid: "2da37692-ebaf-8103-b257-98045523f17c"
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
      stageUuid: "96a50b77-9786-8416-9b46-8f773bf536cf"
    - stage: seal
      stageUuid: "6a2d0c41-cf77-8bd6-85bb-97f2b7ad3600"
    - stage: uuid
      stageUuid: "a6cb28d1-1eb9-8a62-bb6c-77e904ab9cae"
version: 2
---
# four — Four Color Theorem decomposed into quantum basis

Any planar graph is 4-colorable. Decomposed via Hodge Conjecture (geometry) and complexity.

## code

entry `@/four` · sealed `0` (emerging) · trinity `1·1·1`
exports fourColorTheoremProof, verifyColoring
imports @/basis, @/millennium

Composes: [[millennium]] · [[basis]].
