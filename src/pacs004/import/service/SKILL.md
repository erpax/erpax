---
name: service
description: "Use when parsing pacs.004 payment-return import parser."
atomPath: "pacs004/import/service"
coordinate: "pacs004/import/service · 8/crest · 5bacad4f"
contentUuid: "89b52fd5-b9de-50dc-a67c-a4213b906f3f"
diamondUuid: "e03727e1-df7c-82c6-8506-d6ca5ed389dc"
uuid: "5bacad4f-9e76-8078-9cc3-cc43ffde8b96"
horo: 8
typography:
  partition: pacs004
  bondDegree: 183
standards:
  - "ISO-20022 PaymentReturnV09"
  - "ISO-20022 pacs.004 payment-return"
bindings: []
signatures:
  computationUuid: "732e36c7-2e1d-875b-877c-5dfa791964bf"
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
      stageUuid: "2123d88e-55c2-8d9b-87b5-9c4032c4f2c1"
    - stage: seal
      stageUuid: "4a20c7cc-9ab8-82c3-973f-5d048ee4b398"
    - stage: uuid
      stageUuid: "0d2de841-e929-8d0b-8e80-0038ae741a05"
version: 2
---
# service — pacs.004 payment-return import parser

**Law — [[law]]: import service matter; parent ISO atom owns the message family.**

Matter-twin: `index.ts`. Composes [[iso]]/20022 · [[bank]].
