/**
 * Trading API Clients — the edge-safe (fetch-only) client layer for the
 * commercial trading-API catalogue in `src/config/trading-apis/index.ts`.
 * The COMMERCIAL sibling of `src/country/api/client/index.ts`: where that file
 * calls the official authorities, this calls the counterparties & intermediaries
 * — payment gateways, marketplaces, shipping carriers, Peppol/EDI access points,
 * banking aggregators, FX feeds.
 *
 * One file per *auth pattern*, not per provider: the catalogue is broad (81
 * entries) but the realised client surface is narrow and ships in a FIRST WAVE —
 * Frankfurter / ExchangeRate-API (FX, no-auth), Open Food Facts (product data,
 * no-auth), Econt / Speedy (carrier tracking, per-tenant credentials). The rest
 * stay catalogue-only by design until a tenant needs them.
 *
 * Every call returns `ApiResult<T>` = `{ ok, data?, error?, source }` (the house
 * envelope mirrored from the country client — `ok`/`err` are module-private
 * there, so they are re-declared here, as the other clients do), so callers
 * branch on success without exception flow; `source` is the provider name for
 * audit attribution.
 *
 * MAXIMUM TAMPER COST — `guardedTradingFetch` wraps every outbound call: the
 * registry endpoint allowlist (fail-closed), the [[sandbox]] gate (`evaluate` →
 * capability + allowlist + credential-handle check) AND a uuid-chained [[receipt]]
 * in the same step, the credential-broker injecting the per-tenant secret by
 * HANDLE only (never held in this file), and a second receipt recording the
 * outcome — so the audit chain verifies end-to-end via `verifyReceiptChain` and
 * forging a call is detectable (zero-entropy surface). Compose, don't bypass:
 * there is no raw `fetch` to a provider outside a guarded call in production.
 *
 * @standard ISO-3166-1:2020 country-codes alpha-2 region dispatch-key
 * @standard ISO-4217:2015 currency-codes fx-feeds
 * @standard RFC-9110 http-semantics REST-client
 * @compliance PSD2 EU-2015/2366 open-banking-aggregators (Berlin Group NextGenPSD2)
 * @compliance EN-16931 Peppol-BIS-3 e-invoicing access-points (AS4)
 * @audit ISO-19011:2018 audit-trail external-system-evidence (the receipt chain)
 * @see @/config/trading-apis        (the catalogue / metadata registry — the allowlist source)
 * @see @/country/api/client         (the official-authority twin)
 * @see @/sandbox                    (permits · brokerCredential · evaluate)
 * @see @/receipt                    (issueReceipt · verifyReceiptChain — the uuid-chained audit)
 * @see @/tenant/remote/secret       (resolveTradingApiCredential — the per-tenant credentials sandbox)
 */

import { evaluate, brokerCredential, type ToolGrant, type ToolAction } from '@/sandbox'
import { issueReceipt, type Decision, type Receipt } from '@/receipt'
import { getTradingApis } from '@/config/trading-apis'

// ─── The shared result envelope (mirrors src/country/api/client/index.ts) ─────

export interface ApiResult<T> {
  readonly ok: boolean
  readonly data?: T
  readonly error?: string
  readonly source: string
}
const ok = <T,>(source: string, data: T): ApiResult<T> => ({ ok: true, data, source })
const err = (source: string, error: string): ApiResult<never> => ({ ok: false, error, source })

// ─── Endpoint allowlist — the registry is the source-of-truth allowlist ───────

/** Normalise a URL to its origin (scheme://host[:port]); null if unparseable (⇒ rejected). */
function originOf(u: string): string | null {
  try {
    return new URL(u).origin
  } catch {
    return null
  }
}

/**
 * The set of sanctioned origins for a provider in a region, derived from the
 * registry (`getTradingApis`). Templated endpoints (`{PREFIX}`/`{shop}`/…) are
 * resolved against the per-tenant `baseUrl` — never a caller-supplied value.
 * Fail-closed: an unknown provider yields an empty set, so nothing is allowlisted.
 */
