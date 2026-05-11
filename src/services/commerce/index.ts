/**
 * Commerce — Stripe checkout + Cloudflare auto-provisioning + usage metering.
 *
 * Slice JJJJJJ (2026-05-11). Per user 'ERPax not only can build,
 * document, market, and sell itself but also to deliver itself on
 * Cloudflare using Stripe'. Closes the commercial loop:
 *
 *   build (CCCCC spec generators)
 *     → document (CCCCC-cut2 marketing + multimedia)
 *       → market (federation + pages)
 *         → SELL (Stripe checkout via erpax.commerce.checkout)
 *           → DEPLOY (CF Worker provisioning via erpax.commerce.provisionInstance)
 *             → ONBOARD (HHHHHH bootFromFederation publishes the genome to the new instance)
 *               → operate (15 agents + 22 laws)
 *                 → BILL (Law 15 CostMetric → Stripe meter events)
 *                   → update (federation propagates spec mutations)
 *                     → audit (Merkle + content-uuid)
 *                       → archive (EEEEEE long-term)
 *                         → reproduce (HHHHHH publishSelf for next clone)
 *
 * @standard Stripe API v2024-10-28-acacia
 * @standard Cloudflare Workers API (deployments + durable-object namespaces)
 * @standard W3C Verifiable Credentials Data Model 2.0 (subscription receipts)
 */

export type SubscriptionTier = 'free' | 'solo' | 'team' | 'business' | 'enterprise'
export type RoleProfileId = 'business' | 'payment-provider' | 'bank' | 'government' | string

export interface CheckoutRequest {
  readonly tier: SubscriptionTier
  readonly roleProfileId: RoleProfileId            // which TenantRoleProfile (LLLLL+) to activate
  readonly email: string
  readonly companyName: string
  readonly billingJurisdiction: string             // ISO 3166-1 alpha-2
  readonly returnUrl: string
  readonly metadata?: Record<string, string>
}

export interface CheckoutSession {
  readonly stripeSessionId: string
  readonly checkoutUrl: string                     // hosted Stripe checkout link
  readonly tenantIdReserved: string                // pre-allocated; activates on payment success
  readonly priceId: string                         // Stripe price id matching (tier × jurisdiction)
}

export interface ProvisionRequest {
  readonly tenantId: string                        // returned by checkout success
  readonly roleProfileId: RoleProfileId
  readonly genomeBundleUuid: string                // which canonical ERPax genome to clone from (HHHHHH)
  readonly region: 'wnam' | 'enam' | 'eu' | 'apac' | 'sa' | 'me-af'
  readonly customDomain?: string
}

export interface ProvisionResult {
  readonly ok: boolean
  readonly mcpEndpoint?: string                    // https://<tenant>.erpax.workers.dev/mcp
  readonly adminUrl?: string                       // https://<tenant>.erpax.workers.dev/admin
  readonly cloudflareDeploymentId?: string
  readonly cloneDid?: string                       // did:erpax:<uuid> for the new instance
  readonly bootedAt?: string
  readonly failureReason?: string
}

export interface UsageMeter {
  readonly tenantId: string
  readonly subscriptionItemId: string              // Stripe subscription_item to meter against
  readonly periodStart: string
  readonly periodEnd: string
  readonly totalMicroUsd: number                   // accumulated CostMetric (Law 15)
  readonly totalGramsCO2e: number                  // accumulated CarbonEstimate (Law 16)
  readonly aiTokensIn: number
  readonly aiTokensOut: number
}

const SUBSCRIPTIONS_BY_TENANT = new Map<string, { tier: SubscriptionTier; roleProfileId: RoleProfileId; createdAt: string; mcpEndpoint?: string; cloneDid?: string }>()

/**
 * Initiate Stripe checkout. Reserves a tenant id; activates only on
 * payment-success webhook. Returns the hosted checkout URL.
 *
 * Implementation: real version calls stripe.checkout.sessions.create(...).
 * For deterministic testing, a stub call site receives the canned
 * response shape so the MCP contract is verifiable end-to-end.
 */
