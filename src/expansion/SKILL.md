---
name: expansion
description: "Use when reasoning about expansion — HKDF-SHA256 key derivation replacing Rodin doubling"
atomPath: expansion
coordinate: "expansion · 8/crest · 90441fd4"
contentUuid: "4069617b-3c13-5fbf-ba79-57dd68a821f9"
diamondUuid: "d3691f6c-4c49-812b-ad24-5fc4dbc9c873"
uuid: "90441fd4-849a-8c3b-bca8-c086ddba9d79"
horo: 8
typography:
  partition: expansion
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "68273c3c-1930-817b-972c-b2b460efab9c"
  stages:
    - stage: path
      stageUuid: "0188ef52-bf07-8c51-8f9c-acd10f3766f1"
    - stage: trinity
      stageUuid: "487aa477-1d2d-85b8-bb22-f97d76e8478e"
    - stage: boundary
      stageUuid: "94d581d1-55f2-8ddf-97c9-f2ae812dfcd3"
    - stage: links
      stageUuid: "a5cdc15e-e26e-8179-accd-0e14fb9d90fa"
    - stage: horo
      stageUuid: "4210aff0-ed25-8cea-bff2-410ed1c0362f"
    - stage: seal
      stageUuid: "d438d4db-41ac-8084-9ed6-a6d6deedfb6d"
    - stage: uuid
      stageUuid: "6512e51d-3fab-89eb-abff-7d65ee4d8f5d"
version: 2
---
# expansion — RFC 5869 HKDF-SHA256

Non-linear, irreversible key derivation per RFC 5869.

## law

Key derivation must be irreversible.
