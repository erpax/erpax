---
name: validate
description: "Use when reasoning about validate — ISO 3166-1 country-code validators."
atomPath: "iso/3166/1/validate"
coordinate: "iso/3166/1/validate · 2/share · 0e0e55b6"
contentUuid: "0ea3fcf8-8f34-5526-9eb7-c1e9993b7f6d"
diamondUuid: "caba3b15-ceff-8747-b881-75f786389819"
uuid: "0e0e55b6-5c2d-8fda-9657-afa5b20c3196"
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
  computationUuid: "11c4fb07-bd38-8171-a4c8-7dedb0c2315d"
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
      stageUuid: "d3aadfc1-791f-82f7-8df9-18fa917dd949"
    - stage: seal
      stageUuid: "3918d9a2-dca4-8c8c-8e29-20f29472a7ee"
    - stage: uuid
      stageUuid: "1dd1dcc7-1b11-8814-9526-f461a6d78490"
version: 2
---
# iso/3166/1/validate

ISO 3166-1 country-code validators.

Extracted from `iso/3166/1/validate.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[iso/3166/1]].
