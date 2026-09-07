---
name: escrow
description: "Use when funds are held by a third party (escrow agent) pending satisfaction of contract conditions — separate legal/financial status from held-to-maturity or restricted cash per IAS-7"
atomPath: "vocabulary/escrow"
coordinate: "vocabulary/escrow · 4/weave · e62519b8"
contentUuid: "743287f2-465c-50b4-9d25-1ec6e08e79b4"
diamondUuid: "84275397-32f5-88e7-99ed-7f427d064013"
uuid: "e62519b8-55e1-888c-a33b-4cbfc13aa131"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "c4212a14-ed7d-8123-b3a5-8f2416eb9ee3"
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
      stageUuid: "bf051a38-dcb7-8fa5-9ee7-0a44243f3c0f"
    - stage: seal
      stageUuid: "c3f1ad31-6ea2-85b0-8902-6da6f54cc76b"
    - stage: uuid
      stageUuid: "e3e855a9-8262-8aa2-9cea-00838c347cde"
version: 2
---
# escrow

Use when funds are held by a third party (escrow agent) pending satisfaction of contract conditions — separate legal/financial status from held-to-maturity or restricted cash per IAS-7

Composes: [[Payments]] · [[bank/accounts]] · [[commitments/and/contingencies]] · [[balance]] · [[transaction]] · [[accounting]] · [[provision]].

**Law — [[law]]: escrow is funds held by a third-party agent pending satisfaction of contract conditions — a distinct legal/financial status (restricted cash, IAS-7) separate from the firm's own cash, released only when the condition is met.**

## Standards
- IAS-7 §47 (restricted cash)
- Not directly IFRS; legal construct affecting GL account selection and disclosure
