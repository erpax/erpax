/**
 * Currency primitives expressed as uuid primitives.
 *
 * Slice LLLLLLLLL-cut4 (2026-05-11). Per user 'blank currency
 * computational algorythms are the same as the core uuid principles'.
 *
 * The unification: every operation in the currency-fallback layer
 * maps one-to-one to an operation in the
 * uuid family (Slices RRRRR / GGGGGGG / TTTTT / UUUUU / TTTTTTTT /
 * KKKKKKKKK). They are not parallel subsystems — they are the same
 * subsystem applied to monetary entities.
 *
 *   uuid family principle           ←→  currency analog
 *   ──────────────────────────────────────────────────────────────
 *   Content-addressable identity    ←→  Currency code IS the identity.
 *                                       XXX, EUR, BTC are uuid-equivalent
 *                                       handles for currency entities.
 *
 *   Type branding (Law 47)          ←→  `ContentUuid<Currency<'EUR'>>` —
 *                                       a EUR uuid cannot be silently
 *                                       used where a JPY uuid is expected.
 *
 *   Tamper-evidence (Law 8 / TTT)   ←→  Wallet { currency, balance } has
 *                                       a contentUuid; mutating either
 *                                       changes the uuid; tamper
 *                                       detected by recomputation.
 *
 *   Convergence (Law 9 / TTTTT)     ←→  Same currency → same code →
 *                                       global identity. Two tenants
 *                                       holding XXX wallets reference
 *                                       the same currency. Cross-tenant
 *                                       dedup is free.
 *
 *   Reference harmony (Law 10)      ←→  Wallet's currency ref resolves
 *                                       iff currency in registry; XXX
 *                                       always resolves.
 *
 *   Federation by uuid (Slice AAAA) ←→  Peers reconcile rate quotes by
 *                                       provenanceUuid. Same (from, to,
 *                                       asOf) → same quote uuid →
 *                                       byte-equal rate across peers.
 *
 *   Replay (Slice UUUUUU)           ←→  RateQuoteUuid + ExchangeUuid
 *                                       are sufficient to replay the
 *                                       exact rate / exchange against
 *                                       a different store or time.
 *
 *   Query fingerprint (KKKKKKKKK)   ←→  Exchange operation IS a query;
 *                                       its `exchangeUuid` is the
 *                                       canonical idempotency key.
 *
 * Consequence: this module adds NO new primitives. It just gives the
 * existing uuid primitives currency-shaped phantom types so the type
 * system enforces the analogy and downstream consumers compose them
 * with the rest of the uuid family for free.
 *
 * @standard RFC 9562 §5.8 uuidv8 (the bottom-half hash family)
 * @standard RFC 8785 JCS (the canonicalisation that makes equivalence work)
 * @standard ISO 4217 §6.5 (X-codes — the currency identity layer)
 * @audit Conservation Law 8  content-addressable integrity
 * @audit Conservation Law 47 type-level uuid
 * @audit Conservation Law 53 self-referential-closure (XXX identity)
 * @audit Conservation Law 54 universal identity element (this module formalises it for currency)
 * @feature currency_uuid_bridge
 * @see ../integrity/content-uuid.ts (computeContentUuid, ContentUuid<T>)
 * @see ./index.ts (resolveCurrency, realtimeRate — consumers of this bridge)
 */

import { computeContentUuid } from '@/integrity/content-uuid'
import type { ContentUuid } from '@/integrity/content-uuid'
import { resolveCurrency } from '@/currency/fallback'

/**
 * Type-branded currency identity. A `Currency<'EUR'>` value is a
 * compile-time-distinct type from `Currency<'JPY'>` even though both
 * unwrap to a string. Mirror of `ContentUuid<T>` (Slice GGGGGGG).
 */
export type Currency<Code extends string = string> = string & { readonly __currencyCode: Code }

/** A currency-identity uuid. Phantom-typed by the currency code. */
export type CurrencyUuid<Code extends string = string> = ContentUuid<{ currencyCode: Code }>

/** A rate-quote uuid. Replay-safe — same (from, to, asOf) → same uuid. */
export type RateQuoteUuid = ContentUuid<{
  fromCurrency: string
  toCurrency: string
  asOf: string
}>

/** An exchange-operation uuid. Idempotent — same params → same uuid. */
export type ExchangeUuid = ContentUuid<{
  fromWalletId: string
  toWalletId: string
  amountMinor: number
  asOf: string
}>

/**
 * Content-uuid of a currency identity. Per-tenant namespaced so the
 * same code in different tenants → different uuids (mirrors Slice
 * RRRRR's tenant-scoping convention).
 *
 *   computeCurrencyUuid('EUR', 'tenant-1')  → distinct uuid
 *   computeCurrencyUuid('EUR', 'tenant-2')  → distinct uuid
 *   computeCurrencyUuid('XXX', 'platform')  → THE blank-currency uuid
 *                                              (platform-tenant default)
 */
export function computeCurrencyUuid<Code extends string>(
  code: Code,
  tenantId: string,
): CurrencyUuid<Code> {
  const resolved = resolveCurrency(code) as Code
  return computeContentUuid({ currencyCode: resolved }, tenantId) as CurrencyUuid<Code>
}

/**
 * Content-uuid of a rate quote. Stable across re-invocations for the
 * same (from, to, asOf) — that's the replay property. Cache layers
 * key on this uuid; federation peers verify rate equivalence by
 * comparing this uuid.
 *
 * Note: `rate` itself is NOT part of the uuid input — two peers may
 * disagree on the rate but agree on the QUERY identity. Disagreement
 * triggers the consensus-resolution path (Slice UUUUUU N-of-K reads).
 */
export function computeRateQuoteUuid(args: {
  fromCurrency: string
  toCurrency: string
  asOf: string
  tenantId: string
}): RateQuoteUuid {
  return computeContentUuid(
    {
      fromCurrency: resolveCurrency(args.fromCurrency),
      toCurrency: resolveCurrency(args.toCurrency),
      asOf: args.asOf,
    },
    args.tenantId,
  ) as RateQuoteUuid
}

/**
 * Content-uuid of an exchange request. Idempotency key derived from
 * (fromWalletId, toWalletId, amountMinor, asOf, tenantId). Calling
 * the exchange twice with the same params produces the
 * same uuid — the second call can be short-circuited to the first
 * exchange's journal-entry row.
 *
 * Per Slice KKKKKKKKK Cut 2 (query fingerprint), an exchange IS a
 * query; this uuid is the queryUuid of the exchange.
 */
export function computeExchangeUuid(args: {
  fromWalletId: string
  toWalletId: string
  amountMinor: number
  asOf: string
  tenantId: string
}): ExchangeUuid {
  return computeContentUuid(
    {
      fromWalletId: args.fromWalletId,
      toWalletId: args.toWalletId,
      amountMinor: args.amountMinor,
      asOf: args.asOf,
    },
    args.tenantId,
  ) as ExchangeUuid
}
