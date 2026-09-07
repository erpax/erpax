---
name: camt052
description: "Use when parsing ISO 20022 camt.052 BankToCustomerAccountReport — intraday account report (Rpt), invert dual of camt.053 statement."
atomPath: camt052
coordinate: "camt052 · 2/share · 196420f4"
contentUuid: "e134bb7f-eff1-52bf-b461-587571c073e0"
diamondUuid: "8da374e2-c7f0-8788-8ef7-f8021f19dd15"
uuid: "196420f4-fa15-8577-9b50-c344482d5cd4"
horo: 2
typography:
  partition: camt052
  bondDegree: 19
standards:
  - "ISO-20022"
bindings: []
signatures:
  computationUuid: "feee3dd7-aecb-8233-86c6-565270231f9e"
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
      stageUuid: "d2a70051-b47d-8fec-8a41-a4cbfa61e905"
    - stage: seal
      stageUuid: "95e3a48c-66cf-8edf-a721-42a9937e0052"
    - stage: uuid
      stageUuid: "430d4020-fbf8-8f70-b101-31d8c907f822"
version: 2
---
# camt.052 — Bank to Customer Account Report

**Law — [[law]]: parse camt.052 `<Rpt>` into `Camt052Report`; same Ntry shape as [[camt053]], FrToDt window, no required OPBD/CLBD.**

Matter-twin: `src/camt052/import/service`. Composes [[iso]]/20022 · [[camt053]] · [[bank]].
