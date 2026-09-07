---
name: expansion
description: "Use when reasoning about expansion — HKDF-SHA256 key derivation replacing Rodin doubling"
atomPath: expansion
coordinate: "expansion · 1/base · 9d4d8b47"
contentUuid: "53a3cc61-6ce0-5ddf-9cc5-3709ad673b62"
diamondUuid: "526aa426-22b3-8f37-b8a4-f7aaf740050b"
uuid: "9d4d8b47-937e-875b-a7db-bae83cdaac3b"
horo: 1
typography:
  partition: expansion
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "7b907043-5893-8077-81b9-8e54b651b5fe"
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
      stageUuid: "33c96f7a-4e62-82fe-b70a-3c11679e228f"
    - stage: seal
      stageUuid: "d438d4db-41ac-8084-9ed6-a6d6deedfb6d"
    - stage: uuid
      stageUuid: "3ccd7dad-2c38-89ca-aba5-d10b38e1778d"
version: 2
---
# expansion — RFC 5869 HKDF-SHA256

Non-linear, irreversible key derivation per RFC 5869.

## law

Key derivation must be irreversible.
