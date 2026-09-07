---
name: expansion
description: "Use when reasoning about expansion — HKDF-SHA256 key derivation replacing Rodin doubling"
atomPath: expansion
coordinate: "expansion · 2/share · 5d8c9c0d"
contentUuid: "14402221-4c2a-553a-91a3-e6ea3f707d2f"
diamondUuid: "1b19a2f1-69c4-8a9d-a489-c9281513e387"
uuid: "5d8c9c0d-2aa8-8fc8-ae8a-081213350133"
horo: 2
typography:
  partition: expansion
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "c9d53811-f0ac-86de-9f64-f48a8729b8c8"
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
      stageUuid: "f20db759-63d7-8b3d-b9c7-31d9b2e1721b"
    - stage: seal
      stageUuid: "d438d4db-41ac-8084-9ed6-a6d6deedfb6d"
    - stage: uuid
      stageUuid: "b9483b38-89a7-8591-b049-1648b3138842"
version: 2
---
# expansion — RFC 5869 HKDF-SHA256

Non-linear, irreversible key derivation per RFC 5869.

## law

Key derivation must be irreversible.
