/**
 * cross — the agnostic "who can do what" access factory (the 3·6·9 governing axis).
 *
 * Capabilities attach to ROLES, not users (Christianity's celestial hierarchy → the
 * angelic choirs). A user (agent) inherits capability through role membership; merging
 * roles merges their reach (lattice max); the operation's required role is satisfied iff
 * the union of the actor's role capabilities reaches it. The SAME factory binds every
 * collection/global — it collapses the hand-written `role × collection` matrix
 * (roleBasedAccess / tenantScopedRead / isSuperAdmin …) to one rule.
 *
 * Decision rides the uuid-share `AccessRole` lattice `read < write < sign < admin`
 * (audit ⊥) — Conservation Law 59. The per-resource content-uuid cross (a `checkShare`
 * on the role-uuid against the resource's content-uuid, with its forge ≫ verify
 * tamper-cost) layers on top of this baseline tier; see the `access` skill.
 *
 * @standard NIST INCITS-359 role-based-access-control
 * @standard ISO 27002 §5.15 access-control + §5.3 segregation-of-duties
 * @see .claude/skills/access/SKILL.md  (the law + the math)
 * @see src/services/uuid-share          (grants, rolesCompatible, the lattice)
 */
import type { Access, PayloadRequest } from 'payload'

import { rolesCompatible, type AccessRole } from '@/uuid/share'
import type { UserRole } from '@/types/auth'

import { getUser } from '@/auth'

export type CrudOp = 'create' | 'read' | 'update' | 'delete'

/** Operation ⇒ the minimum AccessRole that authorises it on the lattice. */
export const roleForOperation = (op: CrudOp): AccessRole =>
  op === 'read' ? 'read' : op === 'delete' ? 'admin' : 'write'

// ─── The main roles — the angelic hierarchy (the math) ───────────────
//
// 9 choirs in 3 spheres = a trinity of trinities (3² = 9) on the rodin 3·6·9 axis
// over the 1·2·4·8·7·5 flow helix. Sphere ⇒ capability: 1 governs all (admin),
// 2 regulates/seals (sign), 3 are the messengers into the flow (write; the base
// Angels read). audit (0, the Source) is orthogonal — observation only.

export type Sphere = 1 | 2 | 3

export interface Choir {
  readonly sphere: Sphere
  readonly choir: string
  /** Position on the rodin axis (3·6·9) the sphere governs from. */
  readonly rodin: 3 | 6 | 9
  readonly capability: AccessRole
}

export const ANGELIC_HIERARCHY: readonly Choir[] = [
  { sphere: 1, choir: 'seraphim', rodin: 9, capability: 'admin' },
  { sphere: 1, choir: 'cherubim', rodin: 9, capability: 'admin' },
  { sphere: 1, choir: 'thrones', rodin: 9, capability: 'admin' },
  { sphere: 2, choir: 'dominions', rodin: 6, capability: 'sign' },
  { sphere: 2, choir: 'virtues', rodin: 6, capability: 'sign' },
  { sphere: 2, choir: 'powers', rodin: 6, capability: 'sign' },
  { sphere: 3, choir: 'principalities', rodin: 3, capability: 'write' },
  { sphere: 3, choir: 'archangels', rodin: 3, capability: 'write' },
  { sphere: 3, choir: 'angels', rodin: 3, capability: 'read' },
] as const

/** The governing axis and the flow helix — both digital-root to 9 (the set is closed). */
export const AXIS = [3, 6, 9] as const
export const HELIX = [1, 2, 4, 8, 7, 5] as const
/** Digital root (mod-9, folded to 1..9) — the rodin arithmetic. Canonical: `@/horo` (one source). */
export { digitalRoot } from '@/horo'

// ─── Capability merge (merging roles merges their reach) ─────────────

/**
 * The union capability of a set of role capabilities = the lattice MAX (audit ⊥:
 * an audit-only set stays audit; any concrete role outranks it). Null = no roles.
 */
export const mergeCapabilities = (caps: readonly AccessRole[]): AccessRole | null => {
  const concrete = caps.filter((c) => c !== 'audit')
  if (concrete.length === 0) return caps.includes('audit') ? 'audit' : null
  // rolesCompatible(hi, c) === true ⇔ hi ≥ c on the lattice ⇒ keep the higher.
  return concrete.reduce((hi, c) => (rolesCompatible(hi, c) ? hi : c))
}

/** Pure decision: does the union of the actor's role capabilities satisfy the op? */
export const decideCross = (op: CrudOp, capabilities: readonly AccessRole[]): boolean => {
  const merged = mergeCapabilities(capabilities)
  return merged === null ? false : rolesCompatible(merged, roleForOperation(op))
}

// ─── Role → capability resolution ────────────────────────────────────

