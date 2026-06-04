/**
 * BNB rate sync — nightly (or on-demand) job that pulls the БНБ daily
 * fixing for every reporting-currency pair the BG-resident tenants need
 * and upserts each rate into the `currency-rates` collection.
 *
 * Runs against every tenant whose `config.identity.country === 'BG'` —
 * BG is the canonical case where БНБ is the IAS-21 revaluation anchor.
 * Other countries can plug their own central-bank publishers in via the
 * same pattern (one job per (country, central-bank) tuple).
 *
 * Idempotent: if a rate for (tenant, fromCurrency, toCurrency, date)
 * already exists in `currency-rates`, the job updates it; otherwise it
 * inserts. The row's `effectiveDate` matches the БНБ fixing date, not the
 * job-run date.
 *
 * @standard ISO-3166-1:2020 BG country-code
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time effective-date
 * @audit ISO-19011:2018 audit-trail external-system-evidence
 * @accounting IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates
 * @compliance SOX §404 internal-controls fx-revaluation-evidence
 * @see ../services/country-api-clients.ts (lookupBnbExchangeRate)
 * @see ../config/country-apis.ts (БНБ rates entry, clientImplemented: true)
 */

import type { Payload } from 'payload'
import { lookupEuFallbackRate } from '@/services/country-api-clients'

/**
 * Default currency set the job pulls when a tenant has no explicit
 * `config.currency.fxPairs` override. Covers the common cross-rates a
 * BG-resident reporting in EUR needs: USD, GBP, JPY, CHF.
 */
const DEFAULT_BG_FX_CURRENCIES = ['USD', 'GBP', 'JPY', 'CHF'] as const

interface BgTenantRow {
  readonly id: string | number
  readonly config?: {
    readonly identity?: { readonly country?: string | null } | null
    readonly currency?: {
      readonly reportingCurrency?: string | null
      /** Per-tenant override — array of ISO-4217 codes to refresh nightly. */
      readonly fxPairs?: ReadonlyArray<string> | null
    } | null
  } | null
}

export interface BnbRatesSyncResult {
  readonly tenantsProcessed: number
  readonly ratesUpserted: number
  readonly failures: ReadonlyArray<{
    readonly tenantId: string | number
    readonly currency: string
    readonly error: string
  }>
}

/**
 * Run the BNB sync for every BG tenant. Returns a summary suitable for
 * the Payload job-result `output` field (audit trail).
 */
export async function processBnbRatesSync(payload: Payload): Promise<BnbRatesSyncResult> {
  const failures: Array<{ tenantId: string | number; currency: string; error: string }> = []
  let ratesUpserted = 0
  let tenantsProcessed = 0

  // Find BG tenants — `config.identity.country === 'BG'`. Use `find` with a
  // wide limit; the BG tenant set is small for now, paginate later if needed.
  const tenants = (await payload.find({
    collection: 'tenants',
    where: { 'config.identity.country': { equals: 'BG' } },
    limit: 1000,
    pagination: false,
  })) as { docs: BgTenantRow[] }

  const today = new Date().toISOString().slice(0, 10)

  for (const tenant of tenants.docs ?? []) {
    tenantsProcessed += 1
    const reportingCurrency = tenant.config?.currency?.reportingCurrency ?? 'EUR'
    const targetCurrencies =
      tenant.config?.currency?.fxPairs ?? Array.from(DEFAULT_BG_FX_CURRENCIES)

    for (const fromCurrency of targetCurrencies) {
      // Skip the identity rate (currency vs itself).
      if (fromCurrency === reportingCurrency) continue

      // Tries БНБ first; if no national fixing for the (currency, date),
      // falls back to ECB (pan-EU). The result's `source` carries which
      // publisher answered so downstream audit-trail rows attribute correctly.
      const lookup = await lookupEuFallbackRate('BG', fromCurrency, today)
      if (!lookup.ok || !lookup.data) {
        failures.push({
          tenantId: tenant.id,
          currency: fromCurrency,
          error: lookup.error ?? 'no data',
        })
        continue
      }

      // Normalise: publishers vary on the `units` denominator (БНБ uses
      // "X BGN per <units> <fromCurrency>"; ECB always uses 1 unit).
      // Dividing by `units` gives the rate-per-unit consumers expect.
      const ratePerUnit = lookup.data.rate / Math.max(1, lookup.data.units)

      // currency-rates row shape mirrors `SEED_VALIDATION_REGISTRY['currency-rates']`.
      try {
        // Try to find an existing row for this (tenant, from, to, date) tuple.
        const existing = (await payload.find({
          collection: 'currency-rates',
          where: {
            and: [
              { tenant: { equals: tenant.id } },
              { fromCurrency: { equals: fromCurrency } },
              { toCurrency: { equals: 'BGN' } },
              { rateDate: { equals: lookup.data.date } },
            ],
          },
          limit: 1,
        })) as { docs: Array<{ id: string | number }> }

        if (existing.docs?.[0]) {
          await payload.update({
            collection: 'currency-rates',
            id: existing.docs[0].id,
            data: { rate: ratePerUnit, isActive: true },
          })
        } else {
          await payload.create({
            collection: 'currency-rates',
            data: {
              tenant: String(tenant.id),
              rateId: `${fromCurrency}-BGN-${lookup.data.date}`,
              fromCurrency,
              toCurrency: 'BGN',
              rate: ratePerUnit,
              rateDate: lookup.data.date,
              // exact publisher (БНБ/ECB) is on the api-audit-events trail; the
              // central-bank fixing maps to bank_api / ecb here.
              source: lookup.source === 'ECB' ? 'ecb' : 'bank_api',
              isActive: true,
            },
          })
        }
        ratesUpserted += 1
      } catch (e) {
        failures.push({
          tenantId: tenant.id,
          currency: fromCurrency,
          error: e instanceof Error ? e.message : String(e),
        })
      }
    }
  }

  return { tenantsProcessed, ratesUpserted, failures }
}
