---
name: validate
description: "Use when reasoning about validate — ISO 3166-2 subdivision-code validator."
atomPath: "iso/3166/2/validate"
coordinate: "iso/3166/2/validate · 5/round · a57b8ba1"
contentUuid: "2ec5e2d8-891e-5c1d-a178-ae1ab2c61f67"
diamondUuid: "f82314ac-2eed-8317-9f8d-12e980b3bd24"
uuid: "a57b8ba1-757f-844e-934f-28b75e070465"
horo: 5
typography:
  partition: iso
  bondDegree: 12
standards:
  - "ISO-3166-2"
  - "ISO-3166-2:2020 subdivision-codes"
  - "ISO-3166-2:2020 §5 code-element"
bindings: []
signatures:
  computationUuid: "c4bbaeb5-559f-8d76-aa8d-670b4c956b33"
  stages:
    - stage: path
      stageUuid: "7e4e99ab-9b55-867a-a645-18157640f43c"
    - stage: trinity
      stageUuid: "53bafdb3-7780-843f-b388-5cb4329f9ffb"
    - stage: boundary
      stageUuid: "7f16eef8-497f-8734-986c-0f4afb762e89"
    - stage: links
      stageUuid: "5858662e-15dc-8ede-a6dc-9b93bef46320"
    - stage: horo
      stageUuid: "a5f6bdd3-3e9d-8cd7-8650-99a3a6532394"
    - stage: seal
      stageUuid: "c05330af-2a7d-8b97-a2ac-cf6e17a39f79"
    - stage: uuid
      stageUuid: "b394ed4f-2260-8843-a1e1-67dea1f0afb1"
version: 2
---
# iso/3166/2/validate

ISO 3166-2 subdivision-code validator.

Extracted from `iso/3166/2/validate.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[iso/3166/2]].
