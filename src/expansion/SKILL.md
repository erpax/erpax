---
name: expansion
description: "Use when reasoning about expansion — HKDF-SHA256 key derivation replacing Rodin doubling"
atomPath: expansion
coordinate: "expansion · 4/weave · 093dedb0"
contentUuid: "206f0ddd-acfe-5401-a57d-f0baa44ce898"
diamondUuid: "ab8dd76d-fd87-8adb-a8af-302d9fb65071"
uuid: "093dedb0-0c24-8a30-9495-6bc64e1a2ecf"
horo: 4
typography:
  partition: expansion
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "7bdabe38-25f6-8e68-9224-bf60140bb891"
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
      stageUuid: "aa8bebda-cd43-8730-89b9-b69d4f8d8350"
    - stage: seal
      stageUuid: "d438d4db-41ac-8084-9ed6-a6d6deedfb6d"
    - stage: uuid
      stageUuid: "35f03a28-e4cc-85ac-930f-e1694f7740a8"
version: 2
---
# expansion — RFC 5869 HKDF-SHA256

Non-linear, irreversible key derivation per RFC 5869.

## law

Key derivation must be irreversible.
