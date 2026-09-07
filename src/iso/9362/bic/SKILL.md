---
name: bic
description: "Use when reasoning about bic — ISO 9362 BIC / SWIFT validator."
atomPath: "iso/9362/bic"
coordinate: "iso/9362/bic · 2/share · e608035f"
contentUuid: "4eee3aa7-fe10-5c4e-9d66-fa86f40f5134"
diamondUuid: "90620363-fcb7-8905-8517-b024d36531e0"
uuid: "e608035f-03eb-8998-a82f-f30abc9aa7ed"
horo: 2
typography:
  partition: iso
  bondDegree: 6
standards:
  - "ISO-9362:2022 bic"
  - "ISO-9362:2022 §6 structure"
bindings: []
signatures:
  computationUuid: "9a66a9fc-c480-8939-9c18-d2c1f36a521f"
  stages:
    - stage: path
      stageUuid: "2271e1ec-7ea8-853d-956b-ab423115cf56"
    - stage: trinity
      stageUuid: "4b96e532-d52f-858d-83c6-9c8f1b25e5f9"
    - stage: boundary
      stageUuid: "dc39d1e3-617b-8e52-9c31-cbba7ab89417"
    - stage: links
      stageUuid: "334833db-7c5c-8c55-aa16-4d20abe20a27"
    - stage: horo
      stageUuid: "d62baf69-964a-8a1e-85fc-114d4d234faf"
    - stage: seal
      stageUuid: "80bd28de-b239-8f9c-898a-11a549d7196a"
    - stage: uuid
      stageUuid: "10b7a22f-dcdd-8659-8f0b-567b22547ae7"
version: 2
---
# iso/9362/bic

ISO 9362 BIC / SWIFT validator.

Extracted from `iso/9362/bic.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[iso/9362]].
