---
name: camt053
description: "Use when parsing ISO 20022 camt.053 BankToCustomerStatement — end-of-day account statement (Stmt)."
atomPath: camt053
coordinate: "camt053 · 7/descent · 884b43e0"
contentUuid: "133b4eca-5dca-50d6-87b5-5f4fa897d084"
diamondUuid: "6f661403-fe24-80b2-961b-a542d8baa22e"
uuid: "884b43e0-e00c-84c9-b05a-c5768be89bf4"
horo: 7
typography:
  partition: camt053
  bondDegree: 0
standards:
  - "EU-Taxonomy-2020/852"
  - "ISO-13616-1"
  - "ISO-20022"
  - "ISO-9362"
  - "ISO/IEC-29119"
bindings: []
signatures:
  computationUuid: "5c40dbec-fe71-8d5f-8425-1d1bfd7691fa"
  stages:
    - stage: path
      stageUuid: "5ebd5857-6e9f-8f2b-9a3a-e547c6d91274"
    - stage: trinity
      stageUuid: "e99934f9-50ac-8c02-aee2-3e68ebb4a73a"
    - stage: boundary
      stageUuid: "da7debd2-3a13-8795-a961-f04ba18cfa01"
    - stage: links
      stageUuid: "900a5f05-5ac4-8bf2-b50e-758fdf72c8af"
    - stage: horo
      stageUuid: "caea2381-3ec4-8934-bfcb-0b49d59e7dca"
    - stage: seal
      stageUuid: "a41ac1a6-55f4-88f5-84f5-6949f1cf0889"
    - stage: uuid
      stageUuid: "d0b719c9-cd8e-8cba-bf7c-b692c5145fde"
version: 2
---
# camt.053 — Bank to Customer Statement

**Law — [[law]]: parse camt.053 `<Stmt>` into statement shapes; shared Ntry helpers for [[camt052]].**

Matter-twin: `src/camt053/import/service`. Composes [[iso]]/20022 · [[bank]].
