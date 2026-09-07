---
name: graph
description: "Use when building or verifying the corpus frontmatter connection graph — derive descriptions, compare diamond signature chains, build the undirected leaf graph, and check it spans the corpus with no orphans. The leaf primitives of the skill-upgrade flow."
atomPath: "skill/router/upgrade/graph"
coordinate: "skill/router/upgrade/graph · 5/round · dad86740"
contentUuid: "1b80c255-78a5-5357-9d87-f8a2c03877a2"
diamondUuid: "caf7a9b4-66d1-8122-92bb-79d567820a4d"
uuid: "dad86740-8092-8dbb-80c9-a6276cd3bfaa"
horo: 5
typography:
  partition: skill
  bondDegree: 42
standards: []
bindings: []
signatures:
  computationUuid: "fdc059d8-87cd-808f-af38-922a3e676bd9"
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
      stageUuid: "70bf2538-f4e7-860b-94bb-fcd63cc5b557"
    - stage: seal
      stageUuid: "5101c7dc-f07c-8540-b978-ab5f7ee498b8"
    - stage: uuid
      stageUuid: "218dd86e-0263-85ca-8fc8-9b9cbb7f0925"
version: 2
---
# skill/router/upgrade/graph

Split from the skill-upgrade hub so its index.ts re-exports only ([[rules]]/concentration).

Composes: [[skill]].
