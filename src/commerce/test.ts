import { describe, it, expect } from 'vitest'
import {
  checkout,
  provisionInstance,
  meterUsage,
  checkCommerceLifecycle,
  listSubscriptions,
  type UsageMeter,
} from '@/commerce'

// commerce — Stripe checkout + Cloudflare provisioning + Law-15/16/22 usage
// metering (./index.ts). Asserts the real MCP-contract shapes + the conservation
// law that every paid tenant must also have deployed.
describe('commerce — checkout reserves a tenant + derives the price id', () => {
  it('the stub checkout returns the contract shape with a derived priceId', async () => {
    const sess = await checkout({
      tier: 'team',
      roleProfileId: 'business',
      email: 'a@b.co',
      companyName: 'Acme Corp',
      billingJurisdiction: 'BG',
      returnUrl: 'https://x.test/return',
    })
    // priceId is deterministic: price_<tier>_<jurisdiction>.
    expect(sess.priceId).toBe('price_team_BG')
    // companyName is slugified into the reserved tenant id.
    expect(sess.tenantIdReserved).toContain('t-acme-corp-')
    expect(sess.checkoutUrl).toContain(sess.tenantIdReserved)
    expect(sess.stripeSessionId).toMatch(/^cs_test_/)
  })

  it('routes through the injected Stripe dep when provided', async () => {
    const calls: Array<Record<string, unknown>> = []
    const sess = await checkout(
      {
        tier: 'solo',
        roleProfileId: 'business',
        email: 'a@b.co',
        companyName: 'Z',
        billingJurisdiction: 'US',
        returnUrl: 'https://x.test',
      },
      {
        stripe: {
          checkoutCreate: async (args) => {
            calls.push(args)
            return { id: 'sess_1', url: 'https://stripe.test/c' }
          },
        },
      },
    )
    expect(calls).toHaveLength(1)
    expect(calls[0]!.line_items).toEqual([{ price: 'price_solo_US', quantity: 1 }])
    expect(sess.stripeSessionId).toBe('sess_1')
    expect(sess.checkoutUrl).toBe('https://stripe.test/c')
  })
})

describe('commerce — provisioning requires a Cloudflare binding', () => {
  it('fails closed when no Cloudflare dep is configured', async () => {
    const r = await provisionInstance({
      tenantId: 't-x',
      roleProfileId: 'business',
      genomeBundleUuid: 'g-1',
      region: 'eu',
    })
    expect(r.ok).toBe(false)
    expect(r.failureReason).toContain('Cloudflare')
  })

  it('deploys + boots the clone + registers the subscription (Law 25 holds)', async () => {
    const tenantId = `t-prov-${Date.now()}`
    const r = await provisionInstance(
      { tenantId, roleProfileId: 'business', genomeBundleUuid: 'g-1', region: 'eu' },
      {
        cloudflare: {
          deployWorker: async (req) => ({
            deploymentId: 'd-1',
            mcpEndpoint: `https://${req.tenantId}.erpax.workers.dev/mcp`,
            adminUrl: `https://${req.tenantId}.erpax.workers.dev/admin`,
          }),
        },
        bootClone: async () => ({ cloneDid: 'did:erpax:1', bootedAt: '2026-01-01T00:00:00Z' }),
      },
    )
    expect(r.ok).toBe(true)
    expect(r.cloudflareDeploymentId).toBe('d-1')
    expect(r.cloneDid).toBe('did:erpax:1')
    // the tenant now appears in the registry with its MCP endpoint.
    const sub = listSubscriptions().find((s) => s.tenantId === tenantId)
    expect(sub?.mcpEndpoint).toBe(r.mcpEndpoint)
    // Conservation Law 25 — a deployed tenant has its endpoint, so it is not orphaned.
    expect(checkCommerceLifecycle().orphans).not.toContain(`${tenantId} (paid but no MCP endpoint)`)
  })
})

describe('commerce — usage metering (Law 15/16/22)', () => {
  const meter: UsageMeter = {
    tenantId: 't-x',
    subscriptionItemId: 'si_1',
    periodStart: '2026-01-01T00:00:00Z',
    periodEnd: '2026-02-01T00:00:00Z',
    totalMicroUsd: 1000,
    totalGramsCO2e: 0,
    aiTokensIn: 5,
    aiTokensOut: 7,
  }

  it('no Stripe dep ⇒ a no-op meter (ok, zero events)', async () => {
    const r = await meterUsage(meter)
    expect(r).toEqual({ ok: true, meterEventIds: [] })
  })

  it('emits one event per non-zero metric (zero carbon is skipped)', async () => {
    const events: string[] = []
    const r = await meterUsage(meter, {
      stripe: {
        meterEvent: async (args) => {
          events.push(String(args.event_name))
          return { id: `me_${events.length}` }
        },
      },
    })
    // cost (1000) + ai tokens (12) fire; carbon (0) is skipped.
    expect(events).toEqual(['erpax.cost.microusd', 'erpax.ai.tokens'])
    expect(r.meterEventIds).toHaveLength(2)
  })
})
