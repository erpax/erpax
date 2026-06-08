---
name: deduplication
description: "Use when eliminating duplicate records — duplicate detection (exact/fuzzy), merge strategies, idempotency to prevent re-ingestion, duplicate scope (entity/transaction/field-level), dedup window/time-range."
atomPath: deduplication
coordinate: deduplication · 8/crest · 315576bc
contentUuid: "0e5c018b-0368-557e-8b3c-0ab8f056c6c0"
diamondUuid: "200c3cb8-fe8f-840c-b1a5-efa8730b7b20"
uuid: "315576bc-dd88-81df-aed1-c36281178076"
horo: 8
bonds:
  in:
    - idempotency
    - identity
    - ingest
    - merge
    - reconcile
    - sparsity
  out:
    - idempotency
    - identity
    - ingest
    - merge
    - reconcile
    - sparsity
typography:
  partition: deduplication
  bondDegree: 20
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - idempotency
    - identity
    - ingest
    - merge
    - reconcile
  matrix:
    - idempotency
    - identity
    - ingest
    - merge
    - reconcile
    - sparsity
  backlinks:
    - idempotency
    - identity
    - ingest
    - merge
    - reconcile
    - sparsity
signatures:
  computationUuid: "da442dfa-45f8-8152-9afa-973bb95dff42"
  stages:
    - stage: path
      stageUuid: "28b1cd68-b067-87a3-84cd-6c03d601d7b7"
    - stage: trinity
      stageUuid: "c6fb24e8-24af-8e5a-ad2a-24447227e3a8"
    - stage: boundary
      stageUuid: "83b3a526-5d0c-851d-992f-8362c7094ea9"
    - stage: links
      stageUuid: "8f1ffa19-03c3-8fb5-a83c-85a54274e76b"
    - stage: horo
      stageUuid: "3a74f112-55fd-8ee5-9c99-62349b1029cb"
    - stage: seal
      stageUuid: "a8009d05-c332-83ee-b34f-dcb5469c385c"
    - stage: uuid
      stageUuid: "8b2cd42b-18b1-8367-90fc-4991564e99b0"
version: 2
---
# deduplication

Use when eliminating duplicate records — duplicate detection (exact/fuzzy), merge strategies, idempotency to prevent re-ingestion, duplicate scope (entity/transaction/field-level), dedup window/time-range.

Composes: [[ingest]] · [[identity]] · [[merge]] · [[reconcile]] · [[idempotency]].

## Standards
- Data quality (ISO 8601 / 9001)
- Record linkage standards
