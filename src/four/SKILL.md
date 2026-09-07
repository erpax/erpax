---
name: four
description: "Use when reasoning about four — Four Color Theorem via basis decomposition - geometry + graph theory"
atomPath: four
coordinate: "four · 4/weave · ce4cefcb"
contentUuid: "8694b661-7252-5afc-bba3-7d3e29fdcfe7"
diamondUuid: "e7a0362a-6cfb-8e90-a586-ec02d588cf34"
uuid: "ce4cefcb-7006-88a0-9137-660a8df77698"
horo: 4
typography:
  partition: four
  bondDegree: 11
standards: []
bindings: []
signatures:
  computationUuid: "46389c6d-95b2-8ea0-95e5-cfcbff3d147b"
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
      stageUuid: "00695a9f-7e6f-852b-a170-cc1f662b7e78"
    - stage: seal
      stageUuid: "6a2d0c41-cf77-8bd6-85bb-97f2b7ad3600"
    - stage: uuid
      stageUuid: "38952bad-4035-82ab-9924-1b021c0c1f82"
version: 2
---
# four — Four Color Theorem decomposed into quantum basis

Any planar graph is 4-colorable. Decomposed via Hodge Conjecture (geometry) and complexity.

## code

entry `@/four` · sealed `0` (emerging) · trinity `1·1·1`
exports fourColorTheoremProof, verifyColoring
imports @/basis, @/millennium

Composes: [[millennium]] · [[basis]].
