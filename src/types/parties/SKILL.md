---
name: parties
description: "Use when reasoning about parties — Both are a dated, line-itemised financial document with a status lifecycle, a balance and an aging profile. is that shape, the lifecycle it may walk, and the set both age into."
atomPath: "types/parties"
coordinate: "types/parties · 8/crest · 49c6058e"
contentUuid: "884d362f-f604-59f8-807d-81ec7f333953"
diamondUuid: "27b24488-e6d6-8aa1-9dca-b445cd49b872"
uuid: "49c6058e-44e0-8fc5-b1f4-7e0e532f4274"
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
  computationUuid: "f0c5bff1-e78e-8e71-9018-a27325d7b663"
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
      stageUuid: "091a5ae9-10b0-8f7b-97d9-b567b23b88e7"
    - stage: seal
      stageUuid: "272bdd6b-1396-8938-a035-14d9ed115690"
    - stage: uuid
      stageUuid: "8568b757-92c9-8df2-a54a-cc8b519ff8b8"
version: 2
---
# types/parties — a payable and a receivable are the same document seen from opposite sides

Both are a dated, line-itemised financial document with a status lifecycle, a balance and an
aging profile. `PartyDocument` is that shape, `TransitionTable` the lifecycle it may walk, and
`DEFAULT_AGING_BUCKETS` the `BucketDefinition` set both age into.

Modelling them twice makes A/R and A/P able to disagree about what "overdue" means. Sharing the
shape leaves only the counterparty and the sign to differ, which is the actual difference.

Composes: [[law]].
