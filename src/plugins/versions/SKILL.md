---
name: versions
description: "Use when reasoning about versions — turns on Payload's native for every collection except those named in , with bounding the history."
atomPath: "plugins/versions"
coordinate: "plugins/versions · 7/descent · f80ff56a"
contentUuid: "0b72d32d-f229-586f-8ab5-06816e92e834"
diamondUuid: "92919b95-a65c-82e2-ab16-3cf19caa16ce"
uuid: "f80ff56a-f41a-8afb-a9bc-5409ceaef487"
horo: 7
typography:
  partition: plugins
  bondDegree: 116
standards:
  - "ISO 19011:2018 §6.4.6 audit-evidence (version history is the trail)"
  - "SOX §404 internal-controls record-retention"
bindings: []
signatures:
  computationUuid: "cb43da64-635a-8f23-9127-9a6b5b5c0327"
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
      stageUuid: "53bb821a-4460-8876-bf7b-a3c3447fc1ba"
    - stage: seal
      stageUuid: "7893a839-759d-8460-8053-38c27f967e95"
    - stage: uuid
      stageUuid: "a0b5a175-aace-88fd-9c26-c3113a19fc86"
version: 2
---
# plugins/versions — versioning is enabled at the chokepoint, never per collection

`versionsPlugin` turns on Payload's native `versions` for every collection except those named in
`VERSIONS_EXCLUDE`, with `DEFAULT_MAX_PER_DOC` bounding the history.

Per-collection opt-in means the collection added next Tuesday is unversioned and nobody notices
until its history is wanted. A chokepoint makes the exception explicit and countable.

Composes: [[law]].
