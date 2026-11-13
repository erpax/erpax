---
name: service
description: "Use when parsing pacs.004 payment-return import parser."
atomPath: "pacs004/import/service"
coordinate: "pacs004/import/service · 7/descent · f42d5812"
contentUuid: "b6d76268-e4d6-5947-b219-d629a9be50d7"
diamondUuid: "cd864a36-e51e-8ae9-a50c-c997bd1f7f48"
uuid: "f42d5812-45eb-8e7f-b3a0-946e24ca004f"
horo: 7
typography:
  partition: pacs004
  bondDegree: 27
standards:
  - "ISO-20022 PaymentReturnV09"
  - "ISO-20022 pacs.004 payment-return"
bindings: []
signatures:
  computationUuid: "0c917fdf-9674-839d-bc46-484e7ea3a395"
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
      stageUuid: "660b87d8-dc4c-8879-a0f4-4c3035514eff"
    - stage: seal
      stageUuid: "4a20c7cc-9ab8-82c3-973f-5d048ee4b398"
    - stage: uuid
      stageUuid: "60161442-80b4-897c-8ed8-739743691b47"
version: 2
---
# service — pacs.004 payment-return import parser

**Law — [[law]]: import service matter; parent ISO atom owns the message family.**

Matter-twin: `index.ts`. Composes [[iso]]/20022 · [[bank]].
