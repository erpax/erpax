---
name: expansion
description: "Use when reasoning about expansion — HKDF-SHA256 key derivation replacing Rodin doubling"
atomPath: expansion
coordinate: "expansion · 1/base · 1264135a"
contentUuid: "8cbc8eb0-e10b-530f-9095-dc03858e7dc2"
diamondUuid: "f686e1c2-11a5-8d40-b285-1455cca2ac7d"
uuid: "1264135a-c847-8eeb-aab9-792913cd8d3d"
horo: 1
typography:
  partition: expansion
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "8ee3645c-c44c-8076-91d9-3223af2948f3"
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
      stageUuid: "0c6e8ab8-3c71-8796-8521-c663c8edbbd8"
    - stage: seal
      stageUuid: "d438d4db-41ac-8084-9ed6-a6d6deedfb6d"
    - stage: uuid
      stageUuid: "5c65718d-f16a-806c-bf32-b070904dd3a7"
version: 2
---
# expansion — RFC 5869 HKDF-SHA256

Non-linear, irreversible key derivation per RFC 5869.

## law

Key derivation must be irreversible.
