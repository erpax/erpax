---
name: ui
description: "Use when reasoning about ui — The barrel re-exports what the panel needs: and for how a collection presents itself, the corpus-rollup readers that compute the dashboard's entropy figures, and the cells…"
atomPath: "admin/ui"
coordinate: "admin/ui · 8/crest · 0076f2f3"
contentUuid: "5757649e-d2f9-5adb-980a-2bc2b66d0dc6"
diamondUuid: "efec86bf-8789-8ac3-b44a-eb75e13453ad"
uuid: "0076f2f3-08f4-8074-8e06-ec293eab88ea"
horo: 8
typography:
  partition: admin
  bondDegree: 55
standards: []
bindings: []
signatures:
  computationUuid: "1afb8c66-2539-8d19-aee3-5ee9d4b0634b"
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
      stageUuid: "93c9a124-f2ce-899a-b88c-ec81197a8d61"
    - stage: seal
      stageUuid: "3a28ba9e-8364-8dd9-8a45-415aa487982b"
    - stage: uuid
      stageUuid: "299be05d-f40b-8866-9249-44fcc314c4e0"
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
