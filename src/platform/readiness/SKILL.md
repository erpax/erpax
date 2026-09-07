---
name: readiness
description: Use when reasoning about readiness — enumerates the live MCP tool surface and groups it; folds that into a single manifest a reader can act on.
atomPath: "platform/readiness"
coordinate: "platform/readiness · 7/descent · 30533dcd"
contentUuid: "6aa1bad3-de5e-5455-8d1a-603d5fbc0887"
diamondUuid: "cf28cc28-3875-8bc3-ad33-7656ff418bd3"
uuid: "30533dcd-3caa-8f7d-aea8-66922aff2032"
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
  computationUuid: "bc544c9b-c62a-808c-be40-323d4c7a3c57"
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
      stageUuid: "a69fd84f-7aee-8e87-a9a8-759c222091ee"
    - stage: seal
      stageUuid: "70a6c505-69d4-881f-96dc-6cf313c739da"
    - stage: uuid
      stageUuid: "50eb552d-58b4-8262-86be-2115a2302a94"
version: 2
---
# platform/readiness — one survey answers "is this shippable", instead of eighty slices each claiming it

`buildToolCatalog` enumerates the live MCP tool surface and `toolsByArea` groups it;
`buildReadinessManifest` folds that into a single manifest a reader can act on.

The point is that it is COMPUTED from the tools that actually registered. A readiness claim
assembled by hand is a summary of what its author remembered.

Composes: [[law]].
