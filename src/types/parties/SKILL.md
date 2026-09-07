---
name: parties
description: "Use when reasoning about parties — Both are a dated, line-itemised financial document with a status lifecycle, a balance and an aging profile. is that shape, the lifecycle it may walk, and the set both age into."
atomPath: "types/parties"
coordinate: "types/parties · 4/weave · c4fa48f1"
contentUuid: "559b1965-8016-517e-950e-c0c1f92fa458"
diamondUuid: "58d589aa-091b-8ea2-8a86-eaee96dd3f32"
uuid: "c4fa48f1-696a-8ca0-878c-7e961a870129"
horo: 4
typography:
  partition: types
  bondDegree: 6
standards:
  - "EN-16931:2017 invoice-and-credit-note"
  - "IFRS IFRS-9 expected-credit-loss"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time issue-date due-date"
  - "US-GAAP ASC-326 credit-losses-cecl"
bindings: []
signatures:
  computationUuid: "73e2d4ec-9b07-8259-80b5-10df336cb0aa"
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
      stageUuid: "7714abb8-6ae5-86fe-bc0c-dc3481d4c57d"
    - stage: seal
      stageUuid: "272bdd6b-1396-8938-a035-14d9ed115690"
    - stage: uuid
      stageUuid: "d6a88998-fb30-8445-828c-8fa123dc95f0"
version: 2
---
# types/parties — a payable and a receivable are the same document seen from opposite sides

Both are a dated, line-itemised financial document with a status lifecycle, a balance and an
aging profile. `PartyDocument` is that shape, `TransitionTable` the lifecycle it may walk, and
`DEFAULT_AGING_BUCKETS` the `BucketDefinition` set both age into.

Modelling them twice makes A/R and A/P able to disagree about what "overdue" means. Sharing the
shape leaves only the counterparty and the sign to differ, which is the actual difference.

Composes: [[law]].
