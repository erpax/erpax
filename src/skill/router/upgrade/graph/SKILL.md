---
name: graph
description: "Use when building or verifying the corpus frontmatter connection graph — derive descriptions, compare diamond signature chains, build the undirected leaf graph, and check it spans the corpus with no orphans. The leaf primitives of the skill-upgrade flow."
atomPath: "skill/router/upgrade/graph"
coordinate: "skill/router/upgrade/graph · 2/share · 41a22975"
contentUuid: "893a9fa8-5e50-5a19-a571-f4854b9b88d7"
diamondUuid: "b32cdb0e-ebc8-85f3-8adb-4b34cf6f4638"
uuid: "41a22975-79fc-80d4-852f-0a3ed30a3c1a"
horo: 2
typography:
  partition: skill
  bondDegree: 42
standards: []
bindings: []
signatures:
  computationUuid: "4704b654-95c6-83d0-973f-1676b493bb29"
  stages:
    - stage: path
      stageUuid: "77cca005-e120-80c9-9750-8cd2c52c190b"
    - stage: trinity
      stageUuid: "3a3580a6-4a9b-8fc8-b034-c2f0c8471998"
    - stage: boundary
      stageUuid: "f7361e38-970a-8371-b7f0-5bd2efa4fdb9"
    - stage: links
      stageUuid: "a4fe3208-b585-867e-b86f-99488d5f051b"
    - stage: horo
      stageUuid: "4e21c74f-53b6-8d96-a2a0-7c053a326b42"
    - stage: seal
      stageUuid: "5101c7dc-f07c-8540-b978-ab5f7ee498b8"
    - stage: uuid
      stageUuid: "9b6d2fa6-9cd4-8e52-a355-bc16ba0d4c9c"
version: 2
---
# skill/router/upgrade/graph

Split from the skill-upgrade hub so its index.ts re-exports only ([[rules]]/concentration).

Composes: [[skill]].
