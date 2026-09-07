---
name: versions
description: "Use when reasoning about versions — turns on Payload's native for every collection except those named in , with bounding the history."
atomPath: "plugins/versions"
coordinate: "plugins/versions · 2/share · 1dc067b7"
contentUuid: "e8c1fc9d-6de7-5064-9dad-e1bbeb5e7f69"
diamondUuid: "b57c0db4-7568-8f53-8b62-b2878fe4a5b3"
uuid: "1dc067b7-7b1e-8360-9805-d64947176238"
horo: 2
typography:
  partition: plugins
  bondDegree: 116
standards:
  - "ISO 19011:2018 §6.4.6 audit-evidence (version history is the trail)"
  - "SOX §404 internal-controls record-retention"
bindings: []
signatures:
  computationUuid: "0b740c49-f7f3-8989-9958-1ccc4e949481"
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
      stageUuid: "7c2ef96b-b523-8c0d-ad7c-a00adbcdc418"
    - stage: seal
      stageUuid: "7893a839-759d-8460-8053-38c27f967e95"
    - stage: uuid
      stageUuid: "11672861-f3ba-8e9b-8c89-4f8eaa10605c"
version: 2
---
# plugins/versions — versioning is enabled at the chokepoint, never per collection

`versionsPlugin` turns on Payload's native `versions` for every collection except those named in
`VERSIONS_EXCLUDE`, with `DEFAULT_MAX_PER_DOC` bounding the history.

Per-collection opt-in means the collection added next Tuesday is unversioned and nobody notices
until its history is wanted. A chokepoint makes the exception explicit and countable.

Composes: [[law]].
