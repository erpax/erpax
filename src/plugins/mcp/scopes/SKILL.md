---
name: scopes
description: "Use when collapsing MCP api-key capability columns to a compact deny-list — the matrix→cross collapse for @payloadcms/plugin-mcp at erpax scale (D1 100-col cap); virtual afterRead repopulates the handler's read shape default-open, narrowed by scopes.deny."
atomPath: "plugins/mcp/scopes"
coordinate: "plugins/mcp/scopes · 8/crest · 6abf8e86"
contentUuid: "ce32b619-c7a2-53e2-a5f8-12a3d7a3e0ab"
diamondUuid: "8dca6556-1be1-83b2-878d-17e6ecdec719"
uuid: "6abf8e86-6ca4-868b-8300-3e57539e231b"
horo: 8
typography:
  partition: plugins
  bondDegree: 12
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
  computationUuid: "dc4d5b31-4ece-8037-81b4-d9187dc26a54"
  stages:
    - stage: path
      stageUuid: "2c4511fc-bedf-88aa-b121-9c7462a2e571"
    - stage: trinity
      stageUuid: "a3d6c1b4-f53b-8a3a-80a3-7498c0b4cd6b"
    - stage: boundary
      stageUuid: "53ef8843-dde0-8954-a397-61d18bdef93e"
    - stage: links
      stageUuid: "0b96bb2b-07d4-8811-a32f-9d4b4262e308"
    - stage: horo
      stageUuid: "7401e2ab-be34-83a0-a8f8-654dcb752ae7"
    - stage: seal
      stageUuid: "5b3af09a-ba11-83bd-ab97-3e7165dbe3f9"
    - stage: uuid
      stageUuid: "fc372b1d-566d-86bd-bc4f-86061885748c"
version: 2
---
# scopes — MCP api-key capability collapse

At erpax scale (~206 collections) the plugin's per-collection×operation boolean columns exceed D1's 100-column cap. **scopes** strips the stored capability matrix, keeps one compact `scopes` JSON field (optional deny-list), and repopulates the exact doc shape `getMcpHandler.js` reads in `afterRead` — default-open, narrowed per key. Byte-identical enforcement; the matrix became a cross (sibling: `@/access/cross`).

Matter-twin: `src/plugins/mcp/scopes/index.ts` — `toCamelCase` · `capabilitiesFor` · `collapseApiKeyScopes`. Wired in `payload.config.ts` on the api-keys collection.

**Law — [[law]]: scopes is one word on the plugins/mcp diamond path — `plugins/mcp/scopes`, not camelCase `mcpScopes`.**

@see mcp · [[plugins]] · [[access]] · [[cross]]

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO/IEC 27002 §5.15 access-control + §5.18 access-rights (per-key narrowing)`
- `@standard ISO/IEC 27001 §A.9.4.1 information access restriction`
