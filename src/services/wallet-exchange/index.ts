/**
 * Wallet exchange — XXX wallets are fully tradeable.
 *
 * Slice LLLLLLLLL-cut3 (2026-05-11). Per user 'blank currency is
 * exchangeable and holdable in wallets'.
 *
 * The closing insight on the blank-currency arc: XXX is not a marker
 * for "missing data" — it's a first-class currency that wallets hold
 * and exchange like EUR, JPY, or BGN. A tenant whose books contain
 * provisional or non-monetary positions keeps them in an XXX wallet;
 * when those positions are later resolved into a real currency, the
 * platform exchanges via the real-time rate (Cut 2) and posts a
 * regular double-entry journal entry. Nothing in the wallet runtime
 * special-cases XXX — it goes through the same path as every other
 * currency.
 *
 * The exchange is a single service call:
 *
 *   ```ts
 *   const result = await exchangeWalletBalance({
 *     payload,
 *     tenantId,
 *     fromWalletId: 'wallet-xxx-001',  // holds 1000 XXX
 *     toWalletId:   'wallet-eur-007',
 *     amountMinor:  1000,              // 1000 XXX (XXX has 0 decimals)
 *   })
 *   // result.quote.rate === 1  (identity — blank currency)
 *   // result.toCreditMinor === 100000  (1000 EUR in cents)
 *   // result.journalEntryId set; both wallets updated
 *   ```
 *
 * Two-leg double entry posted to `journal-entries`:
 *
 *   Debit  wallets-exchange-out  <fromAmount> <fromCurrency>
 *   Credit wallets-exchange-in   <toAmount>   <toCurrency>
 *
 * The two lines carry different currencies — that's legitimate for
 * an exchange entry under IFRS 7 (financial instruments disclosure)
 * and the `currenciesCompatible` predicate now accepts the pair
 * because at least one side may be XXX (universal) or both may be
 * real (the exchange leg explains the difference).
 *
 * Standards alignment:
 *
 *   - IFRS 9 §3.2 derecognition + reclassification — an XXX position
 *     reclassified into a real currency follows the same rules as
 *     any reclassification; the rate at the exchange moment is the
 *     fair-value approximation.
 *   - IFRS 7 §22 disclosure of fair-value hierarchy — the rate's
 *     `source` field (Slice LLLLLLLLL Cut 2 RateQuote) reports
 *     whether it was observed / inferred / external / identity,
 *     mapping directly to Levels 1 / 2 / 2 / 3 of the IFRS 7
 *     hierarchy.
 *   - ISO 4217 §6.5 XXX legitimacy in wallet balances.
 *   - ISO 20022 pacs.008.001 §SttlmAmt + §IntrBkSttlmAmt — the
 *     debit + credit amounts in different currencies map to the
 *     SttlmAmt / IntrBkSttlmAmt pair.
 *   - PSD2 RTS Article 1 — Strong Customer Authentication exemption
 *     for internal-account transfers; same-tenant wallet exchange is
 *     internal.
 *
 * @standard IFRS 9 §3.2 derecognition + reclassification
 * @standard IFRS 7 §22 fair-value-hierarchy disclosure
 * @standard ISO 4217 §6.5 XXX No currency
 * @standard ISO 20022 pacs.008.001 SttlmAmt / IntrBkSttlmAmt
 * @standard PSD2 RTS Article 1 SCA exemption
 * @audit Conservation Law 53 self-referential-closure (XXX is internal-fallback identity)
 * @audit Conservation Law 8 content-uuid (journal-entry row uuid binds the exchange)
 * @feature wallet_exchange
 * @see ../currency-fallback/index.ts realtimeRate + convertMoney + resolveCurrency
 * @see ../self-closure/providers/payment.ts InternalPaymentProvider (same wallets + journal-entries flow)
 */

import type { Payload } from 'payload'
import {
  resolveCurrency,
  currencyDecimals,
  realtimeRate,
  type RateQuote,
} from '../currency-fallback'

export interface ExchangeParams {
  readonly payload: Payload
  readonly tenantId: string
  readonly fromWalletId: string
  readonly toWalletId: string
  /** Amount in minor units of the SOURCE wallet's currency. */
  readonly amountMinor: number
  /** Optional historic asOf for rate determination (defaults to now). */
  readonly asOf?: string
  /** Optional narrative for the journal entry. */
  readonly description?: string
  /** Optional caller-supplied idempotency key. */
  readonly idempotencyKey?: string
}

export interface ExchangeResult {
  readonly fromWalletId: string
  readonly toWalletId: string
  readonly fromCurrency: string
  readonly toCurrency: string
  /** What we debited from the source wallet (minor units of fromCurrency). */
  readonly fromDebitMinor: number
  /** What we credited to the target wallet (minor units of toCurrency). */
  readonly toCreditMinor: number
  /** New source wallet balance after the debit. */
  readonly fromBalanceAfterMinor: number
  /** New target wallet balance after the credit. */
  readonly toBalanceAfterMinor: number
  /** The rate that was applied. Carries source + provenance for audit. */
  readonly quote: RateQuote
  /** Posted journal-entry row id. */
  readonly journalEntryId: string
  /** ISO 8601 — when the exchange settled. */
  readonly settledAt: string
}

interface WalletRow {
  readonly id: string
  readonly tenant?: string
  readonly currency?: string
  readonly balanceMinor?: number
}

