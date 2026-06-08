---
name: scopes
description: "Use when collapsing MCP api-key capability columns to a compact deny-list — the matrix→cross collapse for @payloadcms/plugin-mcp at erpax scale (D1 100-col cap); virtual afterRead repopulates the handler's read shape default-open, narrowed by scopes.deny."
atomPath: plugins/mcp/scopes
coordinate: plugins/mcp/scopes · 1/base · fe5be69e
contentUuid: "99e14757-21d1-5ae4-9e1e-35b7fc116d30"
diamondUuid: "6a0b7493-cf4f-8591-bb64-397503571130"
uuid: "fe5be69e-5087-8798-8ab2-2c5d3affe9a0"
horo: 1
bonds:
  in:
    - access
    - cross
    - law
    - mcp
    - plugins
  out:
    - access
    - cross
    - law
    - mcp
    - plugins
typography:
  partition: plugins
  bondDegree: 15
  neighbors: []
standards:
  - "ISO-27002"
  - ISO/IEC 27001 §A.9.4.1 information access restriction
  - "ISO/IEC 27002 §5.15 access-control + §5.18 access-rights (per-key narrowing)"
  - "ISO/IEC-27002:2022"
bindings: []
neighbors:
  wikilink:
    - access
    - cross
    - law
    - mcp
    - plugins
  matrix:
    - access
    - cross
    - law
    - mcp
    - plugins
  backlinks:
    - access
    - cross
    - law
    - mcp
    - plugins
signatures:
  computationUuid: "f174bc3c-8732-88f3-94a2-ec4f959edbe8"
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
      stageUuid: "ad297c2e-6ed5-8738-885e-9c68b0afd393"
    - stage: seal
      stageUuid: "5b3af09a-ba11-83bd-ab97-3e7165dbe3f9"
    - stage: uuid
      stageUuid: "effb4b9c-fae1-8610-8cbe-45de4934b124"
version: 2
---
# scopes — MCP api-key capability collapse

At erpax scale (~206 collections) the plugin's per-collection×operation boolean columns exceed D1's 100-column cap. **scopes** strips the stored capability matrix, keeps one compact `scopes` JSON field (optional deny-list), and repopulates the exact doc shape `getMcpHandler.js` reads in `afterRead` — default-open, narrowed per key. Byte-identical enforcement; the matrix became a cross (sibling: `@/access/cross`).

Matter-twin: `src/plugins/mcp/scopes/index.ts` — `toCamelCase` · `capabilitiesFor` · `collapseApiKeyScopes`. Wired in `payload.config.ts` on the api-keys collection.

**Law — [[law]]: scopes is one word on the plugins/mcp diamond path — `plugins/mcp/scopes`, not camelCase `mcpScopes`.**

@see [[mcp]] · [[plugins]] · [[access]] · [[cross]]
