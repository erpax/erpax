import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { assertDurableObjectsExported, durableObjectExportGaps } from './index'
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

describe('cloudflare/binding — a Durable Object binds only as a named export of the worker entry', () => {
  it('every declared class IS exported today — the whole point of the gate is that this can change', () => {
    expect(durableObjectExportGaps(process.cwd())).toEqual([])
    expect(() => assertDurableObjectsExported(process.cwd())).not.toThrow()
  })

  // Planted, because a zero is only worth reading once the check is known to fire. Removing
  // AuditChain from worker.ts's export list produced exactly this, and the deploy would still have
  // succeeded — the binding exists, and only the call fails, at runtime, in production.
  it('fires when a class is dropped from the entry, naming the binding that would fail', () => {
    const root = mkdtempSync(join(tmpdir(), 'erpax-do-'))
    try {
      mkdirSync(join(root, 'src', 'ai'), { recursive: true })
      writeFileSync(join(root, 'wrangler.jsonc'), JSON.stringify({
        main: 'worker.ts',
        durable_objects: { bindings: [{ name: 'AUDIT_CHAIN_DO', class_name: 'AuditChain' }] },
      }))
      writeFileSync(join(root, 'src', 'ai', 'durable-objects.ts'), 'export class AuditChain {}\n')
      writeFileSync(join(root, 'worker.ts'), 'export const fetch = 1\n')
      const gaps = durableObjectExportGaps(root)
      expect(gaps).toHaveLength(1)
      expect(gaps[0]!.className).toBe('AuditChain')
      expect(gaps[0]!.reason).toMatch(/not a named export/)
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  // A phantom re-export: the entry NAMES the class, and the target does not declare it. Counting
  // that as present is how a name reads as bound while nothing binds it ([[rules]]/face).
  it('refuses a re-export whose target declares no such class', () => {
    const root = mkdtempSync(join(tmpdir(), 'erpax-do-'))
    try {
      mkdirSync(join(root, 'src', 'ai'), { recursive: true })
      writeFileSync(join(root, 'wrangler.jsonc'), JSON.stringify({
        main: 'worker.ts',
        durable_objects: { bindings: [{ name: 'AUDIT_CHAIN_DO', class_name: 'AuditChain' }] },
      }))
      writeFileSync(join(root, 'src', 'ai', 'durable-objects.ts'), 'export const somethingElse = 1\n')
      writeFileSync(join(root, 'worker.ts'), "export { AuditChain } from '@/ai/durable-objects'\n")
      const gaps = durableObjectExportGaps(root)
      expect(gaps).toHaveLength(1)
      expect(gaps[0]!.reason).toMatch(/declares no such class/)
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })
})
