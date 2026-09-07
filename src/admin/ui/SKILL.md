---
name: ui
description: "Use when reasoning about ui — The barrel re-exports what the panel needs: and for how a collection presents itself, the corpus-rollup readers that compute the dashboard's entropy figures, and the cells…"
atomPath: "admin/ui"
coordinate: "admin/ui · 4/weave · d1b3b6e2"
contentUuid: "25555ef3-3e3f-5efa-9954-2f8fe470f65c"
diamondUuid: "05c10276-0dad-841c-b683-75f5ca1f7ea1"
uuid: "d1b3b6e2-69bf-8c3e-b8ac-ecc07713a80c"
horo: 4
typography:
  partition: admin
  bondDegree: 55
standards: []
bindings: []
signatures:
  computationUuid: "a28d23a0-788e-8709-87d0-b6ac19766572"
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
      stageUuid: "76efd768-05de-8fae-a5e3-7f1bd059441a"
    - stage: seal
      stageUuid: "3a28ba9e-8364-8dd9-8a45-415aa487982b"
    - stage: uuid
      stageUuid: "18272ffd-2aac-8c96-aa47-e72c820f9965"
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
