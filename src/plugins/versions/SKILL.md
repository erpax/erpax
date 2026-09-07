---
name: versions
description: "Use when reasoning about versions — turns on Payload's native for every collection except those named in , with bounding the history."
atomPath: "plugins/versions"
coordinate: "plugins/versions · 1/base · 0f4db361"
contentUuid: "39bea922-f44d-5b0d-a8a2-4caf5a10d504"
diamondUuid: "d6ad66ea-70d2-8911-bf21-cf334baffd1e"
uuid: "0f4db361-9bc1-89d2-bdc9-245ebbc26bdd"
horo: 1
typography:
  partition: plugins
  bondDegree: 116
standards:
  - "ISO 19011:2018 §6.4.6 audit-evidence (version history is the trail)"
  - "SOX §404 internal-controls record-retention"
bindings: []
signatures:
  computationUuid: "d03e817a-2c17-8161-b06b-a65fe6541245"
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
      stageUuid: "1e3f1dce-654c-8d1f-836c-f04229193aab"
    - stage: seal
      stageUuid: "7893a839-759d-8460-8053-38c27f967e95"
    - stage: uuid
      stageUuid: "430dc03c-ed8c-893e-aa49-ab65640445b8"
version: 2
---
# plugins/versions — versioning is enabled at the chokepoint, never per collection

`versionsPlugin` turns on Payload's native `versions` for every collection except those named in
`VERSIONS_EXCLUDE`, with `DEFAULT_MAX_PER_DOC` bounding the history.

Per-collection opt-in means the collection added next Tuesday is unversioned and nobody notices
until its history is wanted. A chokepoint makes the exception explicit and countable.

Composes: [[law]].