export function sanctionedOrigins(
  provider: string,
  region: string,
  tenantBaseUrl?: string,
): readonly string[] {
  const origins = new Set<string>()
  for (const a of getTradingApis(region)) {
    if (a.provider !== provider) continue
    for (const url of [a.endpoint, a.sandboxEndpoint]) {
      if (!url) continue
      if (url.includes('{')) {
        const o = tenantBaseUrl ? originOf(tenantBaseUrl) : null
        if (o) origins.add(o)
      } else {
        const o = originOf(url)
        if (o) origins.add(o)
      }
    }
  }
  return [...origins]
}

/**
 * Build the content-addressed [[sandbox]] grant for a provider: `allowedHosts` is
 * SEEDED FROM THE REGISTRY, so the grant's host check and the registry allowlist
 * agree by construction. Callers pass the verbs (`capabilities`) and the
 * credential handles the provider needs.
 */
export function tradingGrantFor(args: {
  provider: string
  region: string
  capabilities?: readonly string[]
  credentialHandles?: readonly string[]
  tenantBaseUrl?: string
}): ToolGrant {
  return {
    toolUuid: `trading:${args.provider}`,
    capabilities: args.capabilities ?? ['api'],
    allowedHosts: sanctionedOrigins(args.provider, args.region, args.tenantBaseUrl),
    credentialHandles: args.credentialHandles ?? [],
  }
}

// ─── guardedTradingFetch — the MAX-tamper-cost wrapper (gate ⊕ receipt) ───────

export interface GuardedResult<T> {
  /** The provider call's `ApiResult` (or a fail-closed `err` if blocked). */
  readonly result: ApiResult<T>
  /** The OUTCOME (tail) receipt — pass as the next call's `head` to chain the audit. */
  readonly receipt: Receipt
  /** Every receipt issued by this call, in seq order (decision then outcome). */
  readonly receipts: readonly Receipt[]
  /** The decisions index-aligned to `receipts` — feed both to `verifyReceiptChain`. */
  readonly decisions: readonly Decision[]
}

/**
 * Gate, perform, and receipt one outbound trading call. Fail-closed at every
 * exit; the credential (if any) is brokered by handle and lives only inside the
 * `perform` boundary — never logged, never written into a `Decision`.
 *
 * The audit is TWO chained leaves (the [[sandbox]] `evaluate` emits the decision
 * leaf before the fetch; `Decision.outcome` has no ok/err member, so the fetch
 * outcome rides a second leaf as `allow`=ok / `escalate`=err). `verifyReceiptChain`
 * re-derives both, so flipping an err→ok or rewriting the host breaks the chain.
 */
