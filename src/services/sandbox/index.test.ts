import { describe, it, expect } from 'vitest'
import { permits, brokerCredential, evaluate, type ToolGrant } from './index'

const grant: ToolGrant = {
  toolUuid: 'tool-content-uuid',
  capabilities: ['read', 'api'],
  allowedHosts: ['api.example.com'],
  credentialHandles: ['stripe-key'],
}

describe('sandbox — untrusted tool execution, encoded natively (independent)', () => {
  it('permits: capability, then allowlist, then credential — least privilege', () => {
    expect(permits(grant, { capability: 'read' }).allowed).toBe(true)
    expect(permits(grant, { capability: 'api', host: 'api.example.com', credentialHandle: 'stripe-key' }).allowed).toBe(true)
    expect(permits(grant, { capability: 'execute' })).toEqual({ allowed: false, reason: expect.stringContaining('execute') })
    expect(permits(grant, { capability: 'api', host: 'evil.com' }).allowed).toBe(false) // not allowlisted
    expect(permits(grant, { capability: 'api', credentialHandle: 'aws-key' }).allowed).toBe(false) // not granted
  })

  it('brokerCredential: a secret is injected ONLY for a granted handle; ungranted is never resolved', () => {
    expect(brokerCredential(grant, 'stripe-key', (h) => `secret:${h}`)).toBe('secret:stripe-key')
    let called = false
    const spy = (h: string): string => {
      called = true
      return `secret:${h}`
    }
    expect(brokerCredential(grant, 'aws-key', spy)).toBeUndefined() // ungranted
    expect(called).toBe(false) // resolver not even consulted — no leak beyond the grant
  })

  it('evaluate: decides AND receipts in one step; allow + block both chained', () => {
    const ok = evaluate({ grant, action: { capability: 'read' }, actor: 'agent-1', head: null, timestampIso: '2026-06-02T00:00:00.000Z' })
    expect(ok.allowed).toBe(true)
    expect(ok.decision.outcome).toBe('allow')
    expect(ok.receipt.seq).toBe(0)
    expect(ok.receipt.leafUuid).toMatch(/^[0-9a-f]{64}$/)
    // a blocked action is STILL receipted, chained onto the prior (the audit is complete either way)
    const blocked = evaluate({ grant, action: { capability: 'execute' }, actor: 'agent-1', head: ok.receipt, timestampIso: '2026-06-02T00:00:01.000Z' })
    expect(blocked.allowed).toBe(false)
    expect(blocked.decision.outcome).toBe('block')
    expect(blocked.receipt.seq).toBe(1)
    expect(blocked.receipt.prevLeafUuid).toBe(ok.receipt.leafUuid)
  })
})
