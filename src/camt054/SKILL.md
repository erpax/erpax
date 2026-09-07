---
name: camt054
description: "Use when parsing ISO 20022 camt.054 BankToCustomerDebitCreditNotification — credit/debit advice notifications."
atomPath: camt054
coordinate: "camt054 · 8/crest · 551d8cfb"
contentUuid: "0bb6b2a4-8362-5022-9dde-909491e9f18b"
diamondUuid: "4d3b7732-742b-8512-a40b-256f31ae05e4"
uuid: "551d8cfb-5c5d-8508-8cd8-2a883dde44c9"
horo: 8
typography:
  partition: camt054
  bondDegree: 18
standards: []
bindings: []
signatures:
  computationUuid: "5a88c4b8-af60-8adc-90ed-f11b80671178"
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
      stageUuid: "594517aa-b724-88a8-aac0-2d1eeebde464"
    - stage: seal
      stageUuid: "82910eac-ae1a-8b5d-aa73-eddbcb2f8864"
    - stage: uuid
      stageUuid: "3645d1e0-dad7-827e-b416-bc8abcd0312f"
version: 2
---
# camt.054 — Bank to Customer Debit Credit Notification

**Law — [[law]]: parse camt.054 debit/credit notification into the bank import dual; pairs with [[camt052]]/[[camt053]] statement family.**

Matter-twin: `src/camt054/import/service`. Composes [[iso]]/20022 · [[bank]].
