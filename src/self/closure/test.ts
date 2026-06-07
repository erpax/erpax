import { describe, it, expect } from 'vitest'
import type { Payload } from 'payload'
import {
  registerInternalProvider,
  getInternalProvider,
  listRegisteredRoles,
  withInternalFallback,
  EXTERNAL_ROLES,
  type InternalProvider,
  type FallbackContext,
  type ExternalRole,
} from '@/self/closure'

// closure — everything falls back to erpax itself (Conservation Law 53).
// withInternalFallback tries the external call; on failure it routes to the
// registered internal provider and (best-effort) audits. The REGISTRY is
// write-once unless { replace: true } (gated to test/dev safety mode — vitest
// sets NODE_ENV=test). We assert the actual registry + fallback semantics.

// A payload stub whose create() never throws — auditFallback is best-effort and
// must not affect the user-facing result. We type it as Payload via unknown.
const stubPayload = (): Payload =>
  ({ create: async () => ({}) } as unknown as Payload)

const ctx = (): FallbackContext => ({ tenantId: 'tenant-x', payload: stubPayload() })

// Unique role per test where possible — but ExternalRole is a closed union, so we
// use { replace: true } to keep registrations isolated between cases.
const makeProvider = (
  role: ExternalRole,
  id: string,
  invoke: InternalProvider<unknown, string>['invoke'],
): InternalProvider<unknown, string> => ({
  role,
  id,
  description: `test provider ${id}`,
  standards: [],
  invoke,
})

describe('self/closure — self-referential closure (Law 53)', () => {
  it('EXTERNAL_ROLES enumerates the closed role union (no duplicates)', () => {
    expect(EXTERNAL_ROLES).toContain('payment-provider')
    expect(EXTERNAL_ROLES).toContain('notification')
    expect(new Set(EXTERNAL_ROLES).size).toBe(EXTERNAL_ROLES.length)
  })

  it('registerInternalProvider then getInternalProvider round-trips', () => {
    const p = makeProvider('search-index', 'erpax-self-search', async () => 'internal-search')
    registerInternalProvider(p, { replace: true })
    expect(getInternalProvider('search-index')).toBe(p)
    expect(listRegisteredRoles()).toContain('search-index')
  })

  it('re-registering the same role without replace throws (write-once)', () => {
    const role: ExternalRole = 'object-storage'
    registerInternalProvider(makeProvider(role, 'first', async () => 'a'), { replace: true })
    expect(() =>
      registerInternalProvider(makeProvider(role, 'second', async () => 'b')),
    ).toThrow(/already registered/)
    // replace: true is admitted under test safety mode
    expect(() =>
      registerInternalProvider(makeProvider(role, 'third', async () => 'c'), { replace: true }),
    ).not.toThrow()
    expect(getInternalProvider<unknown, string>(role)?.id).toBe('third')
  })

  it('getInternalProvider returns undefined for a role with no provider', () => {
    // kms is not registered by these tests (the live providers barrel is not imported here)
    expect(getInternalProvider('kms')).toBeUndefined()
  })

  it('withInternalFallback returns the external result when external succeeds', async () => {
    const outcome = await withInternalFallback<unknown, string>({
      role: 'notification',
      params: {},
      ctx: ctx(),
      external: async () => 'external-ok',
    })
    expect(outcome.via).toBe('external')
    expect(outcome.result).toBe('external-ok')
    expect(outcome.providerId).toBeUndefined()
  })

  it('withInternalFallback routes to the internal provider when external fails', async () => {
    registerInternalProvider(
      makeProvider('federation-peer', 'erpax-self-federation', async () => 'internal-result'),
      { replace: true },
    )
    const outcome = await withInternalFallback<unknown, string>({
      role: 'federation-peer',
      params: {},
      ctx: ctx(),
      external: async () => {
        throw new Error('external down')
      },
    })
    expect(outcome.via).toBe('internal')
    expect(outcome.result).toBe('internal-result')
    expect(outcome.providerId).toBe('erpax-self-federation')
    expect(outcome.externalError).toBe('external down')
  })

  it('withInternalFallback re-throws when external fails and NO provider is registered', async () => {
    await expect(
      withInternalFallback<unknown, string>({
        role: 'kms', // no provider registered in this suite
        params: {},
        ctx: ctx(),
        external: async () => {
          throw new Error('boom')
        },
      }),
    ).rejects.toThrow('boom')
  })

  it('the internal provider receives the params and the externalError in its ctx', async () => {
    let seenParams: unknown
    let seenError: unknown
    registerInternalProvider(
      makeProvider('signing-tsp', 'erpax-self-signing', async (params, fctx) => {
        seenParams = params
        seenError = fctx.externalError
        return 'signed'
      }),
      { replace: true },
    )
    const original = new Error('tsp unreachable')
    await withInternalFallback<unknown, string>({
      role: 'signing-tsp',
      params: { doc: 'x' },
      ctx: ctx(),
      external: async () => {
        throw original
      },
    })
    expect(seenParams).toEqual({ doc: 'x' })
    expect(seenError).toBe(original)
  })
})
