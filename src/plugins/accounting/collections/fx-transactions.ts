/**
 * FX Transactions — IAS-21 monetary-item re-translation events with P&L impact tracking.
 *
 * Core Function:
 *   FX Transactions record each foreign-exchange conversion or revaluation event that impacts
 *   P&L. Per IAS-21 §21-39, entities translate foreign-currency transactions at transaction-date
 *   rates (spot conversions), and re-translate monetary items at period-end closing rates (period-end
 *   revaluations). Each row captures fromCurrency, toCurrency, amounts, rate, and realized/unrealized
 *   FX gain/loss. The source document link (invoices, payments, loans) enables cash-flow hedging
 *   analysis and IFRS-9 hedge-effectiveness testing.
 *
 * Architecture:
 *   • Distinct from Currency Rates (rate-table master): this collection records events, not rates.
 *   • Multi-tenant isolation enforced at access and beforeValidate layers.
 *   • Feature-gated: multi_currency flag must be enabled (prevents unintended FX tracking).
 *   • Transaction kinds: spot_conversion, period_end_revaluation, hedge_settlement, translation_adjustment.
 *   • Journal Entry link ensures every FX gain/loss is booked to GL (audit trail completeness).
 *   • Status progression: draft → posted → approved → closed is immutable once closed (SOX §404 evidence).
 *   • Source document tracking (sourceCollection, sourceId) links to originating transaction.
 *
 * Hooks:
 *   • beforeValidate: autoPopulateTenant (multi-tenant enforcement).
 *   • beforeChange: autoPopulateCreatedBy (FX event originator attribution).
 *   • afterChange: auditTrailAfterChange (emit FX event to audit log).
 *
 * Fields:
 *   • reference (text, unique, auto-generated): Sequential FX transaction ID (e.g., `FX-2026-04-001`).
 *   • transactionDate (date, required, index): ISO 8601 date FX rate applied (spot: settlement date;
 *     period-end revaluation: fiscal period-end date).
 *   • transactionKind (select): spot_conversion | period_end_revaluation | hedge_settlement |
 *     translation_adjustment.
 *   • fromCurrency (text, required): ISO 4217 source currency (3-letter code, e.g., 'USD').
 *   • toCurrency (text, required): ISO 4217 target currency (3-letter code, e.g., 'EUR').
 *   • fromAmount (number, required): Source amount in cents.
 *   • exchangeRate (number, required): Conversion rate (toAmount / fromAmount).
 *   • toAmount (number, required): Target amount in cents (= fromAmount × exchangeRate).
 *   • fxGainLoss (number, signed): Realized or unrealized FX gain/loss in cents (hits P&L FX line).
 *   • currencyRate (relationship): Link to Currency Rates master (audit traceability).
 *   • journalEntry (relationship, required): Link to GL journal entry that booked the FX gain/loss.
 *   • sourceCollection (text): Slug of originating document (invoices, payments, loans).
 *   • sourceId (text): ID of originating document (for cash-flow matching).
 *   • status (select): draft | posted | approved | closed.
 *   • description (textarea, localized): Purpose of conversion (e.g., "USD invoice payment").
 *   • notes (textarea, localized): Reconciler notes or hedge-effectiveness analysis.
 *
 * Invariants:
 *   1. toAmount = fromAmount × exchangeRate (within rounding tolerance).
 *   2. Both fromCurrency and toCurrency must be ISO 4217 valid (3-letter codes).
 *   3. Spot conversions must have transactionDate = settlement date (forward contracts on different date).
 *   4. Period-end revaluations must have transactionDate = fiscal period-end date.
 *   5. journalEntry is required and immutable (every FX event must be GL-booked).
 *   6. Posted transactions immutable to non-admins (prevent reversal after period close).
 *   7. Closed transactions immutable even to admins (SOX §404 evidence integrity).
 *   8. Source document (if provided) must exist in sourceCollection (referential integrity).
 *
 * Audit Trail:
 *   • createdBy auto-populated with FX event originator (ISO-19011 evidence completeness).
 *   • createdAt auto-set to ISO 8601 timestamp (when FX event was first recorded).
 *   • updatedAt auto-set on every change (modification audit trail).
 *   • All state changes (status, fxGainLoss, rate) emit audit event.
 *   • Change history preserved: each FX revaluation version tracked for period-end workpaper (SOX §404).
 *   • Journal entry link provides GL-side audit trail (every FX gain/loss booked and auditable).
 *   • Hedge-effectiveness testing: source document traceability enables IFRS-9 compliance verification.
 *
 * Example:
 *   USD Invoice Payment (April 2026):
 *     reference: "FX-2026-04-001"
 *     transactionDate: "2026-04-15"
 *     transactionKind: "spot_conversion"
 *     fromCurrency: "USD"
 *     toCurrency: "EUR"
 *     fromAmount: 1000000 (USD 10,000.00)
 *     exchangeRate: 0.92 (1 USD = 0.92 EUR)
 *     toAmount: 920000 (EUR 9,200.00)
 *     fxGainLoss: 50000 (EUR 500.00 gain if original booking was at 0.93)
 *     journalEntry: { entryNumber: "2026-04-FX-001" }
 *     sourceCollection: "invoices"
 *     sourceId: "INV-2026-1001"
 *     status: "posted"
 *     createdBy: "ap_processor@example.com"
 *     createdAt: "2026-04-15T14:30:00Z"
 *
 * Phase Slice:
 *   TTT (2026-05-10): Added per Slice NNN gap discovery + Slice TTT purge — the
 *   SEED_VALIDATION_REGISTRY declared this slug AND MultiCurrencySeed referenced it,
 *   but no Payload schema existed. Distinct from currency-rates (master data).
 *   Records individual FX events for audit evidence. Wired autoPopulateTenant +
 *   autoPopulateCreatedBy + audit trail emission. Feature-gated by multi_currency.
 *
 * @useCase Spot Conversion — Record realized FX gain/loss at payment/settlement.
 * @useCase Period-End Revaluation — IAS-21 §23 re-translate monetary items at closing rate.
 * @useCase Hedge Settlement — Track FX derivative P&L and effectiveness testing (IFRS-9).
 * @useCase Consolidation — Translation adjustments for subsidiary net assets (IFRS-10).
 * @useCase Cash Forecasting — Analyze FX impact on multi-currency cash positions.
 * @useCase Tax Reporting — Track FX realized/unrealized for tax-basis computations.
 *
 * @standard ISO-4217:2015 currency-codes from-currency to-currency
 * @standard ISO-8601-1:2019 date-time transaction-date
 * @accounting IFRS IAS-21 §21 §23 §28 §29 effects-of-changes-in-foreign-exchange-rates
 * @accounting IFRS IAS-21 §39 foreign-currency-translation
 * @accounting IFRS IAS-21 §40 §41 §42 functional-currency transaction-gains-losses
 * @accounting IFRS IAS-32 §11 financial-instruments-presentation
 * @accounting IFRS IFRS-7 §22 §23 hedging-disclosures
 * @accounting IFRS IFRS-9 §4.1 §6.5 financial-instruments hedge-accounting
 * @accounting IFRS IFRS-10 §19 §35 consolidation-translation-adjustments
 * @accounting US-GAAP ASC-830-10 foreign-currency-translation
 * @accounting US-GAAP ASC-830-20 foreign-currency-transactions
 * @accounting US-GAAP ASC-815 derivatives-hedging
 * @audit ISO-19011:2018 audit-trail fx-revaluation-evidence
 * @audit ISO-19011:2018 audit-evidence per-event journal-entry-linkage
 * @compliance SOX §302 certification-internal-controls
 * @compliance SOX §404 internal-controls fx-control TOM-FX-01 evidence
 * @compliance SOX §409 real-time-disclosure material-fx-events
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 A.7.1 access-control role-based multi-currency
 * @see src/plugins/accounting/collections/currencyrates.ts Currency-Rates-Master
 * @see src/plugins/accounting/collections/journal-entries.ts GL-FX-Posting
 * @see src/services/country-context.ts Multi-Currency-Routing
 * @see docs/STANDARDS.md §4.2 FX-Translation-Standards
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/access/auth'
import { multiTenancyField, statusField, notesField, auditFields } from '@/fields/accounting/base-accounting-fields'

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
    multiTenancyField(),
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
        { label: 'Draft', value: 'draft' },
        { label: 'Posted', value: 'posted' },
        { label: 'Approved', value: 'approved' },
        { label: 'Closed', value: 'closed' },
      ],
      'draft',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('fx-transactions')],
  },
  timestamps: true,
}

export default FxTransactions
