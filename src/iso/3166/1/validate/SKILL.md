---
name: validate
description: "Use when reasoning about validate — ISO 3166-1 country-code validators."
atomPath: "iso/3166/1/validate"
coordinate: "iso/3166/1/validate · 5/round · 9fabf759"
contentUuid: "00f0ff6b-b155-595b-a4fd-a4c117469456"
diamondUuid: "d9783a1f-f6f9-82ed-9e39-a6915d425193"
uuid: "9fabf759-d425-8a92-b4d2-af6d9f8cfb36"
horo: 5
typography:
  partition: iso
  bondDegree: 12
standards:
  - "ISO-3166-1:2020 country-codes"
  - "ISO-3166-1:2020 §6 alpha-2"
  - "ISO-3166-1:2020 §7 alpha-3"
bindings: []
signatures:
  computationUuid: "808d94e3-162f-831e-ba70-1e858603951a"
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
      stageUuid: "611247eb-557d-88a0-b63a-a0dc8b88a3d4"
    - stage: seal
      stageUuid: "3918d9a2-dca4-8c8c-8e29-20f29472a7ee"
    - stage: uuid
      stageUuid: "98232dd9-fda0-8e33-b486-7332be630ce3"
version: 2
---
# iso/3166/1/validate

ISO 3166-1 country-code validators.

Extracted from `iso/3166/1/validate.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[iso/3166/1]].
