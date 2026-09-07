---
name: globals
description: "Use when reasoning about globals — RFC 9110 §13 cached global fetcher (per-locale)."
atomPath: "rfc/9110/get/globals"
coordinate: "rfc/9110/get/globals · 8/crest · fe089bfa"
contentUuid: "0fd5d6f2-ec30-562d-b801-2c14fa43613b"
diamondUuid: "b61ba9e2-bd5a-8fa0-944b-8394b3c91033"
uuid: "fe089bfa-bd37-80e4-963c-6a53d07977c1"
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
  computationUuid: "50975985-651b-8dfc-96bf-cd02c32c8766"
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
      stageUuid: "420a2adc-3de5-823c-b7d2-35119cd67490"
    - stage: seal
      stageUuid: "94c9e83b-3013-8619-b021-ff5c6eaf17d1"
    - stage: uuid
      stageUuid: "5d803016-fd87-84c1-99c3-4df5cf223d34"
version: 2
---
# rfc/9110/get/globals

RFC 9110 §13 cached global fetcher (per-locale).

Extracted from `rfc/9110/get/globals.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[rules]].
