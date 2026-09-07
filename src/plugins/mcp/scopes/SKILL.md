---
name: scopes
description: "Use when collapsing MCP api-key capability columns to a compact deny-list — the matrix→cross collapse for @payloadcms/plugin-mcp at erpax scale (D1 100-col cap); virtual afterRead repopulates the handler's read shape default-open, narrowed by scopes.deny."
atomPath: "plugins/mcp/scopes"
coordinate: "plugins/mcp/scopes · 2/share · 8cd6d1f9"
contentUuid: "06995a34-216e-5859-9449-fdf05aacb409"
diamondUuid: "812a50b4-5d7a-81f2-88ba-48c425e0792d"
uuid: "8cd6d1f9-ae48-873f-818a-f71e177d2427"
horo: 2
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
  computationUuid: "94230c6c-1488-8c11-88f8-0a20db9effb2"
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
      stageUuid: "783b2b6b-2cc1-8395-a44d-2aee69aa6360"
    - stage: seal
      stageUuid: "5b3af09a-ba11-83bd-ab97-3e7165dbe3f9"
    - stage: uuid
      stageUuid: "d10085c4-45cd-82e4-8a42-73ae470e6577"
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