export async function guardedTradingFetch<T>(args: {
  provider: string
  region: string
  capability?: string
  endpoint: string
  grant: ToolGrant
  actor: string
  credentialHandle?: string
  resolveSecret?: (handle: string) => string | undefined
  perform: (secret: string | undefined) => Promise<ApiResult<T>>
  head?: Receipt | null
  /** Explicit timestamp for deterministic receipts (tests inject; defaults to now). */
  nowIso?: string
}): Promise<GuardedResult<T>> {
  const ts = args.nowIso ?? new Date().toISOString()
  const head = args.head ?? null
  const source = `trading:${args.provider}`
  const capability = args.capability ?? 'api'
  const host = originOf(args.endpoint) ?? args.endpoint

  // (a) Registry allowlist — explicit, fail-closed, BEFORE the gate. A host the
  //     registry does not sanction for this provider (and that the grant's own
  //     registry-seeded allowlist does not carry) can never reach `perform`.
  const allowlisted =
    sanctionedOrigins(args.provider, args.region).includes(host) || args.grant.allowedHosts.includes(host)
  if (!allowlisted) {
    const decision: Decision = {
      action: `trading.fetch ${capability} ${host}`,
      actor: args.actor,
      outcome: 'block',
      tier: 'trading-allowlist',
      capabilities: args.grant.capabilities,
    }
    const receipt = issueReceipt({ decision, head, timestampIso: ts })
    return {
      result: err(source, `endpoint '${host}' not sanctioned for provider '${args.provider}'`),
      receipt,
      receipts: [receipt],
      decisions: [decision],
    }
  }

  // (b) Capability + allowlist + credential-handle gate, AND its receipt, in one step.
  const action: ToolAction = {
    capability,
    host,
    ...(args.credentialHandle ? { credentialHandle: args.credentialHandle } : {}),
  }
  const evaluation = evaluate({ grant: args.grant, action, actor: args.actor, head, timestampIso: ts })
  const decisionReceipt = evaluation.receipt
  if (!evaluation.allowed) {
    return {
      result: err(source, evaluation.reason ?? 'blocked by policy'),
      receipt: decisionReceipt,
      receipts: [decisionReceipt],
      decisions: [evaluation.decision],
    }
  }

  // (c) Broker the credential by handle (raw secret never leaves the perform scope).
  const secret =
    args.credentialHandle && args.resolveSecret
      ? brokerCredential(args.grant, args.credentialHandle, args.resolveSecret)
      : undefined

  // (d) Perform the real fetch (perform owns error handling → ApiResult; defensive catch keeps fail-closed).
  let result: ApiResult<T>
  try {
    result = await args.perform(secret)
  } catch (e) {
    result = err(source, e instanceof Error ? e.message : String(e))
  }

  // (e) Outcome receipt — chained onto the decision receipt; records ok/err, no secret, no body.
  const outcomeDecision: Decision = {
    action: `trading.fetch.result ${capability} ${host} ${result.ok ? 'ok' : 'err'}`,
    actor: args.actor,
    outcome: result.ok ? 'allow' : 'escalate',
    tier: 'trading',
    capabilities: args.grant.capabilities,
  }
  const outcomeReceipt = issueReceipt({ decision: outcomeDecision, head: decisionReceipt, timestampIso: ts })

  return {
    result,
    receipt: outcomeReceipt,
    receipts: [decisionReceipt, outcomeReceipt],
    decisions: [evaluation.decision, outcomeDecision],
  }
}

// ─── First-wave clients (no-auth) — FX + product data ─────────────────────────

export interface FrankfurterRates {
  readonly base: string
  readonly date: string
  readonly rates: Readonly<Record<string, number>>
}

/**
 * Frankfurter — free, key-less ECB-derived reference rates (IAS-21-grade). `date`
 * (ISO YYYY-MM-DD) is a PATH segment for a historical fixing; omit for the latest.
 * `base` defaults to EUR; `symbols` restricts the returned set (excludes `base`).
 */
export async function fetchFrankfurterRates(
  base: string,
  symbols?: readonly string[],
  date?: string,
): Promise<ApiResult<FrankfurterRates>> {
  const u = new URL(`https://api.frankfurter.dev/v1/${date ?? 'latest'}`)
  u.searchParams.set('base', base.toUpperCase())
  if (symbols?.length) u.searchParams.set('symbols', symbols.map((s) => s.toUpperCase()).join(','))
  try {
    const r = await fetch(u, { headers: { accept: 'application/json' } })
    if (!r.ok) return err('Frankfurter', `HTTP ${r.status}`)
    const j = (await r.json()) as FrankfurterRates
    return ok('Frankfurter', { base: j.base, date: j.date, rates: j.rates })
  } catch (e) {
    return err('Frankfurter', e instanceof Error ? e.message : String(e))
  }
}

export interface ExchangeRates {
  readonly base: string
  readonly rates: Readonly<Record<string, number>>
}

/** ExchangeRate-API open-access (key-less) — latest rates for a base currency. */
export async function fetchExchangeRateApiRates(base: string): Promise<ApiResult<ExchangeRates>> {
  try {
    const r = await fetch(`https://open.er-api.com/v6/latest/${encodeURIComponent(base.toUpperCase())}`)
    if (!r.ok) return err('ExchangeRate-API', `HTTP ${r.status}`)
    const j = (await r.json()) as { result: string; base_code: string; rates: Record<string, number>; 'error-type'?: string }
    if (j.result !== 'success') return err('ExchangeRate-API', j['error-type'] ?? 'error')
    return ok('ExchangeRate-API', { base: j.base_code, rates: j.rates })
  } catch (e) {
    return err('ExchangeRate-API', e instanceof Error ? e.message : String(e))
  }
}

export interface OffProduct {
  readonly code?: string
  readonly product_name?: string
  /** Comma-separated brand string (NOT an array). */
  readonly brands?: string
  readonly quantity?: string
  readonly categories_tags?: readonly string[]
}

