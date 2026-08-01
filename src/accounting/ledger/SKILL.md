---
name: ledger
description: "Use when reasoning about accounting/ledger — token ledger — path-keyed postings and balance by path."
atomPath: "accounting/ledger"
coordinate: "accounting/ledger · 4/weave · c1165431"
contentUuid: "7120da05-e063-51c8-90c4-ebc9ce6f80bb"
diamondUuid: "6d740d01-d481-8e7c-81d6-269275c8192d"
uuid: "c1165431-c3d6-8de1-8187-36ae4ce4391e"
horo: 4
typography:
  partition: accounting
  bondDegree: 15
standards:
  - "IFRS IAS-1 + IFRS-15 §B16 metered usage"
bindings: []
signatures:
  computationUuid: "64aff867-e830-806f-971a-52ea365d12c4"
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
      stageUuid: "2fe07bee-be1d-896b-b8f9-95b5e08864a1"
    - stage: seal
      stageUuid: "34a00910-8197-812a-81b7-986686cbfec1"
    - stage: uuid
      stageUuid: "748f8f2d-e91f-8c5e-a317-4211eb490ead"
version: 2
---
# accounting/ledger

Token ledger — path-keyed postings and balance by path.

**Law — [[law]]: accounting/ledger composes under [[accounting]] — path-keyed, content-addressed, no hand-maintained GL catalogue.**

Matter-twin: `src/accounting/ledger/index.ts`

Composes [[accounting]] · [[path]] · [[debit]] · [[balance]]
