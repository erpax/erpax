import { describe, it, expect } from 'vitest'
import { permits, brokerCredential, evaluate, type ToolGrant } from '@/sandbox'

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

import { secureEgress as secureEgressFn, type ToolGrant as TG } from '@/sandbox'

describe('secureEgress — the one guarded door for outbound HTTP(S): HTTPS + allowlist + 4-key seal', () => {
  const grant: TG = { toolUuid: 't', capabilities: ['egress'], allowedHosts: ['api.search.example'], credentialHandles: ['search-key'] }
  const base = { actor: 'tool', head: null, timestampIso: '2026-07-25T00:00:00.000Z' }

  it('REFUSES plaintext http (encryption in transit is not optional) — but still seals + receipts the attempt', () => {
    const v = secureEgressFn({ grant, request: { url: 'http://api.search.example/q', method: 'GET', bodyUuid: 'b' }, ...base })
    expect(v.allowed).toBe(false)
    expect(v.reason).toMatch(/HTTPS/)
    expect(v.seal).toMatch(/^[0-9a-f-]{36}$/) // a refused exfiltration is itself sealed + auditable
    expect(v.receipt).toBeTruthy()
  })

  it('BLOCKS a host not on the allowlist (no exfiltration to an unapproved endpoint)', () => {
    const v = secureEgressFn({ grant, request: { url: 'https://evil.exfil.example/steal', method: 'POST', bodyUuid: 'b' }, ...base })
    expect(v.allowed).toBe(false)
    expect(v.reason).toMatch(/not allowlisted/)
  })

  it('ALLOWS https + allowlisted host + granted credential, sealing the exact request cross', () => {
    const req = { url: 'https://api.search.example/q', method: 'GET', bodyUuid: 'body-uuid', credentialHandle: 'search-key' }
    const v = secureEgressFn({ grant, request: req, ...base })
    expect(v.allowed).toBe(true)
    // flip any of the 4 keys → a different seal (the exact request that left is tamper-evident)
    const other = secureEgressFn({ grant, request: { ...req, bodyUuid: 'tampered' }, ...base })
    expect(other.seal).not.toBe(v.seal)
  })

  it('BLOCKS an un-granted credential handle (a leak cannot exceed the grant)', () => {
    const v = secureEgressFn({ grant, request: { url: 'https://api.search.example/q', method: 'GET', bodyUuid: 'b', credentialHandle: 'admin-key' }, ...base })
    expect(v.allowed).toBe(false)
    expect(v.reason).toMatch(/credential/)
  })
})
