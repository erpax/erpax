---
name: expansion
description: "Use when reasoning about expansion — HKDF-SHA256 key derivation replacing Rodin doubling"
atomPath: expansion
coordinate: "expansion · 4/weave · fa411e03"
contentUuid: "cd7c0aea-d262-5259-8c5e-52f0876ed95b"
diamondUuid: "de517adc-22c9-8259-96e6-a71e46fef293"
uuid: "fa411e03-b59b-894f-aa1b-5f7528a2b2fb"
horo: 4
typography:
  partition: expansion
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "84a90347-7473-8b47-887f-38e5de024dde"
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
      stageUuid: "cb07943c-bf40-8652-aa80-1b2a9de042ad"
    - stage: seal
      stageUuid: "d438d4db-41ac-8084-9ed6-a6d6deedfb6d"
    - stage: uuid
      stageUuid: "9c813985-e3fe-8e45-8ef1-1f0637694c11"
version: 2
---
# expansion — RFC 5869 HKDF-SHA256

Non-linear, irreversible key derivation per RFC 5869.

## law

Key derivation must be irreversible.
