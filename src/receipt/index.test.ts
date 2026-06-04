import { describe, it, expect } from 'vitest'
import { issueReceipt, verifyReceiptChain, type Decision } from '@/receipt'

const decision = (over: Partial<Decision> = {}): Decision => ({
  action: 'deploy',
  actor: 'agent-uuid-1',
  outcome: 'allow',
  tier: 'Tier1',
  capabilities: ['read', 'api'],
  ...over,
})
const TS = '2026-06-02T12:00:00.000Z'

describe('receipt — the governance receipt IS a uuid (wire all through uuid)', () => {
  it('the leafUuid is receipt id + chain link + identity + capability, content-addressed', () => {
    const r0 = issueReceipt({ decision: decision(), head: null, timestampIso: TS })
    expect(r0.seq).toBe(0)
    expect(r0.prevLeafUuid).toBe('GENESIS')
    expect(r0.leafUuid).toMatch(/^[0-9a-f]{64}$/)
    // content-addressed ⇒ same decision+prev+ts gives the same receipt (merge: same content ⇒ one)
    expect(issueReceipt({ decision: decision(), head: null, timestampIso: TS }).leafUuid).toBe(r0.leafUuid)
    // capability rides in the content: change the granted caps ⇒ different receipt uuid
    expect(
      issueReceipt({ decision: decision({ capabilities: ['read', 'api', 'execute'] }), head: null, timestampIso: TS }).leafUuid,
    ).not.toBe(r0.leafUuid)
  })

  it('chains: each receipt links to the prev (Merkle — depends on all prior history)', () => {
    const r0 = issueReceipt({ decision: decision({ action: 'read' }), head: null, timestampIso: TS })
    const r1 = issueReceipt({ decision: decision({ action: 'deploy', outcome: 'block' }), head: r0, timestampIso: TS })
    expect(r1.seq).toBe(1)
    expect(r1.prevLeafUuid).toBe(r0.leafUuid)
    expect(r1.leafUuid).not.toBe(r0.leafUuid)
  })

  it('verifies an intact chain; a decision tampered after the fact breaks it (no anchor needed)', async () => {
    const d0 = decision({ action: 'read' })
    const d1 = decision({ action: 'deploy', outcome: 'block' })
    const r0 = issueReceipt({ decision: d0, head: null, timestampIso: TS })
    const r1 = issueReceipt({ decision: d1, head: r0, timestampIso: TS })
    expect((await verifyReceiptChain([r0, r1], [d0, d1])).ok).toBe(true)
    // flip the recorded outcome block→allow without re-deriving the uuid ⇒ verification fails at that seq
    const tampered: Decision = { ...d1, outcome: 'allow' }
    const v = await verifyReceiptChain([r0, r1], [d0, tampered])
    expect(v.ok).toBe(false)
    expect(v.brokenAtSeq).toBe(1)
  })

  it('a broken chain link (wrong prev) is pinpointed structurally', async () => {
    const r0 = issueReceipt({ decision: decision(), head: null, timestampIso: TS })
    const orphan = issueReceipt({ decision: decision({ action: 'x' }), head: { leafUuid: 'deadbeef', seq: 0 }, timestampIso: TS })
    const v = await verifyReceiptChain([r0, orphan])
    expect(v.ok).toBe(false)
    expect(v.brokenAtSeq).toBe(1)
  })
})
