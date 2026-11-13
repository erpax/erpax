---
name: service
description: "Use when parsing pain.002 payment-status-report import parser."
atomPath: "pain002/import/service"
coordinate: "pain002/import/service · 7/descent · 839f32ce"
contentUuid: "c4b558a9-522d-513e-b8d9-0ce6c7c92326"
diamondUuid: "71ecb752-8918-8a43-973c-bb6d3ee2ed08"
uuid: "839f32ce-ced8-8dba-8de7-4d1a9ad1cce5"
horo: 7
typography:
  partition: pain002
  bondDegree: 27
standards:
  - "ISO-20022 CustomerPaymentStatusReportV10"
  - "ISO-20022 pain.002 customer-payment-status-report"
bindings: []
signatures:
  computationUuid: "ada90aed-bbcb-8942-bd7a-a1a6cbf6812c"
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
      stageUuid: "10c3dbb5-2f63-8925-9364-b1030750000a"
    - stage: seal
      stageUuid: "13d466f8-9905-8b36-b7d5-d7662d32ca46"
    - stage: uuid
      stageUuid: "f2727355-8b7c-88ec-bebd-f66a439a4152"
version: 2
---
# service — pain.002 payment-status-report import parser

**Law — [[law]]: import service matter; parent ISO atom owns the message family.**

Matter-twin: `index.ts`. Composes [[iso]]/20022 · [[bank]].
