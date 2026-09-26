---
name: tool
description: "Use when assembling the MCP tool surface from per-area builders — each area file is self-contained (own I18N, zod schemas, handlers) and exports one buildXxxTools factory whose tools all carry the erpax.<area>.* name prefix."
atomPath: "agents/mcp/tool"
coordinate: "agents/mcp/tool · 1/base · 355216f5"
contentUuid: "101acbc2-f5e1-5b7b-8620-fa188d483cb1"
diamondUuid: "17bc5f46-a413-8f00-807f-0efd3cc1c392"
uuid: "355216f5-ef71-8bf7-b236-9a725cb549fc"
horo: 1
typography:
  partition: agents
  bondDegree: 20
standards:
  - "ISO-19011"
  - "ISO-27001"
  - "ISO-27002"
  - "ISO/IEC 25010:2023 §5.7 modularity"
  - "ISO/IEC 25010:2023 §5.7 modularity · MCP 0.6"
  - "ISO/IEC-25010"
  - "ISO/IEC-27001:2022"
  - "ISO/IEC-27002:2022"
  - MCP
  - "NIST-SP-800-162"
  - "NIST-SP-800-63"
  - "RFC-9562"
  - "W3C-DID-1.0"
bindings: []
signatures:
  computationUuid: "5b091469-2686-8bba-822e-dec37296d7f2"
  stages:
    - stage: path
      stageUuid: "b866a4db-1f18-8e65-956d-42e06a042283"
    - stage: trinity
      stageUuid: "2f23f4bf-f855-8963-9bfa-cd14671097f8"
    - stage: boundary
      stageUuid: "d51ff8e9-c442-8796-a90d-efdc701b1da2"
    - stage: links
      stageUuid: "2f008068-8152-8d7b-abf8-95d91bf8e480"
    - stage: horo
      stageUuid: "8f437ea8-b9f4-8db6-9c3e-8d30433c414a"
    - stage: seal
      stageUuid: "6651468a-d227-8dbc-9aa5-d39e7d68f9ad"
    - stage: uuid
      stageUuid: "09ef64b3-fdfa-83cc-b4d5-8c4013b67607"
version: 2
---
# agents/mcp/tool — the per-area MCP tool barrel

The modular [[tool]] surface. Each area is self-contained — its own I18N record (registered at module load), its own zod parameter schemas, its own handler implementations — and exports a single `buildXxxTools(deps)` factory. The barrel re-exports every factory so `tool-defs.ts` can import and concatenate them as the modularization proceeds. The naming convention IS the contract: every tool a factory yields carries the `erpax.<area>.*` prefix (`buildErrorTools` → `erpax.error.*`, `buildChainTools` → `erpax.chain.*`), so a tool's name alone locates its area file. The uuid-family areas (error, chain, format, governance, security) surface the same content-[[uuid]] computations the in-process surface uses, so external [[mcp]] clients compute identical uuids.

Matter-twin: `src/agents/mcp/tool/index.ts` (the barrel — `buildConsistencyTools` · `buildErrorTools` · `buildChainTools` · `buildFormatTools` · `buildGovernanceTools` · `buildSecurityTools` · `buildShareTools` · … one factory per area). Composes [[mcp]] · [[tool]] · [[uuid]].

**Law — [[law]]: each MCP area is a self-contained builder exporting one buildXxxTools factory, and every [[tool]] it yields carries the erpax.<area>.* name prefix — so the barrel concatenates the surface and a tool's name alone resolves its area; the uuid-family tools compute the same content-[[uuid]] as the in-process surface.**

@standard ISO/IEC 25010:2023 §5.7 modularity · MCP 0.6
@audit composed from the live area builders; never hand-asserted
