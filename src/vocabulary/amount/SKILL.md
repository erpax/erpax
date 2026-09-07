---
name: amount
description: "Use when a value is a monetary quantity — invoice total, line price, payment received, account balance. A minor-unit integer + ISO-4217 currency code (never a currency-baked field name). The value-of-trade twin of measure (quantity+unit). Composes with currency to form money."
atomPath: "vocabulary/amount"
coordinate: "vocabulary/amount · 8/crest · b1d3c496"
contentUuid: "6b8de2c0-a9fc-5b38-a0d6-871880410a20"
diamondUuid: "7462090d-fafd-832a-9e6e-96f384bed46b"
uuid: "b1d3c496-bf6b-86dc-a06b-1c645cdee468"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 65
standards: []
bindings: []
signatures:
  computationUuid: "e330e57d-7d3e-8279-9db9-8a39ca595058"
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
      stageUuid: "6c1be8f8-679f-8bb8-a2f0-9e997e533ba5"
    - stage: seal
      stageUuid: "6bd5ff59-f5a7-8a7a-aa46-a76d7dbbf573"
    - stage: uuid
      stageUuid: "bc951ecb-0f67-8b72-868f-02d3b36cb3a6"
version: 2
---
# amount

Use when a value is a monetary quantity — invoice total, line price, payment received, account balance. A minor-unit integer + ISO-4217 currency code (never a currency-baked field name). The value-of-trade twin of measure (quantity+unit). Composes with currency to form money.

Composes: [[currency]] · [[field]] · [[accounting]] · [[commerce]].

## Standards
- ISO-4217:2015
