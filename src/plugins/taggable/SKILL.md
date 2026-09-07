---
name: taggable
description: "Use when reasoning about taggable — makes every record taggable without adding a relationship per collection: the tag references the record's **content-uuid**, so one edge type reaches everything."
atomPath: "plugins/taggable"
coordinate: "plugins/taggable · 8/crest · 2f1096b4"
contentUuid: "feb7e53d-674d-508b-8aea-f7179540b690"
diamondUuid: "6aba8c98-b5a4-88cf-aec4-4b9dddee69f5"
uuid: "2f1096b4-236f-8700-9d11-d4a3c2ac4b97"
horo: 8
typography:
  partition: plugins
  bondDegree: 6
standards:
  - "RFC-4122"
  - "RFC-4122 §4.3 uuid"
bindings: []
signatures:
  computationUuid: "3ae3bc0d-858b-8325-b5f9-706c31b9b226"
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
      stageUuid: "7f601011-b374-8526-80c6-05476e569fa6"
    - stage: seal
      stageUuid: "35ce7c80-3449-8b41-8548-a6f2488ce12e"
    - stage: uuid
      stageUuid: "cd21fb42-cad4-83cb-8434-fd9641009726"
version: 2
---
# plugins/taggable — anything is taggable, because the tag points at a content-uuid

`taggablePlugin` makes every record taggable without adding a relationship per collection: the
tag references the record's **content-uuid**, so one edge type reaches everything.

It is the same move that makes anything accountable. A per-collection join table would need one
new table per collection, and the corpus would grow a table every time it grew a noun.

Composes: [[uuid]] · [[law]].
