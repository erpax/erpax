---
name: parties
description: "Use when reasoning about parties — Both are a dated, line-itemised financial document with a status lifecycle, a balance and an aging profile. is that shape, the lifecycle it may walk, and the set both age into."
atomPath: "types/parties"
coordinate: "types/parties · 1/base · ee84dcfc"
contentUuid: "f32ca796-a9ef-5178-a0ad-ba972ea07011"
diamondUuid: "3d1e21da-ba49-8703-b7b7-5b0d63140db6"
uuid: "ee84dcfc-9aea-827b-aa49-02567f868914"
horo: 1
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
  computationUuid: "b8be7e45-74e3-80bb-8584-d37e0e8227b4"
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
      stageUuid: "77b04c19-675d-864d-8ed9-3bcd96dc7df5"
    - stage: seal
      stageUuid: "272bdd6b-1396-8938-a035-14d9ed115690"
    - stage: uuid
      stageUuid: "1f47a414-c441-8572-b447-4f68042ab534"
version: 2
---
# types/parties — a payable and a receivable are the same document seen from opposite sides

Both are a dated, line-itemised financial document with a status lifecycle, a balance and an
aging profile. `PartyDocument` is that shape, `TransitionTable` the lifecycle it may walk, and
`DEFAULT_AGING_BUCKETS` the `BucketDefinition` set both age into.

Modelling them twice makes A/R and A/P able to disagree about what "overdue" means. Sharing the
shape leaves only the counterparty and the sign to differ, which is the actual difference.

Composes: [[law]].
