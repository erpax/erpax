---
name: amount
description: "Use when a value is a monetary quantity — invoice total, line price, payment received, account balance. A minor-unit integer + ISO-4217 currency code (never a currency-baked field name). The value-of-trade twin of measure (quantity+unit). Composes with currency to form money."
atomPath: "vocabulary/amount"
coordinate: "vocabulary/amount · 2/share · 995a0224"
contentUuid: "fed72dc4-4704-5917-bb13-acf64b6c2f80"
diamondUuid: "ad394764-97e1-8df5-a385-fea30d929adb"
uuid: "995a0224-6562-8302-8b47-81fe9609a2be"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 67
standards: []
bindings: []
signatures:
  computationUuid: "594645fe-c9dc-8de4-bc77-9eef6beb97c8"
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
      stageUuid: "bc4a50ee-3b73-8098-bd06-b70c1b13e17e"
    - stage: seal
      stageUuid: "6bd5ff59-f5a7-8a7a-aa46-a76d7dbbf573"
    - stage: uuid
      stageUuid: "155df4da-8c5d-8442-a317-f10579cbca03"
version: 2
---
# amount

Use when a value is a monetary quantity — invoice total, line price, payment received, account balance. A minor-unit integer + ISO-4217 currency code (never a currency-baked field name). The value-of-trade twin of measure (quantity+unit). Composes with currency to form money.

Composes: [[currency]] · [[field]] · [[accounting]] · [[commerce]].

## Standards
- ISO-4217:2015
