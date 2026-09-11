---
name: expansion
description: "Use when reasoning about expansion — HKDF-SHA256 key derivation replacing Rodin doubling"
atomPath: expansion
coordinate: "expansion · 4/weave · 96cca884"
contentUuid: "6a31fb11-0036-58cb-b0d8-fddce62c49a6"
diamondUuid: "a6e9cb65-93e3-8df9-8d60-30eb0aaf9fb7"
uuid: "96cca884-981c-8cad-8742-6700b19625e9"
horo: 4
typography:
  partition: expansion
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "41fd5165-6547-8277-b0da-1701e5ebd95a"
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
      stageUuid: "4cbd458e-b889-89bb-bf2b-152817ecdae6"
    - stage: seal
      stageUuid: "d438d4db-41ac-8084-9ed6-a6d6deedfb6d"
    - stage: uuid
      stageUuid: "2f744e8e-4296-8dc9-885c-a0706bbc10d4"
version: 2
---
# expansion — RFC 5869 HKDF-SHA256

Non-linear, irreversible key derivation per RFC 5869.

## law

Key derivation must be irreversible.
