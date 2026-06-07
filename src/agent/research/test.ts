/**
 * research (trinity proof) — the pure laws of the R&D society and its idempotent,
 * injectable Payload edges. An agent IS a tenant user (the actor-merge); a finding
 * is content-addressed (same find ⇒ one); only a tenant-admin approver may issue the
 * allow-receipt that lands work, every approval chained tamper-evidently. Proven with
 * a minimal typed PayloadLike — no booting Payload, no `any`. @see ./index.ts
 */
import { describe, it, expect } from 'vitest'
import {
  agentSlug,
  agentEmail,
  researchSociety,
  memberCapability,
  isApprover,
  findingUuid,
  findingToDiscovery,
  approveFinding,
  approveFindings,
  ensureTenant,
  ensureMemberUser,
  registerResearchSociety,
  type Finding,
  type SocietyMember,
  type PayloadLike,
  type PayloadFindArgs,
  type PayloadCreateArgs,
} from '@/agent/research'
import { verifyReceiptChain } from '@/receipt'

const TENANT = 'erpax-research-tenant'
const DOMAIN = 'research.erpax.com'
const TS = '2026-06-07T00:00:00.000Z'

// ── A minimal in-memory PayloadLike — enough to prove the idempotent edges ──────
interface Row {
  readonly id: number
  readonly data: Record<string, unknown>
}
const eqMatch = (where: unknown, field: string, row: Row): boolean => {
  const w = where as { [k: string]: { equals?: unknown } } | undefined
  const want = w?.[field]?.equals
  return want !== undefined && row.data[field] === want
}
class MemoryPayload implements PayloadLike {
  private seq = 0
  readonly store = new Map<string, Row[]>()
  private rows(c: string): Row[] {
    const r = this.store.get(c) ?? []
    if (!this.store.has(c)) this.store.set(c, r)
    return r
  }
  async find(args: PayloadFindArgs): Promise<{ docs: ReadonlyArray<{ id: number }>; totalDocs: number }> {
    const field = args.collection === 'tenants' ? 'domain' : 'email'
    const docs = this.rows(args.collection).filter((row) => eqMatch(args.where, field, row))
    return { docs: docs.map((d) => ({ id: d.id })), totalDocs: docs.length }
  }
  async create(args: PayloadCreateArgs): Promise<{ id: number }> {
    const id = ++this.seq
    this.rows(args.collection).push({ id, data: args.data })
    return { id }
  }
  count(c: string): number {
    return this.rows(c).length
  }
}

describe('research — identity is content-addressed (idempotent registration key)', () => {
  it('slug lower-kebabs and email is deterministic per (name, domain)', () => {
    expect(agentSlug('  Field Researcher!! ')).toBe('field-researcher')
    expect(agentEmail('Field Researcher', DOMAIN)).toBe('field-researcher@research.erpax.com')
  })
})

describe('research — the society roles map through the access cross', () => {
  const { admin, researchers } = researchSociety()
  it('only the steward is an approver: admin capability AND admin seat', () => {
    expect(memberCapability(admin)).toBe('admin')
    expect(isApprover(admin)).toBe(true)
    expect(researchers).toHaveLength(6)
    expect(researchers.every((r) => memberCapability(r) === 'write')).toBe(true)
    expect(researchers.every((r) => !isApprover(r))).toBe(true)
  })
})

describe('research — findings merge by content', () => {
  const f: Finding = { kind: 'mint', atom: 'sparsity', twin: 'FlashMLA', axis: 'compute', evidence: 'e' }
  it('same finding ⇒ same uuid; evidence is NOT part of the merge key', () => {
    expect(findingUuid(f, TENANT)).toBe(findingUuid({ ...f, evidence: 'different' }, TENANT))
    expect(findingUuid(f, TENANT)).not.toBe(findingUuid({ ...f, atom: 'routing' }, TENANT))
  })
  it('a reverse finding broadcasts as a proof discovery keyed on the finding uuid', () => {
    const rev: Finding = { kind: 'reverse', atom: 'justice', twin: '-', axis: 'representation', evidence: 'e' }
    const d = findingToDiscovery(rev, TENANT)
    expect(d.kind).toBe('proof')
    expect(d.target).toBe('justice')
    expect(d.resultUuid).toBe(findingUuid(rev, TENANT))
  })
})

