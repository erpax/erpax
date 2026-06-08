---
name: deferral
description: "Use when deferring the recognition of revenue or expense to future periods pending contract performance, delivery, or time passage — the dual of accrual and core to IFRS-15 revenue recognition"
atomPath: deferral
coordinate: deferral · 5/round · 69aefc5b
contentUuid: "6374d04f-de78-5832-9ed3-696e0a7034e0"
diamondUuid: "e8fc0233-7072-8875-a131-a3635247261e"
uuid: "69aefc5b-80bf-8a53-a8fc-590d32a620dd"
horo: 5
bonds:
  in:
    - accrual
    - adjustments
    - agriculture
    - deferredrevenue
    - entries
    - journals
    - law
    - performances
    - prepaid
    - recognition
    - share
  out:
    - accrual
    - adjustments
    - agriculture
    - deferredrevenue
    - entries
    - journals
    - law
    - performances
    - prepaid
    - recognition
    - share
typography:
  partition: deferral
  bondDegree: 34
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - accrual
    - adjustments
    - entries
    - journals
    - law
    - performances
    - prepaid
  matrix:
    - accrual
    - adjustments
    - agriculture
    - deferredrevenue
    - entries
    - journals
    - law
    - performances
    - prepaid
    - recognition
    - share
  backlinks:
    - accrual
    - adjustments
    - agriculture
    - deferredrevenue
    - entries
    - journals
    - law
    - performances
    - prepaid
    - recognition
    - share
signatures:
  computationUuid: "316e85c1-1ed5-810a-a017-5140d0f8da33"
  stages:
    - stage: path
      stageUuid: "008b4283-3899-89f7-8512-c2ae4f1faf8d"
    - stage: trinity
      stageUuid: "b0a6e18d-fd68-8f6d-a0cd-cdaf05647ef5"
    - stage: boundary
      stageUuid: "60fcc47a-3a51-8842-a9bb-862b8e839830"
    - stage: links
      stageUuid: "0e75ea18-2b2d-8027-8e8e-da25969acc23"
    - stage: horo
      stageUuid: "0cc8b2f7-ab6f-8ffb-9927-fa74613b14e6"
    - stage: seal
      stageUuid: "293ca488-bdf2-8f77-80a7-abc3366f91e8"
    - stage: uuid
      stageUuid: "0acf0e79-2479-8de3-af22-8242f863f731"
version: 2
---
# deferral

Use when deferring the recognition of revenue or expense to future periods pending contract performance, delivery, or time passage — the dual of accrual and core to IFRS-15 revenue recognition

Composes: [[journal/entries]] · [[customers/contracts/contract/performances]] · [[gl/accounts/period/end/adjustments]] · [[gl/accounts/recurring/journals]] · [[accrual]] · [[prepaid]].

## Standards
- IFRS-15 §25 (contract liability)
- IAS-1 §27 (accrual basis)
- FASB ASC 606 §25

**Law — [[law]]: a deferral postpones recognition of revenue or expense to a future period pending contract performance, delivery or time passage — the dual of [[accrual]] and the core of IFRS-15 revenue recognition.**
