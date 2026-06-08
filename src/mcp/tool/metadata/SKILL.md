---
name: metadata
description: "Use when managing localized or tenant-overridden descriptions for erpax.* MCP tools — per-locale description overlays, tool area grouping, enabled/disabled toggles, documentation URLs, and orphan detection. The localized MCP tool metadata register."
atomPath: mcp/tool/metadata
coordinate: mcp/tool/metadata · 2/share · bc50002b
contentUuid: "c94509a5-5bb4-51c7-8ff8-897da0dd2146"
diamondUuid: "b819fe18-6dc1-868a-9770-2769f4c17c78"
uuid: "bc50002b-a5e9-8870-93ef-ddbc44e81e07"
horo: 2
bonds:
  in:
    - config
    - fields
    - identity
    - queries
    - tags
    - tool
  out:
    - config
    - fields
    - identity
    - queries
    - tags
typography:
  partition: mcp
  bondDegree: 20
  neighbors: []
standards:
  - "BCP-47"
  - "BCP-47 language tags"
  - "Conservation Law 38 mcp-tool-standardization (per-tool metadata)"
  - "EU 1958/1 official-languages-of-the-european-union"
  - "EU-1958"
  - "EU-1958/1"
  - "ISO/IEC-25010:2023"
  - "RFC-7231"
  - "W3C HTTP Content-Language (RFC 7231 §3.1.3.2)"
  - "W3C-HTTP-Content-Language"
bindings: []
neighbors:
  wikilink:
    - accounting
    - fields
    - identity
  matrix:
    - config
    - fields
    - identity
    - queries
    - tags
  backlinks:
    - config
    - fields
    - identity
    - queries
    - tags
signatures:
  computationUuid: "97451970-dbdb-8b61-93e1-50babc01afc9"
  stages:
    - stage: path
      stageUuid: "f1e2ccc7-d5b9-8141-9193-d7fd8e455fe9"
    - stage: trinity
      stageUuid: "18956c66-5e2e-8e63-a114-04ba00f645c6"
    - stage: boundary
      stageUuid: "4590bb90-7115-8269-90bc-6f0f6866ca70"
    - stage: links
      stageUuid: "15c5817f-0b30-8524-9962-a31c61e76c84"
    - stage: horo
      stageUuid: "ffef7937-1773-86ec-8f84-baa5da00f73b"
    - stage: seal
      stageUuid: "7210b5de-e752-8594-8966-f290384de931"
    - stage: uuid
      stageUuid: "1af05529-1b09-863f-af9c-c8623f130df8"
version: 2
---
# mcp-tool-metadata

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- W3C HTTP Content-Language (RFC 7231 §3.1.3.2)
- BCP-47 language tags
- EU 1958/1 official-languages-of-the-european-union
- Conservation Law 38 mcp-tool-standardization (per-tool metadata)

## Live MCP console

The registry below is read live from the backend (`/api/mcp-tool-metadata`); each entry links to its presentation at `/mcp/tools/{name}`.

<McpTools />

Composes: [[accounting]] · [[fields]] · [[identity]].
