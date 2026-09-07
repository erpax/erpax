---
name: service
description: "Use when parsing pain.002 payment-status-report import parser."
atomPath: "pain002/import/service"
coordinate: "pain002/import/service · 1/base · 48dfe502"
contentUuid: "ca220ea9-1ac4-5aaf-9dcb-589ced4141c0"
diamondUuid: "c16ddd30-0a7c-8b4e-ab40-4622293ff3fe"
uuid: "48dfe502-642e-82f1-8ae2-54ee07741022"
horo: 1
typography:
  partition: pain002
  bondDegree: 183
standards:
  - "ISO-20022 CustomerPaymentStatusReportV10"
  - "ISO-20022 pain.002 customer-payment-status-report"
bindings: []
signatures:
  computationUuid: "32965794-124a-8eef-82de-3652b6b869e5"
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
      stageUuid: "cecd5982-ff3c-8f72-973f-f3dd8ea1e93e"
    - stage: seal
      stageUuid: "13d466f8-9905-8b36-b7d5-d7662d32ca46"
    - stage: uuid
      stageUuid: "6d96c9f4-a7fa-8e49-a876-3ea4db75bf34"
version: 2
---
# service — pain.002 payment-status-report import parser

**Law — [[law]]: import service matter; parent ISO atom owns the message family.**

Matter-twin: `index.ts`. Composes [[iso]]/20022 · [[bank]].
