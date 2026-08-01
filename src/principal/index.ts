/**
 * principal — act as someone, never as no one.
 *
 * Payload's Local API defaults to `overrideAccess: true`, and the corpus uses it at **138 sites**.
 * Every one of them turns the access check OFF. The reason is real: an access function reads
 * `req.user`, and a hook, a seed, a migration or a cron job has no user, so the check would deny
 * everything. But "the check would fail" and "the check should not run" are different claims, and
 * only the first is true.
 *
 * The alternative is a **system principal**: a real, narrowly-scoped identity passed as `req.user`.
 * Then access control still runs — it simply *passes*, because the principal is authorised for what
 * it is doing and for nothing else. Three things change:
 *
 *   ACCOUNTABILITY  "who posted this journal entry" has an answer. Today, in `journal/entry`, the
 *                   answer is `overrideAccess: true` — 7 bypasses inside double-entry posting.
 *   LEAST PRIVILEGE a seed principal cannot delete; a job principal cannot write the ledger. With
 *                   the check off, every bypass has ALL privileges by construction.
 *   BLAST RADIUS    a wrong query under a principal returns nothing. Under a bypass it returns
 *                   every tenant's rows, and nothing distinguishes that from a correct result.
 *
 * **This is the shape, not the migration.** 138 call sites move one subsystem at a time, each
 * verified, with the ledger last — a sweep here would replace a known-permissive default with an
 * unknown-restrictive one across the whole corpus at once, and the failures would be silent reads
 * returning nothing rather than loud errors.
 *
 * @law act as someone. A system operation runs under a scoped principal so the check runs and
 *      passes — never with the check disabled, which grants everything to no one.
 * @invariant every principal declares its subsystem and its roles; there is no all-powerful one
 * @invariant a principal is always tenant-bound — a system op still happens somewhere
 * @invariant `roles` is readonly and never empty — a principal with no capability is not a principal
 * @standard ISO/IEC 27001 A.5.15 — access control: least privilege
 * @standard ISO/IEC 27001 A.8.2 — privileged access rights
 * @see ./SKILL.md -- ../auth -- ../rules/bypass
 */
import { ACCOUNTING_WRITE_ROLES } from '@/roles/registry'
import type { UserRole } from '@/types/auth'

/** The subsystems that legitimately act without a human. Declared — no theorem derives this list. */
export type Subsystem = 'seed' | 'hook' | 'job' | 'migration' | 'import'

/**
 * A system identity, shaped so `getUserContext(req)` reads it exactly as it reads a person:
 * `{ id, tenants: [{ tenant }], roles }`. Nothing about the access path is special-cased — that is
 * the point. A principal that needed its own code path would be a second door.
 */
export interface SystemPrincipal {
  readonly id: string
  readonly subsystem: Subsystem
  readonly tenants: readonly [{ readonly tenant: string }]
  readonly roles: readonly UserRole[]
  /** why this principal exists and what it may not do — read by a human, not by the checker */
  readonly scope: string
}

/**
 * The capability each subsystem gets. DECLARED, deliberately narrow, and argued with here rather
 * than inferred: no theorem says a seed may not delete. A human decided, in the open.
 *
 * `admin` appears nowhere. A subsystem that needs it is a subsystem whose job is wrong.
 */
const CAPABILITY: Readonly<Record<Subsystem, readonly UserRole[]>> = {
  // WRITE. The factory gates create/update on roleScopedAccess('admin', writeRole) where writeRole
  // defaults to 'accountant'. A `user`-only principal is therefore READ-ONLY against every
  // factory-built collection — it would be DENIED, and a denied Local API write throws or returns
  // nothing rather than saying why. The first draft of this map gave every principal `user`, which
  // made all five read-only by accident; the one migrated site survived only because `tags` is not
  // factory-built. That was luck, so the write-capable subsystems carry the write role explicitly.
  seed: ['user', 'accountant'] as readonly UserRole[],
  import: ['user', 'accountant'] as readonly UserRole[],
  migration: ['user', 'accountant'] as readonly UserRole[],
  job: ['user', 'accountant'] as readonly UserRole[],
  // READ-ONLY, and deliberately so. A hook runs INSIDE a write the caller already authorised; it
  // observes and derives. Granting it write capability would let a hook widen the very operation
  // that triggered it, which is the cycle the factory's own access design avoids.
  hook: ['user'] as readonly UserRole[],
}

