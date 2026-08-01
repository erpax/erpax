---
name: deferral
description: "Use when deferring the recognition of revenue or expense to future periods pending contract performance, delivery, or time passage — the dual of accrual and core to IFRS-15 revenue recognition"
atomPath: "vocabulary/deferral"
coordinate: "vocabulary/deferral · 4/weave · 55777798"
contentUuid: "ee3b5ca1-a0a5-59ad-b744-72a2a229e317"
diamondUuid: "248f0a8b-2208-8329-a295-860472b994aa"
uuid: "55777798-24e2-8735-83c4-012cdd424ad8"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 34
standards: []
bindings: []
signatures:
  computationUuid: "d9538bfc-2f96-8809-9290-1a9f9f6ec91e"
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
      stageUuid: "390b9281-4e5e-8963-9473-f016d59c3366"
    - stage: seal
      stageUuid: "b4a7032d-153d-86a0-90f6-e63db5e8fd38"
    - stage: uuid
      stageUuid: "75e93c9f-44e5-8ac8-bcbb-0c3a3214d82e"
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
