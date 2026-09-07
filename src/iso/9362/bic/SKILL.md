---
name: bic
description: "Use when reasoning about bic — ISO 9362 BIC / SWIFT validator."
atomPath: "iso/9362/bic"
coordinate: "iso/9362/bic · 1/base · ecfdcd45"
contentUuid: "589a85bd-c8d5-5e6c-bb67-8ea40ec31f9d"
diamondUuid: "54510233-7a05-82d7-9d76-8b6f603924cb"
uuid: "ecfdcd45-f52f-84e1-b327-268b4c88617a"
horo: 1
typography:
  partition: iso
  bondDegree: 6
standards:
  - "ISO-9362:2022 bic"
  - "ISO-9362:2022 §6 structure"
bindings: []
signatures:
  computationUuid: "a1356628-fee8-809f-8b58-80c1e65af28d"
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
      stageUuid: "673b7746-6aa8-8fa8-bf08-9b0c69a0a7b8"
    - stage: seal
      stageUuid: "80bd28de-b239-8f9c-898a-11a549d7196a"
    - stage: uuid
      stageUuid: "b5396cb0-c5af-8a29-90cd-4c8e1268379e"
version: 2
---
# iso/9362/bic

ISO 9362 BIC / SWIFT validator.

Extracted from `iso/9362/bic.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[iso/9362]].
