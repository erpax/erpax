---
name: readiness
description: Use when reasoning about readiness — enumerates the live MCP tool surface and groups it; folds that into a single manifest a reader can act on.
atomPath: "platform/readiness"
coordinate: "platform/readiness · 5/round · 6d80de8c"
contentUuid: "78537f99-68cc-5e22-b242-416605354f3f"
diamondUuid: "7af4c0c4-d87f-8287-9c5a-100b12398c63"
uuid: "6d80de8c-7654-8a6e-b1c5-b5ef8dacb376"
horo: 5
typography:
  partition: platform
  bondDegree: 3
standards:
  - "MCP 0.6 — tools/list extension"
  - "W3C JSON-LD 1.1 (manifest is JSON-serializable + linkable)"
  - "W3C-JSON-LD-1.1"
bindings: []
signatures:
  computationUuid: "48a44b4f-3d40-8e72-a54b-6ffe83644611"
  stages:
    - stage: path
      stageUuid: "e4a45e99-28b2-82fb-8ec4-f128dcf885cc"
    - stage: trinity
      stageUuid: "679c603a-87f8-8f77-9cf4-eec30d053474"
    - stage: boundary
      stageUuid: "641d8bec-238f-81b6-a1e5-b25bb0ee5dbb"
    - stage: links
      stageUuid: "cb3b1d4e-4443-892f-865b-2cce5b6e7b34"
    - stage: horo
      stageUuid: "c6768f23-eda7-871c-bdee-29ccbcc29414"
    - stage: seal
      stageUuid: "70a6c505-69d4-881f-96dc-6cf313c739da"
    - stage: uuid
      stageUuid: "75a36bcb-0731-8cb3-8cb6-fd1dc7a7e9dc"
version: 2
---
# platform/readiness — one survey answers "is this shippable", instead of eighty slices each claiming it

`buildToolCatalog` enumerates the live MCP tool surface and `toolsByArea` groups it;
`buildReadinessManifest` folds that into a single manifest a reader can act on.

The point is that it is COMPUTED from the tools that actually registered. A readiness claim
assembled by hand is a summary of what its author remembered.

Composes: [[law]].
