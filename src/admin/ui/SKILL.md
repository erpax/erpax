---
name: ui
description: "Use when reasoning about ui — The barrel re-exports what the panel needs: and for how a collection presents itself, the corpus-rollup readers that compute the dashboard's entropy figures, and the cells…"
atomPath: "admin/ui"
coordinate: "admin/ui · 4/weave · 3361696d"
contentUuid: "2348c9e0-54c9-5159-966b-ebc30bf4869a"
diamondUuid: "78c2a201-dfbb-8c2e-bdb1-62ac58aa05a1"
uuid: "3361696d-1ed6-8d9d-822a-712fb3f0b190"
horo: 4
typography:
  partition: admin
  bondDegree: 55
standards: []
bindings: []
signatures:
  computationUuid: "32bf3695-2e1a-8cee-9cee-f488f6c08b26"
  stages:
    - stage: path
      stageUuid: "41689037-1c12-8723-92ea-7de001101a12"
    - stage: trinity
      stageUuid: "82a047f3-39b3-8c98-818a-be961a2c032e"
    - stage: boundary
      stageUuid: "d3128856-0285-857e-ba56-d66c8fa77b5f"
    - stage: links
      stageUuid: "3f359fd3-1f7e-819a-ba64-7bdf7f38601a"
    - stage: horo
      stageUuid: "dbf4526b-593d-800c-9620-610b5b6cd08d"
    - stage: seal
      stageUuid: "3a28ba9e-8364-8dd9-8a45-415aa487982b"
    - stage: uuid
      stageUuid: "6c2627ab-18aa-8c19-bbcc-bd966e76e422"
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
