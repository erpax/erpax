---
name: expansion
description: "Use when reasoning about expansion — HKDF-SHA256 key derivation replacing Rodin doubling"
atomPath: expansion
coordinate: "expansion · 5/round · e1f59a0b"
contentUuid: "d776458d-7a06-5406-a98b-7a47491719b3"
diamondUuid: "9b782fad-2418-8e4b-b5a0-ab46cd2afe2e"
uuid: "e1f59a0b-857f-8b2e-926f-25bfefff69c1"
horo: 5
typography:
  partition: expansion
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "318ee477-888e-82c7-8f30-415d0c3689df"
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
      stageUuid: "da2f5a48-478f-8eb1-9d26-6f2a7f493738"
    - stage: seal
      stageUuid: "d438d4db-41ac-8084-9ed6-a6d6deedfb6d"
    - stage: uuid
      stageUuid: "3623e458-9e49-8bd0-8b8e-269a53cc586f"
version: 2
---
# expansion — RFC 5869 HKDF-SHA256

Non-linear, irreversible key derivation per RFC 5869.

## law

Key derivation must be irreversible.
