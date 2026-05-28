/**
 * Regulatory Deferral Accounts — IFRS 14 first-time-adopter rate-
 * regulated activities (utilities, telcos under price-cap regimes).
 *
 * Slice BBBBB-prep (2026-05-11): each row is one regulatory-deferral
 * balance recognised under previous GAAP that IFRS 14 §16 permits to
 * carry forward on first-time IFRS adoption. Strictly an interim
 * measure — IASB working on a long-term replacement (RRA / DRA model).
 *
 * @standard IFRS IFRS-14 §3 scope-first-time-adopter
 * @standard IFRS IFRS-14 §16 continuation-of-previous-GAAP
 * @standard IFRS IFRS-14 §27 disclosure-requirements
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @audit ISO 19011:2018 §6.4.6 audit-evidence-regulatory-deferral
 * @compliance SOX §404 internal-controls
 * @security ISO 27001 A.5.23 cloud-service-tenant-isolation
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '../hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '../hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '../hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '../access/auth'
import { currencyField, statusField, notesField, auditFields, referenceField } from '../fields/base-accounting-fields'

const RegulatoryDeferralAccounts: CollectionConfig = {
  slug: 'regulatory-deferral-accounts',
  labels: { singular: 'Regulatory Deferral Account', plural: 'Regulatory Deferral Accounts' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'kind', 'regulator', 'balance', 'recoveryPeriodEnd', 'status'],
    description:
      'IFRS 14 — rate-regulated balances carried forward by first-time IFRS adopters (utilities, telcos under price-cap regimes).',
  },
  access: accountingCollectionAccess({ feature: 'rate_regulated_activities' }),
  fields: [
    referenceField({ description: 'Sequential reference (e.g. RDA-2026-001).' }),
    {
      name: 'kind',
      type: 'select',
      required: true,
      options: [
        { label: 'Regulatory deferral asset (under-recovery)', value: 'asset' },
        { label: 'Regulatory deferral liability (over-recovery)', value: 'liability' },
      ],
    },
    { name: 'regulator', type: 'text', required: true,
      admin: { description: 'Regulator name (e.g. Ofgem / FERC / EWRC-BG).' } },
    { name: 'balance', type: 'number', required: true,
      admin: { description: 'Carrying balance at reporting date (cents).' } },
    { name: 'discountRate', type: 'number', min: 0, max: 100, admin: { step: 0.01 } },
    { name: 'recoveryPeriodEnd', type: 'date',
      admin: { description: 'IFRS 14 §32 — period over which the balance is expected to be recovered/refunded.' } },
    { name: 'movementInPeriod', type: 'number', defaultValue: 0,
      admin: { description: 'Net change in balance during the period (cents).' } },
    currencyField(),
    statusField(
      [
        { label: 'Active', value: 'active' },
        { label: 'Recovering', value: 'recovering' },
        { label: 'Recovered (zero)', value: 'recovered' },
      ],
      'active',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('regulatory-deferral-accounts')],
  },
  timestamps: true,
}

export default RegulatoryDeferralAccounts
