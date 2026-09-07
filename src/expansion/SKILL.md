---
name: expansion
description: "Use when reasoning about expansion — HKDF-SHA256 key derivation replacing Rodin doubling"
atomPath: expansion
coordinate: "expansion · 5/round · 0afba7da"
contentUuid: "7fc39bb1-b6a5-5392-b90a-fdb1a334cda6"
diamondUuid: "7e849569-33bd-84e6-8c76-d06528be22d6"
uuid: "0afba7da-84ba-8fae-8632-cc3fee45c3e7"
horo: 5
typography:
  partition: expansion
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "2dbba651-30b1-81ff-8ba7-7d46e4e78562"
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
      stageUuid: "36bc2f52-a88c-8a7b-952a-fa3f3680e47d"
    - stage: seal
      stageUuid: "d438d4db-41ac-8084-9ed6-a6d6deedfb6d"
    - stage: uuid
      stageUuid: "84661202-032d-8c62-8e85-4c8ced4dbec4"
version: 2
---
# expansion — RFC 5869 HKDF-SHA256

Non-linear, irreversible key derivation per RFC 5869.

## law

Key derivation must be irreversible.
