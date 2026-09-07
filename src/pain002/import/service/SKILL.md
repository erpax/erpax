---
name: service
description: "Use when parsing pain.002 payment-status-report import parser."
atomPath: "pain002/import/service"
coordinate: "pain002/import/service · 4/weave · 9dee5fed"
contentUuid: "e701f99e-d9cb-5cf9-b710-37c2099cbf12"
diamondUuid: "2bb6149f-376c-8649-8392-dd3bcf5de600"
uuid: "9dee5fed-d329-8977-aa0c-bb92c18afa05"
horo: 4
typography:
  partition: pain002
  bondDegree: 183
standards:
  - "ISO-20022 CustomerPaymentStatusReportV10"
  - "ISO-20022 pain.002 customer-payment-status-report"
bindings: []
signatures:
  computationUuid: "3cc8dba2-5dc1-8dfd-be1e-625f778cc880"
  stages:
    - stage: path
      stageUuid: "4049ec32-5efe-84e9-b732-aea9c811de07"
    - stage: trinity
      stageUuid: "9e2b8246-4356-8bd1-8256-23e9408ead3b"
    - stage: boundary
      stageUuid: "e05f5e0d-1b70-8ebc-a335-76358623d055"
    - stage: links
      stageUuid: "387105c5-1faf-854f-99a0-1ed060f75bfb"
    - stage: horo
      stageUuid: "e20dbd4d-1cb9-8eba-96da-d2d7672e5db7"
    - stage: seal
      stageUuid: "13d466f8-9905-8b36-b7d5-d7662d32ca46"
    - stage: uuid
      stageUuid: "c0ad433e-bb99-84e9-8972-c9565c085554"
version: 2
---
# service — pain.002 payment-status-report import parser

**Law — [[law]]: import service matter; parent ISO atom owns the message family.**

Matter-twin: `index.ts`. Composes [[iso]]/20022 · [[bank]].
