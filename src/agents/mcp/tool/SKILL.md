---
name: tool
description: Use when assembling the MCP tool surface from per-area builders — each area file is self-contained (own I18N, zod schemas, handlers) and exports one buildXxxTools factory whose tools all carry the erpax.<area>.* name prefix.
---

# agents/mcp/tool — the per-area MCP tool barrel

The modular [[tool]] surface. Each area is self-contained — its own I18N record (registered at module load), its own zod parameter schemas, its own handler implementations — and exports a single `buildXxxTools(deps)` factory. The barrel re-exports every factory so `tool-defs.ts` can import and concatenate them as the modularization proceeds. The naming convention IS the contract: every tool a factory yields carries the `erpax.<area>.*` prefix (`buildErrorTools` → `erpax.error.*`, `buildChainTools` → `erpax.chain.*`), so a tool's name alone locates its area file. The uuid-family areas (error, chain, format, governance, security) surface the same content-[[uuid]] computations the in-process surface uses, so external [[mcp]] clients compute identical uuids.

Matter-twin: `src/agents/mcp/tool/index.ts` (the barrel — `buildConsistencyTools` · `buildErrorTools` · `buildChainTools` · `buildFormatTools` · `buildGovernanceTools` · `buildSecurityTools` · `buildShareTools` · … one factory per area). Composes [[mcp]] · [[tool]] · [[uuid]].

**Law — [[law]]: each MCP area is a self-contained builder exporting one buildXxxTools factory, and every [[tool]] it yields carries the erpax.<area>.* name prefix — so the barrel concatenates the surface and a tool's name alone resolves its area; the uuid-family tools compute the same content-[[uuid]] as the in-process surface.**

@standard ISO/IEC 25010:2023 §5.7 modularity · MCP 0.6
@audit composed from the live area builders; never hand-asserted
