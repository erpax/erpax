---
name: globals
description: "Use when reasoning about globals — RFC 9110 §13 cached global fetcher (per-locale)."
atomPath: "rfc/9110/get/globals"
coordinate: "rfc/9110/get/globals · 5/round · 32568d9c"
contentUuid: "31bf03e5-11a9-5ebd-bce9-087576d64eca"
diamondUuid: "f149874c-a068-8d05-9d51-019df1cbeddb"
uuid: "32568d9c-6037-8198-aac4-feb723bb804b"
horo: 5
typography:
  partition: rfc
  bondDegree: 3
standards:
  - "9110 §13 caching"
  - "9111 http-caching"
  - "BCP-47 language-tag locale-keyed-cache"
bindings: []
signatures:
  computationUuid: "6ac20a91-0563-86dd-8a68-9265a4731849"
  stages:
    - stage: path
      stageUuid: "798c6ef8-32f4-89bd-b688-8b03abf25b4e"
    - stage: trinity
      stageUuid: "45288ebe-a407-8c88-b3a3-4fd09148f197"
    - stage: boundary
      stageUuid: "185933cd-8e95-86d9-97f3-2fe2504df243"
    - stage: links
      stageUuid: "7ee42816-ae6d-874e-ae10-7cf5812917d3"
    - stage: horo
      stageUuid: "bbf17be0-050f-8dff-a9df-a9b013bb04c9"
    - stage: seal
      stageUuid: "94c9e83b-3013-8619-b021-ff5c6eaf17d1"
    - stage: uuid
      stageUuid: "1d082cdc-d7ff-8ab8-81d9-f6eade4f8e38"
version: 2
---
# rfc/9110/get/globals

RFC 9110 §13 cached global fetcher (per-locale).

Extracted from `rfc/9110/get/globals.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[rules]].
