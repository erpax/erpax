---
name: deferredrevenue
description: "Use when reasoning about deferredrevenue — Use for customer advance payments or contract-liability positions — amounts received before performance is satisfied; net against contract assets to determine net contract position"
atomPath: "vocabulary/deferredrevenue"
coordinate: "vocabulary/deferredrevenue · 8/crest · 0428d9df"
contentUuid: "5ebb897e-8e3f-5720-b34b-c88a27f0ce5b"
diamondUuid: "2b2368ef-4b3d-89f7-a8d3-904bca2ca771"
uuid: "0428d9df-7853-8b2d-a99e-a7b1575e709a"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 30
standards: []
bindings: []
signatures:
  computationUuid: "bccc6e82-0915-8e95-a70a-ac1791ab4890"
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
      stageUuid: "8f81271c-d58c-8bec-b78e-8e28964e6722"
    - stage: seal
      stageUuid: "2e3d52c5-8b6a-86c8-ba05-e8a7c2dfec06"
    - stage: uuid
      stageUuid: "afa4f18c-2e7d-8345-8e48-5a7adb32bbc6"
version: 2
---
# deferredrevenue

Use for customer advance payments or contract-liability positions — amounts received before performance is satisfied; net against contract assets to determine net contract position

Composes: [[Invoices]] · [[Contracts]] · [[customers/contracts/contract/performances]] · [[journal/entries]] · [[accrual]] · [[deferral]].

**Law — [[law]]: deferred revenue is a contract liability — cash received before the performance obligation is satisfied; it nets against contract assets to yield the net contract position ([[deferral]], the mirror of [[accrual]]).**

## Standards
- IFRS-15 §85-86 (contract liability)
- FASB ASC 606-10-45-1 (liability recognized for advance payment)
