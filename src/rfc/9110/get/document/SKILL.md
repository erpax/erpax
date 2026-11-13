---
name: document
description: Use when reasoning about document — RFC 9110 §13 cached document fetcher (single doc by collection + slug).
atomPath: "rfc/9110/get/document"
coordinate: "rfc/9110/get/document · 8/crest · 93e693a1"
contentUuid: "e3af45fa-50f2-59fb-a2e3-2493bca7b53b"
diamondUuid: "44d93b53-bcc4-825f-b974-c95a9b1a953d"
uuid: "93e693a1-e97f-85c3-a33c-7f6da136ce1e"
horo: 8
typography:
  partition: rfc
  bondDegree: 59
standards:
  - "9110 §13 caching"
  - "9111 http-caching"
bindings: []
signatures:
  computationUuid: "c35a131e-fa81-8852-ad4a-efafe3f78539"
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
      stageUuid: "254a8272-2323-8ade-90c7-b4b805d4f976"
    - stage: seal
      stageUuid: "4d89e859-f778-8caf-b691-c730df740b8a"
    - stage: uuid
      stageUuid: "ae43387e-86fb-8d93-9b0e-a47e16b54746"
version: 2
---
# rfc/9110/get/document

RFC 9110 §13 cached document fetcher (single doc by collection + slug).

Extracted from `rfc/9110/get/document.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[rules]].
