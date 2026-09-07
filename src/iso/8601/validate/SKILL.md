---
name: validate
description: "Use when reasoning about validate — ISO 8601 date/time validator."
atomPath: "iso/8601/validate"
coordinate: "iso/8601/validate · 4/weave · 2f924426"
contentUuid: "a25f6e12-237e-527b-9b85-75c46549657d"
diamondUuid: "9415aa99-13cc-8820-8c1d-51c84f47f1e3"
uuid: "2f924426-6df4-8ac7-8bfc-d00bd543c0bb"
horo: 4
typography:
  partition: iso
  bondDegree: 12
standards:
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 §5.4 calendar-date-and-time"
bindings: []
signatures:
  computationUuid: "b2b2e74d-c979-8802-b553-c316960b3805"
  stages:
    - stage: path
      stageUuid: "a307815c-c143-88d4-b093-a4120b79c18a"
    - stage: trinity
      stageUuid: "81262f86-8704-8c97-8cb3-12bd43b77dce"
    - stage: boundary
      stageUuid: "4c5f8038-1da0-80b6-a87d-c7b516decfa5"
    - stage: links
      stageUuid: "873f240d-f358-8dc9-b1c3-3e83baa6c729"
    - stage: horo
      stageUuid: "8fc54815-4024-8064-806f-70bc5bfe32ab"
    - stage: seal
      stageUuid: "9ea2b30a-2a65-80e1-a599-52d61f78cb18"
    - stage: uuid
      stageUuid: "19f785b1-936e-8221-8f34-4d6d4aea4873"
version: 2
---
# iso/8601/validate

ISO 8601 date/time validator.

Extracted from `iso/8601/validate.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[iso/8601]].
