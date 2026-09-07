---
name: fingerprint
description: "Use when reasoning about fingerprint — normalises a statement and addresses it, so the same query issued from two places is recognisably one query. records the execution against that address."
atomPath: "query/fingerprint"
coordinate: "query/fingerprint · 8/crest · 2f4744a0"
contentUuid: "f5e2cae6-5500-5715-b317-a07f5895bbe1"
diamondUuid: "f41f7aca-0bb6-8fa5-8225-15801b88505b"
uuid: "2f4744a0-142d-88b5-9e82-58812b8b58e4"
horo: 8
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
  computationUuid: "395b647b-3569-86ea-9992-531f738a8fe3"
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
      stageUuid: "2dd0ac26-0c5d-8d41-89a6-84a62da05a4b"
    - stage: seal
      stageUuid: "35bed41c-13d4-8598-a181-f9e9cf6be72f"
    - stage: uuid
      stageUuid: "99321ce5-8095-830e-9e79-70568ff09b57"
version: 2
---
# query/fingerprint — every SQL string has an address, so a query is a thing you can talk about

`canonicalizeSql` normalises a statement and `computeQueryUuid` addresses it, so the same query
issued from two places is recognisably one query. `runWithFingerprint` records the execution
against that address.

Without it, "which query is slow" is answered by pasting text at each other. With it, the
question has a key.

Composes: [[uuid]] · [[law]].
