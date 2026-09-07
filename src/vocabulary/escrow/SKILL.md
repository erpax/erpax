---
name: escrow
description: "Use when funds are held by a third party (escrow agent) pending satisfaction of contract conditions — separate legal/financial status from held-to-maturity or restricted cash per IAS-7"
atomPath: "vocabulary/escrow"
coordinate: "vocabulary/escrow · 5/round · 05fe59ea"
contentUuid: "72522812-3216-5ad7-8019-73784fefd0c5"
diamondUuid: "27e73233-6dbe-854a-83c1-9eb04d3e48c3"
uuid: "05fe59ea-19a0-89bd-92e6-731ac8ef9dc7"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "90be97e6-d70b-8a88-80b5-b27550db2f90"
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
      stageUuid: "9e3fa2d0-1e79-8d2f-9cb2-a46c07543bb7"
    - stage: seal
      stageUuid: "c3f1ad31-6ea2-85b0-8902-6da6f54cc76b"
    - stage: uuid
      stageUuid: "fda0f423-a98a-8430-89e7-d4836d26248a"
version: 2
---
# escrow

Use when funds are held by a third party (escrow agent) pending satisfaction of contract conditions — separate legal/financial status from held-to-maturity or restricted cash per IAS-7

Composes: [[Payments]] · [[bank/accounts]] · [[commitments/and/contingencies]] · [[balance]] · [[transaction]] · [[accounting]] · [[provision]].

**Law — [[law]]: escrow is funds held by a third-party agent pending satisfaction of contract conditions — a distinct legal/financial status (restricted cash, IAS-7) separate from the firm's own cash, released only when the condition is met.**

## Standards
- IAS-7 §47 (restricted cash)
- Not directly IFRS; legal construct affecting GL account selection and disclosure
