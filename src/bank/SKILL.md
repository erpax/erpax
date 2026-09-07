---
name: bank
description: "Use when a transaction or account references banking infrastructure — bank account, bank statement, bank transfer, bank reconciliation. A financial institution context; relationTo: 'bank-accounts' or similar."
atomPath: bank
coordinate: "bank · 1/base · b69a3fd2"
contentUuid: "0b5614b6-24d3-5e20-a1e2-811c4c0de1b9"
diamondUuid: "ef568e9f-1e9e-88ca-97f9-59fb4fb628b9"
uuid: "b69a3fd2-b218-8632-a98e-38a90d943d7d"
horo: 1
typography:
  partition: bank
  bondDegree: 73
standards:
  - "EU-Intrastat-Reg-2019/2152"
  - "EU-Taxonomy-2020/852"
  - "ISO-13616-1"
  - "ISO-20022"
  - "ISO-20022:2022 · ISO-13616 · ISO-9362 · PSD2 · SEPA · NIST FIPS 203/204"
  - "ISO-4217"
  - "ISO-8601-1"
  - "ISO-9362"
  - "ISO/IEC-29119"
  - PSD2
  - SEPA
  - "SWIFT-MT"
bindings: []
signatures:
  computationUuid: "298cbaff-efe0-88e1-b679-2709334d2f71"
  stages:
    - stage: path
      stageUuid: "f47989eb-c24a-8670-ba84-08dc33d21aeb"
    - stage: trinity
      stageUuid: "b0ed01af-634b-8364-96be-255f1134bbb7"
    - stage: boundary
      stageUuid: "228cc1a2-8e88-8aab-83d7-a79a92d66ba8"
    - stage: links
      stageUuid: "a1ad83f2-0241-8aba-9d33-82b285ddc3b8"
    - stage: horo
      stageUuid: "91429fc3-de07-86e5-a222-e453fa183d2e"
    - stage: seal
      stageUuid: "3b7cea07-dff4-8b0e-a478-c51b37992efb"
    - stage: uuid
      stageUuid: "b929d9de-ed11-8ff7-9ddb-9d79b951f9f8"
version: 2
---
# bank

Use when a transaction or account references banking infrastructure — bank account, bank statement, bank transfer, bank reconciliation. A financial institution context; relationTo: 'bank-accounts' or similar.

Composes: [[accounting]] · [[field]] · [[identity]] · [[reconcile]] · [[transaction]].

**Law — [[law]]: `bank` is the financial-institution context a [[transaction]] or account references (account, statement, transfer, reconciliation) — it points OUT to the bank-accounts store, it is not the cash account itself.**
