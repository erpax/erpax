---
name: validate
description: "Use when reasoning about validate — ISO 3166-2 subdivision-code validator."
atomPath: "iso/3166/2/validate"
coordinate: "iso/3166/2/validate · 1/base · 5d726dc4"
contentUuid: "7dfc9f64-a0d6-5d2c-8557-09a1c52a911b"
diamondUuid: "ce0a7d69-c158-8eca-aa35-a6390fcf193f"
uuid: "5d726dc4-e01d-825c-bc30-d06b1ec10663"
horo: 1
typography:
  partition: iso
  bondDegree: 12
standards:
  - "ISO-3166-2"
  - "ISO-3166-2:2020 subdivision-codes"
  - "ISO-3166-2:2020 §5 code-element"
bindings: []
signatures:
  computationUuid: "b0922bc3-3c92-8a5c-9247-8cdb8a2cc49c"
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
      stageUuid: "e35465ee-60d7-827c-b458-fc7c39205084"
    - stage: seal
      stageUuid: "c05330af-2a7d-8b97-a2ac-cf6e17a39f79"
    - stage: uuid
      stageUuid: "ae3d72e3-bd35-8358-a572-d2dceef63e1b"
version: 2
---
# iso/3166/2/validate

ISO 3166-2 subdivision-code validator.

Extracted from `iso/3166/2/validate.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[iso/3166/2]].
