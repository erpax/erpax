---
name: camt053
description: "Use when parsing ISO 20022 camt.053 BankToCustomerStatement — end-of-day account statement (Stmt)."
atomPath: camt053
coordinate: "camt053 · 5/round · 3b11578f"
contentUuid: "7ffced59-67a3-5753-b4b1-f35a225ff55e"
diamondUuid: "98a043ae-5e9b-8d0d-a300-38032c12ce1a"
uuid: "3b11578f-5197-8eeb-8854-ee89799ecafc"
horo: 5
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
  computationUuid: "e28ca4a5-0c3d-8281-af25-eab806655c4d"
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
      stageUuid: "a1b54ca1-ba88-852c-baa6-92491b6a44e9"
    - stage: seal
      stageUuid: "5226153f-ae43-80a6-ba7b-17792384e0b7"
    - stage: uuid
      stageUuid: "ac82751d-89cd-854d-982d-7a6fa3b54b89"
version: 2
---
# camt.053 — Bank to Customer Statement

**Law — [[law]]: parse camt.053 `<Stmt>` into statement shapes; shared Ntry helpers for [[camt052]].**

Matter-twin: `src/camt053/import/service`. Composes [[iso]]/20022 · [[bank]].
