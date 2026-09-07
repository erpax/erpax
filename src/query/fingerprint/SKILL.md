---
name: fingerprint
description: "Use when reasoning about fingerprint — normalises a statement and addresses it, so the same query issued from two places is recognisably one query. records the execution against that address."
atomPath: "query/fingerprint"
coordinate: "query/fingerprint · 8/crest · 712fc043"
contentUuid: "7fec4005-52f3-5b79-86c0-1cbed427fdf8"
diamondUuid: "b4b65b92-0c1b-839e-acff-ac764052b1be"
uuid: "712fc043-7746-88b0-b04e-2f81042feefe"
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
  computationUuid: "f4903640-5f86-8477-b951-c4ddf9fabd38"
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
      stageUuid: "2659a516-e326-8493-9b9f-3c1a773ed5dc"
    - stage: seal
      stageUuid: "35bed41c-13d4-8598-a181-f9e9cf6be72f"
    - stage: uuid
      stageUuid: "96b657ad-71a8-8d3f-a8d9-00a87b8064f1"
version: 2
---
# query/fingerprint — every SQL string has an address, so a query is a thing you can talk about

`canonicalizeSql` normalises a statement and `computeQueryUuid` addresses it, so the same query
issued from two places is recognisably one query. `runWithFingerprint` records the execution
against that address.

Without it, "which query is slow" is answered by pasting text at each other. With it, the
question has a key.

Composes: [[uuid]] · [[law]].
