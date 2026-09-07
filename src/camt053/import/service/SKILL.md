---
name: service
description: Use when parsing camt.053 statement import parser.
atomPath: "camt053/import/service"
coordinate: "camt053/import/service · 1/base · f2db7d83"
contentUuid: "0949c672-381e-5720-97dd-444f27447af2"
diamondUuid: "253d3f47-6ad1-86b0-ba0c-4dc4208ef4b5"
uuid: "f2db7d83-8daa-8ae0-aa09-6e74ceed9dbf"
horo: 1
typography:
  partition: camt053
  bondDegree: 183
standards:
  - "EU-Taxonomy-2020/852"
  - "ISO-13616-1"
  - "ISO-13616-1:2020 iban"
  - "ISO-20022"
  - "ISO-20022 camt.053 bank-to-customer-statement"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time"
  - "ISO-9362"
  - "ISO-9362:2022 bic"
  - "ISO/IEC-29119"
bindings: []
signatures:
  computationUuid: "ad5e78ef-ad4e-8111-bc6c-db85f63de5ff"
  stages:
    - stage: path
      stageUuid: "4c24a404-42de-8137-b751-ccd6b7b9e78e"
    - stage: trinity
      stageUuid: "369228ce-f7bd-8e27-9fdd-ac5c186b2fe1"
    - stage: boundary
      stageUuid: "ab0c3e4e-3da1-8c23-8282-9b9f642c9dc1"
    - stage: links
      stageUuid: "053bf6be-2438-8df2-a3f5-2b84cb4d771f"
    - stage: horo
      stageUuid: "bb8c11c4-c565-8949-a03a-929d977da881"
    - stage: seal
      stageUuid: "1b98bbda-f9ef-81fa-8811-6aad62f08b89"
    - stage: uuid
      stageUuid: "14900e9d-d0f6-8a7a-8de8-804a622773dd"
version: 2
---
# service — camt.053 statement import parser

**Law — [[law]]: import service matter; parent ISO atom owns the message family.**

Matter-twin: `index.ts`. Composes [[iso]]/20022 · [[bank]].
