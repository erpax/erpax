---
name: camt054
description: "Use when parsing ISO 20022 camt.054 BankToCustomerDebitCreditNotification — credit/debit advice notifications."
atomPath: camt054
coordinate: "camt054 · 4/weave · ee5f3855"
contentUuid: "6b36887a-c586-542e-80d9-c67ec53529e2"
diamondUuid: "2accf499-cd46-8c5c-98af-0ca855ae0f8a"
uuid: "ee5f3855-330e-8d6d-9847-2243a5e48af8"
horo: 4
typography:
  partition: camt054
  bondDegree: 18
standards: []
bindings: []
signatures:
  computationUuid: "f3578576-96d3-852a-8eff-4ffaef4bc60e"
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
      stageUuid: "29d09067-8b04-8903-9e0b-051235567133"
    - stage: seal
      stageUuid: "82910eac-ae1a-8b5d-aa73-eddbcb2f8864"
    - stage: uuid
      stageUuid: "30f72a66-d721-8679-b825-66f23ecce95d"
version: 2
---
# camt.054 — Bank to Customer Debit Credit Notification

**Law — [[law]]: parse camt.054 debit/credit notification into the bank import dual; pairs with [[camt052]]/[[camt053]] statement family.**

Matter-twin: `src/camt054/import/service`. Composes [[iso]]/20022 · [[bank]].
