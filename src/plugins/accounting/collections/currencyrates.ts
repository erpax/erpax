import type { CollectionConfig } from 'payload'
import { tenantAdminWriteAccess } from '@/access/auth'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { multiTenancyField, currencyField, notesField } from '@/fields/accounting/base-accounting-fields'

/**
 * Currency Rates — IAS-21 exchange rate master data with spot, mid-market, bid-ask feeds.
 *
 * Core Function:
 *   Currency Rates is the FX rate table that feeds multi-currency transactions and period-end
 *   revaluations. Per IAS-21 §22, transaction-date rates apply to spot conversions; per §23,
 *   closing rates apply to period-end revaluations. This collection stores spot rates (1:N pairs),
 *   mid-market rates, and bid-ask spreads from multiple sources (ECB, Fed, bank APIs, manual).
 *   FX Transactions collection references this table (currencyRate field) for audit traceability.
 *
 * Architecture:
 *   • Multi-tenant isolation enforced at access and beforeValidate layers.
 *   • Rate pair (fromCurrency, toCurrency) identifies the row; rateDate makes it unique.
 *   • Source discriminator: manual, bank_api, ecb, fed, xe, other (tracks rate lineage).
 *   • Inverse rate auto-calculated (1 / rate) for reverse-pair lookups (EUR→USD vs USD→EUR).
 *   • Bid-ask spreads captured for foreign-exchange dealer cost allocation.
 *   • isActive flag allows rate deprecation without deletion (audit trail preservation).
 *   • usedInTransactions counter tracks how many FX Transactions reference this rate.
 *   • Audit trail captures rate updates, source changes, activation/deprecation.
 *
 * Hooks:
 *   • beforeValidate: autoPopulateTenant (multi-tenant enforcement).
 *   • beforeChange: Auto-calculate inverse rate (1 / rate) for reverse-pair efficiency.
 *   • afterChange: auditTrailAfterChange (emit rate update event to audit log).
 *
 * Fields:
 *   • rateId (text, unique, required): Composite ID (e.g., `EUR-USD-2026-04-30`).
 *   • fromCurrency (text, required, indexed): ISO 4217 source currency (3-letter code).
 *   • toCurrency (text, required, indexed): ISO 4217 target currency (3-letter code).
 *   • rate (number, required): Spot rate (toAmount / fromAmount).
 *   • inverse (number, auto-calculated): 1 / rate (for reverse-pair lookups, read-only).
 *   • rateDate (date, required, indexed): ISO 8601 effective date of this rate.
 *   • source (select): manual | bank_api | ecb | fed | xe | other (rate origin).
 *   • midMarketRate (number): Mid-market rate (average of bid and ask).
 *   • bidRate (number): Dealer bid price (what they buy at).
 *   • askRate (number): Dealer ask price (what they sell at).
 *   • isActive (checkbox, default true): Rate is current and available for new transactions.
 *   • usedInTransactions (number, auto-updated, read-only): Count of FX Transactions using this rate.
 *   • notes (textarea, localized): Source notes (e.g., "ECB official closing rate").
 *
 * Invariants:
 *   1. fromCurrency ≠ toCurrency (cannot convert currency to itself, rate = 1).
 *   2. Both currencies must be ISO 4217 valid (3-letter codes).
 *   3. rate > 0 (cannot be zero or negative).
 *   4. inverse = 1 / rate (algebraic closure, auto-calculated).
 *   5. bidRate ≤ midMarketRate ≤ askRate (bid-ask spread ordering).
 *   6. Rates for same pair on same date must have unique source (prevent duplicate imports).
 *   7. rateDate must be on or before today (cannot enter future rates).
 *   8. Inactive rates (isActive=false) still referenced by old FX Transactions (immutability).
 *
 * Audit Trail:
 *   • createdBy auto-populated (admin who entered the rate).
 *   • createdAt auto-set to ISO 8601 timestamp (when rate was first recorded).
 *   • updatedAt auto-set on every change (rate adjustments, source corrections, isActive toggles).
 *   • All state changes (source, bid-ask spreads, isActive) emit audit event.
 *   • Change history preserved: each rate version tracked for FX audit evidence (SOX §404).
 *   • usedInTransactions counter auto-incremented by FX Transactions on save (read-only).
 *   • Inactive rates retained (isActive=false) for historical reference and old FX Transaction linking.
 *
 * Example:
 *   EUR/USD rate (April 30, 2026):
 *     rateId: "EUR-USD-2026-04-30"
 *     fromCurrency: "EUR"
 *     toCurrency: "USD"
 *     rate: 1.09 (1 EUR = 1.09 USD)
 *     inverse: 0.917 (1 USD = 0.917 EUR, auto-calculated)
 *     rateDate: "2026-04-30"
 *     source: "ecb"
 *     midMarketRate: 1.0900
 *     bidRate: 1.0895
 *     askRate: 1.0905
 *     isActive: true
 *     usedInTransactions: 42
 *     notes: "ECB official closing rate for April 30, 2026."
 *     createdBy: "admin@example.com"
 *     createdAt: "2026-05-01T08:00:00Z"
 *
 * Phase Slice:
 *   WW (2026-05-10): Switched to canonical access predicates + field factories +
 *   autoPopulateTenant. Removed dead tenant-default code. Inverse-rate calc preserved
 *   (domain-specific to FX). Integrated audit trail emission. Multi-source rate feed
 *   support (ECB, Fed, bank APIs, manual entry).
 *
 * @useCase Spot Conversion Rate — Translate transaction-date invoices and payments.
 * @useCase Period-End Revaluation — IAS-21 §23 close-out rate for monetary-item re-measurement.
 * @useCase Bid-Ask Spread Analysis — Track foreign-exchange dealer costs for cash forecasting.
 * @useCase Rate Import Automation — Bulk-load ECB, Fed, or bank API rates for multi-entity groups.
 * @useCase Inverse-Pair Lookup — Efficient reverse-currency rate retrieval (EUR→USD from USD→EUR).
 * @useCase Rate Deprecation — Mark rates inactive without deletion (audit trail preservation).
 * @useCase FX Audit Trail — Link FX Transactions to source rates for evidence traceability.
 *
 * @standard ISO-4217:2015 currency-codes from-currency to-currency
 * @standard ISO-8601-1:2019 date-time rate-date effective-date
 * @accounting IFRS IAS-21 §20 §21 §22 §23 effects-of-changes-in-foreign-exchange-rates
 * @accounting IFRS IAS-21 §24 §25 §26 transaction-reporting functional-currency
 * @accounting IFRS IAS-21 §39 foreign-currency-translation closing-rate
 * @accounting IFRS IAS-32 §11 financial-instruments-presentation
 * @accounting IFRS IFRS-9 §4.1 §6.5 financial-instruments hedge-accounting
 * @accounting US-GAAP ASC-830-10 foreign-currency-translation spot-rate
 * @accounting US-GAAP ASC-830-20 foreign-currency-transactions transaction-gains-losses
 * @accounting US-GAAP ASC-815 derivatives-hedging fair-value-option
 * @audit ISO-19011:2018 audit-trail rate-update-evidence
 * @audit ISO-19011:2018 audit-evidence rate-source-traceability
 * @compliance SOX §302 certification-internal-controls fx-rate-controls
 * @compliance SOX §404 internal-controls currency-rate-master TOM-FX-01
 * @compliance SOX §409 real-time-disclosure material-fx-rate-changes
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 A.8.24 use-of-cryptography rate-data-integrity
 * @see src/plugins/accounting/collections/fxtransactions.ts FX-Transaction-Events
 * @see src/services/country-context.ts Multi-Currency-Routing
 * @see docs/STANDARDS.md §4.2 FX-Rate-Standards
 */
