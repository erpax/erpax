---
name: globals
description: "Use when reasoning about globals — RFC 9110 §13 cached global fetcher (per-locale)."
atomPath: "rfc/9110/get/globals"
coordinate: "rfc/9110/get/globals · 8/crest · c8117f3c"
contentUuid: "23365fd2-6d5f-5864-ac67-48460a96f533"
diamondUuid: "fe71f37a-5e66-8a72-b3ed-49a57f7f100e"
uuid: "c8117f3c-526e-8e75-aef2-3bffa5acb3bc"
horo: 8
typography:
  partition: rfc
  bondDegree: 3
standards:
  - "9110 §13 caching"
  - "9111 http-caching"
  - "BCP-47 language-tag locale-keyed-cache"
bindings: []
signatures:
  computationUuid: "5988e63a-ada5-8343-8382-89384d92e5c2"
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
      stageUuid: "16900d3c-b7fa-8801-a4be-557222936690"
    - stage: seal
      stageUuid: "94c9e83b-3013-8619-b021-ff5c6eaf17d1"
    - stage: uuid
      stageUuid: "97d9fc0a-2644-83db-a40c-c67d06f7b139"
version: 2
---
# rfc/9110/get/globals

RFC 9110 §13 cached global fetcher (per-locale).

Extracted from `rfc/9110/get/globals.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[rules]].
