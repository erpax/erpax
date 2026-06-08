---
name: recognition
description: "Use when determining whether to record (recognize) an asset, liability, revenue, or expense per the accounting framework — the gate for when something enters the financial statements"
atomPath: recognition
coordinate: recognition · 2/share · bf6dafed
contentUuid: "bc0e21a1-e4b5-5415-80e4-0cc21a69736e"
diamondUuid: "3d7ea493-87ba-8b02-8dd5-94430b87c2c8"
uuid: "bf6dafed-2574-8c9c-93fe-c3fd031d7d8a"
horo: 2
bonds:
  in:
    - accrual
    - agriculture
    - balance
    - deferral
    - entries
    - harvest
    - law
    - performances
    - prepaid
    - share
  out:
    - accrual
    - agriculture
    - balance
    - deferral
    - entries
    - harvest
    - law
    - performances
    - prepaid
    - share
typography:
  partition: recognition
  bondDegree: 30
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - accrual
    - balance
    - deferral
    - entries
    - law
    - performances
  matrix:
    - accrual
    - agriculture
    - balance
    - deferral
    - entries
    - harvest
    - law
    - performances
    - prepaid
    - share
  backlinks:
    - accrual
    - agriculture
    - balance
    - deferral
    - entries
    - harvest
    - law
    - performances
    - prepaid
    - share
signatures:
  computationUuid: "8bb7dafd-0da8-8dad-be71-ba191b0bf2c1"
  stages:
    - stage: path
      stageUuid: "07b0bdab-753a-81a4-b373-1eecc05f37dd"
    - stage: trinity
      stageUuid: "bed414c2-f71d-82a8-a4ee-5398472b5abf"
    - stage: boundary
      stageUuid: "ab04e77b-3edb-8ae4-a1d0-0ab37de86ec1"
    - stage: links
      stageUuid: "25010192-21bc-8672-ba3d-cb800697e85c"
    - stage: horo
      stageUuid: "54969121-2b79-8960-b5a2-91e861761ad5"
    - stage: seal
      stageUuid: "5be04a6a-72e0-8f9d-9250-437de92bfdc1"
    - stage: uuid
      stageUuid: "02626f0a-4fe6-820b-ad99-55c6958546c9"
version: 2
---
# recognition

Use when determining whether to record (recognize) an asset, liability, revenue, or expense per the accounting framework — the gate for when something enters the financial statements

Composes: [[journal/entries]] · [[accrual]] · [[deferral]] · [[customers/contracts/contract/performances]] · [[balance]].

**Law — [[law]]: recognition is the gate for when an asset, liability, revenue, or expense enters the financial statements — satisfy the framework's criteria and it is recorded, not before.**

## Standards
- IAS-1 §27-30 (recognition criteria)
- IFRS-15 §31-35 (revenue recognition)
- FASB ASC 405 (liabilities)
