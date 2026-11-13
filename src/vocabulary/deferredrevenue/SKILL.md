---
name: deferredrevenue
description: "Use when reasoning about deferredrevenue — Use for customer advance payments or contract-liability positions — amounts received before performance is satisfied; net against contract assets to determine net contract position"
atomPath: "vocabulary/deferredrevenue"
coordinate: "vocabulary/deferredrevenue · 7/descent · 01f23175"
contentUuid: "71bb4f41-c8a8-54fd-a318-e4794bc3cd1f"
diamondUuid: "bb2b91fd-0146-8d8b-96f1-350b7814834f"
uuid: "01f23175-4b1e-8ce3-b44e-fe939314472c"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 27
standards: []
bindings: []
signatures:
  computationUuid: "acb0b010-aebd-8503-bcbd-e47186be6c6b"
  stages:
    - stage: path
      stageUuid: "043bb685-a1fd-89bd-9b58-f43f6ae67bac"
    - stage: trinity
      stageUuid: "b1654661-3afc-8290-ae36-ebebf74b596a"
    - stage: boundary
      stageUuid: "d6abb7a9-e2cb-86fc-adc5-6026809ae343"
    - stage: links
      stageUuid: "b1a1609f-262a-8bd7-af4a-f8490ca1bd0d"
    - stage: horo
      stageUuid: "ad5a4300-7b1a-8314-b5a2-f2ed6f95f9a5"
    - stage: seal
      stageUuid: "2dc14782-46ed-8bd7-9e60-ad089160ee2d"
    - stage: uuid
      stageUuid: "813399bb-ab8e-843e-b815-09a4b80aab62"
version: 2
---
# deferredrevenue

Use for customer advance payments or contract-liability positions — amounts received before performance is satisfied; net against contract assets to determine net contract position

Composes: [[Invoices]] · [[Contracts]] · [[customers/contracts/contract/performances]] · [[journal/entries]] · [[accrual]] · [[deferral]].

**Law — [[law]]: deferred revenue is a contract liability — cash received before the performance obligation is satisfied; it nets against contract assets to yield the net contract position ([[deferral]], the mirror of [[accrual]]).**

## Standards
- IFRS-15 §85-86 (contract liability)
- FASB ASC 606-10-45-1 (liability recognized for advance payment)
