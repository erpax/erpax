---
name: reconciliation
description: Use when modelling one reconciliation — the singular model of the reconciliations collection (the plural store); the matching of two records to confirm they agree.
atomPath: "vocabulary/reconciliation"
coordinate: "vocabulary/reconciliation · 1/base · 72a98e70"
contentUuid: "05f31d99-7346-5451-8cd2-48036c006b26"
diamondUuid: "b1c68c7f-4daa-824b-9b64-2f0651d5c188"
uuid: "72a98e70-e72d-8d21-8391-08508a36a841"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 35
standards: []
bindings: []
signatures:
  computationUuid: "407de0dc-f99e-8bdd-80e6-26fb034c1886"
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
      stageUuid: "542b208d-eda0-8866-bec6-cdd40c36d27b"
    - stage: seal
      stageUuid: "dcb3e658-a475-88ec-98a6-35297d75525a"
    - stage: uuid
      stageUuid: "595db64b-73cf-8c4d-a098-179acb79f2db"
version: 2
---
# reconciliation — the model of one [[reconciliations]] row

The matching of two records to confirm they agree. The singular model whose plural store is the [[reconciliations]] collection ([[balance]]: every collection has its model).

Composes [[reconciliations]] · [[accounting]] · [[balance]].

**Law — [[law]]: a reconciliation closes only when the two records it matches net to zero difference; any residual stays open as a flagged exception.**

Composes: [[vocabulary]] · [[vocabulary]].
