---
name: validate
description: "Use when reasoning about validate — ISO 3166-1 country-code validators."
atomPath: "iso/3166/1/validate"
coordinate: "iso/3166/1/validate · 2/share · 88160fcf"
contentUuid: "f340184a-543f-5acf-a51a-869d5984f50e"
diamondUuid: "603628dd-f601-8e4e-96cf-c28a6d5e96aa"
uuid: "88160fcf-1342-829d-9ad9-2682c45725d0"
horo: 2
typography:
  partition: iso
  bondDegree: 12
standards:
  - "ISO-3166-1:2020 country-codes"
  - "ISO-3166-1:2020 §6 alpha-2"
  - "ISO-3166-1:2020 §7 alpha-3"
bindings: []
signatures:
  computationUuid: "895a7d26-2a36-8d9c-9160-04b181f147e1"
  stages:
    - stage: path
      stageUuid: "a51d4a57-2985-8f96-a845-9576f8bd974d"
    - stage: trinity
      stageUuid: "28af35d9-b54c-8a64-b37d-724417fe94de"
    - stage: boundary
      stageUuid: "dd756827-04d5-88ca-9fe3-b6b19fad3d3e"
    - stage: links
      stageUuid: "cd222c70-dcb7-8e6e-ab58-9666f3add077"
    - stage: horo
      stageUuid: "f5f2f742-fe11-8a74-8b7b-51dd94b73c23"
    - stage: seal
      stageUuid: "3918d9a2-dca4-8c8c-8e29-20f29472a7ee"
    - stage: uuid
      stageUuid: "92981609-0eee-8cb1-9f0e-ae39adc378c8"
version: 2
---
# iso/3166/1/validate

ISO 3166-1 country-code validators.

Extracted from `iso/3166/1/validate.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[iso/3166/1]].
