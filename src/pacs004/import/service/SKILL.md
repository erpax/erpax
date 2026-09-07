---
name: service
description: "Use when parsing pacs.004 payment-return import parser."
atomPath: "pacs004/import/service"
coordinate: "pacs004/import/service · 5/round · db0d9a5a"
contentUuid: "f27890ad-0c5b-518a-a0f9-6d1b8caeee0f"
diamondUuid: "492f03e5-3461-85da-af03-cd648a86587c"
uuid: "db0d9a5a-4ebd-8d7f-97a3-faa77672ec39"
horo: 5
typography:
  partition: pacs004
  bondDegree: 183
standards:
  - "ISO-20022 PaymentReturnV09"
  - "ISO-20022 pacs.004 payment-return"
bindings: []
signatures:
  computationUuid: "752cb8db-5d77-8b75-b917-0fa8e8c62853"
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
      stageUuid: "a8e724ab-3478-8507-90a6-6359ef3f5383"
    - stage: seal
      stageUuid: "4a20c7cc-9ab8-82c3-973f-5d048ee4b398"
    - stage: uuid
      stageUuid: "829cfa35-573e-8db6-86d4-e27f71a918a9"
version: 2
---
# service — pacs.004 payment-return import parser

**Law — [[law]]: import service matter; parent ISO atom owns the message family.**

Matter-twin: `index.ts`. Composes [[iso]]/20022 · [[bank]].
