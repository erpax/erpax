---
name: metadata
description: "Use when managing localized or tenant-overridden descriptions for erpax.* MCP tools — per-locale description overlays, tool area grouping, enabled/disabled toggles, documentation URLs, and orphan detection. The localized MCP tool metadata register."
atomPath: "mcp/tool/metadata"
coordinate: "mcp/tool/metadata · 5/round · d6bb5ff7"
contentUuid: "e0ca474a-d965-5556-9bf0-95b72d7c1208"
diamondUuid: "b2debfcd-8a60-8525-a687-35b6cdc42ba8"
uuid: "d6bb5ff7-3071-8ac4-9573-d1e2adf0b34a"
horo: 5
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
  computationUuid: "cdafeac6-f952-8154-9e96-1ea50febb424"
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
      stageUuid: "262679de-32ad-8913-bad8-0e05156b225e"
    - stage: seal
      stageUuid: "7210b5de-e752-8594-8966-f290384de931"
    - stage: uuid
      stageUuid: "947909b0-50ea-8546-9a49-8564eb91bccc"
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
