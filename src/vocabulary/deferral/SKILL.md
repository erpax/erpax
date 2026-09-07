---
name: deferral
description: "Use when deferring the recognition of revenue or expense to future periods pending contract performance, delivery, or time passage — the dual of accrual and core to IFRS-15 revenue recognition"
atomPath: "vocabulary/deferral"
coordinate: "vocabulary/deferral · 8/crest · b5f1a2fb"
contentUuid: "39eae32a-a450-5887-9df6-49a15fcca66e"
diamondUuid: "4aaeb476-8ddd-8c45-beb9-bd7f2ebf12a6"
uuid: "b5f1a2fb-9fad-8ee4-a28d-15eb56f9641c"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 34
standards: []
bindings: []
signatures:
  computationUuid: "87c5152c-0872-8664-8ce0-8af9a6583bab"
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
      stageUuid: "534bfd9a-3928-8c9c-a598-1f128405d89d"
    - stage: seal
      stageUuid: "36cd796a-475a-83d5-87c4-e875370ef0c3"
    - stage: uuid
      stageUuid: "ca0cf02b-fd8a-82cf-b86a-dab2288daada"
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
