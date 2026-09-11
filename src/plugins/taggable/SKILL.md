---
name: taggable
description: "Use when reasoning about taggable — makes every record taggable without adding a relationship per collection: the tag references the record's **content-uuid**, so one edge type reaches everything."
atomPath: "plugins/taggable"
coordinate: "plugins/taggable · 5/round · 434330b8"
contentUuid: "f9d98496-c7ac-56c4-b20f-374ea6b11df5"
diamondUuid: "e5011d54-dfba-8041-b342-baff927cb100"
uuid: "434330b8-1e1d-8473-89e2-097b64b1b9d4"
horo: 5
typography:
  partition: plugins
  bondDegree: 6
standards:
  - "RFC-4122"
  - "RFC-4122 §4.3 uuid"
bindings: []
signatures:
  computationUuid: "65191b68-a2ae-828c-878f-3744c2839788"
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
      stageUuid: "179fb404-563a-87ee-82a2-2601d13ceb55"
    - stage: seal
      stageUuid: "35ce7c80-3449-8b41-8548-a6f2488ce12e"
    - stage: uuid
      stageUuid: "9b3ef363-5f86-8eb3-a891-0eb1710bfd64"
version: 2
---
# plugins/taggable — anything is taggable, because the tag points at a content-uuid

`taggablePlugin` makes every record taggable without adding a relationship per collection: the
tag references the record's **content-uuid**, so one edge type reaches everything.

It is the same move that makes anything accountable. A per-collection join table would need one
new table per collection, and the corpus would grow a table every time it grew a noun.

Composes: [[uuid]] · [[law]].
