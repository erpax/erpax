---
name: service
description: "Use when parsing pain.002 payment-status-report import parser."
atomPath: "pain002/import/service"
coordinate: "pain002/import/service · 1/base · 714ede88"
contentUuid: "37c5e53f-3762-5915-80af-daed5bbcce3a"
diamondUuid: "7ea82163-8d5e-878b-80b9-f08da97792aa"
uuid: "714ede88-f929-8133-b4f0-abc6efcf01af"
horo: 1
typography:
  partition: pain002
  bondDegree: 183
standards:
  - "ISO-20022 CustomerPaymentStatusReportV10"
  - "ISO-20022 pain.002 customer-payment-status-report"
bindings: []
signatures:
  computationUuid: "2dd50c25-4b66-80d7-8c23-854501149bba"
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
      stageUuid: "fbc1e732-76b6-8c4e-a405-22e0e2a41a5d"
    - stage: seal
      stageUuid: "13d466f8-9905-8b36-b7d5-d7662d32ca46"
    - stage: uuid
      stageUuid: "85add291-5ead-87ee-b4be-8d08007bbb5e"
version: 2
---
# service — pain.002 payment-status-report import parser

**Law — [[law]]: import service matter; parent ISO atom owns the message family.**

Matter-twin: `index.ts`. Composes [[iso]]/20022 · [[bank]].
