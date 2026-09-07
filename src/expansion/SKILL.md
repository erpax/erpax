---
name: expansion
description: "Use when reasoning about expansion — HKDF-SHA256 key derivation replacing Rodin doubling"
atomPath: expansion
coordinate: "expansion · 1/base · 9f08910b"
contentUuid: "3ce0c089-89b8-5ce6-b991-3162d698b199"
diamondUuid: "6ad0bc6b-1ca7-8398-b369-7ff7798e33d7"
uuid: "9f08910b-e580-879e-a218-7bb51347ad08"
horo: 1
typography:
  partition: expansion
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "72690d8e-9d4f-8cce-8cdd-a65a09142a17"
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
      stageUuid: "e3f35fec-2c40-8452-b654-1a38bcad53a2"
    - stage: seal
      stageUuid: "d438d4db-41ac-8084-9ed6-a6d6deedfb6d"
    - stage: uuid
      stageUuid: "e187002f-780b-8c06-b38d-51cfd529e8fa"
version: 2
---
# expansion — RFC 5869 HKDF-SHA256

Non-linear, irreversible key derivation per RFC 5869.

## law

Key derivation must be irreversible.
