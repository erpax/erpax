---
name: amount
description: "Use when a value is a monetary quantity — invoice total, line price, payment received, account balance. A minor-unit integer + ISO-4217 currency code (never a currency-baked field name). The value-of-trade twin of measure (quantity+unit). Composes with currency to form money."
atomPath: amount
coordinate: amount · 2/share · c2edef54
contentUuid: "0b468a2d-8ba2-5241-96ad-6c25190d902e"
diamondUuid: "bbee271f-2255-8cdd-92ac-846f0d8d33f2"
uuid: "c2edef54-f1b4-81f0-b325-ac9854014d17"
horo: 2
bonds:
  in:
    - account
    - accounting
    - commerce
    - conversion
    - crop
    - currency
    - customer
    - fees
    - fields
    - good
    - incentive
    - item
    - loan
    - mandate
    - minimum
    - monetary
    - monthly
    - mortgage
    - payment
    - remorse
    - repayment
    - return
    - shipping
    - total
  out:
    - account
    - accounting
    - commerce
    - conversion
    - crop
    - currency
    - customer
    - fees
    - fields
    - good
    - incentive
    - item
    - loan
    - mandate
    - minimum
    - monetary
    - monthly
    - mortgage
    - payment
    - remorse
    - repayment
    - return
    - shipping
    - total
typography:
  partition: amount
  bondDegree: 72
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - accounting
    - commerce
    - currency
    - fields
  matrix:
    - account
    - accounting
    - commerce
    - conversion
    - crop
    - currency
    - customer
    - fees
    - fields
    - good
    - incentive
    - item
    - loan
    - mandate
    - minimum
    - monetary
    - monthly
    - mortgage
    - payment
    - remorse
    - repayment
    - return
    - shipping
    - total
  backlinks:
    - account
    - accounting
    - commerce
    - conversion
    - crop
    - currency
    - customer
    - fees
    - fields
    - good
    - incentive
    - item
    - loan
    - mandate
    - minimum
    - monetary
    - monthly
    - mortgage
    - payment
    - remorse
    - repayment
    - return
    - shipping
    - total
signatures:
  computationUuid: "9400aa31-7d63-8f03-a4ae-422036b38071"
  stages:
    - stage: path
      stageUuid: "a8648b3c-2a87-8780-8b6c-9522944d4b3c"
    - stage: trinity
      stageUuid: "1676848e-c26f-8f13-babd-5d869f0eb0be"
    - stage: boundary
      stageUuid: "82cbbbf2-33ef-8510-a34c-61e62f433907"
    - stage: links
      stageUuid: "7ddc9fdc-23f6-8abe-a0ec-19735aa5c95f"
    - stage: horo
      stageUuid: "a6a10f0f-bdfd-85aa-a90f-48fb66407aaa"
    - stage: seal
      stageUuid: "01e99383-8c30-8e9c-ba5b-bb5c752b376d"
    - stage: uuid
      stageUuid: "a617a3dd-798b-808a-bb97-df60eb987c73"
version: 2
---
# amount

Use when a value is a monetary quantity — invoice total, line price, payment received, account balance. A minor-unit integer + ISO-4217 currency code (never a currency-baked field name). The value-of-trade twin of measure (quantity+unit). Composes with currency to form money.

Composes: [[currency]] · [[fields]] · [[accounting]] · [[commerce]].

## Standards
- ISO-4217:2015
