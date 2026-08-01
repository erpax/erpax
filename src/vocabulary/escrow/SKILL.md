---
name: escrow
description: "Use when funds are held by a third party (escrow agent) pending satisfaction of contract conditions — separate legal/financial status from held-to-maturity or restricted cash per IAS-7"
atomPath: "vocabulary/escrow"
coordinate: "vocabulary/escrow · 8/crest · d558c888"
contentUuid: "0bad9ae6-b16d-52b1-9502-529c7abc8526"
diamondUuid: "2abf24a0-f341-8569-9f4d-de9a55c57694"
uuid: "d558c888-74c5-84d2-99f2-1e60ef3efca9"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "a3ee33d9-ed7e-80c4-87e6-8050e761fcfc"
  stages:
    - stage: path
      stageUuid: "3970cd36-e692-8da9-8434-222c14efc20e"
    - stage: trinity
      stageUuid: "45391307-c8bf-82b4-bc46-11fccb1016aa"
    - stage: boundary
      stageUuid: "d423dac7-5198-8bf5-a348-dd3b3f94c64d"
    - stage: links
      stageUuid: "acfbd348-aea6-8fc8-aa97-5ee8c7657863"
    - stage: horo
      stageUuid: "eeb7e7fd-9e95-8d37-9155-ea2d9eaf89eb"
    - stage: seal
      stageUuid: "7b4c7ca3-f6fd-8c92-a279-225dcf535f19"
    - stage: uuid
      stageUuid: "d5da0d98-9ab3-8ac0-a2f0-e58f9b6d7766"
version: 2
---
# escrow

Use when funds are held by a third party (escrow agent) pending satisfaction of contract conditions — separate legal/financial status from held-to-maturity or restricted cash per IAS-7

Composes: [[Payments]] · [[bank/accounts]] · [[commitments/and/contingencies]] · [[balance]] · [[transaction]] · [[accounting]] · [[provision]].

**Law — [[law]]: escrow is funds held by a third-party agent pending satisfaction of contract conditions — a distinct legal/financial status (restricted cash, IAS-7) separate from the firm's own cash, released only when the condition is met.**

## Standards
- IAS-7 §47 (restricted cash)
- Not directly IFRS; legal construct affecting GL account selection and disclosure
