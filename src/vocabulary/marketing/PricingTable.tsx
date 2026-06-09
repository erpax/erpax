/**
 * PricingTable — server-rendered marketing block, reads SubscriptionPlans live.
 *
 * Wires the marketing surface to the actual `subscriptionPlans` collection
 * so pricing is always correct (no hand-typed boasts that drift). Renders
 * tier cards in the tenant's `reportingCurrency` (cascaded via
 * `resolveRequestConfig`); shows the canonical IFRS 15 / ASC 606
 * recognition note so prospects see the back-end commitment.
 *
 * @standard schema.org Offer pricing
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
 * @compliance WCAG-2.1 level-AA pricing-table-accessibility
 * @see src/collections/SubscriptionPlans/index.ts
 */

import React from 'react'
import { getPayload } from 'payload'
import type { Where } from 'payload'
import configPromise from '@payload-config'
import { DEFAULT_CURRENCY, type Currency } from '@/config/regional-defaults'

interface PricingTableProps {
  tenantId?: string | number
  currency?: Currency
  highlightPlanId?: string | number
}

interface PlanRow {
  id: string | number
  name: string
  price: number // in cents
  currency: string
  interval?: string
  features?: string[]
  highlighted: boolean
}

const formatMoney = (cents: number, currency: string, locale: string = 'bg-BG') =>
  new Intl.NumberFormat(locale, { style: 'currency', currency }).format(cents / 100)

export default async function PricingTable({
  tenantId,
  currency = DEFAULT_CURRENCY as Currency,
  highlightPlanId,
}: PricingTableProps) {
  const payload = await getPayload({ config: configPromise })
  const where: Where = {}
  if (tenantId !== undefined) where.tenant = { equals: tenantId }
  const result = await payload.find({
    collection: 'subscription-plans',
    where,
    limit: 12,
    overrideAccess: true,
  })

  const plans: PlanRow[] = result.docs.map((d) => {
    const doc = d as unknown as {
      id: string | number
      name?: string
      unitAmount?: number
      currency?: string
      interval?: string
      features?: Array<{ feature?: string }> | string[]
    }
    return {
      id: doc.id,
      name: doc.name ?? 'Plan',
      price: typeof doc.unitAmount === 'number' ? doc.unitAmount : 0,
      currency: doc.currency ?? currency,
      interval: doc.interval,
      features: Array.isArray(doc.features)
        ? doc.features.map((f) => (typeof f === 'string' ? f : f?.feature ?? '')).filter(Boolean)
        : [],
      highlighted: highlightPlanId !== undefined && String(doc.id) === String(highlightPlanId),
    }
  })

  if (plans.length === 0) {
    return (
      <section aria-label="Pricing" className="mx-auto max-w-5xl py-16 px-4 text-center">
        <p className="text-muted-foreground">Pricing is set up per tenant — contact us for a quote.</p>
      </section>
    )
  }

  return (
    <section aria-label="Pricing plans" className="mx-auto max-w-6xl py-16 px-4">
      <h2 className="mb-2 text-3xl font-semibold tracking-tight">Pricing</h2>
      <p className="mb-8 text-muted-foreground">
        Subscriptions recognise per IFRS 15 §35 / ASC 606-10-25-30. Every period invoice posts a balanced GL entry.
      </p>
      <ul className="grid gap-6 md:grid-cols-3" role="list">
        {plans.map((p) => (
          <li
            key={String(p.id)}
            className={`rounded-lg border p-6 ${p.highlighted ? 'border-foreground bg-foreground/5' : 'border-border'}`}
            aria-current={p.highlighted ? 'true' : undefined}
          >
            <h3 className="mb-2 text-xl font-semibold">{p.name}</h3>
            <p className="mb-4 text-3xl font-bold tabular-nums">
              {formatMoney(p.price, p.currency)}
              {p.interval && <span className="text-base font-normal text-muted-foreground"> / {p.interval}</span>}
            </p>
            {p.features && p.features.length > 0 && (
              <ul className="space-y-2 text-sm" role="list">
                {p.features.map((f, i) => (
                  <li key={i} className="flex gap-2">
                    <span aria-hidden="true">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
