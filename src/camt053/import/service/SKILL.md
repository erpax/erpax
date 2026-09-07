---
name: service
description: Use when parsing camt.053 statement import parser.
atomPath: "camt053/import/service"
coordinate: "camt053/import/service · 4/weave · 2f1e7339"
contentUuid: "ef81f97e-72bd-55ce-aa97-68d542bdf5a1"
diamondUuid: "3e87cf83-3d6a-85ad-9bd3-9f6d7736edb5"
uuid: "2f1e7339-ff7f-84b6-b8c4-e54a1772ac8d"
horo: 4
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
  computationUuid: "cbf906d7-8a1f-8a80-b0e4-a24ebdceeec6"
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
      stageUuid: "e4fcfccd-91cc-887e-bdcd-bcbf4508c49e"
    - stage: seal
      stageUuid: "1b98bbda-f9ef-81fa-8811-6aad62f08b89"
    - stage: uuid
      stageUuid: "addb63be-7116-8cf4-88dc-a574f7ef432c"
version: 2
---
# service — camt.053 statement import parser

**Law — [[law]]: import service matter; parent ISO atom owns the message family.**

Matter-twin: `index.ts`. Composes [[iso]]/20022 · [[bank]].
