---
name: service
description: Use when parsing camt.053 statement import parser.
atomPath: "camt053/import/service"
coordinate: "camt053/import/service · 4/weave · 5e72839a"
contentUuid: "b2bf13b7-dd7d-5f48-b1eb-1b31fb3ac21f"
diamondUuid: "6f2f81db-6e0e-8170-ad95-a897f7377c3d"
uuid: "5e72839a-1b1d-8549-9157-21d9c97a4aa8"
horo: 4
typography:
  partition: camt053
  bondDegree: 175
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
  computationUuid: "c0d2777d-f671-8eed-adff-824076250b2e"
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
      stageUuid: "c4d69013-758f-80f3-b152-83643865e762"
    - stage: seal
      stageUuid: "1b98bbda-f9ef-81fa-8811-6aad62f08b89"
    - stage: uuid
      stageUuid: "f4f54565-7aaa-8797-9516-8f0d9a9afcfe"
version: 2
---
# service — camt.053 statement import parser

**Law — [[law]]: import service matter; parent ISO atom owns the message family.**

Matter-twin: `index.ts`. Composes [[iso]]/20022 · [[bank]].
