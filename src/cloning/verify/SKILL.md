---
name: verify
description: Use when reasoning about verify — Conservation Law 24 — checkCloneIntegrity.
atomPath: "cloning/verify"
coordinate: "cloning/verify · 8/crest · 9baf3edc"
contentUuid: "ba0a3929-6b77-588d-a967-8eab4b16e7d0"
diamondUuid: "6604e98d-9f32-84f5-a761-59264088f051"
uuid: "9baf3edc-7517-8f9b-b0e3-8a9f316fd7bc"
horo: 8
typography:
  partition: cloning
  bondDegree: 9
standards:
  - RFC 9562 §5.8 + RFC 8785
  - "RFC-8785"
bindings: []
signatures:
  computationUuid: "a970e01a-1df2-8572-adb1-169578aead10"
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
      stageUuid: "53c74eb2-91a8-8a03-8eb0-9642f038d6ab"
    - stage: seal
      stageUuid: "ea74ea03-73d8-8c82-908e-44dab14a3bb1"
    - stage: uuid
      stageUuid: "4998fad0-a75f-8f4a-93b8-ab2262e7c165"
version: 2
---
# cloning/verify

Conservation Law 24 — checkCloneIntegrity.

Extracted from `cloning/verify.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[cloning]].
