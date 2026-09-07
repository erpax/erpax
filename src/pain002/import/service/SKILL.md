---
name: service
description: "Use when parsing pain.002 payment-status-report import parser."
atomPath: "pain002/import/service"
coordinate: "pain002/import/service · 4/weave · 06dee5e3"
contentUuid: "4f1e50de-76dc-5ad7-b871-e7bc85083bdf"
diamondUuid: "b3c0d0d0-37f4-8d9a-bb20-f91c99a4646b"
uuid: "06dee5e3-006e-847d-a061-a8987276db5f"
horo: 4
typography:
  partition: pain002
  bondDegree: 183
standards:
  - "ISO-20022 CustomerPaymentStatusReportV10"
  - "ISO-20022 pain.002 customer-payment-status-report"
bindings: []
signatures:
  computationUuid: "f814edba-f781-86bc-9c28-b6f95edc459f"
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
      stageUuid: "4483006b-8462-8455-98b3-49973c9de2d0"
    - stage: seal
      stageUuid: "13d466f8-9905-8b36-b7d5-d7662d32ca46"
    - stage: uuid
      stageUuid: "0cf04ec3-88e6-8253-b1b1-84d6a46c99b5"
version: 2
---
# service — pain.002 payment-status-report import parser

**Law — [[law]]: import service matter; parent ISO atom owns the message family.**

Matter-twin: `index.ts`. Composes [[iso]]/20022 · [[bank]].
