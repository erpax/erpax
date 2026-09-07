---
name: service
description: "Use when parsing pacs.004 payment-return import parser."
atomPath: "pacs004/import/service"
coordinate: "pacs004/import/service · 8/crest · 0c78efa3"
contentUuid: "a32ba074-4829-50eb-9135-f885492d1f50"
diamondUuid: "93023f65-13de-8231-99c5-c530e787fb3b"
uuid: "0c78efa3-805a-8055-8592-ade8bf75555b"
horo: 8
typography:
  partition: pacs004
  bondDegree: 183
standards:
  - "ISO-20022 PaymentReturnV09"
  - "ISO-20022 pacs.004 payment-return"
bindings: []
signatures:
  computationUuid: "5b5aa64b-77de-8815-b963-769b20eeffde"
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
      stageUuid: "609cfae0-af36-8142-8d0d-3cc7108cae19"
    - stage: seal
      stageUuid: "4a20c7cc-9ab8-82c3-973f-5d048ee4b398"
    - stage: uuid
      stageUuid: "56c727db-eab4-8659-94ed-9cafa676da57"
version: 2
---
# service — pacs.004 payment-return import parser

**Law — [[law]]: import service matter; parent ISO atom owns the message family.**

Matter-twin: `index.ts`. Composes [[iso]]/20022 · [[bank]].
