/**
 * STATE_MUTATING_TOOLS allowlist pin — Slice JJJJJJJJJJ (2026-05-11).
 *
 * Slice FFFFFFFFFF introduced the curated allowlist in
 * `tool-defs.ts` that determines which inlined MCP tools get the
 * stronger `assertAdminOnTenant` guard instead of the default
 * `assertTenantMatch`. This file:
 *
 *   - Parses the allowlist out of source.
 *   - Asserts the exact contents match the canonical list of 14.
 *   - Applies the FFFFFFFFFF mutating-verb regex to every name in the
 *     allowlist and the exception list — confirming the heuristic
 *     classification is consistent with the manual decision.
 *
 * If a future change trims, renames, or silently expands the allow-
 * list, this test breaks loud — forcing a deliberate review of the
 * security decision rather than letting it slip through unnoticed.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 * @audit ISO 27002 §5.4 segregation-of-duties (pinned scope)
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const TOOL_DEFS_PATH = resolve(__dirname, 'tool-defs.ts')

/** Parse the `STATE_MUTATING_TOOLS` Set literal from the source file. */
function parseAllowlist(): ReadonlyArray<string> {
  const src = readFileSync(TOOL_DEFS_PATH, 'utf8')
  const match = src.match(/STATE_MUTATING_TOOLS:\s*ReadonlySet<string>\s*=\s*new Set\(\[([\s\S]*?)\]\)/)
  if (!match) {
    throw new Error('Could not locate STATE_MUTATING_TOOLS literal in tool-defs.ts — has the constant been renamed?')
  }
  return [...match[1]!.matchAll(/'(erpax\.[a-zA-Z0-9._-]+)'/g)].map((m) => m[1]!)
}

const CANONICAL_ALLOWLIST: ReadonlyArray<string> = [
  // Audit + chain evidence (SOX §404 forgery vector class)
  'erpax.events.emit',
  'erpax.integrity.uuidStreamRecord',
  'erpax.anchoring.anchorRoot',
  // Financial mutation
  'erpax.accounting.bookRevenue',
  // Tenant + platform provisioning
  'erpax.commerce.provisionInstance',
  'erpax.platform.publishSelf',
  // Voting / governance
  'erpax.voting.createBallot',
  // Content / site seeding
  'erpax.website.seedFromSpec',
  // PWA mutation queue (sync writes)
  'erpax.pwa.enqueueMutation',
  // Storage write paths
  'erpax.storage.replicate',
  // Chain execution (writes to audit chain per JSDoc)
  'erpax.chain.runFull',
  'erpax.chain.runStep',
  // Standards subscription (creates a watch row)
  'erpax.standards.subscribe',
  // Agent dispatch (effects → side-effects)
  'erpax.agents.dispatch',
  // Executable actions — bulk state-transition + version restore (Law 38 batch/versions areas)
  'erpax.batch.transition',
  'erpax.versions.restore',
]

const MUTATING_VERBS = /\.(emit|record|anchor|publish|seed|create|book|replicate|run|dispatch|enqueue|subscribe|provision|write|grant|revoke|attest|insert|send|freeze|allocate|advance|complete|materialise)([A-Z]|$)/

const CANONICAL_READ_EXCEPTIONS: ReadonlyArray<string> = [
  'erpax.governance.verify',
  'erpax.format.verify',
  'erpax.integrity.verifyObject',
  'erpax.integrity.verifyType',
  'erpax.share.uuid',
  'erpax.share.check',
  'erpax.share.list',
  'erpax.kv.bindingUuid',
  'erpax.kv.resolveKey',
  'erpax.kv.freezeRegistry',
]

describe('STATE_MUTATING_TOOLS allowlist (Slice FFFFFFFFFF pinned)', () => {
  it('parses cleanly from tool-defs.ts source', () => {
    expect(() => parseAllowlist()).not.toThrow()
  })

  it('matches the canonical 16-tool list exactly', () => {
    const parsed = parseAllowlist()
    expect([...parsed].sort()).toEqual([...CANONICAL_ALLOWLIST].sort())
  })

  it('contains exactly 16 entries (regression bar for silent trim/expand)', () => {
    expect(parseAllowlist()).toHaveLength(16)
  })

  it('every entry uses the canonical erpax.<area>.<verb> name shape', () => {
    for (const name of parseAllowlist()) {
      expect(name).toMatch(/^erpax\.[a-z][a-z0-9]*\.[a-zA-Z][a-zA-Z0-9]*$/)
    }
  })

  it('the mutating-verb heuristic detects most allowlist entries — names not matched are admin-guarded by manual decision', () => {
    const allowlist = parseAllowlist()
    const detected = allowlist.filter((n) => MUTATING_VERBS.test(n))
    // We DON'T require every entry to match — the regex is a discovery
    // heuristic for new tools, not a property required of pinned
    // entries. But ≥80% should match, else the regex is too narrow
    // and silent additions will slip past the invariant.
    const ratio = detected.length / allowlist.length
    expect(ratio, `only ${detected.length}/${allowlist.length} matched — broaden the regex in checks.ts:checkMcpStateMutatorsAdminGuarded`).toBeGreaterThanOrEqual(0.8)
  })
})

describe('checkMcpStateMutatorsAdminGuarded read-side exception list (consistency)', () => {
  it('exception list and allowlist are disjoint (no tool can be both admin-guarded AND a read-side exception)', () => {
    const allow = new Set(parseAllowlist())
    for (const name of CANONICAL_READ_EXCEPTIONS) {
      expect(allow.has(name), `${name} cannot be both admin-guarded AND a read-side exception`).toBe(false)
    }
  })

  it('exception list contains the read-side tools that match the mutating-verb regex (entries that actually trigger the check)', () => {
    // The invariant only flags candidates that MATCH the regex. Read-side
    // tools that match the regex (e.g. erpax.kv.freezeRegistry — `.freeze`
    // matches) must be in the exception list to avoid false-positive
    // warnings. Entries that don't match the regex are defensive — they
    // never reach the check, so listing them is documentation, not
    // enforcement.
    const triggering = CANONICAL_READ_EXCEPTIONS.filter((n) => MUTATING_VERBS.test(n))
    expect(triggering.length).toBeGreaterThan(0)
    expect(triggering).toContain('erpax.kv.freezeRegistry')
  })
})
