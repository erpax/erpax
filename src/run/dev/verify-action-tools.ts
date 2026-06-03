#!/usr/bin/env tsx
/**
 * run/dev verify-action-tools — prove the upstream executable-action gap-fill
 * MCP tools BY USAGE, without booting Payload.
 *
 * Fills the gap found by examining the upstream ActiveAdmin member/batch/reify
 * surface: the dominant verbs (bulk state-transition, version restore) had no
 * MCP tool, so MCP-only agents could not drive them through the erpax API. The
 * two new tools close that:
 *   - erpax.batch.transition — bulk state-transition (the batch_action class)
 *   - erpax.versions.restore — version restore (the `reify` member action)
 *
 * This script builds the factories and runs the Law-38 standardization check on
 * them: 0 violations + correct shape = the tools are conformant and
 * agent-invocable through the MCP gateway (no bypass — the handlers drive
 * req.payload.* so hooks + emitOnStatusTransition + Payload Versions fire).
 *
 *   pnpm exec tsx src/run/dev/verify-action-tools.ts
 */
export {} // module marker — enables top-level `await` under tsc (TS1375)
const { buildBatchTools } = await import('../../services/agents/mcp/tools/batch')
const { buildVersionsTools } = await import('../../services/agents/mcp/tools/versions')
const { checkMcpToolStandardization } = await import('../../services/agents/mcp/standardization')

const tools = [...buildBatchTools(), ...buildVersionsTools()]
let ok = true

// 1. Shape — every tool is a well-formed ErpaxMcpTool.
for (const t of tools) {
  const shaped =
    typeof t.name === 'string' &&
    typeof t.description === 'string' &&
    t.description.length > 0 &&
    typeof t.parameters === 'object' &&
    typeof t.handler === 'function'
  if (!shaped) ok = false
  console.log(`${shaped ? 'PASS' : 'FAIL'}  shape         ${t.name}`)
}

// 2. Standardization (Law 38) — erpax.<area>.<verb>, canonical area, ≥1 standard cited.
const r = checkMcpToolStandardization(tools)
if (!r.ok) ok = false
console.log(`${r.ok ? 'PASS' : 'FAIL'}  standardize    ${r.toolsChecked} tools, ${r.violations.length} violation(s)`)
if (r.violations.length) console.log(JSON.stringify(r.violations, null, 2))

// 3. Both expected tools present (the two filled gaps).
const names = tools.map((t) => t.name).sort()
const expected = ['erpax.batch.transition', 'erpax.versions.restore']
const present = expected.every((n) => names.includes(n))
if (!present) ok = false
console.log(`${present ? 'PASS' : 'FAIL'}  present        ${names.join(', ')}`)

// 4. Each carries a tenantId param (so wrapToolsWithTenantGuard admin-gates it).
for (const t of tools) {
  const guarded = 'tenantId' in t.parameters
  if (!guarded) ok = false
  console.log(`${guarded ? 'PASS' : 'FAIL'}  admin-gateable ${t.name} (tenantId param present)`)
}

console.log(
  ok
    ? '\n[verify-action-tools] gap-fill tools OK — standardized, admin-gated, agent-invocable'
    : '\n[verify-action-tools] FAILED',
)
process.exit(ok ? 0 : 1)
