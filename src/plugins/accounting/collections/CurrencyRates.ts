import type { CollectionConfig } from 'payload'
import { tenantAdminWriteAccess } from '@/plugins/auth/access'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { multiTenancyField, currencyField, notesField } from '../fields/base-accounting-fields'

/**
 * Currency Rates — FX rate master for multi-currency translation.
 *
 * Slice WW-cleanup: switched to canonical access predicates +
 * field factories + autoPopulateTenant. Removed dead `if (!data.tenant
 * && undefined)` code. Inverse-rate calc preserved.
 *
 * @standard ISO-4217:2015 currency-codes from-currency to-currency
 * @standard ISO-8601-1:2019 date-time rate-date
 * @accounting IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates
 * @accounting US-GAAP ASC-830 foreign-currency-matters
 * @audit ISO-19011:2018 audit-trail rate-update
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see docs/STANDARDS.md §4.1
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
    { name: 'inverse', type: 'number', admin: { disabled: true } },
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
