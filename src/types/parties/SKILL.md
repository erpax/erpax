---
name: parties
description: "Use when reasoning about parties — Both are a dated, line-itemised financial document with a status lifecycle, a balance and an aging profile. is that shape, the lifecycle it may walk, and the set both age into."
atomPath: "types/parties"
coordinate: "types/parties · 7/descent · 9669a9b4"
contentUuid: "41a0cb83-187b-5830-ad52-83c87b928832"
diamondUuid: "9ae38fa2-c651-8919-80f9-708c6dc7d709"
uuid: "9669a9b4-cf25-8537-9074-0b2e6fba34fc"
horo: 7
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
  computationUuid: "8c7dc6da-a0e5-8867-ae1c-556c30c7a098"
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
      stageUuid: "4ce7d099-ca5a-8c1c-95ee-f4de21bcd366"
    - stage: seal
      stageUuid: "272bdd6b-1396-8938-a035-14d9ed115690"
    - stage: uuid
      stageUuid: "3d1856b9-940a-8aba-b007-41e731cc06cd"
version: 2
---
# types/parties — a payable and a receivable are the same document seen from opposite sides

Both are a dated, line-itemised financial document with a status lifecycle, a balance and an
aging profile. `PartyDocument` is that shape, `TransitionTable` the lifecycle it may walk, and
`DEFAULT_AGING_BUCKETS` the `BucketDefinition` set both age into.

Modelling them twice makes A/R and A/P able to disagree about what "overdue" means. Sharing the
shape leaves only the counterparty and the sign to differ, which is the actual difference.

Composes: [[law]].
