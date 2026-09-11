---
name: redirects
description: "Use when reasoning about redirects — RFC 9110 §13 cached redirects-collection fetcher."
atomPath: "rfc/9110/get/redirects"
coordinate: "rfc/9110/get/redirects · 7/descent · 92ef3b2c"
contentUuid: "92017e76-d61e-5fae-ace0-82205649d2ab"
diamondUuid: "1a61165a-71c3-876b-825b-142e538f6435"
uuid: "92ef3b2c-5d51-8434-a1cf-fd23abd47e81"
horo: 7
typography:
  partition: rfc
  bondDegree: 26
standards:
  - "9110 §13 caching"
  - "9110 §15.4 redirection-3xx"
bindings: []
signatures:
  computationUuid: "f55ca10d-ba7b-8a76-8741-2d296554fa5c"
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
      stageUuid: "db6c0bf6-2be1-80b1-ac1c-9adab0be2f19"
    - stage: seal
      stageUuid: "f5e082a0-32d8-8ec0-a56c-443e8b5dfe50"
    - stage: uuid
      stageUuid: "595555b0-1674-8cc3-bad4-638681f78115"
version: 2
---
# rfc/9110/get/redirects

RFC 9110 §13 cached redirects-collection fetcher.

Extracted from `rfc/9110/get/redirects.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[rules]].
