/**
 * research — the R&D society proved green by construction: agents register as tenant
 * users with cross-assigned roles, findings are content-addressed (merge), and ONLY the
 * tenant admin can land work — every approval (allow AND block) chained into a tamper-
 * evident receipt audit. @see ./index.ts
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
  registerResearchSociety,
  type Finding,
} from '@/agent/research'
import { createMemoryPayload } from './memory'
import { verifyReceiptChain } from '@/receipt'

const TENANT = 'erpax-research-tenant'
const DOMAIN = 'research.erpax.com'
const TS = '2026-06-05T00:00:00.000Z'

describe('identity — content-addressed agent handles', () => {
  it('slug + email are deterministic (idempotent registration key)', () => {
    expect(agentSlug('Kernel Researcher')).toBe('kernel-researcher')
    expect(agentEmail('Kernel Researcher', DOMAIN)).toBe('kernel-researcher@research.erpax.com')
  })
})

describe('society — roles assigned through the access cross', () => {
  const { admin, researchers } = researchSociety()

  it('is one admin steward + six research specialists', () => {
    expect(researchers).toHaveLength(6)
  })

  it('the admin holds admin capability + admin seat ⇒ an approver (sphere-1 choir)', () => {
    expect(memberCapability(admin)).toBe('admin')
    expect(isApprover(admin)).toBe(true)
    expect(admin.choir).toBe('seraphim')
  })

  it('researchers hold write capability + viewer seat ⇒ NOT approvers', () => {
    for (const r of researchers) {
      expect(memberCapability(r)).toBe('write')
      expect(isApprover(r)).toBe(false)
      expect(r.choir).toBe('principalities')
    }
  })
})

describe('findings — content-addressed (the merge law)', () => {
  const f: Finding = { kind: 'weave', atom: 'routing', twin: 'DeepEP', axis: 'compute', evidence: 'x' }

  it('same finding ⇒ same uuid; any change ⇒ a different uuid', () => {
    expect(findingUuid(f, TENANT)).toBe(findingUuid({ ...f }, TENANT))
    expect(findingUuid(f, TENANT)).not.toBe(findingUuid({ ...f, atom: 'merge' }, TENANT))
  })

  it('projects onto a Discovery whose resultUuid is the merge key', () => {
    const d = findingToDiscovery(f, TENANT)
    expect(d.target).toBe('routing')
    expect(d.resultUuid).toBe(findingUuid(f, TENANT))
  })
})

describe('approval — only the tenant admin lands work, receipt-audited', () => {
  const { admin, researchers } = researchSociety()
  const f: Finding = { kind: 'weave', atom: 'sparsity', twin: 'Engram', axis: 'representation', evidence: 'x' }

  it('admin approval ⇒ allow, genesis receipt (seq 0)', () => {
    const r = approveFinding({ admin, finding: f, tenantId: TENANT, head: null, timestampIso: TS })
    expect(r.approved).toBe(true)
    expect(r.decision.outcome).toBe('allow')
    expect(r.decision.capabilities).toContain('land')
    expect(r.receipt.seq).toBe(0)
  })

  it('a researcher cannot approve ⇒ block (still audited)', () => {
    const r = approveFinding({ admin: researchers[0]!, finding: f, tenantId: TENANT, head: null, timestampIso: TS })
    expect(r.approved).toBe(false)
    expect(r.decision.outcome).toBe('block')
    expect(r.decision.capabilities).toHaveLength(0)
  })

  it('batch approval chains receipts; the chain verifies; only approved findings land', async () => {
    const findings: Finding[] = [
      { kind: 'weave', atom: 'routing', twin: 'DeepEP', axis: 'compute', evidence: 'a' },
      { kind: 'weave', atom: 'train', twin: 'ESFT', axis: 'compute', evidence: 'b' },
      { kind: 'reverse', atom: 'justice', twin: '-', axis: 'representation', evidence: 'c' },
    ]
    const { approved, receipts, decisions } = approveFindings({
      admin,
      findings,
      tenantId: TENANT,
      timestampIso: TS,
    })
    expect(approved).toHaveLength(3)
    expect(receipts.map((r) => r.seq)).toEqual([0, 1, 2])
    const verdict = await verifyReceiptChain(receipts, decisions)
    expect(verdict.ok).toBe(true)
    expect(verdict.chainLength).toBe(3)
  })

  it('a tampered approval receipt breaks the chain (tamper-evident)', async () => {
    const findings: Finding[] = [
      { kind: 'weave', atom: 'routing', twin: 'DeepEP', axis: 'compute', evidence: 'a' },
      { kind: 'weave', atom: 'merge', twin: '3FS', axis: 'representation', evidence: 'b' },
    ]
    const { receipts, decisions } = approveFindings({ admin, findings, tenantId: TENANT, timestampIso: TS })
    const tampered = [receipts[0]!, { ...receipts[1]!, payloadUuid: 'forged-payload-uuid' }]
    const verdict = await verifyReceiptChain(tampered, decisions)
    expect(verdict.ok).toBe(false)
  })
})

describe('registration — agents become tenant users, idempotently', () => {
  const args = { tenantName: 'erpax R&D', tenantDomain: DOMAIN, tenantSlug: 'erpax-rnd', password: 'convene' }

  it('convening registers 1 admin + 6 researchers under one tenant; re-convening creates nothing', async () => {
    const payload = createMemoryPayload()

    const first = await registerResearchSociety(payload, args)
    expect(first.admin.created).toBe(true)
    expect(first.researchers).toHaveLength(6)
    expect(first.researchers.every((r) => r.created)).toBe(true)

    const users = payload.dump().users ?? []
    expect(users).toHaveLength(7)
    const steward = users.find((u) => u.name === 'Research Steward')
    expect(steward?.roles).toEqual(['admin'])
    expect((steward?.tenants as Array<{ roles: string[] }> | undefined)?.[0]?.roles).toEqual(['admin'])

    const second = await registerResearchSociety(payload, args)
    expect(second.admin.created).toBe(false)
    expect(second.researchers.every((r) => !r.created)).toBe(true)
    expect(payload.dump().users).toHaveLength(7)
    expect(payload.dump().tenants).toHaveLength(1)
  })
})