/**
 * Every role seeded onto its angelic choir → capability (the main roles).
 *
 * Sphere 1 (Seraphim·Cherubim·Thrones) → admin · Sphere 2 (Dominions·Virtues·Powers) → sign ·
 * Sphere 3 messengers (Principalities·Archangels) → write · Sphere 3 base (Angels) → read.
 * (audit ⊥ is a separate observation grant on the audit trail, not a CRUD baseline — auditors
 * READ the data and append to the chain.)
 *
 * Typed as a TOTAL `Record<UserRole, …>` so `tsc` FAILS if a new role is left unassigned —
 * the gate enforces "every role has a choir". A re-org is one edit here, not N user edits.
 */
export const DEFAULT_ROLE_CAPABILITY: Readonly<Record<UserRole, AccessRole>> = {
  // Sphere 1 — admin (faces the Source; governs all)
  'super-admin': 'admin',
  admin: 'admin',
  // Sphere 2 — sign (officers; SOX §302 certifications, seal / escalate)
  director: 'sign',
  'compliance-officer': 'sign',
  // Sphere 3 messengers — write (act in the flow within scope)
  manager: 'write',
  finance: 'write',
  hr: 'write',
  'payroll-officer': 'write',
  accountant: 'write',
  user: 'write',
  // Sphere 3 base Angels — read (observe the flow; no write)
  viewer: 'read',
  customer: 'read',
  auditor: 'read',
  'audit-staff': 'read',
}

export const capabilityOfRole = (
  role: UserRole,
  table: Readonly<Partial<Record<string, AccessRole>>> = DEFAULT_ROLE_CAPABILITY,
): AccessRole => table[role as string] ?? 'read'

// ─── The agnostic Payload Access factory ─────────────────────────────

/** Capability the request's actor holds = the merge over their role memberships. */
export const actorCapability = (
  req: PayloadRequest,
  table?: Readonly<Partial<Record<string, AccessRole>>>,
): AccessRole | null => {
  const user = getUser(req)
  if (!user) return null
  const roles = (user.roles ?? []) as UserRole[]
  return mergeCapabilities(roles.map((r) => capabilityOfRole(r, table)))
}

/**
 * crossAccess — one operation's Access function, the SAME for every collection/global.
 * Authorises iff the actor's merged role capability reaches the operation's role.
 */
export const crossAccess = (
  op: CrudOp,
  table?: Readonly<Partial<Record<string, AccessRole>>>,
): Access => ({ req }) => {
  const cap = actorCapability(req, table)
  return cap === null ? false : rolesCompatible(cap, roleForOperation(op))
}

/** The full create/read/update/delete set — for the agnostic config-level injection. */
export const crossAccessSet = (
  table?: Readonly<Partial<Record<string, AccessRole>>>,
): Record<CrudOp, Access> => ({
  create: crossAccess('create', table),
  read: crossAccess('read', table),
  update: crossAccess('update', table),
  delete: crossAccess('delete', table),
})

// ─── Harmonized resolution — the Role ENTITY's capability ⊕ the seed ──
//
// "Role holds the role skills": the `capability` stored on the Roles collection is the runtime
// truth; the angelic seed (DEFAULT_ROLE_CAPABILITY) is the computed default the math provides.
// They reconcile here — entity wins, seed defaults, `read` is the floor — so editing a Role row
// re-tunes access with no code change, and an unseeded role still resolves. Harmony, not conflict.

/** entity capability ?? computed angelic seed ?? `read` (base Angel). */
export const resolveRoleCapability = (
  roleName: string,
  entityCapability?: AccessRole | null,
): AccessRole => entityCapability ?? DEFAULT_ROLE_CAPABILITY[roleName as UserRole] ?? 'read'

/**
 * The actor's capability resolved from the live Role ENTITIES they hold (global-scoped),
 * each harmonized with the seed, then merged (lattice max). Null = no user / no roles.
 */
export const actorCapabilityResolved = async (req: PayloadRequest): Promise<AccessRole | null> => {
  const user = getUser(req)
  if (!user) return null
  const names = (user.roles ?? []) as UserRole[]
  if (names.length === 0) return null
  const res = (await req.payload.find({
    collection: 'roles',
    depth: 0,
    limit: 100,
    overrideAccess: true,
    req,
    where: { and: [{ name: { in: names } }, { binding: { equals: 'global' } }] },
  })) as unknown as { docs: Array<{ name: string; capability?: AccessRole | null }> }
  const byName = new Map(res.docs.map((d) => [d.name, d.capability ?? null]))
  return mergeCapabilities(names.map((n) => resolveRoleCapability(n, byName.get(n) ?? null)))
}

/**
 * crossAccess that resolves capability from the live Role entities (async) — the dynamic twin of
 * `crossAccess` (which uses the seed synchronously). Same lattice decision, runtime-tunable.
 */
export const crossAccessResolved =
  (op: CrudOp): Access =>
  async ({ req }) => {
    const cap = await actorCapabilityResolved(req)
    return cap === null ? false : rolesCompatible(cap, roleForOperation(op))
  }
