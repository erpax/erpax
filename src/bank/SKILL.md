---
name: bank
description: "Use when a transaction or account references banking infrastructure — bank account, bank statement, bank transfer, bank reconciliation. A financial institution context; relationTo: 'bank-accounts' or similar."
atomPath: bank
coordinate: "bank · 1/base · 53ac6fd2"
contentUuid: "c4d1f21c-c42a-5df5-9be3-2eaff562bed0"
diamondUuid: "24725762-ba1f-8912-8c00-2844d7669a67"
uuid: "53ac6fd2-e8eb-81ca-a88e-8ff3f8e7d08d"
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
  computationUuid: "53db9f26-b8eb-8c8c-a7dd-8ecc947799e2"
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
      stageUuid: "08c5aa4c-a1fe-80be-bcd9-c5211012fc59"
    - stage: seal
      stageUuid: "3b7cea07-dff4-8b0e-a478-c51b37992efb"
    - stage: uuid
      stageUuid: "e4cd456b-3b68-859c-be1b-8eafd4658af5"
version: 2
---
# bank

Use when a transaction or account references banking infrastructure — bank account, bank statement, bank transfer, bank reconciliation. A financial institution context; relationTo: 'bank-accounts' or similar.

Composes: [[accounting]] · [[field]] · [[identity]] · [[reconcile]] · [[transaction]].

**Law — [[law]]: `bank` is the financial-institution context a [[transaction]] or account references (account, statement, transfer, reconciliation) — it points OUT to the bank-accounts store, it is not the cash account itself.**
