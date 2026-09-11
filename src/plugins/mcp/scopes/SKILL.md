---
name: scopes
description: "Use when collapsing MCP api-key capability columns to a compact deny-list — the matrix→cross collapse for @payloadcms/plugin-mcp at erpax scale (D1 100-col cap); virtual afterRead repopulates the handler's read shape default-open, narrowed by scopes.deny."
atomPath: "plugins/mcp/scopes"
coordinate: "plugins/mcp/scopes · 5/round · a1201bdb"
contentUuid: "7f6a66bf-4c7f-5b6e-bd35-b64380bd27e2"
diamondUuid: "fc1cf40a-b861-819d-b223-f32b02907a1f"
uuid: "a1201bdb-0de4-80a5-aa0f-0b52395ce4ff"
horo: 5
typography:
  partition: plugins
  bondDegree: 15
standards:
  - "ISO-27002"
  - "ISO/IEC 27001 §A.9.4.1 information access restriction"
  - "ISO/IEC 27001 §A.9.4.1 information access restriction`"
  - "ISO/IEC 27002 §5.15 access-control + §5.18 access-rights (per-key narrowing)"
  - "ISO/IEC 27002 §5.15 access-control + §5.18 access-rights (per-key narrowing)`"
  - "ISO/IEC-27002:2022"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "d01d0e28-9ab9-8ef1-9d94-fd9a3c2b1a50"
  stages:
    - stage: path
      stageUuid: "2c4511fc-bedf-88aa-b121-9c7462a2e571"
    - stage: trinity
      stageUuid: "a3d6c1b4-f53b-8a3a-80a3-7498c0b4cd6b"
    - stage: boundary
      stageUuid: "53ef8843-dde0-8954-a397-61d18bdef93e"
    - stage: links
      stageUuid: "5e17a84f-eafc-8935-b877-296d3d195364"
    - stage: horo
      stageUuid: "800371c3-28dc-8ccc-bcb9-e9f9d7937799"
    - stage: seal
      stageUuid: "5b3af09a-ba11-83bd-ab97-3e7165dbe3f9"
    - stage: uuid
      stageUuid: "c7f71753-7feb-8b79-a7e9-e8a8b20b80cf"
version: 2
---
# scopes — MCP api-key capability collapse

At erpax scale (~206 collections) the plugin's per-collection×operation boolean columns exceed D1's 100-column cap. **scopes** strips the stored capability matrix, keeps one compact `scopes` JSON field (optional deny-list), and repopulates the exact doc shape `getMcpHandler.js` reads in `afterRead` — default-open, narrowed per key. Byte-identical enforcement; the matrix became a cross (sibling: `@/access/cross`).

Matter-twin: `src/plugins/mcp/scopes/index.ts` — `toCamelCase` · `capabilitiesFor` · `collapseApiKeyScopes`. Wired in `payload.config.ts` on the api-keys collection.

**Law — [[law]]: scopes is one word on the plugins/mcp diamond path — `plugins/mcp/scopes`, not camelCase `mcpScopes`.**

@see [[mcp]] · [[plugins]] · [[access]] · [[cross]]

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO/IEC 27002 §5.15 access-control + §5.18 access-rights (per-key narrowing)`
- `@standard ISO/IEC 27001 §A.9.4.1 information access restriction`
