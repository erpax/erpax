---
name: camt054
description: "Use when parsing ISO 20022 camt.054 BankToCustomerDebitCreditNotification — credit/debit advice notifications."
atomPath: camt054
coordinate: "camt054 · 4/weave · 94f18fef"
contentUuid: "00f5487d-291f-5198-bd27-f8adda03d82f"
diamondUuid: "af628daa-c1b6-8a9b-8f12-d5a381031df8"
uuid: "94f18fef-ffd8-8c7f-acca-42492ed17469"
horo: 4
typography:
  partition: camt054
  bondDegree: 18
standards: []
bindings: []
signatures:
  computationUuid: "84a6c579-8bec-8e8d-867f-996a4a756c27"
  stages:
    - stage: path
      stageUuid: "293f30b8-f57e-887e-9f2f-d74e55a98c2e"
    - stage: trinity
      stageUuid: "6d556f28-1d4b-838a-92e8-b2b1fa0d3db3"
    - stage: boundary
      stageUuid: "fbdd0e7d-874c-8d82-9f43-5df9e87e6ca5"
    - stage: links
      stageUuid: "4bf5d85a-cba7-837c-aa01-842e9c581d46"
    - stage: horo
      stageUuid: "19613d54-41ac-8f73-b8d7-87261c6269d1"
    - stage: seal
      stageUuid: "82910eac-ae1a-8b5d-aa73-eddbcb2f8864"
    - stage: uuid
      stageUuid: "14737735-0cef-8cfe-9fec-a9fa043406f0"
version: 2
---
# camt.054 — Bank to Customer Debit Credit Notification

**Law — [[law]]: parse camt.054 debit/credit notification into the bank import dual; pairs with [[camt052]]/[[camt053]] statement family.**

Matter-twin: `src/camt054/import/service`. Composes [[iso]]/20022 · [[bank]].
