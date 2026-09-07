---
name: parties
description: "Use when reasoning about parties — Both are a dated, line-itemised financial document with a status lifecycle, a balance and an aging profile. is that shape, the lifecycle it may walk, and the set both age into."
atomPath: "types/parties"
coordinate: "types/parties · 8/crest · 42a28238"
contentUuid: "92805007-9245-5615-9f0e-12e30d8bd81f"
diamondUuid: "078453dc-00f3-84e4-b476-926a8f92b4e1"
uuid: "42a28238-e367-8b58-b5c4-a6295392b5de"
horo: 8
typography:
  partition: types
  bondDegree: 3
standards:
  - "EN-16931:2017 invoice-and-credit-note"
  - "IFRS IFRS-9 expected-credit-loss"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time issue-date due-date"
  - "US-GAAP ASC-326 credit-losses-cecl"
bindings: []
signatures:
  computationUuid: "1c1c9898-8c57-8f55-a773-c1f9d058e69e"
  stages:
    - stage: path
      stageUuid: "aa5f378b-2792-8214-b250-77cb0c0fc060"
    - stage: trinity
      stageUuid: "ce7f2f4a-d4e6-81d0-b42a-ac7edbbf4bed"
    - stage: boundary
      stageUuid: "1b06ef76-027e-8621-a8c3-3b23fd299e47"
    - stage: links
      stageUuid: "23732026-a418-81f3-8b21-83d64fef9a5a"
    - stage: horo
      stageUuid: "4c555f58-13f6-8692-8b4a-984d2e1061e7"
    - stage: seal
      stageUuid: "272bdd6b-1396-8938-a035-14d9ed115690"
    - stage: uuid
      stageUuid: "2aa12423-4980-8302-b51a-34a58883ae73"
version: 2
---
# types/parties — a payable and a receivable are the same document seen from opposite sides

Both are a dated, line-itemised financial document with a status lifecycle, a balance and an
aging profile. `PartyDocument` is that shape, `TransitionTable` the lifecycle it may walk, and
`DEFAULT_AGING_BUCKETS` the `BucketDefinition` set both age into.

Modelling them twice makes A/R and A/P able to disagree about what "overdue" means. Sharing the
shape leaves only the counterparty and the sign to differ, which is the actual difference.

Composes: [[law]].
