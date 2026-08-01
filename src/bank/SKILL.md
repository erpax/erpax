---
name: bank
description: "Use when a transaction or account references banking infrastructure — bank account, bank statement, bank transfer, bank reconciliation. A financial institution context; relationTo: 'bank-accounts' or similar."
atomPath: bank
coordinate: "bank · 1/base · 4b589f30"
contentUuid: "0fdd6ad1-c985-5a24-8478-073c4f65265b"
diamondUuid: "7d0b8e12-4ae8-8b95-9604-fdc9d75e68af"
uuid: "4b589f30-4fe4-85e8-8de4-b592896e2a43"
horo: 1
typography:
  partition: bank
  bondDegree: 0
standards:
  - "EU-Intrastat-Reg-2019/2152"
  - "EU-Taxonomy-2020/852"
  - "ISO-13616-1"
  - "ISO-20022"
  - "ISO-20022:2022 · ISO-13616 · ISO-9362 · PSD2 · SEPA · NIST FIPS 203/204"
  - "ISO-4217"
  - "ISO-8601-1"
  - "ISO-9362"
  - PSD2
  - SEPA
  - "SWIFT-MT"
bindings: []
signatures:
  computationUuid: "ae738294-327e-8ff3-8b35-9ed43f51aa98"
  stages:
    - stage: path
      stageUuid: "f47989eb-c24a-8670-ba84-08dc33d21aeb"
    - stage: trinity
      stageUuid: "b0ed01af-634b-8364-96be-255f1134bbb7"
    - stage: boundary
      stageUuid: "461f4790-7252-8096-a20c-08ab177cbf38"
    - stage: links
      stageUuid: "4b166b48-5a2d-87f5-8ff3-3aa77af9f713"
    - stage: horo
      stageUuid: "f47151a2-24bd-8396-8567-fc61c043ca63"
    - stage: seal
      stageUuid: "50d8be56-7bc5-8cc7-9986-b3af6e6b59df"
    - stage: uuid
      stageUuid: "005ebee1-a891-8d5e-b26a-701bf5c9806e"
version: 2
---
# bank

Use when a transaction or account references banking infrastructure — bank account, bank statement, bank transfer, bank reconciliation. A financial institution context; relationTo: 'bank-accounts' or similar.

Composes: [[accounting]] · [[fields]] · [[identity]] · [[reconcile]] · [[transaction]].

**Law — [[law]]: `bank` is the financial-institution context a [[transaction]] or account references (account, statement, transfer, reconciliation) — it points OUT to the bank-accounts store, it is not the cash account itself.**
