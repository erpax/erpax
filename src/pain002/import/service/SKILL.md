---
name: service
description: "Use when parsing pain.002 payment-status-report import parser."
atomPath: "pain002/import/service"
coordinate: "pain002/import/service · 8/crest · ad65dd46"
contentUuid: "081d235d-726c-5bc7-8b91-35f2238e5b66"
diamondUuid: "33e1e37d-397e-8c4e-812c-8d8e8f3620f3"
uuid: "ad65dd46-26d7-8b82-9344-46db91dc904b"
horo: 8
typography:
  partition: pain002
  bondDegree: 183
standards:
  - "ISO-20022 CustomerPaymentStatusReportV10"
  - "ISO-20022 pain.002 customer-payment-status-report"
bindings: []
signatures:
  computationUuid: "183b01c0-52c0-87b7-bdfc-c6b706d68a0d"
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
      stageUuid: "5f545494-060d-8023-8eac-100edd07b2f4"
    - stage: seal
      stageUuid: "13d466f8-9905-8b36-b7d5-d7662d32ca46"
    - stage: uuid
      stageUuid: "60172f06-5d70-8894-a299-4b505f0ed7dc"
version: 2
---
# service — pain.002 payment-status-report import parser

**Law — [[law]]: import service matter; parent ISO atom owns the message family.**

Matter-twin: `index.ts`. Composes [[iso]]/20022 · [[bank]].
