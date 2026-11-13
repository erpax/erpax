---
name: bank
description: "Use when a transaction or account references banking infrastructure — bank account, bank statement, bank transfer, bank reconciliation. A financial institution context; relationTo: 'bank-accounts' or similar."
atomPath: bank
coordinate: "bank · 5/round · 360bd4b5"
contentUuid: "f472a00a-92dc-56c0-b366-6837871b8306"
diamondUuid: "5447622c-eccb-815e-adc1-d4aad87e67c3"
uuid: "360bd4b5-a461-8a24-ae22-0067849104f2"
horo: 5
typography:
  partition: bank
  bondDegree: 70
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
  computationUuid: "c8981989-f4a7-8b37-89d6-796218b1eae0"
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
      stageUuid: "5251d8b6-e084-8ab5-b95f-6e4f1ca613da"
    - stage: seal
      stageUuid: "3b7cea07-dff4-8b0e-a478-c51b37992efb"
    - stage: uuid
      stageUuid: "c5d24f72-bc04-8ee8-a91c-e47114f60706"
version: 2
---
# bank

Use when a transaction or account references banking infrastructure — bank account, bank statement, bank transfer, bank reconciliation. A financial institution context; relationTo: 'bank-accounts' or similar.

Composes: [[accounting]] · [[field]] · [[identity]] · [[reconcile]] · [[transaction]].

**Law — [[law]]: `bank` is the financial-institution context a [[transaction]] or account references (account, statement, transfer, reconciliation) — it points OUT to the bank-accounts store, it is not the cash account itself.**
