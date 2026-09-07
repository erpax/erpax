---
name: camt053
description: "Use when parsing ISO 20022 camt.053 BankToCustomerStatement — end-of-day account statement (Stmt)."
atomPath: camt053
coordinate: "camt053 · 8/crest · ad75b755"
contentUuid: "9fd85e89-194f-5524-89e6-10b56d6127b6"
diamondUuid: "f601bfe5-0979-8885-89d5-1dd034c18e8d"
uuid: "ad75b755-e726-8c0b-ab41-648f3756b320"
horo: 8
typography:
  partition: camt053
  bondDegree: 16
standards:
  - "EU-Taxonomy-2020/852"
  - "ISO-13616-1"
  - "ISO-20022"
  - "ISO-9362"
  - "ISO/IEC-29119"
bindings: []
signatures:
  computationUuid: "fc3ad5a5-f8e1-8d6d-86a0-ee40f79dde1a"
  stages:
    - stage: path
      stageUuid: "5ebd5857-6e9f-8f2b-9a3a-e547c6d91274"
    - stage: trinity
      stageUuid: "64a767ec-364b-81d3-b3c3-c9f9cabc1470"
    - stage: boundary
      stageUuid: "22bc1ad1-5c88-8e08-bf94-3b0d0e3b4b21"
    - stage: links
      stageUuid: "900a5f05-5ac4-8bf2-b50e-758fdf72c8af"
    - stage: horo
      stageUuid: "d5672f9f-4c2e-8726-9788-64dfa69fe069"
    - stage: seal
      stageUuid: "5226153f-ae43-80a6-ba7b-17792384e0b7"
    - stage: uuid
      stageUuid: "d1f6eee4-5822-8906-9991-ae6cda2cd515"
version: 2
---
# camt.053 — Bank to Customer Statement

**Law — [[law]]: parse camt.053 `<Stmt>` into statement shapes; shared Ntry helpers for [[camt052]].**

Matter-twin: `src/camt053/import/service`. Composes [[iso]]/20022 · [[bank]].
