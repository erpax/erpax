---
name: readiness
description: Use when reasoning about readiness — enumerates the live MCP tool surface and groups it; folds that into a single manifest a reader can act on.
atomPath: "platform/readiness"
coordinate: "platform/readiness · 8/crest · af8078f1"
contentUuid: "4d4344b6-9a13-5033-a6ed-3c6722f08a44"
diamondUuid: "084dbe6f-4727-84b7-8cf3-c0d81cf8d4f0"
uuid: "af8078f1-afde-8990-8f95-3d7e1aa2721c"
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
  computationUuid: "76f13451-4ab6-82ed-8a9a-e08035e32e11"
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
      stageUuid: "e5b892ef-bf61-8813-8a68-09e11dda8b1d"
    - stage: seal
      stageUuid: "70a6c505-69d4-881f-96dc-6cf313c739da"
    - stage: uuid
      stageUuid: "cb613e1a-5d77-83dc-b6c9-66ccd0eefba6"
version: 2
---
# platform/readiness — one survey answers "is this shippable", instead of eighty slices each claiming it

`buildToolCatalog` enumerates the live MCP tool surface and `toolsByArea` groups it;
`buildReadinessManifest` folds that into a single manifest a reader can act on.

The point is that it is COMPUTED from the tools that actually registered. A readiness claim
assembled by hand is a summary of what its author remembered.

Composes: [[law]].
