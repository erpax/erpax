---
name: conventions
description: "Use when reasoning about conventions — Unix-style **rwx** vocabulary aligned with how Payload enforces access: every check still runs through collection `access` and the auth stack — this file only names operations and optional bit patterns so requirements ('tenant group rw-, world r--') map cleanly to product language."
atomPath: "nist/incits/359/conventions"
coordinate: "nist/incits/359/conventions · 7/descent · 5838c2f3"
contentUuid: "f803cef6-5813-56a2-8a3e-b8b8144198f6"
diamondUuid: "d0972e2b-c1ea-8494-b4b6-f1690e7267a0"
uuid: "5838c2f3-9b4a-8406-8ec3-c5063eec54b4"
horo: 7
typography:
  partition: nist
  bondDegree: 6
standards:
  - "NIST INCITS-359-2012 role-based-access-control vocabulary-layer"
  - "NIST-INCITS-359-2012"
  - "POSIX-1.2017 §1.6.1.1 file-mode-bits naming-source"
bindings: []
signatures:
  computationUuid: "8202e341-fe1c-89c2-8ecc-340ed3cabe71"
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
      stageUuid: "89916847-9b63-8ffc-8ffb-b6e8aae66c6a"
    - stage: seal
      stageUuid: "74bb7fb8-1a34-8e78-b05c-ae3ed6837ea0"
    - stage: uuid
      stageUuid: "e4c14875-e16c-8478-be80-786e98b92aac"
version: 2
---
# nist/incits/359/conventions

Unix-style **rwx** vocabulary aligned with how Payload enforces access: every check still runs through collection `access` and the auth stack — this file only names operations and optional bit patterns so requirements ('tenant group rw-, world r--') map cleanly to product language.

Extracted from `nist/incits/359/conventions.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[nist/incits/359]].
