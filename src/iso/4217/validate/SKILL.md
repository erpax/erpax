---
name: validate
description: "Use when reasoning about validate — ISO 4217 currency-code validator."
atomPath: "iso/4217/validate"
coordinate: "iso/4217/validate · 2/share · 02f623f3"
contentUuid: "bd41488e-511a-5106-82fc-9c920f53e920"
diamondUuid: "c6503b95-ea41-8976-8dba-45f980ee28ef"
uuid: "02f623f3-cea9-8f52-90b4-ea9eff6c0a6c"
horo: 2
typography:
  partition: iso
  bondDegree: 12
standards:
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 §5 alphabetic-codes"
bindings: []
signatures:
  computationUuid: "76211566-de33-8b32-b592-df89c2d7538a"
  stages:
    - stage: path
      stageUuid: "5f5a09b4-4f1c-85aa-a426-e995c4f84866"
    - stage: trinity
      stageUuid: "9ebf4599-3c95-8876-9ab7-13739964667f"
    - stage: boundary
      stageUuid: "15ca07df-2e11-894c-9dba-24f188ff2885"
    - stage: links
      stageUuid: "bd778cca-0023-8309-b68c-6603d742338c"
    - stage: horo
      stageUuid: "39d22426-2db6-82d9-aeb9-60467341ac34"
    - stage: seal
      stageUuid: "939a0982-276b-887e-ac80-aff0edea157f"
    - stage: uuid
      stageUuid: "2a395a61-f0b8-84ae-bd0e-de4dfd1ef8ce"
version: 2
---
# iso/4217/validate

ISO 4217 currency-code validator.

Extracted from `iso/4217/validate.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[iso/4217]].
