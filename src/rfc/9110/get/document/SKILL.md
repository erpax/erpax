---
name: document
description: Use when reasoning about document — RFC 9110 §13 cached document fetcher (single doc by collection + slug).
atomPath: "rfc/9110/get/document"
coordinate: "rfc/9110/get/document · 4/weave · f70a32d1"
contentUuid: "078e85c6-e09f-5ff9-b8ca-39e2c39690ea"
diamondUuid: "98fbbddc-4705-8d5a-b054-76c054d61808"
uuid: "f70a32d1-2372-82ad-a9e4-f9f135428ff3"
horo: 4
typography:
  partition: rfc
  bondDegree: 56
standards:
  - "9110 §13 caching"
  - "9111 http-caching"
bindings: []
signatures:
  computationUuid: "e8e554c3-2de4-8f8b-9968-980dc8917798"
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
      stageUuid: "e3eba012-d2d0-83bc-b500-5be6e30069ee"
    - stage: seal
      stageUuid: "4d89e859-f778-8caf-b691-c730df740b8a"
    - stage: uuid
      stageUuid: "5cec670f-6f32-8047-8cd6-279e341ccb11"
version: 2
---
# rfc/9110/get/document

RFC 9110 §13 cached document fetcher (single doc by collection + slug).

Extracted from `rfc/9110/get/document.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[rules]].
