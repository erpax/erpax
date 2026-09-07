---
name: ledger
description: "Use when reasoning about accounting/ledger — token ledger — path-keyed postings and balance by path."
atomPath: "accounting/ledger"
coordinate: "accounting/ledger · 8/crest · 05a85733"
contentUuid: "e8205328-825b-5b51-a9d1-854e43f1ec4c"
diamondUuid: "f251782f-271a-8db9-a50a-2161fe752e40"
uuid: "05a85733-f0a2-8a57-8d16-615f4aef50e7"
horo: 8
typography:
  partition: accounting
  bondDegree: 15
standards:
  - "IFRS IAS-1 + IFRS-15 §B16 metered usage"
bindings: []
signatures:
  computationUuid: "cf16d377-be21-89ac-8183-0d46e25d7969"
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
      stageUuid: "362c46b0-464d-8d61-9bae-9d08bd7c3004"
    - stage: seal
      stageUuid: "34a00910-8197-812a-81b7-986686cbfec1"
    - stage: uuid
      stageUuid: "2f02617e-506a-8794-81a8-df2fae05cbbd"
version: 2
---
# accounting/ledger

Token ledger — path-keyed postings and balance by path.

**Law — [[law]]: accounting/ledger composes under [[accounting]] — path-keyed, content-addressed, no hand-maintained GL catalogue.**

Matter-twin: `src/accounting/ledger/index.ts`

Composes [[accounting]] · [[path]] · [[debit]] · [[balance]]
