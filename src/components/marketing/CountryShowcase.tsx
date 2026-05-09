/**
 * CountryShowcase — renders the per-country adapter map from
 * `@/config/regional-defaults` so prospects see exactly which jurisdictions
 * are wired (currency / locale / accounting framework) and where the
 * gaps are.
 *
 * @standard ISO-3166-1:2020 country-codes alpha-2
 * @standard ISO-4217:2015 currency-codes
 * @standard BCP-47 language-tag
 * @accounting IFRS / US-GAAP / FRS / JGAAP / ASBE / INDAS
 * @compliance WCAG-2.1 §1.3.1 info-and-relationships table-semantics
 * @see src/config/regional-defaults.ts
 */

import React from 'react'
import { COUNTRY_PROFILES } from '@/config/regional-defaults'

interface CountryShowcaseProps {
  highlightCountries?: string[]
}

const COUNTRY_NAMES: Record<string, string> = {
  BG: 'Bulgaria',
  CA: 'Canada',
  DE: 'Germany',
  FR: 'France',
  GB: 'United Kingdom',
  JP: 'Japan',
  CN: 'China',
  IN: 'India',
  AU: 'Australia',
  NZ: 'New Zealand',
  SG: 'Singapore',
  HK: 'Hong Kong',
  MX: 'Mexico',
  BR: 'Brazil',
  US: 'United States',
}

export default function CountryShowcase({ highlightCountries = [] }: CountryShowcaseProps) {
  const highlights = new Set(highlightCountries.map((c) => c.toUpperCase()))
  const rows = Object.entries(COUNTRY_PROFILES).map(([code, p]) => ({
    code,
    name: COUNTRY_NAMES[code] ?? code,
    currency: p.currency,
    locale: p.locale,
    accountingStandard: p.accountingStandard,
    highlighted: highlights.has(code),
  }))

  return (
    <section aria-label="Per-country adapter map" className="mx-auto max-w-5xl py-16 px-4">
      <h2 className="mb-2 text-3xl font-semibold tracking-tight">Per-country adapters</h2>
      <p className="mb-6 text-muted-foreground">
        Each tenant&rsquo;s <code className="rounded bg-muted px-1">tenant.config.identity.country</code> drives
        currency, locale, and accounting framework automatically. Any ISO 3166-1 alpha-2 code is accepted; the
        countries below are the curated cohort with explicit derived defaults.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm" role="table">
          <caption className="sr-only">Per-country regional defaults</caption>
          <thead className="border-b border-border">
            <tr>
              <th scope="col" className="py-2 font-semibold">Country</th>
              <th scope="col" className="py-2 font-semibold">Currency</th>
              <th scope="col" className="py-2 font-semibold">Locale</th>
              <th scope="col" className="py-2 font-semibold">Accounting</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.code}
                className={`border-b border-border/50 ${r.highlighted ? 'bg-foreground/5 font-medium' : ''}`}
                aria-current={r.highlighted ? 'true' : undefined}
              >
                <td className="py-2">
                  <span className="font-mono text-xs text-muted-foreground">{r.code}</span>{' '}
                  {r.name}
                </td>
                <td className="py-2 font-mono">{r.currency}</td>
                <td className="py-2 font-mono">{r.locale}</td>
                <td className="py-2">{r.accountingStandard}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Outside this list? Set <code className="rounded bg-muted px-1">tenant.config.identity.country</code> to
        any ISO 3166-1 code — the tenant operates with the deployment-default currency / locale / accounting
        framework until an explicit profile is added.
      </p>
    </section>
  )
}
