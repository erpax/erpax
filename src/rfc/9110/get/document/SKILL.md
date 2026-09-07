---
name: document
description: Use when reasoning about document — RFC 9110 §13 cached document fetcher (single doc by collection + slug).
atomPath: "rfc/9110/get/document"
coordinate: "rfc/9110/get/document · 5/round · 7cdc4853"
contentUuid: "2fe3069a-b574-5361-828b-edd5a78fa77a"
diamondUuid: "3998e273-7481-8778-baf9-b365edd61d69"
uuid: "7cdc4853-2e9d-8dfd-b78f-b90bebee9197"
horo: 5
typography:
  partition: rfc
  bondDegree: 56
standards:
  - "9110 §13 caching"
  - "9111 http-caching"
bindings: []
signatures:
  computationUuid: "1d0943e8-cf83-81e0-a82a-c62b96efba8e"
  stages:
    - stage: path
      stageUuid: "49209e35-3f88-820e-aa12-ac75952dd069"
    - stage: trinity
      stageUuid: "eda19e55-b348-8e3b-a7a2-68134f4d7b60"
    - stage: boundary
      stageUuid: "01394fd4-c27b-8208-a3ed-baefcb7e60e2"
    - stage: links
      stageUuid: "d216f962-a5f5-8982-91fd-ccb45d21fb3a"
    - stage: horo
      stageUuid: "7e2a9921-e6d7-888a-8643-05beab2d8dd9"
    - stage: seal
      stageUuid: "4d89e859-f778-8caf-b691-c730df740b8a"
    - stage: uuid
      stageUuid: "51db2416-0cb3-8361-b57f-247014bbf102"
version: 2
---
# rfc/9110/get/document

RFC 9110 §13 cached document fetcher (single doc by collection + slug).

Extracted from `rfc/9110/get/document.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[rules]].
