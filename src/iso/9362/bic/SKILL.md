---
name: bic
description: "Use when reasoning about bic — ISO 9362 BIC / SWIFT validator."
atomPath: "iso/9362/bic"
coordinate: "iso/9362/bic · 2/share · 0c72871d"
contentUuid: "12046347-117c-5af5-8002-1e9bf018489d"
diamondUuid: "76c5284d-bbfa-8874-8ee7-6344894f4e80"
uuid: "0c72871d-2e4d-84e0-978b-a9fdca72f0a0"
horo: 2
typography:
  partition: iso
  bondDegree: 6
standards:
  - "ISO-9362:2022 bic"
  - "ISO-9362:2022 §6 structure"
bindings: []
signatures:
  computationUuid: "059e6b2f-6a0e-876c-b500-d57cbaa8cc48"
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
      stageUuid: "c5bee040-5ef7-8cf3-b7f1-6ed6e23eb50b"
    - stage: seal
      stageUuid: "80bd28de-b239-8f9c-898a-11a549d7196a"
    - stage: uuid
      stageUuid: "9ae02c51-a0b6-8e5c-9949-6a4aba28d952"
version: 2
---
# iso/9362/bic

ISO 9362 BIC / SWIFT validator.

Extracted from `iso/9362/bic.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[iso/9362]].
