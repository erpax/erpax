---
name: validate
description: "Use when reasoning about validate — ISO 8601 date/time validator."
atomPath: "iso/8601/validate"
coordinate: "iso/8601/validate · 1/base · 179ea1b5"
contentUuid: "6d7912b7-8e38-5c9f-b4fa-7d0977673535"
diamondUuid: "60fdf54e-c018-8216-b96a-fcc34caf04b7"
uuid: "179ea1b5-ed7b-80da-ba59-ed38a60de1eb"
horo: 1
typography:
  partition: iso
  bondDegree: 12
standards:
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 §5.4 calendar-date-and-time"
bindings: []
signatures:
  computationUuid: "361684d7-ca87-841a-aeeb-c9ffb201ffa7"
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
      stageUuid: "e1d7b1a5-a64a-8165-9732-c4f25daebaea"
    - stage: seal
      stageUuid: "9ea2b30a-2a65-80e1-a599-52d61f78cb18"
    - stage: uuid
      stageUuid: "209755df-ddcc-8706-a7cd-5ce412511fd7"
version: 2
---
# iso/8601/validate

ISO 8601 date/time validator.

Extracted from `iso/8601/validate.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[iso/8601]].
