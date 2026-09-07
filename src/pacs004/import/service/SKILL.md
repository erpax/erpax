---
name: service
description: "Use when parsing pacs.004 payment-return import parser."
atomPath: "pacs004/import/service"
coordinate: "pacs004/import/service · 1/base · 1b091d8f"
contentUuid: "0c989c52-f92b-5714-a086-f6e5dfe2c392"
diamondUuid: "9bdbf9f7-1bf0-8e84-b0d5-f3f5f4c12b85"
uuid: "1b091d8f-cc70-8587-a7d2-8ff417729f2c"
horo: 1
typography:
  partition: pacs004
  bondDegree: 183
standards:
  - "ISO-20022 PaymentReturnV09"
  - "ISO-20022 pacs.004 payment-return"
bindings: []
signatures:
  computationUuid: "eb6e99bf-b69d-8ddc-a593-be4e66b85d13"
  stages:
    - stage: path
      stageUuid: "63682f30-6350-8527-a214-1656ec515537"
    - stage: trinity
      stageUuid: "dffec5c1-e112-8a0d-8d2d-a777302e9add"
    - stage: boundary
      stageUuid: "c43f5554-8716-89ce-b2d9-2076f8dfda67"
    - stage: links
      stageUuid: "3fe640e4-1782-8f58-9688-932c2dea057a"
    - stage: horo
      stageUuid: "9a9345fe-36f8-82be-a5fe-84e0b5309d39"
    - stage: seal
      stageUuid: "4a20c7cc-9ab8-82c3-973f-5d048ee4b398"
    - stage: uuid
      stageUuid: "b4a437e4-b1f3-84e1-8713-0c9ecc0c858b"
version: 2
---
# service — pacs.004 payment-return import parser

**Law — [[law]]: import service matter; parent ISO atom owns the message family.**

Matter-twin: `index.ts`. Composes [[iso]]/20022 · [[bank]].
