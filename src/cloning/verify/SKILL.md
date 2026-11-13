---
name: verify
description: Use when reasoning about verify — Conservation Law 24 — checkCloneIntegrity.
atomPath: "cloning/verify"
coordinate: "cloning/verify · 8/crest · 9baf3edc"
contentUuid: "a3db2c08-dd38-5fbf-a193-39e3a82aeb10"
diamondUuid: "40d0de83-c59d-8b4b-90c5-6ce79168ff0f"
uuid: "9baf3edc-7517-8f9b-b0e3-8a9f316fd7bc"
horo: 8
typography:
  partition: cloning
  bondDegree: 27
standards:
  - RFC 9562 §5.8 + RFC 8785
  - "RFC-8785"
bindings: []
signatures:
  computationUuid: "db6ecfc2-0b87-8286-8ff8-037af98cff4b"
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
      stageUuid: "4fe213ac-6a20-8dc9-864e-5cfc6c3e264b"
    - stage: seal
      stageUuid: "ea74ea03-73d8-8c82-908e-44dab14a3bb1"
    - stage: uuid
      stageUuid: "c4578995-32b7-8527-a277-22e9a2ee72f5"
version: 2
---
# cloning/verify

Conservation Law 24 — checkCloneIntegrity.

Extracted from `cloning/verify.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[cloning]].
