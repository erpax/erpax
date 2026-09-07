---
name: service
description: "Use when parsing camt.052 account-report import parser."
atomPath: "camt052/import/service"
coordinate: "camt052/import/service · 7/descent · f35dd01c"
contentUuid: "558948eb-3c7f-55d9-8d32-26a8aefe3fe7"
diamondUuid: "54024ebe-4a9e-833d-9ad6-bda79bec22b0"
uuid: "f35dd01c-3e17-860d-86ae-6bdd8a4cbc28"
horo: 7
typography:
  partition: camt052
  bondDegree: 183
standards:
  - "ISO-20022"
  - "ISO-20022 BankToCustomerAccountReportV08"
  - "ISO-20022 camt.052 bank-to-customer-account-report"
bindings: []
signatures:
  computationUuid: "3ba5af85-8625-8007-8130-b457d6d9136d"
  stages:
    - stage: path
      stageUuid: "78749ad8-abf9-883a-841b-fda6fb63a513"
    - stage: trinity
      stageUuid: "f128bd8e-cf72-8de0-88ca-059a33e24a7f"
    - stage: boundary
      stageUuid: "709a790e-d46e-8d79-8224-0d5176b9137d"
    - stage: links
      stageUuid: "fe696e50-e0d1-8afb-b7bc-65db52960773"
    - stage: horo
      stageUuid: "6deaa903-56c6-89b6-a647-dd43ae9b456d"
    - stage: seal
      stageUuid: "e9be0cc4-fe6d-8ff1-8ede-5349566f923c"
    - stage: uuid
      stageUuid: "57518a5a-d571-894c-a583-d7d2bcbb30e0"
version: 2
---
# service — camt.052 account-report import parser

**Law — [[law]]: import service matter; parent ISO atom owns the message family.**

Matter-twin: `index.ts`. Composes [[iso]]/20022 · [[bank]].