describe('research — only the tenant admin lands work, receipt-audited', () => {
  const { admin, researchers } = researchSociety()
  const finding: Finding = { kind: 'weave', atom: 'merge', twin: '3FS', axis: 'compute', evidence: 'e' }

  it('admin ⇒ allow with land capability; a researcher ⇒ block (still audited)', () => {
    const ok = approveFinding({ admin, finding, tenantId: TENANT, head: null, timestampIso: TS })
    expect(ok.approved).toBe(true)
    expect(ok.decision.outcome).toBe('allow')
    expect(ok.decision.capabilities).toContain('land')

    const researcher = researchers[0] as SocietyMember
    const blocked = approveFinding({ admin: researcher, finding, tenantId: TENANT, head: null, timestampIso: TS })
    expect(blocked.approved).toBe(false)
    expect(blocked.decision.outcome).toBe('block')
    expect(blocked.decision.capabilities).toHaveLength(0)
  })

  it('batch approval chains receipts into a verifiable, tamper-evident ledger', async () => {
    const findings: readonly Finding[] = [
      { kind: 'mint', atom: 'sparsity', twin: 'FlashMLA', axis: 'compute', evidence: 'a' },
      { kind: 'weave', atom: 'routing', twin: 'DeepEP', axis: 'compute', evidence: 'b' },
    ]
    const { approved, receipts, decisions } = approveFindings({ admin, findings, tenantId: TENANT, timestampIso: TS })
    expect(approved).toHaveLength(2)
    expect(receipts.map((r) => r.seq)).toEqual([0, 1])
    expect((await verifyReceiptChain(receipts, decisions)).ok).toBe(true)
    // forge the recorded outcome of a block→... without re-deriving the uuid ⇒ chain breaks
    const forged = decisions.map((d, i) => (i === 1 ? { ...d, outcome: 'block' as const } : d))
    expect((await verifyReceiptChain(receipts, forged)).ok).toBe(false)
  })
})

describe('research — registration: agents become tenant users, idempotently', () => {
  const args = { tenantName: 'erpax R&D', tenantDomain: DOMAIN, tenantSlug: 'erpax-rnd', password: 'convene' }

  it('ensureTenant / ensureMemberUser find-or-create with no duplication', async () => {
    const payload = new MemoryPayload()
    const t1 = await ensureTenant(payload, { name: 'A', domain: DOMAIN, slug: 'a' })
    expect(t1.created).toBe(true)
    const t2 = await ensureTenant(payload, { name: 'A', domain: DOMAIN, slug: 'a' })
    expect(t2.created).toBe(false)
    expect(t2.id).toBe(t1.id)
    expect(payload.count('tenants')).toBe(1)

    const member = researchSociety().admin
    const u1 = await ensureMemberUser(payload, { member, tenantId: t1.id, tenantDomain: DOMAIN, password: 'p' })
    expect(u1.created).toBe(true)
    expect(u1.email).toBe(agentEmail(member.def.name, DOMAIN))
    const u2 = await ensureMemberUser(payload, { member, tenantId: t1.id, tenantDomain: DOMAIN, password: 'p' })
    expect(u2.created).toBe(false)
    expect(u2.id).toBe(u1.id)
    expect(payload.count('users')).toBe(1)
  })

  it('registering the whole society convenes 1 admin + 6 researchers; re-convening is a no-op', async () => {
    const payload = new MemoryPayload()
    const first = await registerResearchSociety(payload, args)
    expect(first.admin.created).toBe(true)
    expect(first.researchers).toHaveLength(6)
    expect(payload.count('users')).toBe(7)
    expect(payload.count('tenants')).toBe(1)

    const second = await registerResearchSociety(payload, args)
    expect(second.admin.created).toBe(false)
    expect(second.researchers.every((r) => !r.created)).toBe(true)
    expect(payload.count('users')).toBe(7)
    expect(payload.count('tenants')).toBe(1)
  })
})
