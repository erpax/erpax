---
name: camt052
description: "Use when parsing ISO 20022 camt.052 BankToCustomerAccountReport — intraday account report (Rpt), invert dual of camt.053 statement."
atomPath: camt052
coordinate: "camt052 · 2/share · 569aeb00"
contentUuid: "d55c0590-fd39-5771-b4b3-b25edcecd5bd"
diamondUuid: "f6d65335-dc8f-8ca4-bbcc-8ad93fff5dc4"
uuid: "569aeb00-b0d0-893d-a58a-9288909e758e"
horo: 2
typography:
  partition: camt052
  bondDegree: 0
standards:
  - "ISO-20022"
bindings: []
signatures:
  computationUuid: "c2ae1cfd-ca8a-8d1a-964f-90b8d5e4bef5"
  stages:
    - stage: path
      stageUuid: "486d3b72-8862-8f48-9ee3-32c350841518"
    - stage: trinity
      stageUuid: "181ba7d5-8fad-856b-87ec-f7341505ee53"
    - stage: boundary
      stageUuid: "e147ef88-df53-88f8-8a6d-796a99ddb912"
    - stage: links
      stageUuid: "42b756f5-84dd-8f85-8fe8-55afc5402ab9"
    - stage: horo
      stageUuid: "d04f7050-2d59-8f99-aa06-0d2e69f68010"
    - stage: seal
      stageUuid: "89218fbd-b45c-8a55-91ed-47b4acd5086b"
    - stage: uuid
      stageUuid: "bf9ba441-6949-8802-abda-b81908d85fa9"
version: 2
---
# camt.052 — Bank to Customer Account Report

**Law — [[law]]: parse camt.052 `<Rpt>` into `Camt052Report`; same Ntry shape as [[camt053]], FrToDt window, no required OPBD/CLBD.**

Matter-twin: `src/camt052/import/service`. Composes [[iso]]/20022 · [[camt053]] · [[bank]].
