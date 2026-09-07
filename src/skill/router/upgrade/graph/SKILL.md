---
name: graph
description: "Use when building or verifying the corpus frontmatter connection graph — derive descriptions, compare diamond signature chains, build the undirected leaf graph, and check it spans the corpus with no orphans. The leaf primitives of the skill-upgrade flow."
atomPath: "skill/router/upgrade/graph"
coordinate: "skill/router/upgrade/graph · 8/crest · 71bc1d0c"
contentUuid: "cdc3c3ac-1cdb-57e4-8c1a-53ef3fb9e2d3"
diamondUuid: "edac191b-e1b6-81c7-b51c-64160871fba3"
uuid: "71bc1d0c-17a3-82d8-baa9-bdf7c58bebb3"
horo: 8
typography:
  partition: skill
  bondDegree: 42
standards: []
bindings: []
signatures:
  computationUuid: "ccfe7c1b-85cb-8f96-b127-3049c1dcc626"
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
      stageUuid: "e7a2cc23-2ceb-83b6-810b-2cea6dc9782e"
    - stage: seal
      stageUuid: "5101c7dc-f07c-8540-b978-ab5f7ee498b8"
    - stage: uuid
      stageUuid: "2403df7f-5652-81af-adf0-bbd4069efe7a"
version: 2
---
# skill/router/upgrade/graph

Split from the skill-upgrade hub so its index.ts re-exports only ([[rules]]/concentration).

Composes: [[skill]].
