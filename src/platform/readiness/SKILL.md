---
name: readiness
description: Use when reasoning about readiness — enumerates the live MCP tool surface and groups it; folds that into a single manifest a reader can act on.
atomPath: "platform/readiness"
coordinate: "platform/readiness · 5/round · d19a3f38"
contentUuid: "5a811011-6e85-5ff4-b62c-fdadbed41d0c"
diamondUuid: "d617066c-2ab3-854c-988a-18cf56fe27cb"
uuid: "d19a3f38-3a8c-8b19-bd4c-097f11a6cc0b"
horo: 5
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
  computationUuid: "2989052c-527f-89a3-8837-2dacbd434d3b"
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
      stageUuid: "fe9f8957-b4a5-8a6b-b661-b403362665af"
    - stage: seal
      stageUuid: "70a6c505-69d4-881f-96dc-6cf313c739da"
    - stage: uuid
      stageUuid: "41b3e8f9-74cb-8483-814c-4d241e5f9863"
version: 2
---
# platform/readiness — one survey answers "is this shippable", instead of eighty slices each claiming it

`buildToolCatalog` enumerates the live MCP tool surface and `toolsByArea` groups it;
`buildReadinessManifest` folds that into a single manifest a reader can act on.

The point is that it is COMPUTED from the tools that actually registered. A readiness claim
assembled by hand is a summary of what its author remembered.

Composes: [[law]].
