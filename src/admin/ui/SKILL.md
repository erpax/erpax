---
name: ui
description: "Use when reasoning about ui — The barrel re-exports what the panel needs: and for how a collection presents itself, the corpus-rollup readers that compute the dashboard's entropy figures, and the cells…"
atomPath: "admin/ui"
coordinate: "admin/ui · 1/base · 800c5a2d"
contentUuid: "9b5b1d36-d640-56b0-906e-d08efac4798d"
diamondUuid: "524ae2d8-4c6d-82aa-a3f5-eb9cf5c04665"
uuid: "800c5a2d-8d91-84dc-ac99-8ec2dc2cccf4"
horo: 1
typography:
  partition: admin
  bondDegree: 55
standards: []
bindings: []
signatures:
  computationUuid: "b7e1e3a5-d2db-8ab5-a3b2-9a227c49dead"
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
      stageUuid: "2339f01b-2df6-8d08-8bf7-10fc6b3cb357"
    - stage: seal
      stageUuid: "3a28ba9e-8364-8dd9-8a45-415aa487982b"
    - stage: uuid
      stageUuid: "6e0fd299-26f6-811e-af9f-b5d23539eea4"
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
