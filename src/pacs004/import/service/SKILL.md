---
name: service
description: "Use when parsing pacs.004 payment-return import parser."
atomPath: "pacs004/import/service"
coordinate: "pacs004/import/service · 7/descent · f42d5812"
contentUuid: "41fd90c0-cb0b-5007-9274-f264a67afeaf"
diamondUuid: "2b62db65-9c0a-8cfc-b578-0981c4f5983a"
uuid: "f42d5812-45eb-8e7f-b3a0-946e24ca004f"
horo: 7
typography:
  partition: pacs004
  bondDegree: 183
standards:
  - "ISO-20022 PaymentReturnV09"
  - "ISO-20022 pacs.004 payment-return"
bindings: []
signatures:
  computationUuid: "ed418d93-1ee0-88d2-8361-8c594c6535b1"
  stages:
    - stage: path
      stageUuid: "63682f30-6350-8527-a214-1656ec515537"
    - stage: trinity
      stageUuid: "dffec5c1-e112-8a0d-8d2d-a777302e9add"
    - stage: boundary
      stageUuid: "c1b4ea00-49db-8944-bab0-3e68d2e0d71b"
    - stage: links
      stageUuid: "3fe640e4-1782-8f58-9688-932c2dea057a"
    - stage: horo
      stageUuid: "0369844d-bc4a-8c0f-97d9-a350944d1770"
    - stage: seal
      stageUuid: "4a20c7cc-9ab8-82c3-973f-5d048ee4b398"
    - stage: uuid
      stageUuid: "321ff8c1-b94b-8a74-9296-1d810b500f42"
version: 2
---
# service — pacs.004 payment-return import parser

**Law — [[law]]: import service matter; parent ISO atom owns the message family.**

Matter-twin: `index.ts`. Composes [[iso]]/20022 · [[bank]].
