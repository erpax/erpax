---
name: fingerprint
description: "Use when reasoning about fingerprint — normalises a statement and addresses it, so the same query issued from two places is recognisably one query. records the execution against that address."
atomPath: "query/fingerprint"
coordinate: "query/fingerprint · 4/weave · 04ff0c34"
contentUuid: "46116377-673b-508c-97f0-a7e4fb516324"
diamondUuid: "e557afea-fba9-87c4-ba97-34af1bbd7456"
uuid: "04ff0c34-e461-85b6-ae3f-8b4166cc919d"
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
  computationUuid: "c5c4b994-47d5-89d1-b827-bf2c75def5ff"
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
      stageUuid: "4e8e66d9-b30d-8fe8-b82c-5dcc41f2cde6"
    - stage: seal
      stageUuid: "35bed41c-13d4-8598-a181-f9e9cf6be72f"
    - stage: uuid
      stageUuid: "bffc91ef-325e-8408-a67a-15e73b119383"
version: 2
---
# query/fingerprint — every SQL string has an address, so a query is a thing you can talk about

`canonicalizeSql` normalises a statement and `computeQueryUuid` addresses it, so the same query
issued from two places is recognisably one query. `runWithFingerprint` records the execution
against that address.

Without it, "which query is slow" is answered by pasting text at each other. With it, the
question has a key.

Composes: [[uuid]] · [[law]].
