---
name: graph
description: "Use when building or verifying the corpus frontmatter connection graph — derive descriptions, compare diamond signature chains, build the undirected leaf graph, and check it spans the corpus with no orphans. The leaf primitives of the skill-upgrade flow."
atomPath: "skill/router/upgrade/graph"
coordinate: "skill/router/upgrade/graph · 4/weave · 53789503"
contentUuid: "b19d8dff-80e3-55b4-8803-45ae1b9911ca"
diamondUuid: "81030b87-681d-8d10-b5ea-a260a0fe05f7"
uuid: "53789503-60ed-829b-a6ab-165ec5482435"
horo: 4
typography:
  partition: skill
  bondDegree: 42
standards: []
bindings: []
signatures:
  computationUuid: "d075eb07-2a42-8b0a-bc80-af2049ec267d"
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
      stageUuid: "d64374cc-d4f5-86d2-9849-8f507dca1a30"
    - stage: seal
      stageUuid: "5101c7dc-f07c-8540-b978-ab5f7ee498b8"
    - stage: uuid
      stageUuid: "3af5db6b-d16b-8e95-bcef-e3af3e4f7d4b"
version: 2
---
# skill/router/upgrade/graph

Split from the skill-upgrade hub so its index.ts re-exports only ([[rules]]/concentration).

Composes: [[skill]].
