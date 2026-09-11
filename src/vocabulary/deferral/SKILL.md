---
name: deferral
description: "Use when deferring the recognition of revenue or expense to future periods pending contract performance, delivery, or time passage — the dual of accrual and core to IFRS-15 revenue recognition"
atomPath: "vocabulary/deferral"
coordinate: "vocabulary/deferral · 2/share · 3cc5a16e"
contentUuid: "f3a24257-562c-5b99-a1e4-57b97a2baf6b"
diamondUuid: "08fc60e1-5901-8f8a-bfb9-820f278f3790"
uuid: "3cc5a16e-942e-8102-9421-14a753b1189e"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 34
standards: []
bindings: []
signatures:
  computationUuid: "ad387d7d-8071-843f-a560-ff847a59e9c3"
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
      stageUuid: "f1a8e684-5928-8e29-ae8b-69e94b54d6d8"
    - stage: seal
      stageUuid: "36cd796a-475a-83d5-87c4-e875370ef0c3"
    - stage: uuid
      stageUuid: "7c0bb7f6-568d-8ed8-8dd8-ae2ea9c5b1e5"
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
