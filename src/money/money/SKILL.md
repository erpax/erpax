---
name: money
description: "Use when reasoning about money — `Money` value type — integer-cents amount + ISO 4217 currency."
atomPath: "money/money"
coordinate: "money/money · 4/weave · 985f5408"
contentUuid: "3281d7b9-83c9-5b20-8eee-d173139dba80"
diamondUuid: "806f5c9f-ef4e-8d83-9429-04c281bcdc83"
uuid: "985f5408-d674-8c43-9411-167c72233868"
horo: 4
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
  computationUuid: "2fc9d9d8-bad9-8dc2-beda-aa82607fd6f2"
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
      stageUuid: "7f1a6d9c-3d58-85d2-bf5f-f0121f9cedd8"
    - stage: seal
      stageUuid: "c4e8b0dd-2a33-8f3e-97cb-1439fd5bf5db"
    - stage: uuid
      stageUuid: "69473e8b-94da-8e72-a4aa-8dcd375b120d"
version: 2
---
# money/money

`Money` value type — integer-cents amount + ISO 4217 currency.

Extracted from `money/money.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[money]].
