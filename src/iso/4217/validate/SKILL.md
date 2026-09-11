---
name: validate
description: "Use when reasoning about validate — ISO 4217 currency-code validator."
atomPath: "iso/4217/validate"
coordinate: "iso/4217/validate · 5/round · 8949ad4a"
contentUuid: "7af2251d-67ba-5a8a-84d0-4950a6f5735c"
diamondUuid: "f6dd37c2-ba3c-87b6-8157-6d394b553cc2"
uuid: "8949ad4a-2698-841c-ad0d-d56175dbe440"
horo: 5
typography:
  partition: iso
  bondDegree: 12
standards:
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 §5 alphabetic-codes"
bindings: []
signatures:
  computationUuid: "8efaa2d5-4bda-8e83-8751-e0e068814c8a"
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
      stageUuid: "d4319170-a70f-89c6-b7fb-c4bc2d2d9704"
    - stage: seal
      stageUuid: "939a0982-276b-887e-ac80-aff0edea157f"
    - stage: uuid
      stageUuid: "2b842242-5918-8fc1-9b70-71c7d6d0961c"
version: 2
---
# iso/4217/validate

ISO 4217 currency-code validator.

Extracted from `iso/4217/validate.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[iso/4217]].
