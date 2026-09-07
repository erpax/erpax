---
name: verify
description: Use when reasoning about verify — Conservation Law 24 — checkCloneIntegrity.
atomPath: "cloning/verify"
coordinate: "cloning/verify · 2/share · a7605247"
contentUuid: "a24ed7cb-91a1-5742-9b0c-b59654f3e22c"
diamondUuid: "07ecd9d2-fa66-8e13-a93a-4354d6d31566"
uuid: "a7605247-6b0c-8612-a4c2-67520e348bc6"
horo: 2
typography:
  partition: cloning
  bondDegree: 6
standards:
  - RFC 9562 §5.8 + RFC 8785
  - "RFC-8785"
bindings: []
signatures:
  computationUuid: "22153759-0dda-8db2-bf60-a5ff6de62830"
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
      stageUuid: "a1c410c0-7ea6-8159-bd04-c7d4996fd54f"
    - stage: seal
      stageUuid: "ea74ea03-73d8-8c82-908e-44dab14a3bb1"
    - stage: uuid
      stageUuid: "3baab482-b6ec-883d-9a48-370833099c8d"
version: 2
---
# cloning/verify

Conservation Law 24 — checkCloneIntegrity.

Extracted from `cloning/verify.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[cloning]].
