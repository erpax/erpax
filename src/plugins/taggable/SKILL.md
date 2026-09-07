---
name: taggable
description: "Use when reasoning about taggable — makes every record taggable without adding a relationship per collection: the tag references the record's **content-uuid**, so one edge type reaches everything."
atomPath: "plugins/taggable"
coordinate: "plugins/taggable · 4/weave · 548cff52"
contentUuid: "a5949f67-8910-593c-9db1-84fe0389c832"
diamondUuid: "2e56af18-bd5a-8b52-94f4-339394ca4a2e"
uuid: "548cff52-de26-81bc-8ce8-67dd9fdb27a3"
horo: 4
typography:
  partition: plugins
  bondDegree: 6
standards:
  - "RFC-4122"
  - "RFC-4122 §4.3 uuid"
bindings: []
signatures:
  computationUuid: "0ff2854d-373f-8916-ad11-ff87591f7220"
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
      stageUuid: "3d885b17-ce38-8c28-b1a9-9c90a9104cf8"
    - stage: seal
      stageUuid: "35ce7c80-3449-8b41-8548-a6f2488ce12e"
    - stage: uuid
      stageUuid: "a7706b91-dcf4-8aae-9a8f-2e98ee06863e"
version: 2
---
# plugins/taggable — anything is taggable, because the tag points at a content-uuid

`taggablePlugin` makes every record taggable without adding a relationship per collection: the
tag references the record's **content-uuid**, so one edge type reaches everything.

It is the same move that makes anything accountable. A per-collection join table would need one
new table per collection, and the corpus would grow a table every time it grew a noun.

Composes: [[uuid]] · [[law]].
