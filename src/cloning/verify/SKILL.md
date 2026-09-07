---
name: verify
description: Use when reasoning about verify — Conservation Law 24 — checkCloneIntegrity.
atomPath: "cloning/verify"
coordinate: "cloning/verify · 5/round · 7a303526"
contentUuid: "2b72820d-d972-57b4-8b0b-2519c8b89183"
diamondUuid: "39241fe5-c779-85f0-8a41-f3619a531f1d"
uuid: "7a303526-519d-8bcb-b689-d8b90decc001"
horo: 5
typography:
  partition: cloning
  bondDegree: 6
standards:
  - RFC 9562 §5.8 + RFC 8785
  - "RFC-8785"
bindings: []
signatures:
  computationUuid: "e9efc839-35c6-8e39-811e-6a714b277b04"
  stages:
    - stage: path
      stageUuid: "d77f6a69-a58b-8945-b39a-cf4c1abfe9ee"
    - stage: trinity
      stageUuid: "59978ec9-b934-81d2-b4ce-3ab34f4a35f2"
    - stage: boundary
      stageUuid: "9fab3bff-581e-86a3-b425-e5b818da28f0"
    - stage: links
      stageUuid: "37bf3527-a939-8d14-855b-9a992cb097af"
    - stage: horo
      stageUuid: "46a05ad3-8b36-8fba-9e55-c60313226b4f"
    - stage: seal
      stageUuid: "ea74ea03-73d8-8c82-908e-44dab14a3bb1"
    - stage: uuid
      stageUuid: "392682ff-96ed-83da-9aa4-fbbea3f3b4dd"
version: 2
---
# cloning/verify

Conservation Law 24 — checkCloneIntegrity.

Extracted from `cloning/verify.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[cloning]].
