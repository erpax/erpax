---
name: redirects
description: "Use when reasoning about redirects — RFC 9110 §13 cached redirects-collection fetcher."
atomPath: "rfc/9110/get/redirects"
coordinate: "rfc/9110/get/redirects · 5/round · 7c548ad6"
contentUuid: "202be715-b92d-50db-9545-399c9d9a8b63"
diamondUuid: "5c959e4b-9b72-83b9-8ded-4b2477f6ca28"
uuid: "7c548ad6-05c7-844e-93ae-3750dd4ea7bf"
horo: 5
typography:
  partition: rfc
  bondDegree: 26
standards:
  - "9110 §13 caching"
  - "9110 §15.4 redirection-3xx"
bindings: []
signatures:
  computationUuid: "0243d81d-661b-85b1-8ebe-f256165c460a"
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
      stageUuid: "69265a0d-b8a6-8b00-b1bf-b9b22297f33c"
    - stage: seal
      stageUuid: "f5e082a0-32d8-8ec0-a56c-443e8b5dfe50"
    - stage: uuid
      stageUuid: "ecf0b1d5-f925-8465-b5e0-79bcc4e05da3"
version: 2
---
# rfc/9110/get/redirects

RFC 9110 §13 cached redirects-collection fetcher.

Extracted from `rfc/9110/get/redirects.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[rules]].
