---
name: fingerprint
description: "Use when reasoning about fingerprint — normalises a statement and addresses it, so the same query issued from two places is recognisably one query. records the execution against that address."
atomPath: "query/fingerprint"
coordinate: "query/fingerprint · 4/weave · 17cb1e5f"
contentUuid: "1eabdfc3-22fd-5811-a027-4a422544fd53"
diamondUuid: "32fca2b7-6b11-8813-93ff-46cdecc228c0"
uuid: "17cb1e5f-ceae-8009-8a79-f72b7ba4c818"
horo: 4
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
  computationUuid: "c69a4c67-1015-8aec-a3dc-69433b32c8d4"
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
      stageUuid: "29cc1896-3c3e-8297-8e28-c00db7145fd1"
    - stage: seal
      stageUuid: "35bed41c-13d4-8598-a181-f9e9cf6be72f"
    - stage: uuid
      stageUuid: "3fa38cfb-1dc8-8838-9080-f6a139dbff4a"
version: 2
---
# query/fingerprint — every SQL string has an address, so a query is a thing you can talk about

`canonicalizeSql` normalises a statement and `computeQueryUuid` addresses it, so the same query
issued from two places is recognisably one query. `runWithFingerprint` records the execution
against that address.

Without it, "which query is slow" is answered by pasting text at each other. With it, the
question has a key.

Composes: [[uuid]] · [[law]].
