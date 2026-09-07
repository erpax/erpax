---
name: validate
description: "Use when reasoning about validate — ISO 4217 currency-code validator."
atomPath: "iso/4217/validate"
coordinate: "iso/4217/validate · 7/descent · 35984099"
contentUuid: "8ed5c15c-9378-5700-89a6-9d188aa461f5"
diamondUuid: "fd6876b9-3f4f-8aeb-8a11-df3b4fb1d2a9"
uuid: "35984099-eab7-8fff-bc90-e624e86ecf14"
horo: 7
typography:
  partition: iso
  bondDegree: 12
standards:
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 §5 alphabetic-codes"
bindings: []
signatures:
  computationUuid: "bcbe8988-7996-8634-ae31-c03ba0371895"
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
      stageUuid: "7397c561-9329-8862-ae06-5b863de9b48e"
    - stage: seal
      stageUuid: "939a0982-276b-887e-ac80-aff0edea157f"
    - stage: uuid
      stageUuid: "874b6d38-aea9-85e4-a69c-61205c10a429"
version: 2
---
# iso/4217/validate

ISO 4217 currency-code validator.

Extracted from `iso/4217/validate.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[iso/4217]].
