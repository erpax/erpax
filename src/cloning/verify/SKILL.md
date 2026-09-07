---
name: verify
description: Use when reasoning about verify — Conservation Law 24 — checkCloneIntegrity.
atomPath: "cloning/verify"
coordinate: "cloning/verify · 7/descent · a971e652"
contentUuid: "20503979-233c-5443-ad3f-c85a444cf53e"
diamondUuid: "9567d819-27c7-85a7-84a6-5e2e8747f6e1"
uuid: "a971e652-68ae-80f0-aa2f-cc36a335cf68"
horo: 7
typography:
  partition: cloning
  bondDegree: 6
standards:
  - RFC 9562 §5.8 + RFC 8785
  - "RFC-8785"
bindings: []
signatures:
  computationUuid: "964c0991-41ec-85d4-81dc-89b23f3fef49"
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
      stageUuid: "c3aa6772-68e8-824d-895f-9b54cfc038f6"
    - stage: seal
      stageUuid: "ea74ea03-73d8-8c82-908e-44dab14a3bb1"
    - stage: uuid
      stageUuid: "c8b8ac11-a711-8a32-a5dd-04e850e6e528"
version: 2
---
# cloning/verify

Conservation Law 24 — checkCloneIntegrity.

Extracted from `cloning/verify.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[cloning]].
