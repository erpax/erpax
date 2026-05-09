/**
 * SEPA Mandates — pain.008 Direct Debit mandate register.
 *
 * SEPA SDD requires a mandate signed by the debtor before any direct
 * debit can be initiated. This collection is the durable register of
 * those mandates: id, debtor, signature date, sequence-state (FRST →
 * RCUR), expiry, revocation. PaymentRuns of messageType `pain.008`
 * MUST reference an active mandate per transaction (mandateId).
 *
 * SEPA rulebook EPC130-08 requires the mandate to remain valid for
 * 36 months after the most recent collection — capture that timestamp
 * (`lastCollectionAt`) so the obsolescence rule is enforceable.
 *
 * @standard ISO-20022 pain.008 customer-direct-debit-initiation
 * @standard ISO-13616-1:2020 iban
 * @standard ISO-9362:2022 bic
 * @standard ISO-8601-1:2019 date-time signature-date expiry-date
 * @accounting IFRS IFRS-9 financial-instruments
 * @accounting US-GAAP ASC-310 receivables
 * @audit ISO-19011:2018 audit-trail mandate-evidence
 * @compliance SOX §404 internal-controls
 * @compliance GDPR Art.6(1)(b) lawful-basis-contract
 * @compliance EPC130-08 sepa-direct-debit-rulebook
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see src/plugins/accounting/collections/PaymentRuns.ts
 * @see docs/STANDARDS.md §4.1
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateHost } from '@/hooks/autoPopulateHost'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { autoSetTimestamp } from '@/hooks/autoSetTimestamp'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '@/plugins/auth/access'
import {
  multiTenancyField,
  statusField,
  notesField,
  auditFields,
} from '../fields/base-accounting-fields'

const SepaMandates: CollectionConfig = {
  slug: 'sepa-mandates',
  labels: { singular: 'SEPA Mandate', plural: 'SEPA Mandates' },
  admin: {
    useAsTitle: 'mandateId',
    defaultColumns: [
      'mandateId',
      'debtorName',
      'localInstrument',
      'signatureDate',
      'sequenceState',
      'status',
    ],
    description:
      'SEPA Direct Debit mandate register. PaymentRuns of pain.008 reference these mandate ids.',
  },
  access: {
    read: scopedAccess(),
    create: roleScopedAccess('admin', 'accountant'),
    update: roleScopedAccess('admin', 'accountant'),
    delete: tenantAdmin,
  },
  fields: [
    multiTenancyField(),
    {
      name: 'mandateId',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Unique mandate identifier carried in pain.008 MndtId.' },
    },
    {
      name: 'localInstrument',
      type: 'select',
      required: true,
      defaultValue: 'CORE',
      options: [
        { label: 'CORE — Core SDD (B2C)', value: 'CORE' },
        { label: 'B2B — B2B SDD', value: 'B2B' },
      ],
    },

    // Debtor (signing party)
    {
      name: 'debtorName',
      type: 'text',
      required: true,
    },
    {
      name: 'debtorIban',
      type: 'text',
      required: true,
      admin: { description: 'ISO 13616 IBAN of the debtor.' },
    },
    { name: 'debtorBic', type: 'text', admin: { description: 'ISO 9362 BIC.' } },
    {
      name: 'debtor',
      type: 'relationship',
      relationTo: 'addresses',
      admin: { description: 'Optional link to the addresses register.' },
    },

    // Creditor (the tenant)
    {
      name: 'creditorIdentifier',
      type: 'text',
      required: true,
      admin: {
        description:
          'Creditor identifier (CI) — country-specific format assigned by the regulator.',
      },
    },

    // Mandate document evidence
    {
      name: 'signatureDate',
      type: 'date',
      required: true,
      admin: { description: 'Date the debtor signed the mandate.' },
    },
    {
      name: 'mandateDocument',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Signed mandate file (PDF). Required evidence.' },
    },
    {
      name: 'signatureMethod',
      type: 'select',
      defaultValue: 'wet_ink',
      options: [
        { label: 'Wet-ink signature', value: 'wet_ink' },
        { label: 'Electronic signature (eIDAS qualified)', value: 'qualified_electronic' },
        { label: 'Electronic signature (advanced)', value: 'advanced_electronic' },
        { label: 'Click-to-accept (recorded online consent)', value: 'click_accept' },
      ],
    },

    // Lifecycle
    {
      name: 'sequenceState',
      type: 'select',
      defaultValue: 'pending_first',
      options: [
        { label: 'Pending first collection', value: 'pending_first' },
        { label: 'Active (recurring)', value: 'active_recurring' },
        { label: 'Final collection submitted', value: 'final_submitted' },
        { label: 'Expired (>36 months no use)', value: 'expired' },
      ],
      admin: {
        description:
          'EPC130-08: a mandate becomes obsolete 36 months after the most recent collection. The auto-state-machine driven by lastCollectionAt.',
      },
    },
    {
      name: 'lastCollectionAt',
      type: 'date',
      admin: {
        readOnly: true,
        description: 'Most recent direct-debit collection date — drives the 36-month rule.',
      },
    },
    {
      name: 'expiryDate',
      type: 'date',
      admin: {
        readOnly: true,
        description: 'Computed: lastCollectionAt + 36 months (or signatureDate + 36 months if never collected).',
      },
    },
    {
      name: 'revokedAt',
      type: 'date',
      admin: { readOnly: true },
    },
    {
      name: 'revocationReason',
      type: 'textarea',
      admin: {
        condition: (data) => (data as { status?: string })?.status === 'revoked',
      },
    },

    statusField(
      [
        { label: 'Active', value: 'active' },
        { label: 'Suspended', value: 'suspended' },
        { label: 'Revoked (by debtor)', value: 'revoked' },
        { label: 'Cancelled (by creditor)', value: 'cancelled' },
        { label: 'Expired', value: 'expired' },
      ],
      'active',
    ),

    ...auditFields(),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateHost],
    beforeChange: [
      autoPopulateCreatedBy,
      autoSetTimestamp(
        'revokedAt',
        (d) => (d as { status?: string }).status === 'revoked',
      ),
    ],
    afterChange: [auditTrailAfterChange('sepa-mandates')],
  },
  timestamps: true,
}

export default SepaMandates
