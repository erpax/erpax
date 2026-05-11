/**
 * Tools barrel — Slice CCCCCCCCC (2026-05-11).
 *
 * Per-area builders. The main `tool-defs.ts` will import + concatenate
 * these as the modularization proceeds (Slices ZZZZZZZZ → onwards). Each
 * area is self-contained:
 *
 *   - own I18N record (registered at module load)
 *   - own zod parameter schemas
 *   - own handler implementations
 *   - exports a single `buildXxxTools(deps)` factory
 *
 * Convention: each area file matches `erpax.<area>.*` toolName prefix.
 *
 * @standard ISO/IEC 25010:2023 §5.7 modularity
 */
export { buildConsistencyTools } from './consistency'
export { buildEventsTools } from './events'
export { buildCloudflareTools } from './cloudflare'
// Slice QQQQQQQQQ-cut1 (2026-05-11) — every key-value is uuid → uuid.
// MCP-side surfacing of the new services so external clients
// (Claude Code, IDE agents, federation peers) compute the same uuids
// as the in-process surface. Per user 'implement in mcp and erpax in
// sync'.
export { buildKvTools } from './kv'
export { buildIntegrityExtensionTools } from './integrity-extensions'
// Slice RRRRRRRRR-cut1 (2026-05-11) — uuid family self-protection.
// erpax.security.attackSurface / erpax.security.assertMode surface
// the Conservation Law 58 escape-hatch inventory for auditors +
// deployment scripts.
export { buildSecurityTools } from './security'
