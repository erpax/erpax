---
name: expansion
description: "Use when reasoning about expansion — HKDF-SHA256 key derivation replacing Rodin doubling"
atomPath: expansion
coordinate: "expansion · 4/weave · 9463e941"
contentUuid: "2863628b-3159-50af-a405-5096bcc67310"
diamondUuid: "d0bbc459-a9a3-86ca-8d52-fe2fb4c6e829"
uuid: "9463e941-2681-86d0-8bf3-229588549e6f"
horo: 4
typography:
  partition: expansion
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "f328c28a-adb1-8f15-b5a8-5a119a4b9df6"
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
      stageUuid: "cdebf604-400c-8610-882c-1a1ed0befa5a"
    - stage: seal
      stageUuid: "d438d4db-41ac-8084-9ed6-a6d6deedfb6d"
    - stage: uuid
      stageUuid: "46eb8e33-817f-8b2b-9355-b2ad851f2740"
version: 2
---
# expansion — RFC 5869 HKDF-SHA256

Non-linear, irreversible key derivation per RFC 5869.

## law

Key derivation must be irreversible.
