---
name: search
description: "Use when reasoning about search — Identification answers a typed identifier. Anything else routes here: runs a tenant-scoped query across the collections in scope, ORing over the text fields reports for each, and…"
atomPath: "multi/search"
coordinate: "multi/search · 5/round · 176f22e1"
contentUuid: "ed7ffaa6-f822-5988-8bc8-782c29b2e924"
diamondUuid: "8867d61c-70fa-80b0-a3bb-f8cea9e787fc"
uuid: "176f22e1-9ee4-8f62-aac4-65e3c723cbec"
horo: 5
typography:
  partition: multi
  bondDegree: 50
standards:
  - "ISO/IEC 25010:2023 §5.3 operability (one input → many sources)"
  - MCP
  - "Schema.org Action — search-action (Slice YYYYYY presents these MCP-callable)"
bindings: []
signatures:
  computationUuid: "f34bc77f-00e2-8afa-b034-79cec784dd8b"
  stages:
    - stage: path
      stageUuid: "f4b4987e-c9ce-873b-b411-0ef6957928aa"
    - stage: trinity
      stageUuid: "e0488744-f08b-8c95-954f-66e1fb8f306a"
    - stage: boundary
      stageUuid: "06ced751-6041-8021-83b0-8ded78a34358"
    - stage: links
      stageUuid: "38dd8f71-4554-88c7-9402-8d43963f70c5"
    - stage: horo
      stageUuid: "68d7b7f1-d1bf-8d63-b070-1af2a55ba573"
    - stage: seal
      stageUuid: "d5973c2f-94e0-8e1e-9ad6-97b06bd8e69c"
    - stage: uuid
      stageUuid: "e0b9494d-1b61-821c-b9f1-b98f1e238e62"
version: 2
---
# multi/search — when the query is not an identifier, it is a search across everything

Identification answers a typed identifier. Anything else routes here: `multiSearch` runs a
tenant-scoped query across the collections in scope, ORing over the text fields
`searchableFieldsOf` reports for each, and returns a flat array of `MultiSearchHit` rows.

Each hit carries its source collection and its content-uuid, so the caller can group, paginate or
re-rank without going back to ask what a result was. Nothing external is required — the internal
strategy iterates the live config, so it works offline.

Composes: [[uuid]] · [[law]].
