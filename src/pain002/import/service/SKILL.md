---
name: service
description: "Use when parsing pain.002 payment-status-report import parser."
atomPath: "pain002/import/service"
coordinate: "pain002/import/service · 4/weave · 452aea95"
contentUuid: "f3e6fdc0-41f8-526c-95e6-3a0856c5e587"
diamondUuid: "e4ccddca-16fa-82c8-9fdf-69cd3c7ae99e"
uuid: "452aea95-7ce8-8897-bf89-9a0384e9b665"
horo: 4
typography:
  partition: pain002
  bondDegree: 175
standards:
  - "ISO-20022 CustomerPaymentStatusReportV10"
  - "ISO-20022 pain.002 customer-payment-status-report"
bindings: []
signatures:
  computationUuid: "12ec2031-1981-8fec-bdc9-e58cb901afa6"
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
      stageUuid: "e8740f69-4434-8337-aa2c-8bb29b15e53c"
    - stage: seal
      stageUuid: "13d466f8-9905-8b36-b7d5-d7662d32ca46"
    - stage: uuid
      stageUuid: "d3a6b92e-6188-81e3-9f39-0f0a08fcadfa"
version: 2
---
# service — pain.002 payment-status-report import parser

**Law — [[law]]: import service matter; parent ISO atom owns the message family.**

Matter-twin: `index.ts`. Composes [[iso]]/20022 · [[bank]].
