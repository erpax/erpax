---
name: camt053
description: "Use when parsing ISO 20022 camt.053 BankToCustomerStatement — end-of-day account statement (Stmt)."
atomPath: camt053
coordinate: "camt053 · 1/base · dd6168f7"
contentUuid: "9bc12105-7633-5ca2-977d-232265ed973d"
diamondUuid: "0f906f9b-f41a-8b1e-9e58-a38864f07e02"
uuid: "dd6168f7-dc91-828a-a188-6676e4130cee"
horo: 1
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
  computationUuid: "22aaa3da-b3e0-872b-8197-04cb8e160b16"
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
      stageUuid: "ce3b8a12-144b-82ce-840a-a14d246dc71c"
    - stage: seal
      stageUuid: "5226153f-ae43-80a6-ba7b-17792384e0b7"
    - stage: uuid
      stageUuid: "62e8b780-7a5e-8111-94af-ca3f49509645"
version: 2
---
# camt.053 — Bank to Customer Statement

**Law — [[law]]: parse camt.053 `<Stmt>` into statement shapes; shared Ntry helpers for [[camt052]].**

Matter-twin: `src/camt053/import/service`. Composes [[iso]]/20022 · [[bank]].
