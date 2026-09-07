---
name: validate
description: "Use when reasoning about validate — ISO 4217 currency-code validator."
atomPath: "iso/4217/validate"
coordinate: "iso/4217/validate · 4/weave · 5434723b"
contentUuid: "84bff1c9-3621-5a94-8595-d6f598dd8abb"
diamondUuid: "af4d17e6-fbdb-834d-be7a-131dbb216134"
uuid: "5434723b-425b-86f2-9e16-20f0a14c3f94"
horo: 4
typography:
  partition: iso
  bondDegree: 12
standards:
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 §5 alphabetic-codes"
bindings: []
signatures:
  computationUuid: "eef0d411-e8a5-87c7-953b-57c1145cb4dc"
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
      stageUuid: "f3aab4a0-dad1-88cc-ab20-1de078bdc1d9"
    - stage: seal
      stageUuid: "939a0982-276b-887e-ac80-aff0edea157f"
    - stage: uuid
      stageUuid: "12edf470-089f-8764-b7c3-558673e76538"
version: 2
---
# iso/4217/validate

ISO 4217 currency-code validator.

Extracted from `iso/4217/validate.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[iso/4217]].
