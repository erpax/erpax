---
name: document
description: Use when reasoning about document — RFC 9110 §13 cached document fetcher (single doc by collection + slug).
atomPath: "rfc/9110/get/document"
coordinate: "rfc/9110/get/document · 8/crest · 93e693a1"
contentUuid: "450603c6-1512-5f14-b1e8-938a2107e591"
diamondUuid: "e32b07c6-a385-8c3c-94fe-986d9366b983"
uuid: "93e693a1-e97f-85c3-a33c-7f6da136ce1e"
horo: 8
typography:
  partition: rfc
  bondDegree: 30
standards:
  - "9110 §13 caching"
  - "9111 http-caching"
bindings: []
signatures:
  computationUuid: "7b8142df-66e3-8958-ab1d-15a3cd6f10b6"
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
      stageUuid: "3fae5798-3e86-8ca9-9277-91eb4b3edd4f"
    - stage: seal
      stageUuid: "4d89e859-f778-8caf-b691-c730df740b8a"
    - stage: uuid
      stageUuid: "40f4736a-f11f-8e49-b2d6-48b28fc07565"
version: 2
---
# rfc/9110/get/document

RFC 9110 §13 cached document fetcher (single doc by collection + slug).

Extracted from `rfc/9110/get/document.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[rules]].