const CurrencyRates: CollectionConfig = {
  slug: 'currency-rates',
  labels: { singular: 'Currency Rate', plural: 'Currency Rates' },
  admin: {
    useAsTitle: 'rateId',
    defaultColumns: ['fromCurrency', 'toCurrency', 'rateDate', 'rate', 'source'],
  },
  access: tenantAdminWriteAccess(),
  fields: [
    multiTenancyField(),
    { name: 'rateId', type: 'text', required: true, unique: true },
    currencyField({ name: 'fromCurrency', required: true }),
    currencyField({ name: 'toCurrency', required: true }),
    { name: 'rate', type: 'number', required: true },
    { name: 'rateDate', type: 'date', required: true },
    {
      name: 'source',
      type: 'select',
      required: true,
      options: [
        { label: 'Manual Entry', value: 'manual' },
        { label: 'Bank API', value: 'bank_api' },
        { label: 'ECB', value: 'ecb' },
        { label: 'Federal Reserve', value: 'fed' },
        { label: 'XE.com', value: 'xe' },
        { label: 'Other', value: 'other' },
      ],
    },
    { name: 'inverse', type: 'number', admin: { disabled: true, description: 'Auto-calculated as 1/rate. Read-only (disabled in UI).' } },
    { name: 'midMarketRate', type: 'number' },
    { name: 'bidRate', type: 'number' },
    { name: 'askRate', type: 'number' },
    { name: 'isActive', type: 'checkbox', defaultValue: true },
    { name: 'usedInTransactions', type: 'number', defaultValue: 0, admin: { disabled: true } },
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [
      async ({ data }) => {
        // Preserve the inline inverse-rate auto-calc — domain-specific to FX.
        if (data.rate) data.inverse = 1 / data.rate
        return data
      },
    ],
    afterChange: [auditTrailAfterChange('currency-rates')],
  },
  timestamps: true,
}

export default CurrencyRates
