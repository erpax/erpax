---
name: search
description: "Use when reasoning about search — Identification answers a typed identifier. Anything else routes here: runs a tenant-scoped query across the collections in scope, ORing over the text fields reports for each, and…"
atomPath: "multi/search"
coordinate: "multi/search · 4/weave · 072d33a5"
contentUuid: "f8184d32-0084-526f-a690-aac850a1ac65"
diamondUuid: "dc7d92c1-a574-89f2-9447-cfc4ad618be2"
uuid: "072d33a5-3760-8abb-98ed-edee07798604"
horo: 4
typography:
  partition: multi
  bondDegree: 50
standards:
  - "ISO/IEC 25010:2023 §5.3 operability (one input → many sources)"
  - MCP
  - "Schema.org Action — search-action (Slice YYYYYY presents these MCP-callable)"
bindings: []
signatures:
  computationUuid: "2bef8fb1-1713-8994-97f4-bc819211f306"
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
      stageUuid: "8b32c882-7ce2-8092-8a49-daa17272ffdd"
    - stage: seal
      stageUuid: "d5973c2f-94e0-8e1e-9ad6-97b06bd8e69c"
    - stage: uuid
      stageUuid: "903720e8-03f1-8e32-b21f-6cf8ba3b5c2c"
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
