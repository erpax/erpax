---
name: globals
description: "Use when reasoning about globals — RFC 9110 §13 cached global fetcher (per-locale)."
atomPath: "rfc/9110/get/globals"
coordinate: "rfc/9110/get/globals · 7/descent · b3f6e79f"
contentUuid: "21e3be90-520e-555c-beba-7bc3267ae6cb"
diamondUuid: "e7e0cdc5-864e-81f3-b7b2-2cd23306c63b"
uuid: "b3f6e79f-a8f9-88c1-a533-9fe4f325b870"
horo: 7
typography:
  partition: rfc
  bondDegree: 3
standards:
  - "9110 §13 caching"
  - "9111 http-caching"
  - "BCP-47 language-tag locale-keyed-cache"
bindings: []
signatures:
  computationUuid: "be69c534-ca25-86f1-aea7-a66609647865"
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
      stageUuid: "4c4d83c6-1566-8b0d-ba9b-44010ca16c2d"
    - stage: seal
      stageUuid: "94c9e83b-3013-8619-b021-ff5c6eaf17d1"
    - stage: uuid
      stageUuid: "c7399754-0d5b-8290-980b-76735e3c5cef"
version: 2
---
# rfc/9110/get/globals

RFC 9110 §13 cached global fetcher (per-locale).

Extracted from `rfc/9110/get/globals.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[rules]].
