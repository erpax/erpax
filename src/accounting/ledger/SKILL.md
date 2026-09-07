---
name: ledger
description: "Use when reasoning about accounting/ledger — token ledger — path-keyed postings and balance by path."
atomPath: "accounting/ledger"
coordinate: "accounting/ledger · 8/crest · ba830fbc"
contentUuid: "7ef14745-822b-5025-9e9c-f3469aace3d8"
diamondUuid: "b3e24bc0-408d-8650-8e7e-8e7635ab0663"
uuid: "ba830fbc-f2e3-85fc-8486-d929d5d6c3bd"
horo: 8
typography:
  partition: accounting
  bondDegree: 15
standards:
  - "IFRS IAS-1 + IFRS-15 §B16 metered usage"
bindings: []
signatures:
  computationUuid: "64ab1216-2ac3-88fa-947b-ac4bd52161b2"
  stages:
    - stage: path
      stageUuid: "07dc4f3e-b63d-8305-aec4-5d7c8b559ce3"
    - stage: trinity
      stageUuid: "0f71660e-b2b2-89c7-8294-d5eb8d65c721"
    - stage: boundary
      stageUuid: "8ac7bd0c-c01a-8bc5-9583-e8c692fc6ab8"
    - stage: links
      stageUuid: "302ef3d4-1e74-8a44-9e5c-f1f56ceb0e98"
    - stage: horo
      stageUuid: "7907f97a-0c7b-8069-86d2-557837cb06b2"
    - stage: seal
      stageUuid: "34a00910-8197-812a-81b7-986686cbfec1"
    - stage: uuid
      stageUuid: "786ec5bc-9a0d-82f0-a441-200ece1d0f25"
version: 2
---
# accounting/ledger

Token ledger — path-keyed postings and balance by path.

**Law — [[law]]: accounting/ledger composes under [[accounting]] — path-keyed, content-addressed, no hand-maintained GL catalogue.**

Matter-twin: `src/accounting/ledger/index.ts`

Composes [[accounting]] · [[path]] · [[debit]] · [[balance]]
