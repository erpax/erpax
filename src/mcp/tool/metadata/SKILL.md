---
name: metadata
description: "Use when managing localized or tenant-overridden descriptions for erpax.* MCP tools — per-locale description overlays, tool area grouping, enabled/disabled toggles, documentation URLs, and orphan detection. The localized MCP tool metadata register."
atomPath: "mcp/tool/metadata"
coordinate: "mcp/tool/metadata · 4/weave · 32b8361b"
contentUuid: "02ac5a04-45c8-5572-9c95-ed1092bccbb4"
diamondUuid: "d2baac9b-fc50-83ee-a44f-673875af61ce"
uuid: "32b8361b-f0de-8d43-9270-5d8d9bbad87a"
horo: 4
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
  - "EU 1958/1 official-languages-of-the-european-union"
  - "EU-1958"
  - "EU-1958/1"
  - "ISO/IEC-25010:2023"
  - "RFC-7231"
  - "W3C HTTP Content-Language (RFC 7231 §3.1.3.2)"
  - "W3C HTTP Content-Language (RFC 7231 §3.1.3.2)`"
  - "W3C-HTTP-Content-Language"
  - "— the instrument reads SKILL.md) -->"
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
  computationUuid: "27bfd5df-33bc-8264-b58e-29f985c35c36"
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
      stageUuid: "f466a885-c8dd-886b-9d1f-be3a89c6b992"
    - stage: seal
      stageUuid: "7210b5de-e752-8594-8966-f290384de931"
    - stage: uuid
      stageUuid: "b3ce0ccc-c874-84e3-bde0-739df5e5ca65"
version: 2
---
# mcp-tool-metadata

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard W3C HTTP Content-Language (RFC 7231 §3.1.3.2)`

- W3C HTTP Content-Language (RFC 7231 §3.1.3.2)
- BCP-47 language tags
- EU 1958/1 official-languages-of-the-european-union
- Conservation Law 38 mcp-tool-standardization (per-tool metadata)

## Live MCP console

The registry below is read live from the backend (`/api/mcp-tool-metadata`); each entry links to its presentation at `/mcp/tools/{name}`.

<McpTools />

Composes: [[accounting]] · [[fields]] · [[identity]].
