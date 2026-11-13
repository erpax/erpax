---
name: search
description: "Use when reasoning about search — Identification answers a typed identifier. Anything else routes here: runs a tenant-scoped query across the collections in scope, ORing over the text fields reports for each, and…"
atomPath: "multi/search"
coordinate: "multi/search · 4/weave · 02d56492"
contentUuid: "5c341528-47e4-584d-851c-3620ef1f8c78"
diamondUuid: "41bbea2b-42f8-8a63-9d43-80c4bf1ef3b6"
uuid: "02d56492-b2bd-8191-a4f1-378dd560acb6"
horo: 4
typography:
  partition: multi
  bondDegree: 47
standards:
  - "ISO/IEC 25010:2023 §5.3 operability (one input → many sources)"
  - "Schema.org Action — search-action (Slice YYYYYY presents these MCP-callable)"
bindings: []
signatures:
  computationUuid: "4160278d-26a3-85fb-88ef-b6813ce54ae1"
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
      stageUuid: "4ec84b71-0de5-8684-87ba-a0d2673b187b"
    - stage: seal
      stageUuid: "d5973c2f-94e0-8e1e-9ad6-97b06bd8e69c"
    - stage: uuid
      stageUuid: "162d8f45-4ffa-81a4-862b-46bc331741d1"
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
