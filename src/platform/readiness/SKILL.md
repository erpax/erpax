---
name: readiness
description: Use when reasoning about readiness — enumerates the live MCP tool surface and groups it; folds that into a single manifest a reader can act on.
atomPath: "platform/readiness"
coordinate: "platform/readiness · 7/descent · 2af9bbc1"
contentUuid: "d86611c3-0990-50af-b0fd-e4af053640ae"
diamondUuid: "9184dc39-a240-829b-b933-6ea2b706396b"
uuid: "2af9bbc1-6278-8721-8fa5-539203a3c05c"
horo: 7
typography:
  partition: platform
  bondDegree: 3
standards:
  - MCP
  - "MCP 0.6 — tools/list extension"
  - "W3C JSON-LD 1.1 (manifest is JSON-serializable + linkable)"
  - "W3C-JSON-LD-1.1"
bindings: []
signatures:
  computationUuid: "d3106814-3601-81c6-9571-e1a5a0f6ead0"
  stages:
    - stage: path
      stageUuid: "e4a45e99-28b2-82fb-8ec4-f128dcf885cc"
    - stage: trinity
      stageUuid: "679c603a-87f8-8f77-9cf4-eec30d053474"
    - stage: boundary
      stageUuid: "0e43b4dd-b963-80de-a8af-a5ddb9e74d5d"
    - stage: links
      stageUuid: "cb3b1d4e-4443-892f-865b-2cce5b6e7b34"
    - stage: horo
      stageUuid: "f6528949-e819-8352-b9ae-66ec64b10c42"
    - stage: seal
      stageUuid: "70a6c505-69d4-881f-96dc-6cf313c739da"
    - stage: uuid
      stageUuid: "e491b868-8195-852c-bf42-af8f22737460"
version: 2
---
# platform/readiness — one survey answers "is this shippable", instead of eighty slices each claiming it

`buildToolCatalog` enumerates the live MCP tool surface and `toolsByArea` groups it;
`buildReadinessManifest` folds that into a single manifest a reader can act on.

The point is that it is COMPUTED from the tools that actually registered. A readiness claim
assembled by hand is a summary of what its author remembered.

Composes: [[law]].
