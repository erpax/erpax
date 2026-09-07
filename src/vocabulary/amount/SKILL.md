---
name: amount
description: "Use when a value is a monetary quantity — invoice total, line price, payment received, account balance. A minor-unit integer + ISO-4217 currency code (never a currency-baked field name). The value-of-trade twin of measure (quantity+unit). Composes with currency to form money."
atomPath: "vocabulary/amount"
coordinate: "vocabulary/amount · 1/base · 532dc0f6"
contentUuid: "75a212e8-1e3a-536a-ad81-ad2a1ed0a79c"
diamondUuid: "27074818-360a-85bd-b5ec-2d61c8f18f31"
uuid: "532dc0f6-7424-85bd-8c5a-d352e8eac89f"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 67
standards: []
bindings: []
signatures:
  computationUuid: "7d31990a-7535-8592-acfa-557cac27b936"
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
      stageUuid: "db2604c2-fb46-892d-964b-7547201dec59"
    - stage: seal
      stageUuid: "6bd5ff59-f5a7-8a7a-aa46-a76d7dbbf573"
    - stage: uuid
      stageUuid: "89488480-8918-8e8d-91aa-054a222607d5"
version: 2
---
# amount

Use when a value is a monetary quantity — invoice total, line price, payment received, account balance. A minor-unit integer + ISO-4217 currency code (never a currency-baked field name). The value-of-trade twin of measure (quantity+unit). Composes with currency to form money.

Composes: [[currency]] · [[field]] · [[accounting]] · [[commerce]].

## Standards
- ISO-4217:2015
