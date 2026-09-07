---
name: redirects
description: "Use when reasoning about redirects — RFC 9110 §13 cached redirects-collection fetcher."
atomPath: "rfc/9110/get/redirects"
coordinate: "rfc/9110/get/redirects · 8/crest · 4c287e58"
contentUuid: "d526ec3d-87cd-5613-a292-b979893ec46d"
diamondUuid: "32141398-7ef2-84a5-99fd-d24d983b9c54"
uuid: "4c287e58-d6f4-8ea4-b099-3d851f9f199d"
horo: 8
typography:
  partition: rfc
  bondDegree: 26
standards:
  - "9110 §13 caching"
  - "9110 §15.4 redirection-3xx"
bindings: []
signatures:
  computationUuid: "b8b5783a-e0b2-89ef-8f97-d50ee31e5c44"
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
      stageUuid: "273958ce-33b2-86b1-8ae0-c1eea35397b1"
    - stage: seal
      stageUuid: "f5e082a0-32d8-8ec0-a56c-443e8b5dfe50"
    - stage: uuid
      stageUuid: "1432d219-3e27-8248-a38d-921b58c33632"
version: 2
---
# rfc/9110/get/redirects

RFC 9110 §13 cached redirects-collection fetcher.

Extracted from `rfc/9110/get/redirects.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[rules]].
