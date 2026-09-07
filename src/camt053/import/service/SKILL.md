---
name: service
description: Use when parsing camt.053 statement import parser.
atomPath: "camt053/import/service"
coordinate: "camt053/import/service · 8/crest · 3c340e2a"
contentUuid: "2afeba6c-5c6b-5bcc-92d9-3c897bf72867"
diamondUuid: "7c9ee286-1c61-845e-be11-41382058c843"
uuid: "3c340e2a-24a8-8a86-ab28-7b029315e08f"
horo: 8
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
  computationUuid: "c0e88546-62c7-8f1d-bc0e-1f98fe9942de"
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
      stageUuid: "5891e5f2-16b0-8e87-993d-826f51aba26b"
    - stage: seal
      stageUuid: "1b98bbda-f9ef-81fa-8811-6aad62f08b89"
    - stage: uuid
      stageUuid: "ea545397-fbfe-85be-9e01-304244be2b05"
version: 2
---
# service — camt.053 statement import parser

**Law — [[law]]: import service matter; parent ISO atom owns the message family.**

Matter-twin: `index.ts`. Composes [[iso]]/20022 · [[bank]].
