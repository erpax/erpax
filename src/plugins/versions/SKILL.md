---
name: versions
description: "Use when reasoning about versions — turns on Payload's native for every collection except those named in , with bounding the history."
atomPath: "plugins/versions"
coordinate: "plugins/versions · 2/share · dbcd6ad0"
contentUuid: "7c19374d-e9c9-54f7-8eca-9a3212cf7e96"
diamondUuid: "3a971c8d-08e1-8a7c-a0c7-22fd186e010b"
uuid: "dbcd6ad0-7e7d-807f-9138-b8641f9eb5a4"
horo: 2
typography:
  partition: plugins
  bondDegree: 116
standards:
  - "ISO 19011:2018 §6.4.6 audit-evidence (version history is the trail)"
  - "SOX §404 internal-controls record-retention"
bindings: []
signatures:
  computationUuid: "6f02f39e-e73a-88e4-8cab-7e5b9ecc1ede"
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
      stageUuid: "56649fd1-5e45-8911-ae5d-1b686db14eeb"
    - stage: seal
      stageUuid: "7893a839-759d-8460-8053-38c27f967e95"
    - stage: uuid
      stageUuid: "bbb2b381-9ee7-8b72-a1da-1ac48439fc10"
version: 2
---
# plugins/versions — versioning is enabled at the chokepoint, never per collection

`versionsPlugin` turns on Payload's native `versions` for every collection except those named in
`VERSIONS_EXCLUDE`, with `DEFAULT_MAX_PER_DOC` bounding the history.

Per-collection opt-in means the collection added next Tuesday is unversioned and nobody notices
until its history is wanted. A chokepoint makes the exception explicit and countable.

Composes: [[law]].
