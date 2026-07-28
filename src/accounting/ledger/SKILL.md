---
name: ledger
description: "Use when reasoning about accounting/ledger — token ledger — path-keyed postings and balance by path."
atomPath: "accounting/ledger"
coordinate: "accounting/ledger · 5/round · 8e865d7f"
contentUuid: "28b3ffd9-0eb5-5564-8bdc-0e56f7d76a7e"
diamondUuid: "6915dd51-49c4-8d38-bb70-36dee4d26e9b"
uuid: "8e865d7f-5a59-80b1-9786-b0905a4bd1bc"
horo: 5
bonds:
  in:
    - accounting
    - balance
    - debit
    - law
    - path
  out:
    - accounting
    - balance
    - debit
    - law
    - path
typography:
  partition: accounting
  bondDegree: 15
  neighbors: []
standards:
  - "IFRS IAS-1 + IFRS-15 §B16 metered usage"
bindings: []
neighbors:
  wikilink:
    - accounting
    - balance
    - debit
    - law
    - path
  matrix:
    - accounting
    - balance
    - debit
    - law
    - path
  backlinks:
    - accounting
    - balance
    - debit
    - law
    - path
signatures:
  computationUuid: "ae5fdb9a-b52d-8d18-b9a8-666d9fa50b34"
  stages:
    - stage: path
      stageUuid: "07dc4f3e-b63d-8305-aec4-5d7c8b559ce3"
    - stage: trinity
      stageUuid: "0f71660e-b2b2-89c7-8294-d5eb8d65c721"
    - stage: boundary
      stageUuid: "d8c11ec7-eb32-8636-9d7b-e9e3d6e00dc0"
    - stage: links
      stageUuid: "302ef3d4-1e74-8a44-9e5c-f1f56ceb0e98"
    - stage: horo
      stageUuid: "82377016-c38e-8682-9a49-5aedffb58de2"
    - stage: seal
      stageUuid: "34a00910-8197-812a-81b7-986686cbfec1"
    - stage: uuid
      stageUuid: "ccfddebc-4ab2-8ec4-8b54-6da302313fc6"
version: 2
---
# accounting/ledger

Token ledger — path-keyed postings and balance by path.

**Law — [[law]]: accounting/ledger composes under [[accounting]] — path-keyed, content-addressed, no hand-maintained GL catalogue.**

Matter-twin: `src/accounting/ledger/index.ts`

Composes [[accounting]] · [[path]] · [[debit]] · [[balance]]
