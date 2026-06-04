/**
 * Counter DO mediator — the realtime power accumulator. Each client heartbeat
 * (PR-3) increments a race-free per-(tenant,feature,period) Durable Object counter;
 * the accumulated usage IS the entropy that drives services/power. Copies the
 * auditChainAppend shape (tenant+purpose-scoped name, authorize, audit, graceful
 * when unbound). Asserts ONLY the new exports. @see ./index.ts
 */
import { describe, it, expect } from 'vitest'
import {
  counterIncrement,
  counterGet,
  makeMediator,
  type MediatorContext,
  type ErpaxCfEnv,
  type DurableObjectNamespace,
} from '@/cloudflare'

interface DoRec {
  name?: string
  url?: string
  body?: string
}
function fakeDo(rec: DoRec, returns: string): DurableObjectNamespace {
  return {
    idFromName(name: string) {
      rec.name = name
      return { toString: () => name }
    },
    get() {
      return {
        async fetch(req: Request) {
          rec.url = req.url
          if (req.method === 'POST') rec.body = await req.text()
          return { ok: true, status: 200, text: async () => returns } as unknown as Response
        },
      }
    },
  }
}
const ctxWith = (env: ErpaxCfEnv, authorize?: MediatorContext['authorize']): MediatorContext => ({
  env,
  tenantId: 'acme',
  authorize,
})

describe('cloudflare: counter DO mediator (the realtime power accumulator)', () => {
  it('returns 0 gracefully when no counter DO is bound', async () => {
    const ctx = ctxWith({})
    expect(await counterIncrement(ctx, 'feature/invoices')).toBe(0)
    expect(await counterGet(ctx, 'feature/invoices')).toBe(0)
  })

  it('increments via the unified ERPAX_DO, tenant+purpose-scoping the instance name', async () => {
    const rec: DoRec = {}
    const value = await counterIncrement(ctxWith({ ERPAX_DO: fakeDo(rec, '42') }), 'feature/invoices', 3)
    expect(value).toBe(42) // the DO's new count
    expect(rec.name).toBe('counter:t:acme/feature/invoices') // purpose + tenant scoping
    expect(rec.url).toBe('https://do/counter/incr')
    expect(rec.body).toBe('3')
  })

  it('reads the current count via counterGet', async () => {
    const rec: DoRec = {}
    expect(await counterGet(ctxWith({ ERPAX_DO: fakeDo(rec, '7') }), 'feature/invoices')).toBe(7)
    expect(rec.url).toBe('https://do/counter/get')
  })

  it('falls back to the legacy TENANT_QUOTA binding with the unprefixed name', async () => {
    const rec: DoRec = {}
    expect(await counterIncrement(ctxWith({ TENANT_QUOTA: fakeDo(rec, '5') }), 'feature/x')).toBe(5)
    expect(rec.name).toBe('t:acme/feature/x') // legacy: no 'counter:' prefix
  })

  it('consults the authorizer before touching the binding (RBAC)', async () => {
    const ctx = ctxWith({ ERPAX_DO: fakeDo({}, '1') }, () => {
      throw new Error('denied')
    })
    await expect(counterIncrement(ctx, 'feature/x')).rejects.toThrow('denied')
  })

  it('makeMediator surfaces counterIncrement + counterGet', async () => {
    const m = makeMediator(ctxWith({ ERPAX_DO: fakeDo({}, '9') }))
    expect(await m.counterIncrement('feature/x')).toBe(9)
    expect(await m.counterGet('feature/x')).toBe(9)
  })
})
