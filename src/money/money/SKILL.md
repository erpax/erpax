---
name: money
description: "Use when reasoning about money — `Money` value type — integer-cents amount + ISO 4217 currency."
atomPath: "money/money"
coordinate: "money/money · 5/round · 1b27c244"
contentUuid: "612384ae-8165-5dca-9ae9-b11b4f459ad1"
diamondUuid: "0f34aad1-1617-8c15-9329-9c27480f1d16"
uuid: "1b27c244-ddba-809b-b373-c2cc8a140093"
horo: 5
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
  computationUuid: "ce9b88d8-593a-8c9e-928b-7e5fec0704bf"
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
      stageUuid: "cc0775b9-6d6f-8725-9645-578b022be213"
    - stage: seal
      stageUuid: "c4e8b0dd-2a33-8f3e-97cb-1439fd5bf5db"
    - stage: uuid
      stageUuid: "27987355-1b53-8780-b4c0-f94d0b1a4c6b"
version: 2
---
# money/money

`Money` value type — integer-cents amount + ISO 4217 currency.

Extracted from `money/money.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[money]].
