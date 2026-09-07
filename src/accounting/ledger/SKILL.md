---
name: ledger
description: "Use when reasoning about accounting/ledger — token ledger — path-keyed postings and balance by path."
atomPath: "accounting/ledger"
coordinate: "accounting/ledger · 2/share · 128a1dff"
contentUuid: "55999170-2107-59ac-9f25-d894457471b8"
diamondUuid: "9ffeb353-3f6b-83ac-94e0-2b68568ec6c1"
uuid: "128a1dff-0883-8646-8da6-77973a1995fb"
horo: 2
typography:
  partition: accounting
  bondDegree: 15
standards:
  - "IFRS IAS-1 + IFRS-15 §B16 metered usage"
bindings: []
signatures:
  computationUuid: "00224daf-5a7c-8a04-b972-007bc1e723c7"
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
      stageUuid: "337abd8c-11b4-8f1c-9ecb-b3afb1b682d3"
    - stage: seal
      stageUuid: "34a00910-8197-812a-81b7-986686cbfec1"
    - stage: uuid
      stageUuid: "8aa5fe23-08b0-8c34-97ed-da9661830435"
version: 2
---
# accounting/ledger

Token ledger — path-keyed postings and balance by path.

**Law — [[law]]: accounting/ledger composes under [[accounting]] — path-keyed, content-addressed, no hand-maintained GL catalogue.**

Matter-twin: `src/accounting/ledger/index.ts`

Composes [[accounting]] · [[path]] · [[debit]] · [[balance]]
