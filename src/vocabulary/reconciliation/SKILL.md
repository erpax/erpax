---
name: reconciliation
description: Use when modelling one reconciliation — the singular model of the reconciliations collection (the plural store); the matching of two records to confirm they agree.
atomPath: "vocabulary/reconciliation"
coordinate: "vocabulary/reconciliation · 1/base · 7518adce"
contentUuid: "ae69b1f7-4953-5e8c-8261-b009269870fe"
diamondUuid: "f590ca20-5f1e-820b-ba01-b2dcbd9bf479"
uuid: "7518adce-b787-88fb-be7b-610e26a992f2"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 35
standards: []
bindings: []
signatures:
  computationUuid: "3cf7cf0b-0963-813a-aab6-e1bc1d8637c1"
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
      stageUuid: "e03fb93b-abb8-88da-89f8-b77cc6eeb72c"
    - stage: seal
      stageUuid: "dcb3e658-a475-88ec-98a6-35297d75525a"
    - stage: uuid
      stageUuid: "4f89308c-4529-842f-a54a-4cecacb368ba"
version: 2
---
# reconciliation — the model of one [[reconciliations]] row

The matching of two records to confirm they agree. The singular model whose plural store is the [[reconciliations]] collection ([[balance]]: every collection has its model).

Composes [[reconciliations]] · [[accounting]] · [[balance]].

**Law — [[law]]: a reconciliation closes only when the two records it matches net to zero difference; any residual stays open as a flagged exception.**

Composes: [[vocabulary]] · [[vocabulary]].
