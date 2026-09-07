---
name: metadata
description: "Use when managing localized or tenant-overridden descriptions for erpax.* MCP tools — per-locale description overlays, tool area grouping, enabled/disabled toggles, documentation URLs, and orphan detection. The localized MCP tool metadata register."
atomPath: "mcp/tool/metadata"
coordinate: "mcp/tool/metadata · 1/base · 94e6207d"
contentUuid: "c444f113-9b5d-5d57-b7af-28bc2623e040"
diamondUuid: "0210a568-7a83-8ade-a869-1c0c9c2ba920"
uuid: "94e6207d-edb4-8a97-98c2-c4e7205d7134"
horo: 1
typography:
  partition: mcp
  bondDegree: 20
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
signatures:
  computationUuid: "6c219e9e-66f4-83dd-9b49-05453d498a14"
  stages:
    - stage: path
      stageUuid: "f1e2ccc7-d5b9-8141-9193-d7fd8e455fe9"
    - stage: trinity
      stageUuid: "18956c66-5e2e-8e63-a114-04ba00f645c6"
    - stage: boundary
      stageUuid: "4590bb90-7115-8269-90bc-6f0f6866ca70"
    - stage: links
      stageUuid: "04b7fcf6-3b1a-8c0d-bfd4-1b00fb956880"
    - stage: horo
      stageUuid: "1a444df9-9b7b-8081-b95a-3c3c33669847"
    - stage: seal
      stageUuid: "7210b5de-e752-8594-8966-f290384de931"
    - stage: uuid
      stageUuid: "bdd98580-67c0-894c-87aa-584f94f9ad7a"
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

Composes: [[accounting]] · [[field]] · [[identity]].
