---
name: amount
description: "Use when a value is a monetary quantity — invoice total, line price, payment received, account balance. A minor-unit integer + ISO-4217 currency code (never a currency-baked field name). The value-of-trade twin of measure (quantity+unit). Composes with currency to form money."
atomPath: "vocabulary/amount"
coordinate: "vocabulary/amount · 4/weave · 6bf3c075"
contentUuid: "7be36bb0-02af-5a38-8960-c7d126325187"
diamondUuid: "032264dd-4389-844a-8f65-1397cb25e246"
uuid: "6bf3c075-37a5-8cc8-9183-6a2a7bb133fc"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 67
standards: []
bindings: []
signatures:
  computationUuid: "ed9c28f8-54b0-80df-beb0-8b2a1477a33b"
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
      stageUuid: "b94a767d-a27d-8dc1-b4ba-5fc570d439bb"
    - stage: seal
      stageUuid: "6bd5ff59-f5a7-8a7a-aa46-a76d7dbbf573"
    - stage: uuid
      stageUuid: "6bcbd1d6-ac22-832c-909e-f017ecb230be"
version: 2
---
# amount

Use when a value is a monetary quantity — invoice total, line price, payment received, account balance. A minor-unit integer + ISO-4217 currency code (never a currency-baked field name). The value-of-trade twin of measure (quantity+unit). Composes with currency to form money.

Composes: [[currency]] · [[field]] · [[accounting]] · [[commerce]].

## Standards
- ISO-4217:2015
