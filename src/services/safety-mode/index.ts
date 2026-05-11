/**
 * Safety mode — uuid family self-protection.
 *
 * Slice RRRRRRRRR-cut1 (2026-05-11). Per user 'any agent
 * unintentionally or not may try to tamper with the system.
 * unconventional approach for example. uuid prevents the need of
 * protection so the only task is to see how uuid may be tampered
 * with when all else is wired'.
 *
 * The reframing: once the uuid family is fully wired, traditional
 * protection layers (RBAC, ACLs, input validation, CSRF tokens,
 * cert chains) become structurally unnecessary because uuid math
 * already prevents tampering at every binding (Laws 8 + 47 + 53 +
 * 54 + 55 + 56 + 57). The only remaining attack surface is the
 * uuid family ITSELF — the canonicaliser, the registry helpers,
 * the test-only escape hatches.
 *
 * This module enumerates those escape hatches and gates them on a
 * boot-time `SafetyMode` flag. In `production` they throw; in
 * `test` / `dev` they work normally so the test suite can isolate
 * state.
 *
 * The enumerable escape hatches:
 *
 *   __resetIdentitySlotRegistryForTests   — identity-element
 *   __resetInternalProviderRegistryForTests — self-closure
 *   provisionTestSigningKey                — integrity/tenant-key-registry
 *   provisionTestKek                       — integrity/tenant-key-registry
 *   setDefaultKeyResolver                  — integrity/tenant-key-registry
 *   setDefaultRateProvider                 — currency-fallback
 *   registerIdentitySlot({ replace: true })  — identity-element
 *   registerInternalProvider({ replace: true }) — self-closure
 *
 * Each of these is wrapped in `requireSafetyMode(['test', 'dev'])`
 * at its call site. The `checkUuidFamilyAttackSurface` invariant
 * walks the source to confirm every documented hatch has the guard.
 *
 * Conservation Law 58 — UUID Self-Protection: the platform's only
 * residual attack surface is the uuid family itself; the framework
 * here is the protection of the protector.
 *
 * @standard ISO/IEC 27001 Annex A.14.2.5 secure-systems-engineering
 * @standard NIST SP 800-160 §3.4.2 trustworthy secure design
 * @standard OWASP ASVS V14 Configuration (hard-coded production mode)
 * @audit Conservation Law 58 uuid-self-protection
 * @feature safety_mode
 */

/** Allowed runtime modes. Production is the strict default. */
export type SafetyMode = 'production' | 'test' | 'dev'

/**
 * Determine the active safety mode. Reads `process.env.ERPAX_SAFETY_MODE`,
 * `NODE_ENV`, and falls back to the strict `'production'` default. The
 * order is deliberate: explicit `ERPAX_SAFETY_MODE` wins; otherwise
 * `NODE_ENV==='test'` ⇒ `'test'`, `NODE_ENV==='development'` ⇒
 * `'dev'`; anything else (including unset) ⇒ `'production'`.
 *
 * The strict default closes a common attack-surface gap where missing
 * env vars accidentally enable test escape hatches in production.
 */
export function getSafetyMode(): SafetyMode {
  const explicit = typeof process !== 'undefined' ? process.env?.ERPAX_SAFETY_MODE : undefined
  if (explicit === 'production' || explicit === 'test' || explicit === 'dev') return explicit
  const node = typeof process !== 'undefined' ? process.env?.NODE_ENV : undefined
  if (node === 'test') return 'test'
  if (node === 'development') return 'dev'
  return 'production'
}

/**
 * Throw when the active mode isn't in the allowed list. Wrap every
 * escape-hatch helper with this at its entry point.
 *
 *   export function provisionTestSigningKey(args) {
 *     requireSafetyMode(['test', 'dev'])
 *     // ... actual implementation
 *   }
 *
 * The error message names the caller via the optional `callerLabel`
 * so production logs make the offending site obvious.
 */
export function requireSafetyMode(
  allowed: ReadonlyArray<SafetyMode>,
  callerLabel?: string,
): void {
  const mode = getSafetyMode()
  if (!allowed.includes(mode)) {
    const label = callerLabel ?? '<unknown>'
    throw new Error(
      `[safety-mode] ${label} requires mode ∈ [${allowed.join(',')}] but active mode is '${mode}'. ` +
      `Set ERPAX_SAFETY_MODE=test|dev for legitimate test contexts; otherwise this is a Conservation Law 58 violation.`,
    )
  }
}

