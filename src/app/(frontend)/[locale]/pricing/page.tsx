/**
 * Pricing — the marketing surface derived from live config, never hand-typed.
 *
 * Renders PricingTable (live `subscription-plans` rows, IFRS 15 / ASC 606 note) and
 * CountryShowcase (the per-country adapter map from `@/config/regional/defaults`).
 * Force-dynamic: PricingTable boots Payload per request, so the build never needs a DB.
 *
 * @standard schema.org Offer pricing
 * @see ../../../../vocabulary/marketing/PricingTable.tsx
 * @see ../../../../vocabulary/marketing/CountryShowcase.tsx
 */

import type { Metadata } from 'next'

import PricingTable from '@/vocabulary/marketing/PricingTable'
import CountryShowcase from '@/vocabulary/marketing/CountryShowcase'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'erpax — pricing',
  description:
    'Live subscription plans in the tenant currency, with the per-country adapter map — derived from the running config, never hand-typed.',
}

export default function PricingPage() {
  return (
    <main>
      <PricingTable />
      <CountryShowcase />
    </main>
  )
}
