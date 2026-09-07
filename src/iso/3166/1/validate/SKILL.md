---
name: validate
description: "Use when reasoning about validate — ISO 3166-1 country-code validators."
atomPath: "iso/3166/1/validate"
coordinate: "iso/3166/1/validate · 1/base · 689b0dbe"
contentUuid: "c91b8e74-bc29-550d-94e0-58a471fa06a8"
diamondUuid: "a9e9ecfe-406e-8c04-9956-30ca0e8adb10"
uuid: "689b0dbe-f70c-89ac-85df-19ab72e2119b"
horo: 1
typography:
  partition: iso
  bondDegree: 12
standards:
  - "ISO-3166-1:2020 country-codes"
  - "ISO-3166-1:2020 §6 alpha-2"
  - "ISO-3166-1:2020 §7 alpha-3"
bindings: []
signatures:
  computationUuid: "6befdff5-c90f-819c-9e88-a6cba0af1c4c"
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
      stageUuid: "ce2c2617-f588-8c66-b062-250c40857575"
    - stage: seal
      stageUuid: "3918d9a2-dca4-8c8c-8e29-20f29472a7ee"
    - stage: uuid
      stageUuid: "87402be8-8232-8328-9fca-1e16c751954d"
version: 2
---
# iso/3166/1/validate

ISO 3166-1 country-code validators.

Extracted from `iso/3166/1/validate.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[iso/3166/1]].
