---
name: conventions
description: "Use when reasoning about conventions — Unix-style **rwx** vocabulary aligned with how Payload enforces access: every check still runs through collection `access` and the auth stack — this file only names operations and optional bit patterns so requirements ('tenant group rw-, world r--') map cleanly to product language."
atomPath: "nist/incits/359/conventions"
coordinate: "nist/incits/359/conventions · 8/crest · 3b427792"
contentUuid: "44409c7e-ded9-52a1-bab6-079643bcf3bd"
diamondUuid: "7367bf3d-3ec0-8f75-940a-3e0463d3dcb2"
uuid: "3b427792-173a-8b71-8c51-4d9c868fee03"
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
  computationUuid: "8cf396fc-6391-873a-8dba-11d08576d2f5"
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
      stageUuid: "4e69d71c-f56a-84e6-a213-34f4a25acc37"
    - stage: seal
      stageUuid: "74bb7fb8-1a34-8e78-b05c-ae3ed6837ea0"
    - stage: uuid
      stageUuid: "f3acbed6-5a27-8e24-8124-ccf71a53880a"
version: 2
---
# nist/incits/359/conventions

Unix-style **rwx** vocabulary aligned with how Payload enforces access: every check still runs through collection `access` and the auth stack — this file only names operations and optional bit patterns so requirements ('tenant group rw-, world r--') map cleanly to product language.

Extracted from `nist/incits/359/conventions.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[nist/incits/359]].
