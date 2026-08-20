import { describe, it, expect } from 'vitest'
import * as binding from './index'
import * as parent from '../index'

/**
 * This atom held a SECOND, divergent copy of the fail-closed mediator. These tests
 * exist so it cannot grow one again — the only thing worth asserting about a
 * re-export is that it IS the thing it re-exports.
 */

describe('cloudflare/binding — one implementation, not two', () => {
  it('is the SAME function object as the parent, not a copy', () => {
    expect(binding.makeMediator).toBe(parent.makeMediator)
    expect(binding.enforceAuthorized).toBe(parent.enforceAuthorized)
    expect(binding.auditBindingCall).toBe(parent.auditBindingCall)
    expect(binding.reportAuditDrop).toBe(parent.reportAuditDrop)
  })

  it('hands out the FULL mediator surface — the decoy returned two methods', () => {
    // The old local copy returned only { enforceAuthorized, auditBindingCall }: no
    // kvGet, no r2Get, no audit chain. A caller trusting this atom got a tenth of
    // the boundary while believing the SKILL that says all access flows through it.
    const m = binding.makeMediator({ tenantId: 't', env: {} } as never)
    for (const k of ['kvGet', 'kvPut', 'r2Put', 'r2Get', 'auditChainAppend', 'auditChainVerify']) {
      expect(typeof (m as Record<string, unknown>)[k]).toBe('function')
    }
  })
})

describe('cloudflare/binding — the boundary is fail-closed', () => {
  it('DENIES when no authorizer is installed', async () => {
    // The property the duplicate put at risk: no authorizer ⇒ refuse, never proceed.
    await expect(
      binding.enforceAuthorized({ tenantId: 't', env: {} } as never, {
        binding: 'ERPAX_KV' as never,
        action: 'get',
        tenantId: 't',
      }),
    ).rejects.toThrow(/DENIED/)
  })

  it('passes when an authorizer is installed', async () => {
    let seen = false
    await binding.enforceAuthorized(
      { tenantId: 't', env: {}, authorize: async () => { seen = true } } as never,
      { binding: 'ERPAX_KV' as never, action: 'get', tenantId: 't' },
    )
    expect(seen).toBe(true)
  })
})
