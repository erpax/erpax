---
name: validate
description: "Use when reasoning about validate — ISO 3166-2 subdivision-code validator."
atomPath: "iso/3166/2/validate"
coordinate: "iso/3166/2/validate · 1/base · a7df6dec"
contentUuid: "cbcb0c96-1de8-5645-a6b0-a242068ee916"
diamondUuid: "c83806a7-7e90-8c63-a7fe-274155c7e1a6"
uuid: "a7df6dec-62a6-8eca-b2ba-64ed2e17ee25"
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
  computationUuid: "4500b75b-4990-8614-9f11-8413dce4655b"
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
      stageUuid: "7222443f-a91b-8241-8007-580f8dc6280d"
    - stage: seal
      stageUuid: "c05330af-2a7d-8b97-a2ac-cf6e17a39f79"
    - stage: uuid
      stageUuid: "4fed3292-515a-8db3-9193-7b962e5d8294"
version: 2
---
# iso/3166/2/validate

ISO 3166-2 subdivision-code validator.

Extracted from `iso/3166/2/validate.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[iso/3166/2]].
