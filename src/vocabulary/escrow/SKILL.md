---
name: escrow
description: "Use when funds are held by a third party (escrow agent) pending satisfaction of contract conditions — separate legal/financial status from held-to-maturity or restricted cash per IAS-7"
atomPath: "vocabulary/escrow"
coordinate: "vocabulary/escrow · 1/base · a6730311"
contentUuid: "343e9bcd-d1f6-5bf6-a5fb-a690b69982ba"
diamondUuid: "eb23db28-3e88-8172-81b1-ae461a45f5a6"
uuid: "a6730311-84df-80b1-a492-87841290f01c"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "491692b9-bf85-84f5-99dc-abd66d983869"
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
      stageUuid: "509936f0-7910-8bdb-a596-608652859910"
    - stage: seal
      stageUuid: "c3f1ad31-6ea2-85b0-8902-6da6f54cc76b"
    - stage: uuid
      stageUuid: "f3f66a29-8771-85b8-a1b7-c2e4f19d98ac"
version: 2
---
# escrow

Use when funds are held by a third party (escrow agent) pending satisfaction of contract conditions — separate legal/financial status from held-to-maturity or restricted cash per IAS-7

Composes: [[Payments]] · [[bank/accounts]] · [[commitments/and/contingencies]] · [[balance]] · [[transaction]] · [[accounting]] · [[provision]].

**Law — [[law]]: escrow is funds held by a third-party agent pending satisfaction of contract conditions — a distinct legal/financial status (restricted cash, IAS-7) separate from the firm's own cash, released only when the condition is met.**

## Standards
- IAS-7 §47 (restricted cash)
- Not directly IFRS; legal construct affecting GL account selection and disclosure
