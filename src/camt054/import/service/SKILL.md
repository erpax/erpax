---
name: service
description: "Use when parsing camt.054 debit-credit notification import parser."
atomPath: "camt054/import/service"
coordinate: "camt054/import/service · 8/crest · 75698ae9"
contentUuid: "10bf527e-2840-592b-92d2-b6c03686b75a"
diamondUuid: "4abdda19-ae34-8068-a581-4f41752d99f9"
uuid: "75698ae9-5949-8b6b-a4e4-fe8624a3baff"
horo: 8
typography:
  partition: camt054
  bondDegree: 183
standards:
  - "ISO-20022 BankToCustomerDebitCreditNotificationV08"
  - "ISO-20022 camt.054 bank-to-customer-debit-credit-notification"
bindings: []
signatures:
  computationUuid: "3e1f15fc-3021-8657-9b8f-c2597e0bf30b"
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
      stageUuid: "c90b1671-ef1b-8996-bf79-dedf92882c69"
    - stage: seal
      stageUuid: "11ad73e0-e99f-8255-b3df-7970458c8003"
    - stage: uuid
      stageUuid: "5ad61701-a1ea-83e6-a363-04c2bcb9dcc5"
version: 2
---
# service — camt.054 debit-credit notification import parser

**Law — [[law]]: import service matter; parent ISO atom owns the message family.**

Matter-twin: `index.ts`. Composes [[iso]]/20022 · [[bank]].
