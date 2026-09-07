---
name: conventions
description: "Use when reasoning about conventions — Unix-style **rwx** vocabulary aligned with how Payload enforces access: every check still runs through collection `access` and the auth stack — this file only names operations and optional bit patterns so requirements ('tenant group rw-, world r--') map cleanly to product language."
atomPath: "nist/incits/359/conventions"
coordinate: "nist/incits/359/conventions · 8/crest · d90a18df"
contentUuid: "5518acce-69d9-55f6-844d-1aba719a0c77"
diamondUuid: "d2dbf74e-fe1a-8a4b-b50e-1e2e33c18dd3"
uuid: "d90a18df-fe4e-805d-a128-dd212c400ebb"
horo: 8
typography:
  partition: nist
  bondDegree: 6
standards:
  - "NIST INCITS-359-2012 role-based-access-control vocabulary-layer"
  - "NIST-INCITS-359-2012"
  - "POSIX-1.2017 §1.6.1.1 file-mode-bits naming-source"
bindings: []
signatures:
  computationUuid: "7ab7faac-e013-856b-9d60-6487a2b009ab"
  stages:
    - stage: path
      stageUuid: "a5e14b57-6d46-8933-b1a6-01072928cd1a"
    - stage: trinity
      stageUuid: "6eda6520-fb51-86c3-9274-99764e976a81"
    - stage: boundary
      stageUuid: "dcb4ba30-00ad-8d30-9a1f-957772f9a2cf"
    - stage: links
      stageUuid: "d4567a32-a0f5-8836-b5a4-a220a0aaf297"
    - stage: horo
      stageUuid: "412cef98-bebd-85e0-94a4-130d8a311110"
    - stage: seal
      stageUuid: "74bb7fb8-1a34-8e78-b05c-ae3ed6837ea0"
    - stage: uuid
      stageUuid: "d1d57930-399f-8e20-ae59-ae43844e5c44"
version: 2
---
# nist/incits/359/conventions

Unix-style **rwx** vocabulary aligned with how Payload enforces access: every check still runs through collection `access` and the auth stack — this file only names operations and optional bit patterns so requirements ('tenant group rw-, world r--') map cleanly to product language.

Extracted from `nist/incits/359/conventions.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[nist/incits/359]].
