---
name: validate
description: "Use when reasoning about validate — ISO 3166-1 country-code validators."
atomPath: "iso/3166/1/validate"
coordinate: "iso/3166/1/validate · 4/weave · 201c3fda"
contentUuid: "c1a6e88b-b816-5c12-a43f-1a8cd95cccbf"
diamondUuid: "931a35be-4c4c-8bc4-94c3-f6c6b4bd2de4"
uuid: "201c3fda-b941-8bd1-b174-78d231cf94ee"
horo: 4
typography:
  partition: iso
  bondDegree: 12
standards:
  - "ISO-3166-1:2020 country-codes"
  - "ISO-3166-1:2020 §6 alpha-2"
  - "ISO-3166-1:2020 §7 alpha-3"
bindings: []
signatures:
  computationUuid: "35f4240a-8530-83f1-beb4-0415db1dfc13"
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
      stageUuid: "2a210f9f-d0aa-8ea2-8508-c4ab1608e781"
    - stage: seal
      stageUuid: "3918d9a2-dca4-8c8c-8e29-20f29472a7ee"
    - stage: uuid
      stageUuid: "11c36651-e76a-85c3-bbf9-bed1dce45790"
version: 2
---
# iso/3166/1/validate

ISO 3166-1 country-code validators.

Extracted from `iso/3166/1/validate.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[iso/3166/1]].
