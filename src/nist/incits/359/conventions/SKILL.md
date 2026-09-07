---
name: conventions
description: "Use when reasoning about conventions — Unix-style **rwx** vocabulary aligned with how Payload enforces access: every check still runs through collection `access` and the auth stack — this file only names operations and optional bit patterns so requirements ('tenant group rw-, world r--') map cleanly to product language."
atomPath: "nist/incits/359/conventions"
coordinate: "nist/incits/359/conventions · 1/base · 21113105"
contentUuid: "8c92aa02-1597-51b9-bd66-98e48c5c5020"
diamondUuid: "998e87f8-bfe4-89e2-b23a-a4c01dbede5d"
uuid: "21113105-7670-83e1-bc8e-22f619af85d1"
horo: 1
typography:
  partition: nist
  bondDegree: 6
standards:
  - "NIST INCITS-359-2012 role-based-access-control vocabulary-layer"
  - "NIST-INCITS-359-2012"
  - "POSIX-1.2017 §1.6.1.1 file-mode-bits naming-source"
bindings: []
signatures:
  computationUuid: "9ba68757-3d1f-8f36-a349-24d749e61095"
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
      stageUuid: "8a7cf7bd-f6be-86eb-977a-6b7257ee7d99"
    - stage: seal
      stageUuid: "74bb7fb8-1a34-8e78-b05c-ae3ed6837ea0"
    - stage: uuid
      stageUuid: "6f38e6c1-d641-8194-a35c-c7a92abe8efc"
version: 2
---
# nist/incits/359/conventions

Unix-style **rwx** vocabulary aligned with how Payload enforces access: every check still runs through collection `access` and the auth stack — this file only names operations and optional bit patterns so requirements ('tenant group rw-, world r--') map cleanly to product language.

Extracted from `nist/incits/359/conventions.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[nist/incits/359]].
