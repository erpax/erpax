---
name: search
description: "Use when reasoning about search — Identification answers a typed identifier. Anything else routes here: runs a tenant-scoped query across the collections in scope, ORing over the text fields reports for each, and…"
atomPath: "multi/search"
coordinate: "multi/search · 5/round · c0a34795"
contentUuid: "501e42c1-172b-5e99-a73a-73a90743bcfd"
diamondUuid: "be80e0d8-3ebf-833d-854b-29909c870fb9"
uuid: "c0a34795-ce42-83fa-8b1b-b169ce18071e"
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
  computationUuid: "d79ed558-b3b7-8ff7-8e8d-b2eedcaa6811"
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
      stageUuid: "789276c0-8e56-8260-9a0a-71465053b3bf"
    - stage: seal
      stageUuid: "d5973c2f-94e0-8e1e-9ad6-97b06bd8e69c"
    - stage: uuid
      stageUuid: "044f3be3-3788-819d-b482-29ec43a15368"
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
