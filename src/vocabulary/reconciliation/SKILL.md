---
name: reconciliation
description: Use when modelling one reconciliation — the singular model of the reconciliations collection (the plural store); the matching of two records to confirm they agree.
atomPath: "vocabulary/reconciliation"
coordinate: "vocabulary/reconciliation · 2/share · 09373d61"
contentUuid: "1f06bebd-1f46-5b78-b6e4-fc2ebfd8f355"
diamondUuid: "303e95ff-f882-85a7-be49-3390462202c8"
uuid: "09373d61-7d14-89d6-9953-c9f324e4b8ed"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 27
standards: []
bindings: []
signatures:
  computationUuid: "1eb70360-a4dc-81d2-a83c-9d77c5db6b7e"
  stages:
    - stage: path
      stageUuid: "bd7d93f0-33fb-85cb-8394-0ea57d31c4c1"
    - stage: trinity
      stageUuid: "5643e776-20a6-820f-ac87-8dd9ce559be4"
    - stage: boundary
      stageUuid: "15bf71e8-0495-8d3b-9bda-aeac91b8c95e"
    - stage: links
      stageUuid: "be874b9b-52da-8c8e-9a4c-d4d03c9e2ae7"
    - stage: horo
      stageUuid: "37770bcb-0ddc-8571-9087-655ccf414e1b"
    - stage: seal
      stageUuid: "dcb3e658-a475-88ec-98a6-35297d75525a"
    - stage: uuid
      stageUuid: "c78cb077-4000-8725-9a55-ee07ef1c088b"
version: 2
---
# reconciliation — the model of one [[reconciliations]] row

The matching of two records to confirm they agree. The singular model whose plural store is the [[reconciliations]] collection ([[balance]]: every collection has its model).

Composes [[reconciliations]] · [[accounting]] · [[balance]].

**Law — [[law]]: a reconciliation closes only when the two records it matches net to zero difference; any residual stays open as a flagged exception.**

Composes: [[vocabulary]] · [[vocabulary]].
