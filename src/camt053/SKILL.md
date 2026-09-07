---
name: camt053
description: "Use when parsing ISO 20022 camt.053 BankToCustomerStatement — end-of-day account statement (Stmt)."
atomPath: camt053
coordinate: "camt053 · 8/crest · 400579a4"
contentUuid: "aee47622-f5c9-5084-83b6-2acc8ac97c7c"
diamondUuid: "6e0c9fe0-142b-8068-bd99-7d747efb6d2e"
uuid: "400579a4-63d5-8471-845d-e4b820b0631a"
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
  computationUuid: "149953f2-ee8e-8782-962d-b7e69c2c70ed"
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
      stageUuid: "481ad7df-541e-8c87-8e4f-ffdf584653b9"
    - stage: seal
      stageUuid: "5226153f-ae43-80a6-ba7b-17792384e0b7"
    - stage: uuid
      stageUuid: "3448fd04-95b6-8515-b5e4-959e88490530"
version: 2
---
# camt.053 — Bank to Customer Statement

**Law — [[law]]: parse camt.053 `<Stmt>` into statement shapes; shared Ntry helpers for [[camt052]].**

Matter-twin: `src/camt053/import/service`. Composes [[iso]]/20022 · [[bank]].
