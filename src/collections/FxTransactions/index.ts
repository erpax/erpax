/**
 * FX Transactions — IAS-21 §28-29 monetary-item re-translation entries.
 *
 * Slice TTT (2026-05-10): added per Slice NNN gap discovery + Slice TTT
 * purge — the `SEED_VALIDATION_REGISTRY` declared this slug AND the
 * `MultiCurrencySeed` referenced it, but no Payload schema existed.
 * Distinct from `currency-rates` (the rate-table master): this collection
 * records each individual FX conversion / revaluation event as a durable
 * row, which is the audit evidence for the FX gain/loss P&L line.
 *
 * @standard ISO-4217:2015 currency-codes from-to-currency-pair
 * @standard ISO-8601-1:2019 date-time transaction-date
 * @accounting IFRS IAS-21 §21 §23 §28 §29 effects-of-changes-in-foreign-exchange-rates
 * @accounting IFRS IAS-21 §39 foreign-currency-translation
 * @accounting IFRS IAS-32 §11 financial-instruments-presentation (every FX-revaluation row meets the IAS-32 financial-instrument definition)
 * @accounting IFRS IFRS-7 §22 hedging-disclosures (when FX-revaluation is part of a designated hedge per IFRS-9)
 * @accounting US-GAAP ASC-830-10-45 foreign-currency-translation
 * @accounting US-GAAP ASC-830-20 foreign-currency-transactions
 * @audit ISO-19011:2018 audit-trail fx-revaluation-evidence
 * @compliance SOX §404 internal-controls fx-control TOM-FX-01
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./CurrencyRates.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/hooks/standardCollectionHooks'
import { accountingCollectionAccess } from '@/access/auth'
import { statusField, notesField, auditFields } from '@/fields/base-accounting-fields'

const FxTransactions: CollectionConfig = {
  slug: 'fx-transactions',
  labels: { singular: 'FX Transaction', plural: 'FX Transactions' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'transactionDate', 'fromCurrency', 'toCurrency', 'fromAmount', 'exchangeRate', 'toAmount', 'status'],
    description:
      'IAS-21 §28-29 monetary-item re-translation events. Each row is one FX conversion / revaluation that hits the FX gain/loss P&L line.',
  },
  access: accountingCollectionAccess({ feature: 'multi_currency' }),
  fields: [
    { name: 'reference', type: 'text', required: false, index: true,
      admin: { description: 'Optional reference (e.g. `FX-2026-04-001`); auto-populated when missing.' } },
    { name: 'transactionDate', type: 'date', required: true, index: true,
      admin: { description: 'ISO 8601 — date the FX rate applied (transaction date OR period-end revaluation date).' } },
    {
      name: 'transactionKind',
      type: 'select',
      required: true,
      defaultValue: 'spot_conversion',
      options: [
        { label: 'Spot Conversion (settled at rate)', value: 'spot_conversion' },
        { label: 'Period-End Revaluation (IAS-21 §23)', value: 'period_end_revaluation' },
        { label: 'Hedge Settlement', value: 'hedge_settlement' },
        { label: 'Translation Adjustment (consolidation)', value: 'translation_adjustment' },
      ],
    },
    { name: 'fromCurrency', type: 'text', required: true,
      admin: { description: 'ISO 4217 source currency (3-letter code).' } },
    { name: 'toCurrency', type: 'text', required: true,
      admin: { description: 'ISO 4217 target currency (3-letter code).' } },
    { name: 'fromAmount', type: 'number', required: true,
      admin: { description: 'Source amount in cents (in fromCurrency).' } },
    { name: 'exchangeRate', type: 'number', required: true,
      admin: { description: 'Rate applied (toAmount / fromAmount). Per IAS-21 §22, transaction-date rate; per §23, closing rate at period-end.' } },
    { name: 'toAmount', type: 'number', required: true,
      admin: { description: 'Target amount in cents (in toCurrency). Must equal fromAmount × exchangeRate within rounding.' } },
    { name: 'fxGainLoss', type: 'number', defaultValue: 0,
      admin: { description: 'IAS-21 §28-29 FX gain/loss recognised (cents, signed). Hits the P&L FX line.' } },
    { name: 'currencyRate', type: 'relationship', relationTo: 'currency-rates',
      admin: { description: 'The rate-table row that was the source of `exchangeRate` (audit traceability).' } },
    { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries',
      admin: { description: 'JE that booked the FX gain/loss + the converted amount.' } },
    { name: 'sourceCollection', type: 'text',
      admin: { description: 'Slug of the source document this conversion serves (e.g. `invoices`, `payments`).' } },
    { name: 'sourceId', type: 'text',
      admin: { description: 'ID of the source document.' } },
    { name: 'description', type: 'text',
      admin: { description: 'Free-text context for the conversion.' } },
    statusField(
      [
        { label: 'Recorded', value: 'recorded' },
        { label: 'Posted', value: 'posted' },
        { label: 'Reversed', value: 'reversed' },
      ],
      'recorded',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('fx-transactions'),
  timestamps: true,
}

export default FxTransactions
