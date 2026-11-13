---
name: service
description: Use when parsing camt.053 statement import parser.
atomPath: "camt053/import/service"
coordinate: "camt053/import/service · 7/descent · 6c8f6a31"
contentUuid: "594628a9-1622-5627-88d0-6e346eff4087"
diamondUuid: "e29d5fec-98de-8e76-a88d-5c2c282b81ee"
uuid: "6c8f6a31-005c-856b-b009-9e0f14727480"
horo: 7
typography:
  partition: camt053
  bondDegree: 27
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
  computationUuid: "802e25b8-56f9-83c7-80fc-256145fb9184"
  stages:
    - stage: path
      stageUuid: "4c24a404-42de-8137-b751-ccd6b7b9e78e"
    - stage: trinity
      stageUuid: "369228ce-f7bd-8e27-9fdd-ac5c186b2fe1"
    - stage: boundary
      stageUuid: "079273bc-42dc-8738-8b46-9246f560a9cd"
    - stage: links
      stageUuid: "053bf6be-2438-8df2-a3f5-2b84cb4d771f"
    - stage: horo
      stageUuid: "c87f31b5-51fd-81ba-a9ed-c9074990ceda"
    - stage: seal
      stageUuid: "1b98bbda-f9ef-81fa-8811-6aad62f08b89"
    - stage: uuid
      stageUuid: "312385a5-6459-8e7d-b650-8d2a7dfedec4"
version: 2
---
# service — camt.053 statement import parser

**Law — [[law]]: import service matter; parent ISO atom owns the message family.**

Matter-twin: `index.ts`. Composes [[iso]]/20022 · [[bank]].
