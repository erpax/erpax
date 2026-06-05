/**
 * agent/research — the R&D society: register the agent society as tenant USERS
 * with assigned ROLES, coordinate findings over the chat bus, and gate every
 * finding behind TENANT-ADMIN approval (receipt-audited, tamper-evident).
 *
 * The actor-merge law made operational: an agent IS a user (no separate table).
 * To "register an agent" is to ensure a `users` row under a tenant (found by its
 * `domain`), its global role mapped to a capability by the access cross (the
 * angelic hierarchy — sphere 1 admin … sphere 3 read), its per-tenant seat
 * admin|viewer enforced by the multi-tenant plugin. Coordination is the existing
 * chat bus: a finding is a content-addressed `Discovery`, so the same find by two
 * agents merges to one. Approval is the `tenantAdmin` gate turned into a receipt:
 * only an admin member may issue the allow-`Receipt` that lets a finding LAND, and
 * the receipt chains into the uuid-linked audit (forging an approval ⇒ rewriting
 * every downstream leaf).
 *
 * Pure core (society, identity, finding→discovery, approval decision) + thin
 * Payload-bound edges (ensure tenant / ensure user), injectable so the whole flow
 * is unit-testable without booting Payload.
 *
 * @standard RFC 9562 §5.8 content-addressed identity (agent uuid, finding uuid)
 * @see ../service (agent identity) · ../../cross (role→capability) · ../../receipt (audit)
 */
import { agentUuid, type AgentDef } from '@/agent/service'
import { type Discovery, type DiscoveryKind } from '@/agent/sync/discovery'
import { ANGELIC_HIERARCHY, capabilityOfRole } from '@/cross'
import { computeContentUuid } from '@/integrity/content-uuid'
import { issueReceipt, type Decision, type Receipt } from '@/receipt'
import type { UserRole } from '@/types/auth'
import type { AccessRole } from '@/uuid/share'

// ─── identity: an agent-user's handle is content-addressed to (name, domain) ─────

/** Lower-kebab a name into the local part of an email / a stable handle. */
export const agentSlug = (name: string): string =>
  name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/** The agent-user's login email — deterministic per (name, tenant domain), so re-registration is idempotent. */
export const agentEmail = (name: string, tenantDomain: string): string =>
  `${agentSlug(name)}@${tenantDomain}`

// ─── the society: members are agents assigned a role (capability via the cross) ──

export interface SocietyMember {
  readonly def: AgentDef
  /** global app role → capability via the access cross. */
  readonly globalRole: UserRole
  /** per-tenant seat enforced by @payloadcms/plugin-multi-tenant. */
  readonly tenantRole: 'admin' | 'viewer'
  /** the angelic choir this member occupies (sphere 1 admin … sphere 3 read). */
  readonly choir: string
}

/** The capability a member holds = its global role mapped through the access cross. */
export const memberCapability = (m: SocietyMember): AccessRole => capabilityOfRole(m.globalRole)

/** A member may approve iff it holds admin capability AND a per-tenant admin seat. */
export const isApprover = (m: SocietyMember): boolean =>
  memberCapability(m) === 'admin' && m.tenantRole === 'admin'

/** The choir occupying a (capability, sphere) cell of the angelic hierarchy. */
const choirOf = (capability: AccessRole, sphere: 1 | 2 | 3): string =>
  ANGELIC_HIERARCHY.find((c) => c.capability === capability && c.sphere === sphere)?.choir ??
  ANGELIC_HIERARCHY.find((c) => c.capability === capability)?.choir ??
  'angels'

/** A research specialist: a sphere-3 messenger (write capability, viewer seat). */
const researcher = (name: string, purpose: string, skills: readonly string[]): SocietyMember => ({
  def: { name, purpose, skills: [...skills] },
  globalRole: 'user',
  tenantRole: 'viewer',
  choir: choirOf('write', 3),
})

/**
 * The deepseek↔erpax R&D society: one tenant-admin Steward (sphere-1, approves) and the
 * six research specialists (sphere-3 messengers). Each member is content-addressed by its
 * AgentDef, so the same society defined twice yields the same agent uuids (the merge law).
 */
