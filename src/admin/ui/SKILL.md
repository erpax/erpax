---
name: ui
description: "Use when reasoning about ui — The barrel re-exports what the panel needs: and for how a collection presents itself, the corpus-rollup readers that compute the dashboard's entropy figures, and the cells…"
atomPath: "admin/ui"
coordinate: "admin/ui · 5/round · 57729922"
contentUuid: "1056b1b5-f106-53e5-9cf9-6a32d80b9863"
diamondUuid: "341d6ae9-3620-88b2-b6a2-3eb2db2c3283"
uuid: "57729922-ac62-837c-93d7-be7faa7659a0"
horo: 5
typography:
  partition: admin
  bondDegree: 54
standards: []
bindings: []
signatures:
  computationUuid: "d34a76d7-bb94-8d74-a543-8cdc144693a5"
  stages:
    - stage: path
      stageUuid: "41689037-1c12-8723-92ea-7de001101a12"
    - stage: trinity
      stageUuid: "82a047f3-39b3-8c98-818a-be961a2c032e"
    - stage: boundary
      stageUuid: "6af510c7-43b8-88e9-abb9-de27b4a059da"
    - stage: links
      stageUuid: "3f359fd3-1f7e-819a-ba64-7bdf7f38601a"
    - stage: horo
      stageUuid: "34078104-7a71-813f-8f46-9bb3178728b6"
    - stage: seal
      stageUuid: "3a28ba9e-8364-8dd9-8a45-415aa487982b"
    - stage: uuid
      stageUuid: "74034b53-1171-8e0b-ad23-f16aa044d311"
version: 2
---
# admin/ui — the admin surface erpax adds, gathered behind one import

The barrel re-exports what the panel needs: `erpaxMetaOf` and `ERPAX_LIST_COLUMNS` for how a
collection presents itself, the corpus-rollup readers that compute the dashboard's entropy
figures, and the cells, fields, nav and violation views beside them.

The rollup is CACHED with an explicit TTL and an explicit clear, because it folds the whole
corpus and an admin page that recomputed it per render would make the panel the most expensive
thing in the system.

Composes: [[law]].
