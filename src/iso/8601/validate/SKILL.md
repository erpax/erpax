---
name: validate
description: "Use when reasoning about validate — ISO 8601 date/time validator."
atomPath: "iso/8601/validate"
coordinate: "iso/8601/validate · 1/base · 3daa9d01"
contentUuid: "bab45ac0-351b-56ef-9d43-15724913a342"
diamondUuid: "731b804e-e63a-8c9c-a8be-e01c1c6dd796"
uuid: "3daa9d01-dbe0-8ade-b78a-519632b1e75a"
horo: 1
typography:
  partition: iso
  bondDegree: 12
standards:
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 §5.4 calendar-date-and-time"
bindings: []
signatures:
  computationUuid: "5c6ba224-8022-8ed3-ac7f-5585a028fca5"
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
      stageUuid: "6ea86f97-019b-831c-afbe-97e053eb1c03"
    - stage: seal
      stageUuid: "9ea2b30a-2a65-80e1-a599-52d61f78cb18"
    - stage: uuid
      stageUuid: "0561a8d3-f3b5-8767-9a32-a90743bec349"
version: 2
---
# iso/8601/validate

ISO 8601 date/time validator.

Extracted from `iso/8601/validate.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[iso/8601]].
