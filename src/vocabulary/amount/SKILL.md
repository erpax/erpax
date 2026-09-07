---
name: amount
description: "Use when a value is a monetary quantity — invoice total, line price, payment received, account balance. A minor-unit integer + ISO-4217 currency code (never a currency-baked field name). The value-of-trade twin of measure (quantity+unit). Composes with currency to form money."
atomPath: "vocabulary/amount"
coordinate: "vocabulary/amount · 2/share · 884737c6"
contentUuid: "55f55321-f0f3-50a2-8d10-c24614953f7f"
diamondUuid: "174e5d25-a4c4-8cff-9208-4bbf144487f6"
uuid: "884737c6-04ae-8eda-ad8f-7d19b635ecee"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 67
standards: []
bindings: []
signatures:
  computationUuid: "3675a31e-4863-8698-a96a-9e35e272d5c4"
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
      stageUuid: "5fcbb177-bc9d-8667-be08-ac62d1e9c267"
    - stage: seal
      stageUuid: "6bd5ff59-f5a7-8a7a-aa46-a76d7dbbf573"
    - stage: uuid
      stageUuid: "d42b1335-667b-8542-9162-cb193cea1b62"
version: 2
---
# amount

Use when a value is a monetary quantity — invoice total, line price, payment received, account balance. A minor-unit integer + ISO-4217 currency code (never a currency-baked field name). The value-of-trade twin of measure (quantity+unit). Composes with currency to form money.

Composes: [[currency]] · [[field]] · [[accounting]] · [[commerce]].

## Standards
- ISO-4217:2015
