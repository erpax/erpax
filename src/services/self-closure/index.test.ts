/**
 * withInternalFallback — framework round-trip tests.
 *
 * Slice JJJJJJJJJ-cut1 (2026-05-11). Pins the Conservation Law 53
 * contract:
 *
 *   1. When the external call succeeds, the result flows through and
 *      the internal provider is NOT invoked.
 *   2. When the external call fails, the registered internal provider
 *      executes and the result is tagged `via: 'internal'`.
 *   3. When no internal provider is registered for the role, the
 *      external error re-throws (caller-visible). The invariant
 *      catches this missing-coverage case at boot.
 *   4. The provider receives the failed external error in its
 *      `FallbackContext.externalError` slot — so internal-mode logging
 *      can include why we fell back.
 *
 * Uses a stub provider so the test doesn't depend on external
 * collection state — the framework round-trip is what's pinned here.
 *
 * @standard ISO/IEC 25010:2023 §5.6.2 fault tolerance
 * @audit Conservation Law 53 self-referential-closure
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  withInternalFallback,
  registerInternalProvider,
  getInternalProvider,
  listRegisteredRoles,
  __resetInternalProviderRegistryForTests,
  EXTERNAL_ROLES,
} from './index'
import type { InternalProvider, FallbackContext } from './types'

interface StubParams { amount: number }
interface StubResult { paymentId: string; amount: number; via: string }

function makeStubProvider(opts: { id?: string; output?: StubResult } = {}): InternalProvider<StubParams, StubResult> {
  return {
    role: 'payment-provider',
    id: opts.id ?? 'erpax-test-payment',
    description: 'Test stub — settles internally with a deterministic id.',
    standards: ['ISO/IEC-25010:2023'],
    invoke: vi.fn(async (params: StubParams): Promise<StubResult> =>
      opts.output ?? { paymentId: `stub-${params.amount}`, amount: params.amount, via: 'stub' },
    ),
  }
}

function fakeCtx(): FallbackContext {
  return {
    tenantId: 'test-tenant',
    payload: {
      // Stub payload.create so the audit row write inside
      // withInternalFallback doesn't throw.
      create: vi.fn(async () => ({ id: 'audit-1' })),
    } as never,
  }
}

describe('withInternalFallback', () => {
  beforeEach(() => {
    __resetInternalProviderRegistryForTests()
  })

  it('returns the external result when external succeeds (no internal call)', async () => {
    const provider = makeStubProvider()
    registerInternalProvider(provider)
    const ctx = fakeCtx()
    const external = vi.fn(async (): Promise<StubResult> => ({
      paymentId: 'ext-001', amount: 100, via: 'external',
    }))
    const out = await withInternalFallback({
      role: 'payment-provider', params: { amount: 100 }, ctx, external,
    })
    expect(out.via).toBe('external')
    expect(out.result.paymentId).toBe('ext-001')
    expect(external).toHaveBeenCalledTimes(1)
    expect(provider.invoke).not.toHaveBeenCalled()
  })

  it('falls back to the internal provider when external throws', async () => {
    const provider = makeStubProvider()
    registerInternalProvider(provider)
    const ctx = fakeCtx()
    const external = vi.fn(async (): Promise<StubResult> => {
      throw new Error('external unreachable')
    })
    const out = await withInternalFallback({
      role: 'payment-provider', params: { amount: 250 }, ctx, external,
    })
    expect(out.via).toBe('internal')
    expect(out.providerId).toBe('erpax-test-payment')
    expect(out.externalError).toMatch(/external unreachable/)
    expect(out.result.paymentId).toBe('stub-250')
    expect(provider.invoke).toHaveBeenCalledTimes(1)
  })

  it('passes the external error into the internal provider via FallbackContext.externalError', async () => {
    const provider = makeStubProvider()
    registerInternalProvider(provider)
    const ctx = fakeCtx()
    const externalErr = new Error('rate-limited')
    await withInternalFallback({
      role: 'payment-provider', params: { amount: 50 }, ctx,
      external: async (): Promise<Record<string, unknown>> => { throw externalErr },
    })
    expect(provider.invoke).toHaveBeenCalledWith(
      { amount: 50 },
      expect.objectContaining({ externalError: externalErr }),
    )
  })

  it('re-throws the external error when no provider is registered', async () => {
    // No registration this test — registry is empty per beforeEach.
    const ctx = fakeCtx()
    await expect(
      withInternalFallback({
        role: 'payment-provider', params: { amount: 1 } as StubParams, ctx,
        external: async (): Promise<Record<string, unknown>> => { throw new Error('boom') },
      }),
    ).rejects.toThrow(/boom/)
  })

  it('best-effort audits the fallback (does not block on payload.create failure)', async () => {
    const provider = makeStubProvider()
    registerInternalProvider(provider)
    const ctx: FallbackContext = {
      tenantId: 't',
      payload: { create: vi.fn(async () => { throw new Error('d1-offline') }) } as never,
    }
    const out = await withInternalFallback({
      role: 'payment-provider', params: { amount: 9 }, ctx,
      external: async (): Promise<Record<string, unknown>> => { throw new Error('ext-down') },
    })
    // The user-facing result still comes back successfully.
    expect(out.via).toBe('internal')
    expect(out.result.paymentId).toBe('stub-9')
  })
})

describe('registerInternalProvider', () => {
  beforeEach(() => {
    __resetInternalProviderRegistryForTests()
  })

  it('throws on duplicate registration unless replace:true is passed', () => {
    registerInternalProvider(makeStubProvider({ id: 'first' }))
    expect(() => registerInternalProvider(makeStubProvider({ id: 'second' }))).toThrow(
      /already registered for role 'payment-provider'/,
    )
    // With replace:true the registration succeeds and overrides.
    registerInternalProvider(makeStubProvider({ id: 'second' }), { replace: true })
    expect(getInternalProvider('payment-provider')?.id).toBe('second')
  })

  it('listRegisteredRoles reflects what has been registered', () => {
    expect(listRegisteredRoles()).toHaveLength(0)
    registerInternalProvider(makeStubProvider())
    expect(listRegisteredRoles()).toEqual(['payment-provider'])
  })
})

describe('EXTERNAL_ROLES — the closed set Law 53 enforces', () => {
  it('includes the 10 roles documented for Cut 1', () => {
    expect(EXTERNAL_ROLES).toEqual([
      'payment-provider',
      'signing-tsp',
      'ai-inference',
      'bank-account',
      'government-registry',
      'kms',
      'federation-peer',
      'search-index',
      'object-storage',
      'notification',
    ])
  })
})

describe('providers barrel — the shipped providers register their roles', () => {
  it('registering each shipped provider directly populates the expected role set', async () => {
    __resetInternalProviderRegistryForTests()
    // We register explicitly here rather than relying on the barrel's
    // module-load side effect (which Vitest caches across a single
    // run — `vi.resetModules()` is too invasive for an isolated test).
    const { InternalSigningProvider } = await import('./providers/signing')
    const { InternalFederationProvider } = await import('./providers/federation')
    const { InternalNotificationProvider } = await import('./providers/notification')
    const { InternalSearchProvider } = await import('./providers/search')
    for (const p of [
      InternalSigningProvider,
      InternalFederationProvider,
      InternalNotificationProvider,
      InternalSearchProvider,
    ] as const) {
      registerInternalProvider(p as never, { replace: true })
    }
    const registered = new Set(listRegisteredRoles())
    expect(registered.has('signing-tsp')).toBe(true)
    expect(registered.has('federation-peer')).toBe(true)
    expect(registered.has('notification')).toBe(true)
    expect(registered.has('search-index')).toBe(true)
    // payment-provider's internal mirror was removed (wallets settlement
    // unmodelled); the rest stay unregistered until later cuts.
    expect(registered.has('payment-provider')).toBe(false)
    expect(registered.has('ai-inference')).toBe(false)
    expect(registered.has('bank-account')).toBe(false)
    expect(registered.has('government-registry')).toBe(false)
    expect(registered.has('kms')).toBe(false)
    expect(registered.has('object-storage')).toBe(false)
  })
})

describe('InternalFederationProvider — self-as-peer', () => {
  it('returns peerHasRow=true with peerId=\'self\' and a retry hint', async () => {
    __resetInternalProviderRegistryForTests()
    const { InternalFederationProvider } = await import('./providers/federation')
    // Re-register for this isolated test (module-level register already
    // ran but resetForTests cleared it).
    registerInternalProvider(InternalFederationProvider, { replace: true })
    const ctx = fakeCtx()
    const out = await withInternalFallback({
      role: 'federation-peer',
      params: { peerUrl: 'https://peer-b.erpax.example/v1/federation', contentUuid: '00000000-0000-5000-8000-feed' },
      ctx,
      external: async (): Promise<Record<string, unknown>> => { throw new Error('peer unreachable: ECONNREFUSED') },
    })
    expect(out.via).toBe('internal')
    expect(out.providerId).toBe('erpax-self-federation')
    expect(out.result.peerHasRow).toBe(true)
    expect(out.result.peerId).toBe('self')
    expect(out.result.retryPeerWhenReachable).toBe(true)
  })
})

describe('InternalSigningProvider — AdES via per-tenant key', () => {
  it('throws cleanly when no injectedSigningKey is supplied (until key registry lands)', async () => {
    __resetInternalProviderRegistryForTests()
    const { InternalSigningProvider } = await import('./providers/signing')
    registerInternalProvider(InternalSigningProvider, { replace: true })
    const ctx = fakeCtx()
    await expect(
      withInternalFallback({
        role: 'signing-tsp',
        params: { uuid: '00000000-0000-5000-8000-aaaa', kid: 'tenant-1/signing/2026' },
        ctx,
        external: async (): Promise<Record<string, unknown>> => { throw new Error('qtsp-unreachable') },
      }),
    ).rejects.toThrow(/no key material for kid='tenant-1\/signing\/2026'/)
  })

  it('produces an AdES-flagged SignedUuid when injectedSigningKey is supplied', async () => {
    __resetInternalProviderRegistryForTests()
    const { InternalSigningProvider } = await import('./providers/signing')
    registerInternalProvider(InternalSigningProvider, { replace: true })
    const pair = await globalThis.crypto.subtle.generateKey(
      { name: 'Ed25519' }, true, ['sign', 'verify'],
    ) as CryptoKeyPair
    const ctx = fakeCtx()
    const out = await withInternalFallback({
      role: 'signing-tsp',
      params: {
        uuid: '00000000-0000-5000-8000-bbbb',
        kid: 'tenant-1/signing/2026',
        injectedSigningKey: pair.privateKey,
      },
      ctx,
      external: async (): Promise<Record<string, unknown>> => { throw new Error('qtsp-unreachable') },
    })
    expect(out.via).toBe('internal')
    expect(out.result.assurance).toBe('AdES')
    expect(out.result.producedBy).toBe('erpax-self')
    expect(out.result.alg).toBe('EdDSA')
    expect(out.result.uuid).toBe('00000000-0000-5000-8000-bbbb')
    expect((out.result.sig as string).length).toBeGreaterThan(0)
  })
})
