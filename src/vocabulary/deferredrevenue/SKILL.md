---
name: deferredrevenue
description: "Use when reasoning about deferredrevenue — Use for customer advance payments or contract-liability positions — amounts received before performance is satisfied; net against contract assets to determine net contract position"
atomPath: "vocabulary/deferredrevenue"
coordinate: "vocabulary/deferredrevenue · 7/descent · c5fc19d6"
contentUuid: "ba31a026-90fb-5116-8cd3-9b6cacda9afe"
diamondUuid: "8382b652-c73f-8165-8ad2-cbaeb419f6fc"
uuid: "c5fc19d6-0844-8c89-b359-20f9bc228842"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 30
standards: []
bindings: []
signatures:
  computationUuid: "7bfabc12-5777-8703-9d76-90b0396facd3"
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
      stageUuid: "ae9b0aa3-1c35-8753-a232-300acf2e6df2"
    - stage: seal
      stageUuid: "2dc14782-46ed-8bd7-9e60-ad089160ee2d"
    - stage: uuid
      stageUuid: "7dcd61ae-25c2-8b0d-a98b-387a7513384d"
version: 2
---
# deferredrevenue

Use for customer advance payments or contract-liability positions — amounts received before performance is satisfied; net against contract assets to determine net contract position

Composes: [[Invoices]] · [[Contracts]] · [[customers/contracts/contract/performances]] · [[journal/entries]] · [[accrual]] · [[deferral]].

**Law — [[law]]: deferred revenue is a contract liability — cash received before the performance obligation is satisfied; it nets against contract assets to yield the net contract position ([[deferral]], the mirror of [[accrual]]).**

## Standards
- IFRS-15 §85-86 (contract liability)
- FASB ASC 606-10-45-1 (liability recognized for advance payment)
