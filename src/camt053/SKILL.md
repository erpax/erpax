---
name: camt053
description: "Use when parsing ISO 20022 camt.053 BankToCustomerStatement — end-of-day account statement (Stmt)."
atomPath: camt053
coordinate: "camt053 · 8/crest · e44045ee"
contentUuid: "90f47e4b-8ec2-50f0-9296-e192555bba27"
diamondUuid: "6bdc3e75-d8ee-8aa4-9025-0d73fc25e677"
uuid: "e44045ee-0d00-898a-ac87-7a375b7e9455"
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
  computationUuid: "9af575f0-b035-827a-aa74-410744074fbb"
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
      stageUuid: "0ac16fcc-9e9c-8842-bc8f-b7f6d5030c1c"
    - stage: seal
      stageUuid: "5226153f-ae43-80a6-ba7b-17792384e0b7"
    - stage: uuid
      stageUuid: "8bfc0942-a8ed-8e12-9b91-0ed1d4224e81"
version: 2
---
# camt.053 — Bank to Customer Statement

**Law — [[law]]: parse camt.053 `<Stmt>` into statement shapes; shared Ntry helpers for [[camt052]].**

Matter-twin: `src/camt053/import/service`. Composes [[iso]]/20022 · [[bank]].
