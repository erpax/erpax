---
name: deferral
description: "Use when deferring the recognition of revenue or expense to future periods pending contract performance, delivery, or time passage — the dual of accrual and core to IFRS-15 revenue recognition"
atomPath: "vocabulary/deferral"
coordinate: "vocabulary/deferral · 5/round · 7ead3831"
contentUuid: "63f77437-242f-5847-b499-5151e297db42"
diamondUuid: "4741f654-d6d9-8d1f-8a95-321046f50893"
uuid: "7ead3831-ffb6-8cc3-8882-81c7b7775f3a"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 34
standards: []
bindings: []
signatures:
  computationUuid: "7bb199e9-e88b-8b97-8af0-5b8c42fe090f"
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
      stageUuid: "26915bd3-8ccc-8a61-82c0-15502a05cae1"
    - stage: seal
      stageUuid: "36cd796a-475a-83d5-87c4-e875370ef0c3"
    - stage: uuid
      stageUuid: "1fcdd2fa-bb89-82ad-afc1-3c5b6b74516d"
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
