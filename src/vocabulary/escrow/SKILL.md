---
name: escrow
description: "Use when funds are held by a third party (escrow agent) pending satisfaction of contract conditions — separate legal/financial status from held-to-maturity or restricted cash per IAS-7"
atomPath: "vocabulary/escrow"
coordinate: "vocabulary/escrow · 1/base · d26fc51f"
contentUuid: "fbf8299a-cbfb-58e5-b82b-6390626a58de"
diamondUuid: "87aef296-647f-8d59-ab8a-380cd41e1579"
uuid: "d26fc51f-48aa-80dc-8d56-c4caffe253fc"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "eca5e998-ea73-817e-99f5-77be234249e3"
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
      stageUuid: "26778b33-c706-8abf-ab08-5139ec928743"
    - stage: seal
      stageUuid: "c3f1ad31-6ea2-85b0-8902-6da6f54cc76b"
    - stage: uuid
      stageUuid: "d5f3e65a-4330-84b1-8580-42de801c2fcb"
version: 2
---
# escrow

Use when funds are held by a third party (escrow agent) pending satisfaction of contract conditions — separate legal/financial status from held-to-maturity or restricted cash per IAS-7

Composes: [[Payments]] · [[bank/accounts]] · [[commitments/and/contingencies]] · [[balance]] · [[transaction]] · [[accounting]] · [[provision]].

**Law — [[law]]: escrow is funds held by a third-party agent pending satisfaction of contract conditions — a distinct legal/financial status (restricted cash, IAS-7) separate from the firm's own cash, released only when the condition is met.**

## Standards
- IAS-7 §47 (restricted cash)
- Not directly IFRS; legal construct affecting GL account selection and disclosure
