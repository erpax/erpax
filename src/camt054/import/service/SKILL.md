---
name: service
description: "Use when parsing camt.054 debit-credit notification import parser."
atomPath: "camt054/import/service"
coordinate: "camt054/import/service · 2/share · d2b0e3bd"
contentUuid: "d942d069-da86-53f5-b10c-8021c6c51777"
diamondUuid: "87d51f77-ff29-8026-a0af-3f3b61745ce4"
uuid: "d2b0e3bd-eed7-80e0-b5ea-c9b4e4cec638"
horo: 2
typography:
  partition: camt054
  bondDegree: 183
standards:
  - "ISO-20022 BankToCustomerDebitCreditNotificationV08"
  - "ISO-20022 camt.054 bank-to-customer-debit-credit-notification"
bindings: []
signatures:
  computationUuid: "f6e6fb71-db4f-8a4f-ad20-7e44f847ec20"
  stages:
    - stage: path
      stageUuid: "dd8393b9-67b5-8774-ab1d-29dfb4295c47"
    - stage: trinity
      stageUuid: "e2c47df8-6a09-8892-ac0a-137be865b97d"
    - stage: boundary
      stageUuid: "c83fde35-3065-8997-9a7b-79f5b3aec45a"
    - stage: links
      stageUuid: "c0e83f59-c17c-8629-850f-2ebad5d6ba21"
    - stage: horo
      stageUuid: "a51072f5-f132-8659-a600-d0c98b8579a7"
    - stage: seal
      stageUuid: "11ad73e0-e99f-8255-b3df-7970458c8003"
    - stage: uuid
      stageUuid: "03a71a08-211f-872c-ac22-3534b31cd5f7"
version: 2
---
# service — camt.054 debit-credit notification import parser

**Law — [[law]]: import service matter; parent ISO atom owns the message family.**

Matter-twin: `index.ts`. Composes [[iso]]/20022 · [[bank]].
