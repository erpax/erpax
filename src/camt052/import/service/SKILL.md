---
name: service
description: "Use when parsing camt.052 account-report import parser."
atomPath: "camt052/import/service"
coordinate: "camt052/import/service · 5/round · c573b617"
contentUuid: "eb872902-01f3-54c4-8b16-5e45ae56dbe6"
diamondUuid: "3cc5ae9a-b58e-8035-8208-a92bc556f09a"
uuid: "c573b617-8ce6-8280-9506-0a6d70fa4f65"
horo: 5
typography:
  partition: camt052
  bondDegree: 183
standards:
  - "ISO-20022"
  - "ISO-20022 BankToCustomerAccountReportV08"
  - "ISO-20022 camt.052 bank-to-customer-account-report"
bindings: []
signatures:
  computationUuid: "96208487-ed30-8329-bf72-c8d57c3b41f7"
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
      stageUuid: "3844cad4-0a03-8caa-a054-4d539fa7dd2c"
    - stage: seal
      stageUuid: "e9be0cc4-fe6d-8ff1-8ede-5349566f923c"
    - stage: uuid
      stageUuid: "5ecd853b-3c6c-8b75-b2cd-5ab0d259f239"
version: 2
---
# service — camt.052 account-report import parser

**Law — [[law]]: import service matter; parent ISO atom owns the message family.**

Matter-twin: `index.ts`. Composes [[iso]]/20022 · [[bank]].
