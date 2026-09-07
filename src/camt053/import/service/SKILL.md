---
name: service
description: Use when parsing camt.053 statement import parser.
atomPath: "camt053/import/service"
coordinate: "camt053/import/service · 7/descent · d8fed89d"
contentUuid: "0760a2fe-de55-5019-ab65-54f46d443e56"
diamondUuid: "ebb74c12-f017-8db0-8801-5c40d8fd4c3c"
uuid: "d8fed89d-b890-8b6c-880e-76fb4bc057a7"
horo: 7
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
  computationUuid: "54825840-2974-8d33-a6fb-6b04d971887e"
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
      stageUuid: "f927d238-3903-86fb-b2e1-19cc57401c30"
    - stage: seal
      stageUuid: "1b98bbda-f9ef-81fa-8811-6aad62f08b89"
    - stage: uuid
      stageUuid: "83b0d207-318f-82a6-9260-0d2b948f9812"
version: 2
---
# service — camt.053 statement import parser

**Law — [[law]]: import service matter; parent ISO atom owns the message family.**

Matter-twin: `index.ts`. Composes [[iso]]/20022 · [[bank]].
