---
name: escrow
description: "Use when funds are held by a third party (escrow agent) pending satisfaction of contract conditions — separate legal/financial status from held-to-maturity or restricted cash per IAS-7"
atomPath: escrow
coordinate: escrow · 1/base · 28a39971
contentUuid: "c8296dca-62c0-5185-b6fb-b42e3e60cb10"
diamondUuid: "b68d1e51-800f-8f30-b20f-5184675ade37"
uuid: "28a39971-ce79-8581-811b-b981094716fe"
horo: 1
bonds:
  in:
    - accounting
    - accounts
    - balance
    - contingencies
    - law
    - payments
    - provision
    - transaction
  out:
    - accounting
    - accounts
    - balance
    - contingencies
    - law
    - payments
    - provision
    - transaction
typography:
  partition: escrow
  bondDegree: 24
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - accounting
    - accounts
    - balance
    - contingencies
    - law
    - payments
    - provision
    - transaction
  matrix:
    - accounting
    - accounts
    - balance
    - contingencies
    - law
    - payments
    - provision
    - transaction
  backlinks:
    - accounting
    - accounts
    - balance
    - contingencies
    - law
    - payments
    - provision
    - transaction
signatures:
  computationUuid: "32b2746e-64d4-8097-b4e0-1e8268976375"
  stages:
    - stage: path
      stageUuid: "d8891850-a221-8d92-9c16-b0541b8ce701"
    - stage: trinity
      stageUuid: "09e1b772-de75-8a83-b615-4e706312b298"
    - stage: boundary
      stageUuid: "e24511a4-21d1-8974-8d7b-d3e2f2d0b7d7"
    - stage: links
      stageUuid: "f47bdf7c-98dc-8666-ba9f-e602e9a022b6"
    - stage: horo
      stageUuid: "6660abfa-8814-8536-90b8-f5c78aebcfc6"
    - stage: seal
      stageUuid: "27ec0e67-c083-8662-ad61-a016e97de8cf"
    - stage: uuid
      stageUuid: "ff02ee0c-80a5-8b00-8242-a25a10c01de3"
version: 2
---
# escrow

Use when funds are held by a third party (escrow agent) pending satisfaction of contract conditions — separate legal/financial status from held-to-maturity or restricted cash per IAS-7

Composes: [[Payments]] · [[bank/accounts]] · [[commitments/and/contingencies]] · [[balance]] · [[transaction]] · [[accounting]] · [[provision]].

**Law — [[law]]: escrow is funds held by a third-party agent pending satisfaction of contract conditions — a distinct legal/financial status (restricted cash, IAS-7) separate from the firm's own cash, released only when the condition is met.**

## Standards
- IAS-7 §47 (restricted cash)
- Not directly IFRS; legal construct affecting GL account selection and disclosure
