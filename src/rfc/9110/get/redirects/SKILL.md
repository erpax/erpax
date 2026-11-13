---
name: redirects
description: "Use when reasoning about redirects — RFC 9110 §13 cached redirects-collection fetcher."
atomPath: "rfc/9110/get/redirects"
coordinate: "rfc/9110/get/redirects · 7/descent · 012c8a54"
contentUuid: "e1f563b0-425b-5621-b3f8-6599c5736869"
diamondUuid: "86ad4648-f04c-8351-ba7b-013b1007ff03"
uuid: "012c8a54-caf0-80e4-95f6-349f73ed9243"
horo: 7
typography:
  partition: rfc
  bondDegree: 6
standards:
  - "9110 §13 caching"
  - "9110 §15.4 redirection-3xx"
bindings: []
signatures:
  computationUuid: "ef95bc2d-d8c6-8c3f-9a7c-5affab468aef"
  stages:
    - stage: path
      stageUuid: "73ff6567-3a53-8721-aeb6-9d5459d0a674"
    - stage: trinity
      stageUuid: "a3628cfb-bac2-846d-98bd-9df916ab5b3c"
    - stage: boundary
      stageUuid: "94950d5a-7c80-8d6b-9c07-587492ef1a56"
    - stage: links
      stageUuid: "d9504936-b7c4-8ffd-8755-ac6c6c6c61f1"
    - stage: horo
      stageUuid: "035f9040-5a4a-8bec-9893-566aab1e5e2a"
    - stage: seal
      stageUuid: "f5e082a0-32d8-8ec0-a56c-443e8b5dfe50"
    - stage: uuid
      stageUuid: "0b08032d-63e2-83e1-aa77-4472b497165d"
version: 2
---
# rfc/9110/get/redirects

RFC 9110 §13 cached redirects-collection fetcher.

Extracted from `rfc/9110/get/redirects.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[rules]].
