---
name: search
description: "Use when reasoning about search — Identification answers a typed identifier. Anything else routes here: runs a tenant-scoped query across the collections in scope, ORing over the text fields reports for each, and…"
atomPath: "multi/search"
coordinate: "multi/search · 1/base · 7aa1f2df"
contentUuid: "9d444a6e-33ec-55b2-9a44-acf151040e91"
diamondUuid: "abfd96c4-8f05-81af-9cfd-ebf8ff2c2c6d"
uuid: "7aa1f2df-1075-857f-807d-88d81bbe6215"
horo: 1
typography:
  partition: multi
  bondDegree: 48
standards:
  - "ISO/IEC 25010:2023 §5.3 operability (one input → many sources)"
  - MCP
  - "Schema.org Action — search-action (Slice YYYYYY presents these MCP-callable)"
bindings: []
signatures:
  computationUuid: "4488c616-d8df-8ee2-b3bf-4e4f12b00dd9"
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
      stageUuid: "328d5e9a-966e-8fa0-9d6b-845c07ae1c3b"
    - stage: seal
      stageUuid: "d5973c2f-94e0-8e1e-9ad6-97b06bd8e69c"
    - stage: uuid
      stageUuid: "1e217460-b52f-816e-b2cb-49a172b8dc7b"
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
