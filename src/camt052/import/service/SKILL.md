---
name: service
description: "Use when parsing camt.052 account-report import parser."
atomPath: "camt052/import/service"
coordinate: "camt052/import/service · 2/share · 0aa0da81"
contentUuid: "41857e6b-e701-5cea-ab0c-9f4f8915495d"
diamondUuid: "92e9ac79-c5d9-8611-85f0-8b83ee6ddc69"
uuid: "0aa0da81-287b-8c63-979e-15025e96dcc8"
horo: 2
typography:
  partition: camt052
  bondDegree: 183
standards:
  - "ISO-20022"
  - "ISO-20022 BankToCustomerAccountReportV08"
  - "ISO-20022 camt.052 bank-to-customer-account-report"
bindings: []
signatures:
  computationUuid: "4397fe23-3817-8b80-9a61-4c5c345a98a2"
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
      stageUuid: "94ed98e6-65ff-8e7a-91a6-9b0bdf3ee522"
    - stage: seal
      stageUuid: "e9be0cc4-fe6d-8ff1-8ede-5349566f923c"
    - stage: uuid
      stageUuid: "f1198dc1-ef5e-8095-97d9-7188edf18bab"
version: 2
---
# service — camt.052 account-report import parser

**Law — [[law]]: import service matter; parent ISO atom owns the message family.**

Matter-twin: `index.ts`. Composes [[iso]]/20022 · [[bank]].
