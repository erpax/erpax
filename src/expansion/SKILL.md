---
name: expansion
description: "Use when reasoning about expansion — HKDF-SHA256 key derivation replacing Rodin doubling"
atomPath: expansion
coordinate: "expansion · 1/base · fc8577e0"
contentUuid: "e9ef3587-3385-512d-bddf-a70696b2bd31"
diamondUuid: "cc04a1a1-b4cd-8658-9fcc-4a83886c976a"
uuid: "fc8577e0-d272-8d7a-811d-6287d3717747"
horo: 1
typography:
  partition: expansion
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "b802723e-6763-8fc0-8a55-7c73dae09ef6"
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
      stageUuid: "e3ee09b1-b9a0-86c8-a9c8-0cc362709870"
    - stage: seal
      stageUuid: "d438d4db-41ac-8084-9ed6-a6d6deedfb6d"
    - stage: uuid
      stageUuid: "72018d5f-a060-89d3-81cc-aa3223a1ee7d"
version: 2
---
# expansion — RFC 5869 HKDF-SHA256

Non-linear, irreversible key derivation per RFC 5869.

## law

Key derivation must be irreversible.
