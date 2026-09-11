---
name: taggable
description: "Use when reasoning about taggable — makes every record taggable without adding a relationship per collection: the tag references the record's **content-uuid**, so one edge type reaches everything."
atomPath: "plugins/taggable"
coordinate: "plugins/taggable · 2/share · 6ee9fc2a"
contentUuid: "916b3b4d-fdbe-5db0-82a9-eb2202ce41e2"
diamondUuid: "d7f9fb32-7063-8994-882a-1a5ee385f3c5"
uuid: "6ee9fc2a-daec-83d1-9aa4-70c702259cda"
horo: 2
typography:
  partition: plugins
  bondDegree: 6
standards:
  - "RFC-4122"
  - "RFC-4122 §4.3 uuid"
bindings: []
signatures:
  computationUuid: "c06a73c5-7785-8954-8e3d-227ffb234155"
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
      stageUuid: "f65c0351-95f3-8434-b6ff-20cf00f02fb1"
    - stage: seal
      stageUuid: "35ce7c80-3449-8b41-8548-a6f2488ce12e"
    - stage: uuid
      stageUuid: "1030d381-acf8-88fa-8b9b-bde8ff5ad236"
version: 2
---
# plugins/taggable — anything is taggable, because the tag points at a content-uuid

`taggablePlugin` makes every record taggable without adding a relationship per collection: the
tag references the record's **content-uuid**, so one edge type reaches everything.

It is the same move that makes anything accountable. A per-collection join table would need one
new table per collection, and the corpus would grow a table every time it grew a noun.

Composes: [[uuid]] · [[law]].
