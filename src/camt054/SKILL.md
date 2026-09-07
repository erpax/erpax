---
name: camt054
description: "Use when parsing ISO 20022 camt.054 BankToCustomerDebitCreditNotification — credit/debit advice notifications."
atomPath: camt054
coordinate: "camt054 · 8/crest · 63e4d1da"
contentUuid: "389a8b56-0373-5013-b550-10121938ef3b"
diamondUuid: "e6b548d7-f6eb-8cff-9601-01d28672f2c3"
uuid: "63e4d1da-bd96-858c-856c-c93ca61b1e60"
horo: 8
typography:
  partition: camt054
  bondDegree: 18
standards: []
bindings: []
signatures:
  computationUuid: "e61aaafe-f97b-8f89-a079-2f0873cefd72"
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
      stageUuid: "89e2ac54-6828-8397-b6ff-505475fb3f3d"
    - stage: seal
      stageUuid: "82910eac-ae1a-8b5d-aa73-eddbcb2f8864"
    - stage: uuid
      stageUuid: "1e0c5e85-2998-8e0c-8c84-31807ab0c037"
version: 2
---
# camt.054 — Bank to Customer Debit Credit Notification

**Law — [[law]]: parse camt.054 debit/credit notification into the bank import dual; pairs with [[camt052]]/[[camt053]] statement family.**

Matter-twin: `src/camt054/import/service`. Composes [[iso]]/20022 · [[bank]].