/**
 * Open Food Facts — product-by-barcode lookup, no-auth (a descriptive User-Agent
 * is required by policy). A not-found barcode returns HTTP 200 with `status: 0`
 * and no `product`, so success is `status === 1 && product`, not `r.ok`.
 */
export async function lookupOpenFoodFactsProduct(barcode: string): Promise<ApiResult<OffProduct>> {
  const u = new URL(`https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(barcode)}.json`)
  u.searchParams.set('fields', 'code,product_name,brands,quantity,categories_tags')
  try {
    const r = await fetch(u, { headers: { 'user-agent': 'erpax-trading-client/1.0 (compliance@erpax.dev)' } })
    if (!r.ok) return err('Open Food Facts', `HTTP ${r.status}`)
    const j = (await r.json()) as { status: 0 | 1; product?: OffProduct }
    if (j.status !== 1 || !j.product) return err('Open Food Facts', `product not found for barcode '${barcode}'`)
    return ok('Open Food Facts', j.product)
  } catch (e) {
    return err('Open Food Facts', e instanceof Error ? e.message : String(e))
  }
}

// ─── First-wave clients (per-tenant credentials) — BG carriers ────────────────

export interface EcontShipmentStatus {
  readonly shipmentNumber: string
  readonly shortDeliveryStatusEn?: string
  readonly deliveryTime?: string
  readonly expectedDeliveryDate?: string
}

/**
 * Econt — shipment tracking (`Shipments/ShipmentService.getShipmentStatuses`).
 * HTTP Basic auth with a per-tenant username+password (mirrors the country
 * client's `Buffer.from(...).toString('base64')` idiom). Read-only.
 */
export async function trackEcont(args: {
  username: string
  password: string
  shipmentNumbers: readonly string[]
  baseUrl?: string
}): Promise<ApiResult<readonly EcontShipmentStatus[]>> {
  const base = args.baseUrl ?? 'https://ee.econt.com/services'
  const authorization = 'Basic ' + Buffer.from(`${args.username}:${args.password}`).toString('base64')
  try {
    const r = await fetch(`${base}/Shipments/ShipmentService.getShipmentStatuses.json`, {
      method: 'POST',
      headers: { authorization, 'content-type': 'application/json' },
      body: JSON.stringify({ shipmentNumbers: args.shipmentNumbers }),
    })
    if (!r.ok) return err('Econt Express', `HTTP ${r.status}`)
    const j = (await r.json()) as { shipmentStatuses?: Array<{ status?: EcontShipmentStatus }> }
    const statuses = (j.shipmentStatuses ?? [])
      .map((s) => s.status)
      .filter((s): s is EcontShipmentStatus => s != null)
    return ok('Econt Express', statuses)
  } catch (e) {
    return err('Econt Express', e instanceof Error ? e.message : String(e))
  }
}

export interface SpeedyTrackOperation {
  readonly operationCode: string
  readonly dateTime: string
  readonly name?: string
}
export interface SpeedyTrackParcel {
  readonly id: string
  readonly operations: readonly SpeedyTrackOperation[]
}

/**
 * Speedy — parcel tracking (`/track/`). Auth rides in the JSON body (userName +
 * password), not a header — per-tenant credentials. Read-only.
 */
export async function trackSpeedy(args: {
  username: string
  password: string
  parcelIds: readonly string[]
  language?: string
}): Promise<ApiResult<readonly SpeedyTrackParcel[]>> {
  const body = {
    userName: args.username,
    password: args.password,
    language: args.language ?? 'EN',
    parcels: args.parcelIds.map((id) => ({ id })),
    lastOperationOnly: false,
  }
  try {
    const r = await fetch('https://api.speedy.bg/v1/track/', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!r.ok) return err('Speedy', `HTTP ${r.status}`)
    const j = (await r.json()) as { error?: { message?: string }; parcels?: SpeedyTrackParcel[] }
    if (j.error) return err('Speedy', j.error.message ?? 'error')
    return ok('Speedy', j.parcels ?? [])
  } catch (e) {
    return err('Speedy', e instanceof Error ? e.message : String(e))
  }
}