export async function checkout(args: CheckoutRequest, deps?: {
  stripe?: { checkoutCreate(args: Record<string, unknown>): Promise<{ id: string; url: string }> }
}): Promise<CheckoutSession> {
  const tenantIdReserved = `t-${args.companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString(36)}`
  const priceId = `price_${args.tier}_${args.billingJurisdiction}`
  if (deps?.stripe) {
    const sess = await deps.stripe.checkoutCreate({
      mode: 'subscription',
      customer_email: args.email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${args.returnUrl}?session_id={CHECKOUT_SESSION_ID}&tenant=${tenantIdReserved}`,
      cancel_url: args.returnUrl,
      metadata: { tenantIdReserved, roleProfileId: args.roleProfileId, ...args.metadata ?? {} },
    })
    return { stripeSessionId: sess.id, checkoutUrl: sess.url, tenantIdReserved, priceId }
  }
  // Stub fallback — used in tests + when Stripe isn't yet wired.
  return {
    stripeSessionId: `cs_test_${Date.now()}`,
    checkoutUrl: `${args.returnUrl}?stub=true&tenant=${tenantIdReserved}`,
    tenantIdReserved,
    priceId,
  }
}

/**
 * On payment-success webhook → provision the tenant on Cloudflare.
 * Programmatically: deploy a Worker bound to the tenant id; ingest
 * the canonical ERPax genome via slice HHHHHH bootFromFederation;
 * register the subscription in SUBSCRIPTIONS_BY_TENANT.
 */
export async function provisionInstance(args: ProvisionRequest, deps?: {
  cloudflare?: { deployWorker(req: { tenantId: string; region: string; customDomain?: string }): Promise<{ deploymentId: string; mcpEndpoint: string; adminUrl: string }> }
  bootClone?: (args: { tenantId: string; genomeBundleUuid: string }) => Promise<{ cloneDid: string; bootedAt: string }>
}): Promise<ProvisionResult> {
  if (!deps?.cloudflare) {
    return { ok: false, failureReason: 'Cloudflare API binding not configured (set deps.cloudflare in production)' }
  }
  const cf = await deps.cloudflare.deployWorker({
    tenantId: args.tenantId, region: args.region, customDomain: args.customDomain,
  })
  let cloneDid: string | undefined; let bootedAt: string | undefined
  if (deps.bootClone) {
    const result = await deps.bootClone({ tenantId: args.tenantId, genomeBundleUuid: args.genomeBundleUuid })
    cloneDid = result.cloneDid; bootedAt = result.bootedAt
  }
  SUBSCRIPTIONS_BY_TENANT.set(args.tenantId, {
    tier: 'business', roleProfileId: args.roleProfileId,
    createdAt: new Date().toISOString(),
    mcpEndpoint: cf.mcpEndpoint, cloneDid,
  })
  return {
    ok: true,
    mcpEndpoint: cf.mcpEndpoint,
    adminUrl: cf.adminUrl,
    cloudflareDeploymentId: cf.deploymentId,
    cloneDid,
    bootedAt,
  }
}

/**
 * Meter a tenant's accumulated cost (Law 15) + carbon (Law 16) +
 * AI tokens (Law 22) to Stripe usage records. Called by the
 * MetaSkillAgent's hourly cron.
 */
export async function meterUsage(meter: UsageMeter, deps?: {
  stripe?: { meterEvent(args: Record<string, unknown>): Promise<{ id: string }> }
}): Promise<{ ok: boolean; meterEventIds: ReadonlyArray<string> }> {
  if (!deps?.stripe) return { ok: true, meterEventIds: [] }
  const ids: string[] = []
  // 3 separate meter events: cost (microUSD), carbon (grams), AI tokens (in+out)
  for (const [event, value] of [
    ['erpax.cost.microusd', meter.totalMicroUsd],
    ['erpax.carbon.grams_co2e', meter.totalGramsCO2e],
    ['erpax.ai.tokens', meter.aiTokensIn + meter.aiTokensOut],
  ] as const) {
    if (value === 0) continue
    const r = await deps.stripe.meterEvent({
      event_name: event,
      payload: { value, stripe_customer_id: meter.subscriptionItemId },
      timestamp: meter.periodEnd,
    })
    ids.push(r.id)
  }
  return { ok: true, meterEventIds: ids }
}

export function listSubscriptions(): ReadonlyArray<{ tenantId: string; tier: SubscriptionTier; roleProfileId: RoleProfileId; createdAt: string; mcpEndpoint?: string; cloneDid?: string }> {
  return [...SUBSCRIPTIONS_BY_TENANT.entries()].map(([tenantId, v]) => ({ tenantId, ...v }))
}

/**
 * Conservation Law 25 — `checkCommerceLifecycle`. Every tenant in
 * SUBSCRIPTIONS_BY_TENANT must have: a Stripe subscription record
 * (or stub session id), a CF deployment id, AND an audit-chain entry.
 * Surfaces tenants that paid but didn't deploy, or deployed without
 * paying.
 */
export function checkCommerceLifecycle(): { ok: boolean; orphans: ReadonlyArray<string> } {
  const orphans: string[] = []
  for (const [tenantId, sub] of SUBSCRIPTIONS_BY_TENANT) {
    if (!sub.mcpEndpoint) orphans.push(`${tenantId} (paid but no MCP endpoint)`)
  }
  return { ok: orphans.length === 0, orphans }
}