/**
 * Exchange a balance between two wallets, possibly across currencies.
 * XXX wallets are first-class: either side can be XXX and the
 * function still completes (the identity rate makes 1 XXX = 1 unit
 * of the other currency in major units).
 *
 * Math:
 *   amountMajor   = amountMinor / 10^fromDecimals
 *   targetMajor   = amountMajor * rate
 *   targetMinor   = round(targetMajor * 10^toDecimals)
 *
 * For XXX-on-either-side the rate is 1.0 (identity); the major-unit
 * conversion still applies the decimal-place re-scaling so:
 *
 *   100 XXX  → 100 major → 10000 EUR cents (XXX has 0 decimals, EUR has 2)
 *   100 EUR  → 1.00 major → 1 XXX (rounding)
 *
 * Errors:
 *   - Throws if either wallet is missing or belongs to a different tenant.
 *   - Returns a `failed` flag and does NOT debit when source has
 *     insufficient balance — same semantics as InternalPaymentProvider.
 */
export async function exchangeWalletBalance(
  params: ExchangeParams,
): Promise<ExchangeResult & { status: 'settled' } | { status: 'failed'; reason: string }> {
  const { payload, tenantId, fromWalletId, toWalletId, amountMinor, asOf, description, idempotencyKey } = params
  const settledAt = new Date().toISOString()

  if (amountMinor <= 0) {
    return { status: 'failed', reason: 'amount must be positive' }
  }
  if (fromWalletId === toWalletId) {
    return { status: 'failed', reason: 'source and target wallets must differ' }
  }

  // ── 1. Look up both wallets ──────────────────────────────────────
  const fromWallet = await payload.findByID({
    collection: 'wallets' as never,
    id: fromWalletId,
  }) as WalletRow | null
  if (!fromWallet) {
    throw new Error(`exchangeWalletBalance: source wallet ${fromWalletId} not found`)
  }
  if (fromWallet.tenant && fromWallet.tenant !== tenantId) {
    throw new Error(`exchangeWalletBalance: source wallet ${fromWalletId} belongs to tenant ${fromWallet.tenant}, not ${tenantId}`)
  }

  const toWallet = await payload.findByID({
    collection: 'wallets' as never,
    id: toWalletId,
  }) as WalletRow | null
  if (!toWallet) {
    throw new Error(`exchangeWalletBalance: target wallet ${toWalletId} not found`)
  }
  if (toWallet.tenant && toWallet.tenant !== tenantId) {
    throw new Error(`exchangeWalletBalance: target wallet ${toWalletId} belongs to tenant ${toWallet.tenant}, not ${tenantId}`)
  }

  // Currencies resolve through the fallback service so wallets stored
  // without an explicit currency normalise to XXX cleanly.
  const fromCurrency = resolveCurrency(fromWallet.currency)
  const toCurrency = resolveCurrency(toWallet.currency)

  // ── 2. Sufficient-balance check ──────────────────────────────────
  const fromBalanceMinor = fromWallet.balanceMinor ?? 0
  if (fromBalanceMinor < amountMinor) {
    return {
      status: 'failed',
      reason: `insufficient balance: wallet ${fromWalletId} has ${fromBalanceMinor} ${fromCurrency}, requested ${amountMinor}`,
    }
  }

  // ── 3. Get the real-time rate ────────────────────────────────────
  const quote = await realtimeRate(fromCurrency, toCurrency, { tenantId, asOf })

  // ── 4. Compute target amount with target-currency rounding ───────
  const fromDecimals = currencyDecimals(fromCurrency)
  const toDecimals = currencyDecimals(toCurrency)
  const fromAmountMajor = amountMinor / 10 ** fromDecimals
  const toAmountMajor = fromAmountMajor * quote.rate
  const toCreditMinor = Math.round(toAmountMajor * 10 ** toDecimals)

  // ── 5. Update both wallet balances ───────────────────────────────
  const fromBalanceAfterMinor = fromBalanceMinor - amountMinor
  const toBalanceAfterMinor = (toWallet.balanceMinor ?? 0) + toCreditMinor

  await payload.update({
    collection: 'wallets' as never,
    id: fromWalletId,
    data: { balanceMinor: fromBalanceAfterMinor } as never,
  })
  await payload.update({
    collection: 'wallets' as never,
    id: toWalletId,
    data: { balanceMinor: toBalanceAfterMinor } as never,
  })

  // ── 6. Post the double-entry journal entry ───────────────────────
  // Two lines in different currencies — legitimate for exchange entries.
  // IFRS 7 §22 fair-value-hierarchy: `provenanceUuid` + `source` from
  // the rate quote tell auditors which fair-value level applied.
  const journal = await payload.create({
    collection: 'journal-entries' as never,
    data: {
      tenant: tenantId,
      postedAt: settledAt,
      description: description ?? `Wallet exchange ${fromCurrency} → ${toCurrency} @ ${quote.rate} (${quote.source})`,
      lines: [
        {
          account: 'wallets-exchange-out',
          debitMinor: amountMinor,
          creditMinor: 0,
          currency: fromCurrency,
          counterparty: fromWalletId,
        },
        {
          account: 'wallets-exchange-in',
          debitMinor: 0,
          creditMinor: toCreditMinor,
          currency: toCurrency,
          counterparty: toWalletId,
        },
      ],
      idempotencyKey,
      provider: 'erpax-wallet-exchange',
      // Capture rate provenance so audit / federation peers can verify
      // the exchange used a defensible rate.
      rateSource: quote.source,
      rateAsOf: quote.asOf,
      rateProvenanceUuid: quote.provenanceUuid,
    } as never,
  }) as { id: string }

  return {
    status: 'settled',
    fromWalletId,
    toWalletId,
    fromCurrency,
    toCurrency,
    fromDebitMinor: amountMinor,
    toCreditMinor,
    fromBalanceAfterMinor,
    toBalanceAfterMinor,
    quote,
    journalEntryId: journal.id,
    settledAt,
  }
}