export function researchSociety(): { admin: SocietyMember; researchers: readonly SocietyMember[] } {
  const admin: SocietyMember = {
    def: {
      name: 'Research Steward',
      purpose: 'approve or reject the society findings before they land',
      skills: ['governance', 'decide', 'proof', 'access'],
    },
    globalRole: 'admin',
    tenantRole: 'admin',
    choir: choirOf('admin', 1),
  }
  const researchers: readonly SocietyMember[] = [
    researcher('Kernel Researcher', 'verify the DeepSeek kernel/infra twins (FlashMLA, DeepEP, DualPipe, 3FS)', ['sparsity', 'routing', 'flow', 'merge']),
    researcher('Model Researcher', 'map under-mapped DeepSeek model repos (Janus, OCR, Math, DreamCraft3D)', ['sparsity', 'holographic', 'identity', 'collapse']),
    researcher('Field Researcher', 'place the compute-efficiency field (quantization, distillation, KV-cache)', ['sparsity', 'cache', 'sampling', 'zeropoint']),
    researcher('Reverse Researcher', 'map the erpax surplus a compute-org lacks (justice, accounting, entry)', ['entry', 'governance', 'justice', 'accounting']),
    researcher('Engram Researcher', 'deepen the memory/representation axis (Engram, lookup, recompute)', ['akashic', 'memories', 'holographic', 'merge']),
    researcher('Structure Researcher', 'the separate-to-specialize and collapse-to-merge dial', ['collapse', 'merge', 'partition', 'fractal']),
  ]
  return { admin, researchers }
}

// ─── findings: a research result is a content-addressed Discovery on the chat bus ─

/** The research taxonomy: a new-atom mint, a strengthened existing twin (weave), or erpax surplus (reverse). */
export type FindingKind = 'mint' | 'weave' | 'reverse'

/** Map a research finding onto a chat-bus DiscoveryKind (reverse surplus broadcasts as 'proof'). */
const DISCOVERY_KIND: Readonly<Record<FindingKind, DiscoveryKind>> = {
  mint: 'mint',
  weave: 'weave',
  reverse: 'proof',
}

export interface Finding {
  readonly kind: FindingKind
  /** the one-word target atom. */
  readonly atom: string
  /** the DeepSeek body it twins ('-' for a reverse/surplus finding). */
  readonly twin: string
  readonly axis: 'compute' | 'representation' | 'both'
  readonly evidence: string
}

/** The finding's content-uuid — the merge key (same finding by two agents ⇒ one row). */
export const findingUuid = (f: Finding, tenantId: string): string =>
  computeContentUuid({ kind: f.kind, atom: f.atom, twin: f.twin, axis: f.axis }, tenantId)

/** Project a finding onto a `Discovery` — the payload an agent broadcasts to the chat room. */
export const findingToDiscovery = (f: Finding, tenantId: string): Discovery => ({
  kind: DISCOVERY_KIND[f.kind],
  target: f.atom,
  resultUuid: findingUuid(f, tenantId),
})

// ─── approval: the tenant-admin gate, as a receipt in the uuid-linked audit chain ─

export interface ApprovalInput {
  readonly admin: SocietyMember
  readonly finding: Finding
  readonly tenantId: string
  readonly head: { leafUuid: string; seq: number } | null
  readonly timestampIso: string
}

export interface ApprovalResult {
  readonly approved: boolean
  readonly receipt: Receipt
  readonly decision: Decision
}

/**
 * Tenant-admin approval of one finding — pure and deterministic given an explicit timestamp.
 * Only an approver (admin capability + admin seat) yields outcome 'allow'; any other member
 * yields 'block'. Either way a receipt is chained (allow AND block are audited), so the trail
 * is tamper-evident: forging an approval means rewriting every later leaf.
 */
export function approveFinding(input: ApprovalInput): ApprovalResult {
  const allowed = isApprover(input.admin)
  const decision: Decision = {
    action: `approve:${input.finding.kind}:${input.finding.atom}`,
    actor: agentUuid(input.admin.def, input.tenantId),
    outcome: allowed ? 'allow' : 'block',
    tier: input.admin.tenantRole,
    capabilities: allowed ? ['approve', 'land'] : [],
  }
  const receipt = issueReceipt({ decision, head: input.head, timestampIso: input.timestampIso })
  return { approved: allowed, receipt, decision }
}

/**
 * Approve a batch of findings in sequence, chaining each receipt onto the previous head — the
 * society's approval ledger. Returns the approved findings (those that may LAND) plus the full
 * receipt + decision chains (verifiable end-to-end with `verifyReceiptChain`).
 */
