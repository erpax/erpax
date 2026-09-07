---
name: camt052
description: "Use when parsing ISO 20022 camt.052 BankToCustomerAccountReport — intraday account report (Rpt), invert dual of camt.053 statement."
atomPath: camt052
coordinate: "camt052 · 2/share · 2ce009e9"
contentUuid: "1f5949df-41fc-561d-b4ce-6cf419dff25f"
diamondUuid: "ff78323e-55a1-8c0c-bdab-de64ba2441fc"
uuid: "2ce009e9-1e92-8904-84f4-c60fa96a015b"
horo: 2
typography:
  partition: camt052
  bondDegree: 19
standards:
  - "ISO-20022"
bindings: []
signatures:
  computationUuid: "9f32f210-1177-8703-b22b-497a7eb55a3f"
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
      stageUuid: "be5470b3-0c2d-8657-90b2-98e1b1734a1e"
    - stage: seal
      stageUuid: "95e3a48c-66cf-8edf-a721-42a9937e0052"
    - stage: uuid
      stageUuid: "5e135afc-0eb6-8984-bc9a-34d28064bf5d"
version: 2
---
# camt.052 — Bank to Customer Account Report

**Law — [[law]]: parse camt.052 `<Rpt>` into `Camt052Report`; same Ntry shape as [[camt053]], FrToDt window, no required OPBD/CLBD.**

Matter-twin: `src/camt052/import/service`. Composes [[iso]]/20022 · [[camt053]] · [[bank]].
