---
name: amount
description: "Use when a value is a monetary quantity — invoice total, line price, payment received, account balance. A minor-unit integer + ISO-4217 currency code (never a currency-baked field name). The value-of-trade twin of measure (quantity+unit). Composes with currency to form money."
atomPath: "vocabulary/amount"
coordinate: "vocabulary/amount · 5/round · 6bfe599d"
contentUuid: "343ff485-d872-553e-bc1b-c6f82a38c954"
diamondUuid: "1841bed5-61f4-84f7-a030-b5b7985190c3"
uuid: "6bfe599d-10a3-8552-a28b-12ec59ff1b4c"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 58
standards: []
bindings: []
signatures:
  computationUuid: "b8d0834a-da38-81ff-abcf-c5a284b2d1d8"
  stages:
    - stage: path
      stageUuid: "803dfcf8-107d-8e63-b016-4085edcfa670"
    - stage: trinity
      stageUuid: "3abcd2be-48fe-8690-a5e8-59aea7d479e6"
    - stage: boundary
      stageUuid: "f13aeef2-beb4-8884-811a-a880cc41ef56"
    - stage: links
      stageUuid: "7981ef3d-e34e-8ac4-b2bc-d97a67e4d40f"
    - stage: horo
      stageUuid: "3c9dc968-5a78-8c96-bcae-c3b117a16d86"
    - stage: seal
      stageUuid: "6bd5ff59-f5a7-8a7a-aa46-a76d7dbbf573"
    - stage: uuid
      stageUuid: "b5e616dd-98f4-85bd-bb38-8c883d3af74b"
version: 2
---
# amount

Use when a value is a monetary quantity — invoice total, line price, payment received, account balance. A minor-unit integer + ISO-4217 currency code (never a currency-baked field name). The value-of-trade twin of measure (quantity+unit). Composes with currency to form money.

Composes: [[currency]] · [[field]] · [[accounting]] · [[commerce]].

## Standards
- ISO-4217:2015
