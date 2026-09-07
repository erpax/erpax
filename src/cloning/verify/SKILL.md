---
name: verify
description: Use when reasoning about verify — Conservation Law 24 — checkCloneIntegrity.
atomPath: "cloning/verify"
coordinate: "cloning/verify · 1/base · a5ea9c4b"
contentUuid: "05a85cc7-513c-5535-aaa2-f11f49edb632"
diamondUuid: "1abb9505-3edd-8cd6-a6f6-5f159eb0c123"
uuid: "a5ea9c4b-7070-8e68-b310-f0d5503a9e08"
horo: 1
typography:
  partition: cloning
  bondDegree: 6
standards:
  - RFC 9562 §5.8 + RFC 8785
  - "RFC-8785"
bindings: []
signatures:
  computationUuid: "89fe24b1-b99c-8ace-ac08-f3283f21521c"
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
      stageUuid: "12eb0d3d-18b6-8286-ad97-f1bb9752ddd3"
    - stage: seal
      stageUuid: "ea74ea03-73d8-8c82-908e-44dab14a3bb1"
    - stage: uuid
      stageUuid: "ecd68db8-cde1-8633-9cad-6606677f06ea"
version: 2
---
# cloning/verify

Conservation Law 24 — checkCloneIntegrity.

Extracted from `cloning/verify.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[cloning]].
