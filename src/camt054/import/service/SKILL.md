---
name: service
description: "Use when parsing camt.054 debit-credit notification import parser."
atomPath: "camt054/import/service"
coordinate: "camt054/import/service · 2/share · 17b6bc64"
contentUuid: "6865bf40-e5b6-5db4-9569-c99179aa6139"
diamondUuid: "f5ed3466-12ec-8574-b7cb-c21297242f06"
uuid: "17b6bc64-fb64-85ae-82bf-4eb1e5b1c997"
horo: 2
typography:
  partition: camt054
  bondDegree: 27
standards:
  - "ISO-20022 BankToCustomerDebitCreditNotificationV08"
  - "ISO-20022 camt.054 bank-to-customer-debit-credit-notification"
bindings: []
signatures:
  computationUuid: "33ce46cc-3411-8cba-9bb9-f1438c1fe095"
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
      stageUuid: "58cbe1ef-4f2a-8244-8c89-b08e837e30fe"
    - stage: seal
      stageUuid: "11ad73e0-e99f-8255-b3df-7970458c8003"
    - stage: uuid
      stageUuid: "13118293-4f0c-88da-9987-879b38d84c67"
version: 2
---
# service — camt.054 debit-credit notification import parser

**Law — [[law]]: import service matter; parent ISO atom owns the message family.**

Matter-twin: `index.ts`. Composes [[iso]]/20022 · [[bank]].
