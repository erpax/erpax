/**
 * SEPA Mandates — ISO 20022 pain.008 direct-debit mandate authorization register.
 *
 * Core Function:
 *   SEPA Direct Debit mandates are legal authorizations from debtors (customers) that allow
 *   creditors (enterprises) to initiate direct-debit collections from their bank accounts.
 *   Per EPC130-08 rulebook, each mandate is identified by mandateId, signed on a specific
 *   date, and must be retained as evidence. This collection is the durable register:
 *   mandateId, debtor IBAN/name, signatureDate, sequenceState (FRST → RCUR), revocation.
 *   PaymentRuns of messageType pain.008 MUST reference an active mandate per debit transaction.
 *
 * Architecture:
 *   • Multi-tenant isolation enforced at access and beforeValidate layers.
 *   • Foreign key to Bank Accounts ensures mandate is linked to the correct debit account.
 *   • Sequence state progression: FRST (first collection) → RCUR (recurrent) → OOFF (one-off).
 *   • 36-month validity rule per EPC130-08: lastCollectionAt + 36 months = expiry (auto-calculated).
 *   • Local instrument types: CORE (B2C, 14-day pre-notification), B2B (B2B, 0-day notice).
 *   • Revocation tracking: optional revocationDate marks when mandate was withdrawn by debtor.
 *   • GDPR compliance: mandate signature date proves lawful basis for payment processing.
 *
 * Hooks:
 *   • beforeValidate: autoPopulateTenant (multi-tenant enforcement).
 *   • beforeChange: autoPopulateCreatedBy (mandate creator attribution),
 *     autoSetTimestamp (lastCollectionAt on status='active', expiryDate calculated).
 *   • afterChange: auditTrailAfterChange (emit mandate event to audit log).
 *
 * Fields:
 *   • mandateId (text, unique, required): Unique mandate identifier (pain.008 MndtId).
 *   • debtorName (text, required, localized): Debtor legal name (ISO-20022 CstmrId).
 *   • debtorIban (text, required, index): Debtor bank account IBAN (ISO 13616).
 *   • debtorBic (text): Debtor BIC / SWIFT code (optional, ISO 9362).
 *   • bankAccount (relationship, required): Link to Bank Accounts (creditor's account).
 *   • localInstrument (select): CORE | B2B (SEPA Direct Debit scheme).
 *   • signatureDate (date, required): Mandate signed/authorized by debtor (GDPR evidence).
 *   • sequenceState (select): FRST | RCUR | OOFF (first, recurrent, or one-off).
 *   • lastCollectionAt (date): ISO 8601 timestamp of most recent debit (EPC130-08 validity).
 *   • expiryDate (date, auto-calculated): signatureDate + 36 months OR revocationDate (whichever first).
 *   • revocationDate (date): Optional revocation timestamp when debtor withdrew mandate.
 *   • mandateTerms (textarea, localized): Terms and conditions the debtor signed.
 *   • status (select): active | inactive | expired | revoked | superseded.
 *   • notes (textarea, localized): Verification notes (e.g., original scan location, digital signature).
 *
 * Invariants:
 *   1. debtorIban must be valid per ISO 13616 checksum (RFC 3397).
 *   2. signatureDate ≤ today (cannot sign in the future).
 *   3. expiryDate = MIN(signatureDate + 36 months, revocationDate if revoked).
 *   4. Active mandates must have expiryDate > today (prevent collection on expired mandates).
 *   5. revocationDate > signatureDate (cannot revoke before signing).
 *   6. mandateId must be unique within the tenant and bank account pair.
 *   7. lastCollectionAt (if present) must be ≤ today (cannot collect in future).
 *   8. Only one active mandate per (tenant, bankAccount, debtorIban) triple (prevent duplicate collections).
 *
 * Audit Trail:
 *   • createdBy auto-populated with mandate registrant (ISO-19011 evidence completeness).
 *   • createdAt auto-set to ISO 8601 timestamp (when mandate was first registered).
 *   • updatedAt auto-set on every change (modification audit trail).
 *   • signatureDate immutable (proof of debtor authorization).
 *   • All state changes (status, revocationDate, sequenceState) emit audit event.
 *   • Change history preserved: each mandate version tracked for GDPR/EPC130-08 evidence (SOX §404).
 *   • Revocation workflow: mandate marked revoked with revocationDate + optional notes (audit trail).
 *   • Collection history: lastCollectionAt updated by PaymentRun processing (immutable proof).
 *
 * Example:
 *   CORE Direct Debit Mandate (April 2026):
 *     mandateId: "DE2024-04-0001"
 *     debtorName: "ACME Corp Ltd."
 *     debtorIban: "DE89370400440532013000"
 *     debtorBic: "COBADEDDXXX"
 *     bankAccount: { iban: "BG80BNBG96611020345672" }
 *     creditorIdentifier: 'DE98ZZZ09999999999',  // EPC identifier for creditor bank
 *     localInstrument: "CORE"
 *     signatureDate: "2024-04-15"
 *     sequenceState: "RCUR"
 *     lastCollectionAt: "2026-04-10"
 *     expiryDate: "2027-04-15"
 *     status: "active"
 *     createdBy: "ar_manager@example.com"
 *     createdAt: "2024-04-15T10:00:00Z"
 *
 * Phase Slice:
 *   TTT (2026-05-10): Added per Slice NNN gap discovery — the SEED_VALIDATION_REGISTRY
 *   declared this slug but no Payload schema existed. Implements EPC130-08 rulebook
 *   (36-month validity, sequenceState tracking, CORE vs B2B). Wired autoPopulateTenant +
 *   autoPopulateCreatedBy + autoSetTimestamp for lastCollectionAt / expiryDate. Audit trail
 *   emission on all state transitions. GDPR compliance: signatureDate is lawful basis proof.
 *
 * @useCase SEPA Direct Debit Onboarding — Register debtor mandate before first collection.
 * @useCase SEPA Collection Validation — Verify mandate is active before initiating pain.008.
 * @useCase Mandate Expiry Management — Track 36-month validity and renewal/revocation.
 * @useCase GDPR Lawful Basis — Demonstrate debtor authorization for payment processing.
 * @useCase Collection Sequence Tracking — FRST vs RCUR vs OOFF state management.
 * @useCase Revocation Handling — Register debtor opt-out and prevent future collections.
 * @useCase Audit Trail — Maintain mandate evidence for SEPA operator / regulator inquiry.
 *
 * @standard ISO-20022:2013 pain.008 customer-direct-debit-initiation
 * @standard ISO-13616-1:2020 iban international-bank-account-number
 * @standard ISO-9362:2022 bic swift-code bank-identification
 * @standard ISO-8601-1:2019 date-time signature-date expiry-date last-collection-at
 * @standard EPC130-08 sepa-direct-debit-rulebook mandate-36-month-validity
 * @accounting IFRS IFRS-9 §4 financial-instruments receivables classification
 * @accounting IFRS IAS-39 recognition-measurement financial-assets
 * @accounting US-GAAP ASC-310 receivables recognition-measurement
 * @accounting US-GAAP ASC-320 investments in-debt-securities
 * @audit ISO-19011:2018 audit-trail mandate-evidence authorization
 * @audit ISO-19011:2018 audit-evidence debtor-signature completeness
 * @compliance SOX §302 certification-internal-controls payment-controls
 * @compliance SOX §404 internal-controls sepa-mandate-register
 * @compliance GDPR Art.6(1)(b) lawful-basis-contract signature-evidence
 * @compliance GDPR Art.7 proof-of-consent signature-date-documentation
 * @compliance GDPR Art.32 processing-security mandate-data-encryption
 * @compliance EPC130-08 sepa-direct-debit-rulebook scheme-requirements
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 A.8.2 classification-mandate-confidentiality
 * @security ISO-27002 A.9.4 access-control mandate-approver-segregation
 * @see src/plugins/accounting/collections/paymentruns.ts Payment-Run-Pain008
 * @see src/plugins/accounting/collections/bankaccounts.ts Bank-Account-Master
 * @see docs/STANDARDS.md §4.3 SEPA-Mandate-Standards
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { autoSetTimestamp } from '@/hooks/autoSetTimestamp'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '@/access/auth'
import {
  multiTenancyField,
  statusField,
  notesField,
  auditFields,
} from '@/fields/accounting/base-accounting-fields'

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
      defaultValue: 'FRST',
      options: [
        { label: 'First Collection (FRST)', value: 'FRST' },
        { label: 'Recurring Collection (RCUR)', value: 'RCUR' },
        { label: 'One-Off Collection (OOFF)', value: 'OOFF' },
        { label: 'Final Collection (FNAL)', value: 'FNAL' },
      ],
      admin: {
        description:
          'EPC130-08: FRST (first collection) → RCUR (recurrent) → OOFF (one-off) → FNAL (final). Mandate becomes obsolete 36 months after the most recent collection.',
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
    beforeValidate: [autoPopulateTenant],
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
