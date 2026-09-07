---
name: bank
description: "Use when a transaction or account references banking infrastructure — bank account, bank statement, bank transfer, bank reconciliation. A financial institution context; relationTo: 'bank-accounts' or similar."
atomPath: bank
coordinate: "bank · 2/share · 9253d7d2"
contentUuid: "8f0c91a8-701c-5f05-b678-48171e09c124"
diamondUuid: "93aa494d-cbce-8292-86f4-3864fe857f01"
uuid: "9253d7d2-dfdc-8a25-8e87-d238f5c8c1a4"
horo: 2
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
  computationUuid: "ff02a719-6a45-8e25-a9b9-b0f0460c7cc8"
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
      stageUuid: "9ccbb4f4-eeed-81bf-80b5-b18090cb6a3c"
    - stage: seal
      stageUuid: "3b7cea07-dff4-8b0e-a478-c51b37992efb"
    - stage: uuid
      stageUuid: "089ad155-0ff5-8a5c-a982-0a92ec2ce7f2"
version: 2
---
# bank

Use when a transaction or account references banking infrastructure — bank account, bank statement, bank transfer, bank reconciliation. A financial institution context; relationTo: 'bank-accounts' or similar.

Composes: [[accounting]] · [[field]] · [[identity]] · [[reconcile]] · [[transaction]].

**Law — [[law]]: `bank` is the financial-institution context a [[transaction]] or account references (account, statement, transfer, reconciliation) — it points OUT to the bank-accounts store, it is not the cash account itself.**