export function approveFindings(args: {
  admin: SocietyMember
  findings: readonly Finding[]
  tenantId: string
  timestampIso: string
  head?: { leafUuid: string; seq: number } | null
}): { approved: readonly Finding[]; receipts: readonly Receipt[]; decisions: readonly Decision[] } {
  let head: { leafUuid: string; seq: number } | null = args.head ?? null
  const receipts: Receipt[] = []
  const decisions: Decision[] = []
  const approved: Finding[] = []
  for (const finding of args.findings) {
    const r = approveFinding({
      admin: args.admin,
      finding,
      tenantId: args.tenantId,
      head,
      timestampIso: args.timestampIso,
    })
    receipts.push(r.receipt)
    decisions.push(r.decision)
    if (r.approved) approved.push(finding)
    head = { leafUuid: r.receipt.leafUuid, seq: r.receipt.seq }
  }
  return { approved, receipts, decisions }
}

// ─── payload-bound edges: idempotent registration (injectable PayloadLike) ───────

export interface PayloadFindArgs {
  collection: string
  where?: unknown
  limit?: number
  depth?: number
  overrideAccess?: boolean
}
export interface PayloadCreateArgs {
  collection: string
  data: Record<string, unknown>
  overrideAccess?: boolean
}
/** The slice of the Payload Local API this module needs — the real `payload` satisfies it. */
export interface PayloadLike {
  find(args: PayloadFindArgs): Promise<{ docs: ReadonlyArray<{ id: string | number }>; totalDocs: number }>
  create(args: PayloadCreateArgs): Promise<{ id: string | number }>
}

/** Ensure a tenant exists for a domain — find by `domain`, else create. Idempotent. */
export async function ensureTenant(
  payload: PayloadLike,
  args: { name: string; domain: string; slug: string },
): Promise<{ id: string | number; created: boolean }> {
  const found = await payload.find({
    collection: 'tenants',
    where: { domain: { equals: args.domain } },
    limit: 1,
    overrideAccess: true,
  })
  const existing = found.docs[0]
  if (found.totalDocs > 0 && existing) return { id: existing.id, created: false }
  const created = await payload.create({
    collection: 'tenants',
    data: { name: args.name, domain: args.domain, slug: args.slug },
    overrideAccess: true,
  })
  return { id: created.id, created: true }
}

/**
 * Ensure a member is registered as a tenant USER — find by email, else create with the member's
 * global role and a per-tenant seat. Idempotent: the email is content-addressed to (name, domain),
 * so a second call finds the existing row rather than duplicating it.
 */
export async function ensureMemberUser(
  payload: PayloadLike,
  args: { member: SocietyMember; tenantId: string | number; tenantDomain: string; password: string },
): Promise<{ id: string | number; email: string; created: boolean }> {
  const email = agentEmail(args.member.def.name, args.tenantDomain)
  const found = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
    overrideAccess: true,
  })
  const existing = found.docs[0]
  if (found.totalDocs > 0 && existing) return { id: existing.id, email, created: false }
  const created = await payload.create({
    collection: 'users',
    data: {
      email,
      password: args.password,
      name: args.member.def.name,
      roles: [args.member.globalRole],
      tenants: [{ tenant: args.tenantId, roles: [args.member.tenantRole] }],
    },
    overrideAccess: true,
  })
  return { id: created.id, email, created: true }
}

export interface RegisteredMember {
  readonly member: SocietyMember
  readonly id: string | number
  readonly email: string
  readonly created: boolean
}

/**
 * Register the whole R&D society under a tenant (by domain): ensure the tenant, then ensure
 * every member (admin + researchers) as a tenant user with its assigned role. Re-running is a
 * no-op (all idempotent) — the registration is the society convening, not multiplying.
 */
export async function registerResearchSociety(
  payload: PayloadLike,
  args: { tenantName: string; tenantDomain: string; tenantSlug: string; password: string },
): Promise<{ tenantId: string | number; admin: RegisteredMember; researchers: readonly RegisteredMember[] }> {
  const tenant = await ensureTenant(payload, { name: args.tenantName, domain: args.tenantDomain, slug: args.tenantSlug })
  const { admin, researchers } = researchSociety()
  const reg = async (member: SocietyMember): Promise<RegisteredMember> => {
    const u = await ensureMemberUser(payload, {
      member,
      tenantId: tenant.id,
      tenantDomain: args.tenantDomain,
      password: args.password,
    })
    return { member, ...u }
  }
  const adminReg = await reg(admin)
  const researcherRegs: RegisteredMember[] = []
  for (const r of researchers) researcherRegs.push(await reg(r))
  return { tenantId: tenant.id, admin: adminReg, researchers: researcherRegs }
}
