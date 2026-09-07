---
name: camt052
description: "Use when parsing ISO 20022 camt.052 BankToCustomerAccountReport — intraday account report (Rpt), invert dual of camt.053 statement."
atomPath: camt052
coordinate: "camt052 · 5/round · 283d1255"
contentUuid: "80158d6d-4672-5fd2-9e06-d515cd102011"
diamondUuid: "5327f8d6-65de-8e95-adc3-dbdb900aa4fb"
uuid: "283d1255-7a4f-89bb-b6ca-f77b68f96209"
horo: 5
typography:
  partition: camt052
  bondDegree: 19
standards:
  - "ISO-20022"
bindings: []
signatures:
  computationUuid: "475fed23-994d-862b-a80f-96205b845199"
  stages:
    - stage: path
      stageUuid: "486d3b72-8862-8f48-9ee3-32c350841518"
    - stage: trinity
      stageUuid: "fa29c6c6-06a0-8444-8cb4-3da409a66335"
    - stage: boundary
      stageUuid: "dfca68e3-c38e-86da-973f-1003a3bf8843"
    - stage: links
      stageUuid: "42b756f5-84dd-8f85-8fe8-55afc5402ab9"
    - stage: horo
      stageUuid: "4ce3d141-95cf-822a-840a-e2bd1dde4379"
    - stage: seal
      stageUuid: "95e3a48c-66cf-8edf-a721-42a9937e0052"
    - stage: uuid
      stageUuid: "8691e021-5759-8ca7-903c-0e5a7ac81662"
version: 2
---
# camt.052 — Bank to Customer Account Report

**Law — [[law]]: parse camt.052 `<Rpt>` into `Camt052Report`; same Ntry shape as [[camt053]], FrToDt window, no required OPBD/CLBD.**

Matter-twin: `src/camt052/import/service`. Composes [[iso]]/20022 · [[camt053]] · [[bank]].
