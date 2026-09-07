---
name: expansion
description: "Use when reasoning about expansion — HKDF-SHA256 key derivation replacing Rodin doubling"
atomPath: expansion
coordinate: "expansion · 7/descent · f8dced1b"
contentUuid: "cd43cab8-aa6b-5ef4-96cb-7d69d8828be7"
diamondUuid: "2d65c497-020e-8c6d-9c0c-f7d082ed85dd"
uuid: "f8dced1b-2e5b-8377-98ee-0b26edecca0f"
horo: 7
typography:
  partition: expansion
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "f1005857-18f4-8fca-865a-3aa518ea9865"
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
      stageUuid: "46f75d3d-888b-83e7-8375-901ec3f24418"
    - stage: seal
      stageUuid: "d438d4db-41ac-8084-9ed6-a6d6deedfb6d"
    - stage: uuid
      stageUuid: "d3aa3407-ed71-89a6-9904-0f934e55d76f"
version: 2
---
# expansion — RFC 5869 HKDF-SHA256

Non-linear, irreversible key derivation per RFC 5869.

## law

Key derivation must be irreversible.
