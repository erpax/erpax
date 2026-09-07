---
name: service
description: "Use when parsing camt.054 debit-credit notification import parser."
atomPath: "camt054/import/service"
coordinate: "camt054/import/service · 7/descent · 4963d41e"
contentUuid: "ae03b3dc-fa8c-5ef4-892c-64c0e05878e7"
diamondUuid: "5f0f0dd5-5b48-8305-9e5d-01b1b708c489"
uuid: "4963d41e-03f4-8f6a-b6f9-89ecf441f69f"
horo: 7
typography:
  partition: camt054
  bondDegree: 183
standards:
  - "ISO-20022 BankToCustomerDebitCreditNotificationV08"
  - "ISO-20022 camt.054 bank-to-customer-debit-credit-notification"
bindings: []
signatures:
  computationUuid: "3ab97bbf-3d17-8aa4-aba6-639763942060"
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
      stageUuid: "7dc09e71-6fd5-860b-81ca-d2f1031fb6f2"
    - stage: seal
      stageUuid: "11ad73e0-e99f-8255-b3df-7970458c8003"
    - stage: uuid
      stageUuid: "3f9c65ae-a4e4-8278-bbc8-3ffc7a3799f3"
version: 2
---
# service — camt.054 debit-credit notification import parser

**Law — [[law]]: import service matter; parent ISO atom owns the message family.**

Matter-twin: `index.ts`. Composes [[iso]]/20022 · [[bank]].
