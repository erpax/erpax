---
name: conventions
description: "Use when reasoning about conventions — Unix-style **rwx** vocabulary aligned with how Payload enforces access: every check still runs through collection `access` and the auth stack — this file only names operations and optional bit patterns so requirements ('tenant group rw-, world r--') map cleanly to product language."
atomPath: "nist/incits/359/conventions"
coordinate: "nist/incits/359/conventions · 4/weave · b6784b48"
contentUuid: "cf98cf4f-f435-5550-85ea-f38c72bf234d"
diamondUuid: "a6a62534-5150-8082-ab56-859167eeecac"
uuid: "b6784b48-6c78-8edc-9c12-5729515ad070"
horo: 4
typography:
  partition: nist
  bondDegree: 6
standards:
  - "NIST INCITS-359-2012 role-based-access-control vocabulary-layer"
  - "NIST-INCITS-359-2012"
  - "POSIX-1.2017 §1.6.1.1 file-mode-bits naming-source"
bindings: []
signatures:
  computationUuid: "dc17f1a1-6434-8c39-b4ff-ca5aaf72bce5"
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
      stageUuid: "e1c1d218-ac2d-82f1-875e-add7ca21eba5"
    - stage: seal
      stageUuid: "74bb7fb8-1a34-8e78-b05c-ae3ed6837ea0"
    - stage: uuid
      stageUuid: "f7f1caa2-c371-8fac-88b9-89ba202768f1"
version: 2
---
# nist/incits/359/conventions

Unix-style **rwx** vocabulary aligned with how Payload enforces access: every check still runs through collection `access` and the auth stack — this file only names operations and optional bit patterns so requirements ('tenant group rw-, world r--') map cleanly to product language.

Extracted from `nist/incits/359/conventions.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[nist/incits/359]].
