---
name: taggable
description: "Use when reasoning about taggable — makes every record taggable without adding a relationship per collection: the tag references the record's **content-uuid**, so one edge type reaches everything."
atomPath: "plugins/taggable"
coordinate: "plugins/taggable · 7/descent · 4d034d74"
contentUuid: "ae1506ce-f517-5f10-a56c-ed8675fd2ec1"
diamondUuid: "7b5ba2c2-b555-8969-b6d9-fe30cc4b13f0"
uuid: "4d034d74-cfba-819c-9604-07fb9c0e5f02"
horo: 7
typography:
  partition: plugins
  bondDegree: 6
standards:
  - "RFC-4122"
  - "RFC-4122 §4.3 uuid"
bindings: []
signatures:
  computationUuid: "a73f89b3-1664-88f3-96d3-14074b9e214b"
  stages:
    - stage: path
      stageUuid: "8a94f9e0-8ef8-8f6d-940a-907da67e198f"
    - stage: trinity
      stageUuid: "a2c1409a-6c2c-8d1c-9c9d-2c6d0e95315b"
    - stage: boundary
      stageUuid: "a3817e47-37c0-820f-b723-29efe8fc16ca"
    - stage: links
      stageUuid: "4e83e302-8ccb-855e-98e3-0e4f3bc24b98"
    - stage: horo
      stageUuid: "5e173a0a-00dc-89e8-8ce2-c91a6fd53544"
    - stage: seal
      stageUuid: "35ce7c80-3449-8b41-8548-a6f2488ce12e"
    - stage: uuid
      stageUuid: "2c223ddc-3ca3-8fd7-bb35-b39fe753131c"
version: 2
---
# plugins/taggable — anything is taggable, because the tag points at a content-uuid

`taggablePlugin` makes every record taggable without adding a relationship per collection: the
tag references the record's **content-uuid**, so one edge type reaches everything.

It is the same move that makes anything accountable. A per-collection join table would need one
new table per collection, and the corpus would grow a table every time it grew a noun.

Composes: [[uuid]] · [[law]].
