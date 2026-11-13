---
name: money
description: "Use when reasoning about money — `Money` value type — integer-cents amount + ISO 4217 currency."
atomPath: "money/money"
coordinate: "money/money · 2/share · efb05e0c"
contentUuid: "1803f521-15dc-5411-8aba-45b0a7d9d157"
diamondUuid: "fa7c75b2-9706-888e-ac07-6a0ed7f45fd2"
uuid: "efb05e0c-def7-80be-aec4-9db3c1538be0"
horo: 2
typography:
  partition: money
  bondDegree: 37
standards:
  - "IEEE-754"
  - "IFRS IAS-21 foreign-currency-translation"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 §5 alphabetic-codes"
  - "US-GAAP ASC-830 foreign-currency-matters"
bindings: []
signatures:
  computationUuid: "25870561-b8ab-8f54-a0b0-48e10cb55281"
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
      stageUuid: "a128fd8e-f9c8-8ff9-b7ce-ed8dad27f6b8"
    - stage: seal
      stageUuid: "c4e8b0dd-2a33-8f3e-97cb-1439fd5bf5db"
    - stage: uuid
      stageUuid: "71d1bafb-a490-8fe6-8199-a8e4607e26d7"
version: 2
---
# money/money

`Money` value type — integer-cents amount + ISO 4217 currency.

Extracted from `money/money.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[money]].
