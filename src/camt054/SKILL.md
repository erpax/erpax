---
name: camt054
description: "Use when parsing ISO 20022 camt.054 BankToCustomerDebitCreditNotification — credit/debit advice notifications."
atomPath: camt054
coordinate: "camt054 · 4/weave · 0e0265b2"
contentUuid: "65a776e3-aac2-588b-a90c-b092eb686d23"
diamondUuid: "4de6d89d-cc5b-83ef-ba0a-e4629b3d7bbe"
uuid: "0e0265b2-0237-8cf3-ab65-9c7b50eece9a"
horo: 4
typography:
  partition: camt054
  bondDegree: 0
standards: []
bindings: []
signatures:
  computationUuid: "5c8263d9-abed-8057-ab80-a831f105e0aa"
  stages:
    - stage: path
      stageUuid: "293f30b8-f57e-887e-9f2f-d74e55a98c2e"
    - stage: trinity
      stageUuid: "2c8f542c-7fdd-8e07-b746-beee326fbfcc"
    - stage: boundary
      stageUuid: "fea13688-9693-8f81-93cf-d337d5b2cf1a"
    - stage: links
      stageUuid: "4bf5d85a-cba7-837c-aa01-842e9c581d46"
    - stage: horo
      stageUuid: "add8766e-ca7d-8b58-82c2-0d8948b09f23"
    - stage: seal
      stageUuid: "154dbce1-73f9-8df5-9957-5b77f66c339c"
    - stage: uuid
      stageUuid: "f65a745c-d951-8f5a-b216-3f64334f9af5"
version: 2
---
# camt.054 — Bank to Customer Debit Credit Notification

**Law — [[law]]: parse camt.054 debit/credit notification into the bank import dual; pairs with [[camt052]]/[[camt053]] statement family.**

Matter-twin: `src/camt054/import/service`. Composes [[iso]]/20022 · [[bank]].
