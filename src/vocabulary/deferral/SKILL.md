---
name: deferral
description: "Use when deferring the recognition of revenue or expense to future periods pending contract performance, delivery, or time passage — the dual of accrual and core to IFRS-15 revenue recognition"
atomPath: "vocabulary/deferral"
coordinate: "vocabulary/deferral · 5/round · 6379f876"
contentUuid: "ba70270a-d3db-5efd-8539-5d0b6837ce56"
diamondUuid: "7301425c-b203-84fd-bd13-4268741cc6a8"
uuid: "6379f876-6d7b-83c4-abab-fcd210e4815f"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 34
standards: []
bindings: []
signatures:
  computationUuid: "6ef1424a-ab5a-899f-9159-b8436617963f"
  stages:
    - stage: path
      stageUuid: "3b884f11-a29d-8269-9bd9-53480c0eb586"
    - stage: trinity
      stageUuid: "eef3d14e-7db5-8941-b878-4ca34d2dace6"
    - stage: boundary
      stageUuid: "c91e3a36-853b-8e68-8417-d2fb2f721b2f"
    - stage: links
      stageUuid: "90e9c7ee-1fb2-8b38-b2fd-27f46d9cf7ac"
    - stage: horo
      stageUuid: "d8c9c72e-0149-88a2-924f-0014f6db9aed"
    - stage: seal
      stageUuid: "36cd796a-475a-83d5-87c4-e875370ef0c3"
    - stage: uuid
      stageUuid: "77606f10-787e-8e5f-b2ea-2d59192af170"
version: 2
---
# deferral

Use when deferring the recognition of revenue or expense to future periods pending contract performance, delivery, or time passage — the dual of accrual and core to IFRS-15 revenue recognition

Composes: [[journal/entries]] · [[customers/contracts/contract/performances]] · [[gl/accounts/period/end/adjustments]] · [[gl/accounts/recurring/journals]] · [[accrual]] · [[prepaid]].

## Standards
- IFRS-15 §25 (contract liability)
- IAS-1 §27 (accrual basis)
- FASB ASC 606 §25

**Law — [[law]]: a deferral postpones recognition of revenue or expense to a future period pending contract performance, delivery or time passage — the dual of [[accrual]] and the core of IFRS-15 revenue recognition.**
