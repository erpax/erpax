---
name: fingerprint
description: "Use when reasoning about fingerprint — normalises a statement and addresses it, so the same query issued from two places is recognisably one query. records the execution against that address."
atomPath: "query/fingerprint"
coordinate: "query/fingerprint · 1/base · 543f83a5"
contentUuid: "df1eedba-79fe-5a9d-923e-787cf84a7a2d"
diamondUuid: "633b486b-2f2b-8d33-bafd-008689ae251b"
uuid: "543f83a5-997b-814e-a275-d890b0760a45"
horo: 1
typography:
  partition: query
  bondDegree: 11
standards:
  - "ISO/IEC 9075-2 SQL/Foundation (keyword inventory)"
  - "NIST FIPS 180-4 SHA-256"
  - RFC 8785 JSON Canonicalization Scheme (for params digest)
  - "RFC-8785"
bindings: []
signatures:
  computationUuid: "52d38b04-8016-8472-acee-05f3a7308550"
  stages:
    - stage: path
      stageUuid: "f5837ce1-5f15-8e7f-92bc-c08244d20dd1"
    - stage: trinity
      stageUuid: "30f098a0-0c82-8def-9cda-3766479c5c6c"
    - stage: boundary
      stageUuid: "183d5fdf-ba33-8dde-af70-f8fb22b51cb8"
    - stage: links
      stageUuid: "60e9e977-95ef-878e-ad51-d972502c7b39"
    - stage: horo
      stageUuid: "77e64f70-a45f-865d-b216-1495162a4231"
    - stage: seal
      stageUuid: "35bed41c-13d4-8598-a181-f9e9cf6be72f"
    - stage: uuid
      stageUuid: "699859ff-d795-8962-a1c7-4df35557807a"
version: 2
---
# query/fingerprint — every SQL string has an address, so a query is a thing you can talk about

`canonicalizeSql` normalises a statement and `computeQueryUuid` addresses it, so the same query
issued from two places is recognisably one query. `runWithFingerprint` records the execution
against that address.

Without it, "which query is slow" is answered by pasting text at each other. With it, the
question has a key.

Composes: [[uuid]] · [[law]].