/**
 * DELETE is unreachable for every principal, and that is enforcement rather than convention.
 *
 * The factory gates delete on `tenantAdmin`. No principal holds `admin` or `super-admin`, so no
 * system operation can delete a tenant's rows — not because the map forbids it, but because the
 * access function will refuse. That is the difference between a policy and a comment.
 */
export const NO_PRINCIPAL_MAY_DELETE = true

/**
 * Which subsystems may WRITE — computed from the capability map against the collections' own write
 * roles, never listed by hand.
 *
 * This exists because the map's read-only entry is enforced *by the access function*, silently: a
 * create issued under a principal without a write role is refused at runtime with a normal
 * permission error, and a caller that does not check the result sees a hook that simply stopped
 * working. `hook` is read-only by design — so calling it for a write is a defect at the CALL SITE,
 * and `assertMayWrite` turns that into a loud, testable refusal before the request is made.
 */
export function canWrite(subsystem: Subsystem): boolean {
  return CAPABILITY[subsystem].some((r) => (ACCOUNTING_WRITE_ROLES as readonly UserRole[]).includes(r))
}

export const WRITING_SUBSYSTEMS: readonly Subsystem[] = (Object.keys(CAPABILITY) as Subsystem[]).filter(canWrite)

export class PrincipalMayNotWrite extends Error {
  constructor(subsystem: Subsystem, operation: string) {
    super(
      `principal: '${subsystem}' may not ${operation} — it holds [${CAPABILITY[subsystem].join(', ')}], and a write ` +
        `needs one of [${ACCOUNTING_WRITE_ROLES.join(', ')}]. The access function would refuse this at runtime; ` +
        `use one of [${WRITING_SUBSYSTEMS.join(', ')}], or do not issue the write.`,
    )
    this.name = 'PrincipalMayNotWrite'
  }
}

/** Refuse a write under a read-only principal HERE, rather than letting the request fail silently. */
export function assertMayWrite(subsystem: Subsystem, operation = 'write'): void {
  if (!canWrite(subsystem)) throw new PrincipalMayNotWrite(subsystem, operation)
}

const SCOPE: Readonly<Record<Subsystem, string>> = {
  seed: 'creates reference data at install; may not delete tenant rows',
  hook: 'extends a write that was already authorised; READ-ONLY, so it cannot widen it',
  job: 'reads and writes its own artefacts on a schedule; no interactive authority',
  migration: 'reshapes structure once, under review; not a runtime path',
  import: 'writes data an authenticated human supplied; inherits their tenant',
}

/**
 * The principal for a subsystem, bound to a tenant.
 *
 * Tenant is REQUIRED. A system operation still happens somewhere, and a principal with no tenant
 * would make `scopedAccess` — which returns `{ tenant: { equals: user.tenant } }` — match nothing
 * or everything depending on how the empty value is coerced. Neither is a policy.
 */
export function asSystem(subsystem: Subsystem, tenant: string): SystemPrincipal {
  const t = tenant.trim()
  if (t.length === 0) {
    throw new Error(
      `principal: a system operation needs a tenant — asSystem('${subsystem}', …) was given none. ` +
        'A tenantless principal is a bypass wearing an identity.',
    )
  }
  return {
    id: `system:${subsystem}`,
    subsystem,
    tenants: [{ tenant: t }],
    roles: CAPABILITY[subsystem],
    scope: SCOPE[subsystem],
  }
}

/** Every declared principal for a tenant — the full privileged surface, enumerable and reviewable. */
export function principals(tenant: string): readonly SystemPrincipal[] {
  return (Object.keys(CAPABILITY) as Subsystem[]).map((s) => asSystem(s, tenant))
}

/**
 * Does this principal hold the role an operation needs?
 *
 * Exists so a caller can fail LOUDLY at the call site rather than discover the answer as an empty
 * result set. A denied read and an empty table are indistinguishable downstream, which is the
 * failure mode that makes this migration delicate.
 */
export function principalMay(p: SystemPrincipal, role: UserRole): boolean {
  return p.roles.includes(role)
}

/* c8 ignore start -- CLI face: `pnpm erpax principal [tenant]` */
if (import.meta.url === `file://${process.argv[1]}`) {
  const tenant = process.argv[2] ?? 'platform'
  console.log(`principals for tenant "${tenant}" — the privileged surface, enumerated:`)
  for (const p of principals(tenant)) {
    console.log(`  ${p.id.padEnd(20)} roles=${p.roles.join(',').padEnd(10)} ${p.scope}`)
  }
}
/* c8 ignore stop */
