---
name: globals
description: "Use when reasoning about globals — RFC 9110 §13 cached global fetcher (per-locale)."
atomPath: "rfc/9110/get/globals"
coordinate: "rfc/9110/get/globals · 1/base · 5f969f8e"
contentUuid: "3288729d-aece-5c9e-a161-e058f862b0c6"
diamondUuid: "cee32523-1686-8d19-bdd1-468a557b1976"
uuid: "5f969f8e-c3ee-8699-bf45-0cc2da3dab08"
horo: 1
typography:
  partition: rfc
  bondDegree: 3
standards:
  - "9110 §13 caching"
  - "9111 http-caching"
  - "BCP-47 language-tag locale-keyed-cache"
bindings: []
signatures:
  computationUuid: "144658da-b18f-8b0f-a47d-e1001346b012"
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
      stageUuid: "f4fd7fc8-261f-88d0-ad92-3601ce03e502"
    - stage: seal
      stageUuid: "94c9e83b-3013-8619-b021-ff5c6eaf17d1"
    - stage: uuid
      stageUuid: "e6473388-4d2e-883e-9e8f-3464ad79c4c5"
version: 2
---
# rfc/9110/get/globals

RFC 9110 §13 cached global fetcher (per-locale).

Extracted from `rfc/9110/get/globals.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[rules]].
