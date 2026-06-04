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
export { buildConsistencyTools } from '@/agents/mcp/tool/consistency'
export { buildEventsTools } from '@/agents/mcp/tool/events'
export { buildCloudflareTools } from '@/agents/mcp/tool/cloudflare'
// Slice QQQQQQQQQ-cut1 (2026-05-11) — every key-value is uuid → uuid.
// MCP-side surfacing of the new services so external clients
// (Claude Code, IDE agents, federation peers) compute the same uuids
// as the in-process surface. Per user 'implement in mcp and erpax in
// sync'.
export { buildKvTools } from '@/agents/mcp/tool/kv'
export { buildIntegrityExtensionTools } from '@/agents/mcp/tool/integrity-extensions'
// Slice RRRRRRRRR-cut1 (2026-05-11) — uuid family self-protection.
// erpax.security.attackSurface / erpax.security.assertMode surface
// the Conservation Law 58 escape-hatch inventory for auditors +
// deployment scripts.
export { buildSecurityTools } from '@/agents/mcp/tool/security'
// Slice SSSSSSSSS-cut1 (2026-05-11) — uuid-based RBAC sharing.
// erpax.share.{uuid,grant,check,revoke,list} — every grant is a
// chain-linked uuid binding; sign/admin grants are sealed.
export { buildShareTools } from '@/agents/mcp/tool/share'
// Slice TTTTTTTTT-cut1 (2026-05-11) — uuid:uuid IS the blockchain leaf.
// erpax.chain.{computeLeafUuid, forgeGenesis, forgeLink, verifyOne}
// surfaces Conservation Law 60: chains are recursive uuid bindings.
export { buildChainTools } from '@/agents/mcp/tool/chain'
// Slice UUUUUUUUU-cut1 (2026-05-11) — uuid carries its own features.
// erpax.format.{encode, decode, verify} surface the structured uuidv8
// layout (RFC 9562 §5.8): slot + capabilities + version + 106-bit
// content digest fused into one 128-bit primitive.
export { buildFormatTools } from '@/agents/mcp/tool/format'
// Slice WWWWWWWWW-cut1 (2026-05-11) — uuid self-governance.
// erpax.governance.{establish, attest} surface Conservation Law 63:
// any entity with a uuid can be self-governing without central authority.
export { buildGovernanceTools } from '@/agents/mcp/tool/governance'
// Slice AAAAAAAAAA-cut1 (2026-05-11) — errors are first-class uuids.
// erpax.error.{compute, wrap} surface Conservation Law 64: every error
// in the platform has a deterministic structured uuid; federation peers
// and replay tools verify error histories by uuid equality.
export { buildErrorTools } from '@/agents/mcp/tool/error'
// Upstream executable-action surface (ActiveAdmin member/batch/reify ported as
// MCP tools so MCP-only agents can drive them through the erpax API):
//   erpax.batch.transition  — bulk state-transition (the dominant batch_action)
//   erpax.versions.restore  — version restore (the `reify` member action)
export { buildBatchTools } from '@/agents/mcp/tool/batch'
export { buildVersionsTools } from '@/agents/mcp/tool/versions'
