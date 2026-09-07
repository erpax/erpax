---
name: money
description: "Use when reasoning about money — `Money` value type — integer-cents amount + ISO 4217 currency."
atomPath: "money/money"
coordinate: "money/money · 8/crest · 412d6ab1"
contentUuid: "5b68b4a9-54a6-59ab-ad88-090d2a7c6ca6"
diamondUuid: "d2bedcb8-a2b9-8526-be06-ff35fbe7dc83"
uuid: "412d6ab1-a790-89b8-b3d5-ae8f55379f0a"
horo: 8
typography:
  partition: money
  bondDegree: 45
standards:
  - "IEEE-754"
  - "IFRS IAS-21 foreign-currency-translation"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 §5 alphabetic-codes"
  - "US-GAAP ASC-830 foreign-currency-matters"
bindings: []
signatures:
  computationUuid: "5a828e18-1b4f-875d-b8d7-d1ac4c59f8fa"
  stages:
    - stage: path
      stageUuid: "c46d2f85-ba5f-8463-aeee-95f7c3e46987"
    - stage: trinity
      stageUuid: "97a3c321-7d42-8178-96bf-cd8dfd94eecd"
    - stage: boundary
      stageUuid: "75742baf-6adf-8343-81ba-c5beb8e343c5"
    - stage: links
      stageUuid: "71c97cd6-b70c-8484-9622-e1eedd3430c7"
    - stage: horo
      stageUuid: "22e79fef-5d97-8a84-b86c-32c2ea5ab8da"
    - stage: seal
      stageUuid: "c4e8b0dd-2a33-8f3e-97cb-1439fd5bf5db"
    - stage: uuid
      stageUuid: "09c1248b-4b31-86ea-9f7b-039ac01018b1"
version: 2
---
# money/money

`Money` value type — integer-cents amount + ISO 4217 currency.

Extracted from `money/money.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[money]].
