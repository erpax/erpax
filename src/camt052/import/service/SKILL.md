---
name: service
description: "Use when parsing camt.052 account-report import parser."
atomPath: "camt052/import/service"
coordinate: "camt052/import/service · 1/base · df2e802b"
contentUuid: "60c7ae82-75b0-5cd1-8615-264ce9d894b9"
diamondUuid: "545f1859-e531-88bf-9d5a-37a848883ed4"
uuid: "df2e802b-c028-8e17-b345-3660d4671030"
horo: 1
typography:
  partition: camt052
  bondDegree: 183
standards:
  - "ISO-20022"
  - "ISO-20022 BankToCustomerAccountReportV08"
  - "ISO-20022 camt.052 bank-to-customer-account-report"
bindings: []
signatures:
  computationUuid: "f75d0375-4f39-8d31-b1a1-b14f31bda2e0"
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
      stageUuid: "29418600-8b3e-8367-a365-114bc7ca5b3c"
    - stage: seal
      stageUuid: "e9be0cc4-fe6d-8ff1-8ede-5349566f923c"
    - stage: uuid
      stageUuid: "5c2078f5-4a41-8788-aef4-b6adfaacca50"
version: 2
---
# service — camt.052 account-report import parser

**Law — [[law]]: import service matter; parent ISO atom owns the message family.**

Matter-twin: `index.ts`. Composes [[iso]]/20022 · [[bank]].
