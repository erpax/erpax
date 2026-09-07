---
name: camt052
description: "Use when parsing ISO 20022 camt.052 BankToCustomerAccountReport — intraday account report (Rpt), invert dual of camt.053 statement."
atomPath: camt052
coordinate: "camt052 · 8/crest · 9c14bda6"
contentUuid: "b0dfe3ee-d1e2-5b1a-967a-65c793b838d4"
diamondUuid: "dd1dce7a-6c6b-858a-a18c-f80957e77eb9"
uuid: "9c14bda6-c0ba-89f1-9eea-752c26bd0042"
horo: 8
typography:
  partition: camt052
  bondDegree: 19
standards:
  - "ISO-20022"
bindings: []
signatures:
  computationUuid: "2dc0018c-ab18-8d51-8322-a8d6bd1edaae"
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
      stageUuid: "70fced98-35e6-8ebb-b2b9-ef1971d36291"
    - stage: seal
      stageUuid: "95e3a48c-66cf-8edf-a721-42a9937e0052"
    - stage: uuid
      stageUuid: "6be6b726-f586-895f-a801-5c19ac373b23"
version: 2
---
# camt.052 — Bank to Customer Account Report

**Law — [[law]]: parse camt.052 `<Rpt>` into `Camt052Report`; same Ntry shape as [[camt053]], FrToDt window, no required OPBD/CLBD.**

Matter-twin: `src/camt052/import/service`. Composes [[iso]]/20022 · [[camt053]] · [[bank]].
