---
name: service
description: "Use when parsing camt.054 debit-credit notification import parser."
atomPath: "camt054/import/service"
coordinate: "camt054/import/service · 2/share · 17b6bc64"
contentUuid: "45e988e9-3129-525a-8e6b-b723c158ef49"
diamondUuid: "e085b531-2fea-8867-b661-44bdb710ad39"
uuid: "17b6bc64-fb64-85ae-82bf-4eb1e5b1c997"
horo: 2
typography:
  partition: camt054
  bondDegree: 183
standards:
  - "ISO-20022 BankToCustomerDebitCreditNotificationV08"
  - "ISO-20022 camt.054 bank-to-customer-debit-credit-notification"
bindings: []
signatures:
  computationUuid: "51062121-c17e-86e6-ad37-37510c5fb235"
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
      stageUuid: "d44b288b-1734-8f56-9499-feca68d21dc2"
    - stage: seal
      stageUuid: "11ad73e0-e99f-8255-b3df-7970458c8003"
    - stage: uuid
      stageUuid: "4cdf2112-5749-8f1c-a615-96a5333cef2d"
version: 2
---
# service — camt.054 debit-credit notification import parser

**Law — [[law]]: import service matter; parent ISO atom owns the message family.**

Matter-twin: `index.ts`. Composes [[iso]]/20022 · [[bank]].
