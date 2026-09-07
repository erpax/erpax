---
name: ledger
description: "Use when reasoning about accounting/ledger — token ledger — path-keyed postings and balance by path."
atomPath: "accounting/ledger"
coordinate: "accounting/ledger · 8/crest · e807fa0f"
contentUuid: "a0a9b59d-099f-5c41-9aaf-a3f413cb3aec"
diamondUuid: "ecfe3516-6e2c-834c-83b6-e51a697919f6"
uuid: "e807fa0f-27c1-8531-a904-b74f3c8d5c0d"
horo: 8
typography:
  partition: accounting
  bondDegree: 15
standards:
  - "IFRS IAS-1 + IFRS-15 §B16 metered usage"
bindings: []
signatures:
  computationUuid: "47321794-0c4f-8b44-833b-3ccf977a5e74"
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
      stageUuid: "6f5eb293-1422-8fb7-914a-ddd9b998f796"
    - stage: seal
      stageUuid: "34a00910-8197-812a-81b7-986686cbfec1"
    - stage: uuid
      stageUuid: "13dc4c31-0182-830b-bf13-dc4a93456543"
version: 2
---
# accounting/ledger

Token ledger — path-keyed postings and balance by path.

**Law — [[law]]: accounting/ledger composes under [[accounting]] — path-keyed, content-addressed, no hand-maintained GL catalogue.**

Matter-twin: `src/accounting/ledger/index.ts`

Composes [[accounting]] · [[path]] · [[debit]] · [[balance]]
