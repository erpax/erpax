---
name: service
description: "Use when parsing camt.052 account-report import parser."
atomPath: "camt052/import/service"
coordinate: "camt052/import/service · 2/share · 351b9746"
contentUuid: "a7694d38-3bd4-5a5b-be60-d0c5f8a85be2"
diamondUuid: "75cba2d9-bd8a-8081-ac3e-131d47589bc8"
uuid: "351b9746-747c-850a-a820-36e7de53dfda"
horo: 2
typography:
  partition: camt052
  bondDegree: 27
standards:
  - "ISO-20022"
  - "ISO-20022 BankToCustomerAccountReportV08"
  - "ISO-20022 camt.052 bank-to-customer-account-report"
bindings: []
signatures:
  computationUuid: "90ed4e54-ceb6-8a13-9fe6-d5e963b17fd3"
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
      stageUuid: "5620f5f5-7510-849f-83fc-6d75efb47c58"
    - stage: seal
      stageUuid: "e9be0cc4-fe6d-8ff1-8ede-5349566f923c"
    - stage: uuid
      stageUuid: "38ad3c28-33ce-8a39-aecb-d10989d638af"
version: 2
---
# service — camt.052 account-report import parser

**Law — [[law]]: import service matter; parent ISO atom owns the message family.**

Matter-twin: `index.ts`. Composes [[iso]]/20022 · [[bank]].
