---
name: expansion
description: "Use when reasoning about expansion — HKDF-SHA256 key derivation replacing Rodin doubling"
atomPath: expansion
coordinate: "expansion · 2/share · 60797557"
contentUuid: "df9ec3fa-7960-5b73-8bc6-89fc1d86b162"
diamondUuid: "15b538b7-7980-8067-b64a-eb6cff2b3284"
uuid: "60797557-73fa-8b86-85b3-d947ef0370f4"
horo: 2
typography:
  partition: expansion
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "5d3d950e-f640-8d2f-b77e-f6193957cbc0"
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
      stageUuid: "23980b17-bf08-80c9-9f7f-cef78e8994dc"
    - stage: seal
      stageUuid: "d438d4db-41ac-8084-9ed6-a6d6deedfb6d"
    - stage: uuid
      stageUuid: "69a29279-fe20-8418-a962-bacb1bf4a95a"
version: 2
---
# expansion — RFC 5869 HKDF-SHA256

Non-linear, irreversible key derivation per RFC 5869.

## law

Key derivation must be irreversible.
