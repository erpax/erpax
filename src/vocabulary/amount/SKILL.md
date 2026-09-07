---
name: amount
description: "Use when a value is a monetary quantity — invoice total, line price, payment received, account balance. A minor-unit integer + ISO-4217 currency code (never a currency-baked field name). The value-of-trade twin of measure (quantity+unit). Composes with currency to form money."
atomPath: "vocabulary/amount"
coordinate: "vocabulary/amount · 1/base · f182134a"
contentUuid: "7a25175e-5f6f-59c6-b65e-f4248b4b39da"
diamondUuid: "a8437c93-7a7d-8785-a538-e6710432be34"
uuid: "f182134a-0b5a-82b5-800e-6c18a601c20d"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 67
standards: []
bindings: []
signatures:
  computationUuid: "78ef359e-955c-8ef8-971c-dc2ad9fb2565"
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
      stageUuid: "ef5c3e1b-21c2-82a4-8009-bb34674e4cb6"
    - stage: seal
      stageUuid: "6bd5ff59-f5a7-8a7a-aa46-a76d7dbbf573"
    - stage: uuid
      stageUuid: "ed94a729-3271-8e63-b96a-3ed0628484ba"
version: 2
---
# amount

Use when a value is a monetary quantity — invoice total, line price, payment received, account balance. A minor-unit integer + ISO-4217 currency code (never a currency-baked field name). The value-of-trade twin of measure (quantity+unit). Composes with currency to form money.

Composes: [[currency]] · [[field]] · [[accounting]] · [[commerce]].

## Standards
- ISO-4217:2015
