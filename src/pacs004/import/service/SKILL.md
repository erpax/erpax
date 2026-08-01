---
name: service
description: "Use when parsing pacs.004 payment-return import parser."
atomPath: "pacs004/import/service"
coordinate: "pacs004/import/service · 5/round · dc8e3a56"
contentUuid: "99f19e1d-ed96-5e74-9bba-b24a69bb208b"
diamondUuid: "82c4819c-61da-8230-818c-321449786e89"
uuid: "dc8e3a56-35cf-87a4-9551-f219e9b13df0"
horo: 5
typography:
  partition: pacs004
  bondDegree: 175
standards:
  - "ISO-20022 PaymentReturnV09"
  - "ISO-20022 pacs.004 payment-return"
bindings: []
signatures:
  computationUuid: "4e4cb121-b47f-8c36-b743-3c15efc6538a"
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
      stageUuid: "31521106-4da0-8c87-82de-fc3ed7088b4b"
    - stage: seal
      stageUuid: "4a20c7cc-9ab8-82c3-973f-5d048ee4b398"
    - stage: uuid
      stageUuid: "2881753b-3e67-87e7-9ac9-1771ed609445"
version: 2
---
# service — pacs.004 payment-return import parser

**Law — [[law]]: import service matter; parent ISO atom owns the message family.**

Matter-twin: `index.ts`. Composes [[iso]]/20022 · [[bank]].
