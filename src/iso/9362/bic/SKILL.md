---
name: bic
description: "Use when reasoning about bic — ISO 9362 BIC / SWIFT validator."
atomPath: "iso/9362/bic"
coordinate: "iso/9362/bic · 4/weave · e456b3ff"
contentUuid: "4145202b-af9b-5cb1-92c1-4ed89ab5c928"
diamondUuid: "b29a8a34-c3fd-8898-9eaa-2d65e1a2e473"
uuid: "e456b3ff-38bc-801a-9217-a252b30de0cd"
horo: 4
typography:
  partition: iso
  bondDegree: 6
standards:
  - "ISO-9362:2022 bic"
  - "ISO-9362:2022 §6 structure"
bindings: []
signatures:
  computationUuid: "fe9f0f77-f3bc-8e13-bc70-8ea5482f3d07"
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
      stageUuid: "3f47068e-1a49-8f13-bca1-7f2f5a7b0b03"
    - stage: seal
      stageUuid: "80bd28de-b239-8f9c-898a-11a549d7196a"
    - stage: uuid
      stageUuid: "f3f970d0-2330-843c-a03a-ce8688118bd1"
version: 2
---
# iso/9362/bic

ISO 9362 BIC / SWIFT validator.

Extracted from `iso/9362/bic.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[iso/9362]].
