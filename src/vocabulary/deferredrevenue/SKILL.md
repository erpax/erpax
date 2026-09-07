---
name: deferredrevenue
description: "Use when reasoning about deferredrevenue — Use for customer advance payments or contract-liability positions — amounts received before performance is satisfied; net against contract assets to determine net contract position"
atomPath: "vocabulary/deferredrevenue"
coordinate: "vocabulary/deferredrevenue · 4/weave · aefb81b4"
contentUuid: "b652b6ce-7cc7-55da-a6cd-33b828b93f2b"
diamondUuid: "8164025f-46c6-8df4-9455-874237421b6c"
uuid: "aefb81b4-dc0b-85fe-9266-3f09213a0a65"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 30
standards: []
bindings: []
signatures:
  computationUuid: "03047979-2d66-8a42-8517-7cdb7b14968a"
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
      stageUuid: "19944ba4-370d-807a-ad36-9536dc84918f"
    - stage: seal
      stageUuid: "2dc14782-46ed-8bd7-9e60-ad089160ee2d"
    - stage: uuid
      stageUuid: "5a335ea6-7642-80b6-99ac-151e05b4e297"
version: 2
---
# deferredrevenue

Use for customer advance payments or contract-liability positions — amounts received before performance is satisfied; net against contract assets to determine net contract position

Composes: [[Invoices]] · [[Contracts]] · [[customers/contracts/contract/performances]] · [[journal/entries]] · [[accrual]] · [[deferral]].

**Law — [[law]]: deferred revenue is a contract liability — cash received before the performance obligation is satisfied; it nets against contract assets to yield the net contract position ([[deferral]], the mirror of [[accrual]]).**

## Standards
- IFRS-15 §85-86 (contract liability)
- FASB ASC 606-10-45-1 (liability recognized for advance payment)
