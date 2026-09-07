---
name: money
description: "Use when reasoning about money — `Money` value type — integer-cents amount + ISO 4217 currency."
atomPath: "money/money"
coordinate: "money/money · 1/base · 98e50f97"
contentUuid: "b75f4e0c-89d3-50c4-a97c-873a93dd0720"
diamondUuid: "a3e2d867-e48a-84bb-8684-c2d7db3a0c65"
uuid: "98e50f97-a84a-8d7f-ba0d-56a534c3baf4"
horo: 1
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
  computationUuid: "c0e8f61e-4d50-8966-8120-334b6c6eb928"
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
      stageUuid: "d5aea1cf-a85f-8cda-981f-bcd2299fee8a"
    - stage: seal
      stageUuid: "c4e8b0dd-2a33-8f3e-97cb-1439fd5bf5db"
    - stage: uuid
      stageUuid: "5c6274da-e6aa-85f0-9b16-6522c30d73e0"
version: 2
---
# money/money

`Money` value type — integer-cents amount + ISO 4217 currency.

Extracted from `money/money.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[money]].
