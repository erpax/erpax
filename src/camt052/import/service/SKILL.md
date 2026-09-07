---
name: service
description: "Use when parsing camt.052 account-report import parser."
atomPath: "camt052/import/service"
coordinate: "camt052/import/service · 7/descent · ced1a49f"
contentUuid: "9bb9bcee-2595-5ff7-8320-b26b1c6dd9b5"
diamondUuid: "9407ad79-6b90-84d4-95ed-1986913fe49b"
uuid: "ced1a49f-e6a9-8496-84aa-f2ec5c805f8e"
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
  computationUuid: "6d19c902-030f-8733-8cce-cb1d6fb7f4d1"
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
      stageUuid: "3b64b9cf-4abb-89dc-bd0a-7ec8471b6b00"
    - stage: seal
      stageUuid: "e9be0cc4-fe6d-8ff1-8ede-5349566f923c"
    - stage: uuid
      stageUuid: "48d5fafd-44a8-8e91-92dd-13d8a27d98da"
version: 2
---
# service — camt.052 account-report import parser

**Law — [[law]]: import service matter; parent ISO atom owns the message family.**

Matter-twin: `index.ts`. Composes [[iso]]/20022 · [[bank]].
