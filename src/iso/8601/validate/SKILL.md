---
name: validate
description: "Use when reasoning about validate — ISO 8601 date/time validator."
atomPath: "iso/8601/validate"
coordinate: "iso/8601/validate · 8/crest · 59933966"
contentUuid: "a8e6c377-3b99-5b00-94f4-6ec605a0a41e"
diamondUuid: "5a0c1f55-6769-82a6-9aa8-cdb260f8518c"
uuid: "59933966-2820-8df8-a0fd-a9f2b43136fe"
horo: 8
typography:
  partition: iso
  bondDegree: 12
standards:
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 §5.4 calendar-date-and-time"
bindings: []
signatures:
  computationUuid: "5dc81c92-fd75-8a8f-9c62-3f7e8969d457"
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
      stageUuid: "2784b01e-22fe-85f0-878b-bc928b005c09"
    - stage: seal
      stageUuid: "9ea2b30a-2a65-80e1-a599-52d61f78cb18"
    - stage: uuid
      stageUuid: "d35b0120-36a9-815a-92ae-4ed7c9d9de93"
version: 2
---
# iso/8601/validate

ISO 8601 date/time validator.

Extracted from `iso/8601/validate.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[iso/8601]].
