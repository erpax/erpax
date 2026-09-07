---
name: deferredrevenue
description: "Use when reasoning about deferredrevenue — Use for customer advance payments or contract-liability positions — amounts received before performance is satisfied; net against contract assets to determine net contract position"
atomPath: "vocabulary/deferredrevenue"
coordinate: "vocabulary/deferredrevenue · 8/crest · 3e475a19"
contentUuid: "7ed2aee8-00c2-5139-8bff-3f29d6998eb6"
diamondUuid: "5bd326b6-4fc6-84e0-a6b9-0ea26459f6b3"
uuid: "3e475a19-ea67-89c3-a537-209fd3cf3b2e"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 30
standards: []
bindings: []
signatures:
  computationUuid: "da67b5fe-954e-8777-a6f7-c99d634d6f2c"
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
      stageUuid: "c01420f7-ea3f-8fe9-926a-0c04def66698"
    - stage: seal
      stageUuid: "2dc14782-46ed-8bd7-9e60-ad089160ee2d"
    - stage: uuid
      stageUuid: "ad2ed2ac-5d30-869a-8e55-36475fdecd3f"
version: 2
---
# deferredrevenue

Use for customer advance payments or contract-liability positions — amounts received before performance is satisfied; net against contract assets to determine net contract position

Composes: [[Invoices]] · [[Contracts]] · [[customers/contracts/contract/performances]] · [[journal/entries]] · [[accrual]] · [[deferral]].

**Law — [[law]]: deferred revenue is a contract liability — cash received before the performance obligation is satisfied; it nets against contract assets to yield the net contract position ([[deferral]], the mirror of [[accrual]]).**

## Standards
- IFRS-15 §85-86 (contract liability)
- FASB ASC 606-10-45-1 (liability recognized for advance payment)
