/**
 * Self-referential closure — types.
 *
 * The narrative lives in ./SKILL.md, which already states it — repeating it here is a second
 * source that drifts, and prose in a barrel is prose nobody gated.
 *
 * @standard ISO/IEC 25010:2023 §5.6 reliability — fault tolerance via redundancy
 * @standard ISO 22301 business-continuity (self-hosted continuity tier)
 * @standard ISO 27001 Annex A.17 information-security continuity
 * @standard NIST SP 800-34 Rev. 1 §3.4 contingency planning
 * @standard BCBS 239 §5 IT infrastructure (single-point-of-failure avoidance)
 * @see ../architecture-invariants/checks.ts checkSelfReferentialClosure
 */

import type { Payload } from 'payload'

/**
 * Every external role ERPax integrates with as a *consumer* — and for
 * which ERPax also has (or must have) an internal *provider*.
 *
 * Adding a new external integration to this list is the structural
 * commitment: the moment an ExternalRole appears, the
 * `checkSelfReferentialClosure` invariant requires a matching
 * `InternalProvider` to be registered (Law 53).
 *
 * Roles in the initial set:
 *
 *   - `payment-provider`      Stripe / Adyen / PayPal / Berlin Group
 *                              → internal mirror planned (would settle
 *                                in-platform via `journal-entries`); no
 *                                provider registered yet.
 *   - `signing-tsp`           eIDAS qualified TSP (Adobe Sign, qualified
 *                              certs)
 *                              → ERPax's per-tenant Ed25519 key registry
 *                                (Slice HHHHHHHHH).
 *   - `ai-inference`          Cloudflare Workers AI / OpenAI / Anthropic
 *                              → ERPax's deterministic rules + spec
 *                                templates (no learned model needed for
 *                                most ERP operations).
 *   - `bank-account`          Berlin Group banks (PSD2)
 *                              → ERPax's `bank` role-profile tenant
 *                                (Slice NNNNN) — internal IBANs +
 *                                ledger-as-bank.
 *   - `government-registry`   Peppol / DCAT-AP / VIES / e-invoicing hubs
 *                              → ERPax's `government` role-profile
 *                                tenant (Slice OOOOO).
 *   - `kms`                   Cloudflare KMS / AWS KMS / GCP KMS
 *                              → ERPax's KV-backed per-tenant key
 *                                registry (envelope master keys held
 *                                in CF KV with HKDF derivation).
 *   - `federation-peer`       Remote ERPax instance (federation)
 *                              → Local self — every operation a peer
 *                                can do, this instance can too.
 *   - `search-index`          Algolia / Typesense / Elasticsearch
 *                              → ERPax's D1 full-text + KV inverted
 *                                index per content-uuid.
 *   - `object-storage`        Cloudflare R2 / AWS S3 / Azure Blob
 *                              → ERPax's D1-chunked + KV-pointer
 *                                content-uuid-keyed local store.
 *   - `notification`          Twilio / SendGrid / Vonage / Slack
 *                              → ERPax's in-app `notifications`
 *                                collection (user sees on next login).
 */
export type ExternalRole =
  | 'payment-provider'
  | 'signing-tsp'
  | 'ai-inference'
  | 'bank-account'
  | 'government-registry'
  | 'kms'
  | 'federation-peer'
  | 'search-index'
  | 'object-storage'
  | 'notification'

/**
 * Closed list — keep in sync with the union above. Used by the
 * invariant to iterate every role and check registration coverage.
 */
export const EXTERNAL_ROLES: ReadonlyArray<ExternalRole> = [
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
]

/**
 * Context passed to every internal provider invocation. Tenant-scoped
 * by construction (a fallback for tenant A must NOT affect tenant B).
 */
export interface FallbackContext {
  readonly tenantId: string
  readonly payload: Payload
  readonly userId?: string
  /** Error from the failed external call — providers may log / wrap it. */
  readonly externalError?: unknown
  /** Optional correlation id for audit-trail linkage. */
  readonly correlationId?: string
}

/**
 * An internal implementation of an ExternalRole. Each provider is the
 * canonical "ERPax doing role R itself".
 *
 * The generic `TParams` / `TResult` mirror the external call's input
 * and output shape — so a caller can `withInternalFallback` without
 * branching on which provider executed.
 */
export interface InternalProvider<TParams, TResult> {
  readonly role: ExternalRole
  /** Stable id, e.g. `erpax-self-payment`. Audit rows reference this. */
  readonly id: string
  /** Human description of how this provider satisfies the role. */
  readonly description: string
  /** Citations to the standards this internal mirror upholds. */
  readonly standards: ReadonlyArray<string>
  invoke(params: TParams, ctx: FallbackContext): Promise<TResult>
}

/**
 * The outcome of a `withInternalFallback` call. The `via` field tells
 * the caller (and audit) which path produced the result. Callers can
 * branch on it for UX (`"Settled via ERPax self-provider — external
 * provider was unreachable"`) but the result shape is the same either
 * way.
 */
export interface FallbackOutcome<T> {
  readonly result: T
  readonly via: 'external' | 'internal'
  readonly providerId?: string
  readonly externalError?: string
}
