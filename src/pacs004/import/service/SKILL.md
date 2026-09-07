---
name: service
description: "Use when parsing pacs.004 payment-return import parser."
atomPath: "pacs004/import/service"
coordinate: "pacs004/import/service · 8/crest · 4b964912"
contentUuid: "ed2d2e25-6e1e-51e1-9d43-b6a9f2110845"
diamondUuid: "a914a79f-02c6-83de-8ed7-fcc323f48813"
uuid: "4b964912-c5c2-80c0-88aa-98333de90ef1"
horo: 8
typography:
  partition: pacs004
  bondDegree: 183
standards:
  - "ISO-20022 PaymentReturnV09"
  - "ISO-20022 pacs.004 payment-return"
bindings: []
signatures:
  computationUuid: "df33f3e7-8f9f-8440-a4bf-f89b4e6cb939"
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
      stageUuid: "b34ce803-439a-89b8-9b3d-866bb5311efa"
    - stage: seal
      stageUuid: "4a20c7cc-9ab8-82c3-973f-5d048ee4b398"
    - stage: uuid
      stageUuid: "f6f3d40b-d9d0-8068-aeee-c220dd32f03a"
version: 2
---
# service — pacs.004 payment-return import parser

**Law — [[law]]: import service matter; parent ISO atom owns the message family.**

Matter-twin: `index.ts`. Composes [[iso]]/20022 · [[bank]].