/**
 * The closed enumeration of uuid-family escape hatches. The
 * `checkUuidFamilyAttackSurface` invariant uses this list to
 * verify the guard is present at every documented site.
 *
 * Adding a new hatch is a deliberate widening of the attack surface;
 * the new entry MUST list:
 *   - the function name
 *   - the module path
 *   - the allowed safety modes (NEVER 'production' unless explicitly
 *     justified in the rationale)
 *   - a rationale string explaining why the hatch exists
 */
export interface EscapeHatchEntry {
  readonly fn: string
  readonly module: string
  readonly allowedModes: ReadonlyArray<SafetyMode>
  readonly rationale: string
}

export const UUID_FAMILY_ESCAPE_HATCHES: ReadonlyArray<EscapeHatchEntry> = [
  {
    fn: '__resetIdentitySlotRegistryForTests',
    module: '@/services/identity-element',
    allowedModes: ['test', 'dev'],
    rationale: 'Identity-element registry is module-scope write-once at boot. Tests need to isolate slot state.',
  },
  {
    fn: '__resetInternalProviderRegistryForTests',
    module: '@/services/self-closure',
    allowedModes: ['test', 'dev'],
    rationale: 'Self-closure registry isolation between test cases.',
  },
  {
    fn: 'provisionTestSigningKey',
    module: '@/services/integrity/tenant-key-registry',
    allowedModes: ['test', 'dev'],
    rationale: 'Tests provision in-memory Ed25519 keypairs; production resolves through KV-backed resolver only.',
  },
  {
    fn: 'provisionTestKek',
    module: '@/services/integrity/tenant-key-registry',
    allowedModes: ['test', 'dev'],
    rationale: 'Tests provision in-memory KEKs; production resolves through KMS-backed resolver.',
  },
  {
    fn: 'setDefaultKeyResolver',
    module: '@/services/integrity/tenant-key-registry',
    allowedModes: ['test', 'dev'],
    rationale: 'Tests swap resolver implementations; production wires KV-backed at boot only.',
  },
  {
    fn: 'setDefaultRateProvider',
    module: '@/services/currency-fallback',
    allowedModes: ['test', 'dev'],
    rationale: 'Tests inject deterministic rate providers; production wires the exchange-rates collection provider at boot.',
  },
  {
    fn: 'registerIdentitySlot{replace:true}',
    module: '@/services/identity-element',
    allowedModes: ['test', 'dev'],
    rationale: 'Slot definitions are write-once at boot; replace is for test reconfiguration only.',
  },
  {
    fn: 'registerInternalProvider{replace:true}',
    module: '@/services/self-closure',
    allowedModes: ['test', 'dev'],
    rationale: 'Provider registrations are write-once at boot; replace is for test stubbing only.',
  },
]

/**
 * Attack-surface inventory — returns the current set of escape
 * hatches with their guarded-mode declarations + the active mode.
 * Exposed via the `erpax.security.attackSurface` MCP tool so
 * auditors / agents can query the surface without source-reading.
 */
export interface AttackSurfaceReport {
  readonly mode: SafetyMode
  readonly hatches: ReadonlyArray<EscapeHatchEntry>
  readonly count: number
  readonly hardenedForProduction: boolean
}

export function attackSurfaceReport(): AttackSurfaceReport {
  const mode = getSafetyMode()
  return {
    mode,
    hatches: UUID_FAMILY_ESCAPE_HATCHES,
    count: UUID_FAMILY_ESCAPE_HATCHES.length,
    // In production, no hatch admits 'production' in its allowedModes,
    // so the surface is fully closed. We assert that programmatically
    // so a future PR widening a hatch surfaces as a regression.
    hardenedForProduction: UUID_FAMILY_ESCAPE_HATCHES.every(
      (h) => !h.allowedModes.includes('production'),
    ),
  }
}

/**
 * Assert the active mode satisfies a minimum hardening level.
 * `'production'` is the strictest; `'dev'` and `'test'` are
 * progressively less strict. Used by deployment scripts + the boot
 * sequence to fail fast when env vars accidentally drop production
 * into a less-hardened mode.
 */
export function assertMinimumMode(minimum: SafetyMode): void {
  const mode = getSafetyMode()
  const rank: Record<SafetyMode, number> = { production: 3, test: 2, dev: 1 }
  if (rank[mode] < rank[minimum]) {
    throw new Error(
      `[safety-mode] active mode '${mode}' is less strict than required '${minimum}'`,
    )
  }
}
