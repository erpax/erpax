---
name: readiness
description: Use when reasoning about readiness — enumerates the live MCP tool surface and groups it; folds that into a single manifest a reader can act on.
atomPath: "platform/readiness"
coordinate: "platform/readiness · 8/crest · 625b2495"
contentUuid: "757ee456-5520-5acd-87b5-e3bcc45aa5f7"
diamondUuid: "13461957-7342-8685-b8bb-d04d3169e549"
uuid: "625b2495-873a-8a58-87e4-bbc34ff330ff"
horo: 8
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
  computationUuid: "d6a64ed0-cff8-806a-a80f-d7c90495a916"
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
      stageUuid: "f11f8b9d-85d6-83de-a802-8332e4b22ecf"
    - stage: seal
      stageUuid: "70a6c505-69d4-881f-96dc-6cf313c739da"
    - stage: uuid
      stageUuid: "3a1eecfb-4811-8f95-94c2-7fe00be16df6"
version: 2
---
# platform/readiness — one survey answers "is this shippable", instead of eighty slices each claiming it

`buildToolCatalog` enumerates the live MCP tool surface and `toolsByArea` groups it;
`buildReadinessManifest` folds that into a single manifest a reader can act on.

The point is that it is COMPUTED from the tools that actually registered. A readiness claim
assembled by hand is a summary of what its author remembered.

Composes: [[law]].
