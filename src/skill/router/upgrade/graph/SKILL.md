---
name: graph
description: "Use when building or verifying the corpus frontmatter connection graph — derive descriptions, compare diamond signature chains, build the undirected leaf graph, and check it spans the corpus with no orphans. The leaf primitives of the skill-upgrade flow."
atomPath: "skill/router/upgrade/graph"
coordinate: "skill/router/upgrade/graph · 1/base · 17ac8a19"
contentUuid: "0ad40275-f812-564c-b6da-6a7a310110f3"
diamondUuid: "e642dd32-3e78-8241-9e88-15c979048a4a"
uuid: "17ac8a19-f0ca-8b74-84bc-14435bc79c2a"
horo: 1
typography:
  partition: skill
  bondDegree: 42
standards: []
bindings: []
signatures:
  computationUuid: "102e3694-de2c-805a-82a3-79caa359d019"
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
      stageUuid: "f5147a71-1be9-8a24-b937-53d579d623df"
    - stage: seal
      stageUuid: "5101c7dc-f07c-8540-b978-ab5f7ee498b8"
    - stage: uuid
      stageUuid: "1072028d-9a21-8a79-9d78-831a0eca61d3"
version: 2
---
# skill/router/upgrade/graph

Split from the skill-upgrade hub so its index.ts re-exports only ([[rules]]/concentration).

Composes: [[skill]].
