---
name: versions
description: "Use when reasoning about versions — turns on Payload's native for every collection except those named in , with bounding the history."
atomPath: "plugins/versions"
coordinate: "plugins/versions · 1/base · 0553d4fa"
contentUuid: "052f8010-aa88-57db-ad1e-4ead9efd4177"
diamondUuid: "5d445c51-1365-8c7c-a49c-69f1ecec8d02"
uuid: "0553d4fa-1e11-87b5-8c0f-192c325ba113"
horo: 1
typography:
  partition: plugins
  bondDegree: 116
standards:
  - "ISO 19011:2018 §6.4.6 audit-evidence (version history is the trail)"
  - "SOX §404 internal-controls record-retention"
bindings: []
signatures:
  computationUuid: "791a31eb-8a60-84a6-9dc6-4dfb80ef494a"
  stages:
    - stage: path
      stageUuid: "0e9a1a4e-637e-89d6-a24a-dd30bdd8d56c"
    - stage: trinity
      stageUuid: "6698856c-dada-8c82-aa44-0d2819316a20"
    - stage: boundary
      stageUuid: "4a49526f-e68e-81a8-ae8b-1d5342fa9c5e"
    - stage: links
      stageUuid: "e38c7e0b-b12b-88be-b79a-facf6999f583"
    - stage: horo
      stageUuid: "640ea1af-0243-84f1-8dcf-58d4c4e289e4"
    - stage: seal
      stageUuid: "7893a839-759d-8460-8053-38c27f967e95"
    - stage: uuid
      stageUuid: "6b61fb9e-3e0e-8ad8-9584-61a8a0ffe2d0"
version: 2
---
# plugins/versions — versioning is enabled at the chokepoint, never per collection

`versionsPlugin` turns on Payload's native `versions` for every collection except those named in
`VERSIONS_EXCLUDE`, with `DEFAULT_MAX_PER_DOC` bounding the history.

Per-collection opt-in means the collection added next Tuesday is unversioned and nobody notices
until its history is wanted. A chokepoint makes the exception explicit and countable.

Composes: [[law]].
