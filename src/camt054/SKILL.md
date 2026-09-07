---
name: camt054
description: "Use when parsing ISO 20022 camt.054 BankToCustomerDebitCreditNotification — credit/debit advice notifications."
atomPath: camt054
coordinate: "camt054 · 2/share · 4d551750"
contentUuid: "e752b3f4-56ff-5fd1-880d-a46dafd74683"
diamondUuid: "e42b541e-f2c8-8766-93a0-c35491c7fbbd"
uuid: "4d551750-0408-8e0a-acf6-4b1ff2f26d63"
horo: 2
typography:
  partition: camt054
  bondDegree: 18
standards: []
bindings: []
signatures:
  computationUuid: "fa8288aa-181b-83ba-959f-6454212b14e2"
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
      stageUuid: "b397f9ef-6e1b-80e2-b5e0-95f5ff02dc64"
    - stage: seal
      stageUuid: "82910eac-ae1a-8b5d-aa73-eddbcb2f8864"
    - stage: uuid
      stageUuid: "b0929c53-d246-8686-a353-ec85de2dc84b"
version: 2
---
# camt.054 — Bank to Customer Debit Credit Notification

**Law — [[law]]: parse camt.054 debit/credit notification into the bank import dual; pairs with [[camt052]]/[[camt053]] statement family.**

Matter-twin: `src/camt054/import/service`. Composes [[iso]]/20022 · [[bank]].
