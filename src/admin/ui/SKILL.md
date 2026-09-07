---
name: ui
description: "Use when reasoning about ui — The barrel re-exports what the panel needs: and for how a collection presents itself, the corpus-rollup readers that compute the dashboard's entropy figures, and the cells…"
atomPath: "admin/ui"
coordinate: "admin/ui · 7/descent · a080abb7"
contentUuid: "235f926b-0e2d-56f8-8d07-eaa29bf8e7fc"
diamondUuid: "f85d390a-31e1-8817-b47c-b62391c52172"
uuid: "a080abb7-7325-8acd-b24f-dee88d491614"
horo: 7
typography:
  partition: admin
  bondDegree: 55
standards: []
bindings: []
signatures:
  computationUuid: "a9857f48-5c5f-8de7-843e-34f05cc0f430"
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
      stageUuid: "78841064-452a-8af5-99ed-a76099fd5c5a"
    - stage: seal
      stageUuid: "3a28ba9e-8364-8dd9-8a45-415aa487982b"
    - stage: uuid
      stageUuid: "7a5ee2e3-e335-8776-ae63-79bfd49f3b5d"
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
