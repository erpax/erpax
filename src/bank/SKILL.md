---
name: bank
description: "Use when a transaction or account references banking infrastructure — bank account, bank statement, bank transfer, bank reconciliation. A financial institution context; relationTo: 'bank-accounts' or similar."
atomPath: bank
coordinate: "bank · 7/descent · f08fd115"
contentUuid: "10c6c0f3-1ea0-5aaf-87bd-6fb3e3a17235"
diamondUuid: "e1b67ee9-d478-8769-ac98-420f3c953d3c"
uuid: "f08fd115-e0b6-8ed1-aae5-c37bfac0963d"
horo: 7
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
  computationUuid: "13969d39-4d45-898a-82cc-b1f89487a155"
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
      stageUuid: "1a347bb2-a2a8-80b4-be31-96debc1169e5"
    - stage: seal
      stageUuid: "3b7cea07-dff4-8b0e-a478-c51b37992efb"
    - stage: uuid
      stageUuid: "273062e4-ab1c-8cb2-8f75-3d4373c525a5"
version: 2
---
# bank

Use when a transaction or account references banking infrastructure — bank account, bank statement, bank transfer, bank reconciliation. A financial institution context; relationTo: 'bank-accounts' or similar.

Composes: [[accounting]] · [[field]] · [[identity]] · [[reconcile]] · [[transaction]].

**Law — [[law]]: `bank` is the financial-institution context a [[transaction]] or account references (account, statement, transfer, reconciliation) — it points OUT to the bank-accounts store, it is not the cash account itself.**
