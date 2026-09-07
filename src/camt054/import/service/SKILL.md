---
name: service
description: "Use when parsing camt.054 debit-credit notification import parser."
atomPath: "camt054/import/service"
coordinate: "camt054/import/service · 7/descent · 0f3a7111"
contentUuid: "07f60236-45b5-5dfc-aecc-76da5adf44c2"
diamondUuid: "4a67b1d3-33ef-87c0-bd96-83b25c1d5e0b"
uuid: "0f3a7111-cbbe-8ba3-a318-c3a9127c982b"
horo: 7
typography:
  partition: camt054
  bondDegree: 183
standards:
  - "ISO-20022 BankToCustomerDebitCreditNotificationV08"
  - "ISO-20022 camt.054 bank-to-customer-debit-credit-notification"
bindings: []
signatures:
  computationUuid: "8f422087-3a7d-8daf-b2ba-16f1268d7a7a"
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
      stageUuid: "a096ee59-8b3c-82c0-ba3e-f8221c36b512"
    - stage: seal
      stageUuid: "11ad73e0-e99f-8255-b3df-7970458c8003"
    - stage: uuid
      stageUuid: "a3f053ea-2a75-8685-940b-c7a8b604cafd"
version: 2
---
# service — camt.054 debit-credit notification import parser

**Law — [[law]]: import service matter; parent ISO atom owns the message family.**

Matter-twin: `index.ts`. Composes [[iso]]/20022 · [[bank]].
