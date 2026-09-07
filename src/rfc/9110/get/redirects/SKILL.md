---
name: redirects
description: "Use when reasoning about redirects — RFC 9110 §13 cached redirects-collection fetcher."
atomPath: "rfc/9110/get/redirects"
coordinate: "rfc/9110/get/redirects · 8/crest · e1bc92e4"
contentUuid: "1c616f81-7c72-571d-9769-cf6efd6a49ec"
diamondUuid: "502b3870-ceaa-80af-8c69-658d47121e8a"
uuid: "e1bc92e4-4911-846d-ae9b-99a12cf55645"
horo: 8
typography:
  partition: rfc
  bondDegree: 26
standards:
  - "9110 §13 caching"
  - "9110 §15.4 redirection-3xx"
bindings: []
signatures:
  computationUuid: "8124bc3d-79d1-8d8c-85b2-34d291262a27"
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
      stageUuid: "3e63db8d-40bd-817b-b0f9-bc1a80c38181"
    - stage: seal
      stageUuid: "f5e082a0-32d8-8ec0-a56c-443e8b5dfe50"
    - stage: uuid
      stageUuid: "bec2b104-3865-875e-ae54-0686f123006a"
version: 2
---
# rfc/9110/get/redirects

RFC 9110 §13 cached redirects-collection fetcher.

Extracted from `rfc/9110/get/redirects.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[rules]].
