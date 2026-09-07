---
name: document
description: Use when reasoning about document — RFC 9110 §13 cached document fetcher (single doc by collection + slug).
atomPath: "rfc/9110/get/document"
coordinate: "rfc/9110/get/document · 2/share · ec62ff93"
contentUuid: "43cc8e12-f08b-542e-9789-b75ead9a87f0"
diamondUuid: "d2a6ba38-612c-8b44-8fb1-d331790e86d1"
uuid: "ec62ff93-77b4-8a39-81df-b012e5cd15e0"
horo: 2
typography:
  partition: rfc
  bondDegree: 56
standards:
  - "9110 §13 caching"
  - "9111 http-caching"
bindings: []
signatures:
  computationUuid: "a249bee8-7172-869f-aff1-40b0387345a0"
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
      stageUuid: "f5dbb44e-f217-8692-82ac-3407f194def4"
    - stage: seal
      stageUuid: "4d89e859-f778-8caf-b691-c730df740b8a"
    - stage: uuid
      stageUuid: "d7c1cfae-92e0-8e4b-835e-abc699428d36"
version: 2
---
# rfc/9110/get/document

RFC 9110 §13 cached document fetcher (single doc by collection + slug).

Extracted from `rfc/9110/get/document.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[rules]].
