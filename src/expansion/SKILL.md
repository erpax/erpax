---
name: expansion
description: "Use when reasoning about expansion — HKDF-SHA256 key derivation replacing Rodin doubling"
atomPath: expansion
coordinate: "expansion · 5/round · e116ad9c"
contentUuid: "4607e74a-9d02-5b43-9a73-aa796e56d2a8"
diamondUuid: "cf3fa420-2636-824d-9ba3-cdc2978b89b3"
uuid: "e116ad9c-9230-856c-becd-c0a308d72ab5"
horo: 5
typography:
  partition: expansion
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "91bf026e-9a1d-8ce8-9852-8e7f52b4ab94"
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
      stageUuid: "52d6b967-d691-8c47-989f-3ccb2872c56d"
    - stage: seal
      stageUuid: "d438d4db-41ac-8084-9ed6-a6d6deedfb6d"
    - stage: uuid
      stageUuid: "b5b27e4f-2a5e-86bd-90c9-11125f3201e9"
version: 2
---
# expansion — RFC 5869 HKDF-SHA256

Non-linear, irreversible key derivation per RFC 5869.

## law

Key derivation must be irreversible.
