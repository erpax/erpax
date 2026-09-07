---
name: camt052
description: "Use when parsing ISO 20022 camt.052 BankToCustomerAccountReport — intraday account report (Rpt), invert dual of camt.053 statement."
atomPath: camt052
coordinate: "camt052 · 8/crest · 6298a16e"
contentUuid: "5066904a-26d3-58bb-84a3-8cb04f58274d"
diamondUuid: "884b59b5-1ace-8514-8273-4315448d27bf"
uuid: "6298a16e-8fe3-8ad1-a702-f359472272c1"
horo: 8
typography:
  partition: camt052
  bondDegree: 19
standards:
  - "ISO-20022"
bindings: []
signatures:
  computationUuid: "1c4ae362-72fb-8809-8c2c-108c82479158"
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
      stageUuid: "fa4eeb5b-7037-86ee-8eb7-d5523253241c"
    - stage: seal
      stageUuid: "95e3a48c-66cf-8edf-a721-42a9937e0052"
    - stage: uuid
      stageUuid: "926e64b1-c11c-8797-a24e-afafbdeb908f"
version: 2
---
# camt.052 — Bank to Customer Account Report

**Law — [[law]]: parse camt.052 `<Rpt>` into `Camt052Report`; same Ntry shape as [[camt053]], FrToDt window, no required OPBD/CLBD.**

Matter-twin: `src/camt052/import/service`. Composes [[iso]]/20022 · [[camt053]] · [[bank]].
