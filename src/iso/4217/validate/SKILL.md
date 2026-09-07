---
name: validate
description: "Use when reasoning about validate — ISO 4217 currency-code validator."
atomPath: "iso/4217/validate"
coordinate: "iso/4217/validate · 2/share · 186ad596"
contentUuid: "06bd0c8d-5c72-56c7-a083-da80649c30c5"
diamondUuid: "ba31275c-b8a2-89a3-aa11-d2f90236c49f"
uuid: "186ad596-7635-8ca9-8dc9-6044a6d34e53"
horo: 2
typography:
  partition: iso
  bondDegree: 12
standards:
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 §5 alphabetic-codes"
bindings: []
signatures:
  computationUuid: "9c147b4c-9301-86c5-b6bd-c631a4c1827a"
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
      stageUuid: "6f1cac04-a952-843a-9b14-09c69654ba5f"
    - stage: seal
      stageUuid: "939a0982-276b-887e-ac80-aff0edea157f"
    - stage: uuid
      stageUuid: "402d935b-4027-8747-b4dc-68f3a7a98d59"
version: 2
---
# iso/4217/validate

ISO 4217 currency-code validator.

Extracted from `iso/4217/validate.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[iso/4217]].
