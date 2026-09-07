---
name: bic
description: "Use when reasoning about bic — ISO 9362 BIC / SWIFT validator."
atomPath: "iso/9362/bic"
coordinate: "iso/9362/bic · 1/base · 9fad7e19"
contentUuid: "caa1d77e-f5dc-58f2-b4cd-a1f9926cc4a2"
diamondUuid: "b7957999-5e92-87c2-a346-e845e9a5dfd9"
uuid: "9fad7e19-c643-8756-883a-a9d3e0108198"
horo: 1
typography:
  partition: iso
  bondDegree: 6
standards:
  - "ISO-9362:2022 bic"
  - "ISO-9362:2022 §6 structure"
bindings: []
signatures:
  computationUuid: "027a00f8-7d19-8896-98e5-ea0e8658b13c"
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
      stageUuid: "0bff7e64-73f4-874e-af3d-cf8c8897c139"
    - stage: seal
      stageUuid: "80bd28de-b239-8f9c-898a-11a549d7196a"
    - stage: uuid
      stageUuid: "d70a9d62-0b2c-8812-a510-5df58317a89a"
version: 2
---
# iso/9362/bic

ISO 9362 BIC / SWIFT validator.

Extracted from `iso/9362/bic.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[iso/9362]].
