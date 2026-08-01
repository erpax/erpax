---
name: service
description: "Use when parsing camt.054 debit-credit notification import parser."
atomPath: "camt054/import/service"
coordinate: "camt054/import/service · 1/base · b7f9a1b9"
contentUuid: "a260156b-9887-5896-9e74-4af52d20a1eb"
diamondUuid: "3666685b-f507-8304-b4be-92048a7b1bb4"
uuid: "b7f9a1b9-a604-862d-a1cd-dcdd39da544d"
horo: 1
typography:
  partition: camt054
  bondDegree: 175
standards:
  - "ISO-20022 BankToCustomerDebitCreditNotificationV08"
  - "ISO-20022 camt.054 bank-to-customer-debit-credit-notification"
bindings: []
signatures:
  computationUuid: "fd258d24-ecec-8c80-b1d1-90fd79c9a31f"
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
      stageUuid: "732b9563-526b-87ee-bd40-ad2093f11755"
    - stage: seal
      stageUuid: "11ad73e0-e99f-8255-b3df-7970458c8003"
    - stage: uuid
      stageUuid: "66cf1ee5-f4cb-8cfb-b433-f6da3a4d9c7e"
version: 2
---
# service — camt.054 debit-credit notification import parser

**Law — [[law]]: import service matter; parent ISO atom owns the message family.**

Matter-twin: `index.ts`. Composes [[iso]]/20022 · [[bank]].
