---
name: graph
description: "Use when building or verifying the corpus frontmatter connection graph — derive descriptions, compare diamond signature chains, build the undirected leaf graph, and check it spans the corpus with no orphans. The leaf primitives of the skill-upgrade flow."
atomPath: "skill/router/upgrade/graph"
coordinate: "skill/router/upgrade/graph · 1/base · a7e2005e"
contentUuid: "7d1f58f4-5f68-50b1-8c89-08c0b9be3dac"
diamondUuid: "ce20b76f-a15f-8d55-a524-c98407cb0c53"
uuid: "a7e2005e-6da8-88ca-aa56-0178be061a57"
horo: 1
typography:
  partition: skill
  bondDegree: 35
standards: []
bindings: []
signatures:
  computationUuid: "507ef787-9bdd-8d58-8617-3f0021fe9c20"
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
      stageUuid: "2a7b9de9-c33a-8994-889c-47dd406135c4"
    - stage: seal
      stageUuid: "5101c7dc-f07c-8540-b978-ab5f7ee498b8"
    - stage: uuid
      stageUuid: "99f02245-83ff-8548-a844-ac667805ec47"
version: 2
---
# skill/router/upgrade/graph

Split from the skill-upgrade hub so its index.ts re-exports only ([[rules]]/concentration).

Composes: [[skill]].
