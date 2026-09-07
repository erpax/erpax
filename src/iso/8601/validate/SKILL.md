---
name: validate
description: "Use when reasoning about validate — ISO 8601 date/time validator."
atomPath: "iso/8601/validate"
coordinate: "iso/8601/validate · 5/round · 583b3b07"
contentUuid: "0e3bcc9a-d8fd-548d-99ca-29c015ff4971"
diamondUuid: "3d90d4d2-8304-8f9e-a606-a9b32ba53a0a"
uuid: "583b3b07-4efb-8d08-adc2-eba637bcb122"
horo: 5
typography:
  partition: iso
  bondDegree: 12
standards:
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 §5.4 calendar-date-and-time"
bindings: []
signatures:
  computationUuid: "94106e96-2f5b-8f60-ba60-b7f069c55d73"
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
      stageUuid: "69a496cb-8e92-82f0-ba96-2fad8f05b8be"
    - stage: seal
      stageUuid: "9ea2b30a-2a65-80e1-a599-52d61f78cb18"
    - stage: uuid
      stageUuid: "a1faaab9-fa4b-880c-9c1a-4cfe495014e3"
version: 2
---
# iso/8601/validate

ISO 8601 date/time validator.

Extracted from `iso/8601/validate.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[iso/8601]].
