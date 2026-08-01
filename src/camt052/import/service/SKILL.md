---
name: service
description: "Use when parsing camt.052 account-report import parser."
atomPath: "camt052/import/service"
coordinate: "camt052/import/service · 8/crest · 1f8d96a6"
contentUuid: "b4deb21e-1e45-5de0-bb4b-b701cfa8bce7"
diamondUuid: "5de1d89c-2869-8694-9499-79f2020f599d"
uuid: "1f8d96a6-77b6-8d7e-a348-c1520b890e5d"
horo: 8
typography:
  partition: camt052
  bondDegree: 175
standards:
  - "ISO-20022"
  - "ISO-20022 BankToCustomerAccountReportV08"
  - "ISO-20022 camt.052 bank-to-customer-account-report"
bindings: []
signatures:
  computationUuid: "2a2434be-66c8-8e29-9697-bec101454eaa"
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
      stageUuid: "dc0ae4fd-b470-827e-a1a7-3bc19c7a0ed6"
    - stage: seal
      stageUuid: "e9be0cc4-fe6d-8ff1-8ede-5349566f923c"
    - stage: uuid
      stageUuid: "8ae78c9c-5659-8548-9caa-c928aecb570d"
version: 2
---
# service — camt.052 account-report import parser

**Law — [[law]]: import service matter; parent ISO atom owns the message family.**

Matter-twin: `index.ts`. Composes [[iso]]/20022 · [[bank]].
