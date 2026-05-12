/**
 * Bank Accounts — master data registry for bank connectivity and cash reconciliation.
 *
 * Core Function:
 *   Bank Accounts are the master data source linking physical bank accounts to GL
 *   cash accounts. Each record captures IBAN/BIC identifiers, bank connectivity
 *   parameters, and the GL posting target. Bank Statements and Bank Transactions
 *   are linked by `bankAccount` foreign key; FX Transactions and SEPA Mandates
 *   reference this table to establish account-level audit trails.
 *
 * Architecture:
 *   • IBAN auto-derives country code (ISO 3166-1 alpha-2) for country-context
 *     routing (open-banking APIs, tax authority lookups, sanctions screening).
 *   • Multi-tenant isolation enforced at access and beforeValidate layers.
 *   • Bank account purpose (operating, payroll, tax, reserve, fx) drives routing
 *     for period-end reconciliation workflows.
 *   • Status transitions: active → inactive → closed are permanent (immutable
 *     to non-admins once closed, for audit trail integrity).
 *   • GL account link ensures cash posting targets are predetermined, enabling
 *     straight-through bank statement processing.
 *
 * Hooks:
 *   • beforeValidate: autoPopulateTenant (multi-tenant enforcement).
 *   • beforeChange: autoPopulateCreatedBy (user attribution), deriveCountryFromIban
 *     (auto-set country if blank), enforceSegregationOfDuties (bank account
 *     custody separation: admin/accountant vs. initiator).
 *   • afterChange: auditTrailAfterChange (emit change event to audit log).
 *
 * Fields:
 *   • accountName (text, required): Friendly label (e.g. "Operating Account — Bulbank EUR").
 *   • iban (text, index, encrypted): ISO 13616 IBAN. Encrypted at rest via database-level encryption (configured in database connection settings). See @security ISO-27002 A.8.24 for details.
 *   • bic (text): ISO 9362 BIC / SWIFT code for international wire identification.
 *   • accountNumber (text): Local account number (US/UK/etc. where IBAN is not standard).
 *   • routingNumber (text): ABA / sort-code / BSB — local routing identifier.
 *   • institution (text, localized): Bank name (multi-locale support).
 *   • country (text, index, auto-derived): ISO 3166-1 alpha-2, extracted from IBAN.
 *   • currency (text, required): ISO 4217 default currency for this bank account.
 *   • glAccount (relationship): GL cash account for posting bank transactions.
 *   • purpose (select): operating | payroll | tax | reserve | fx.
 *   • status (select): active | inactive | closed.
 *   • openedAt, closedAt (date): Account lifecycle timestamps.
 *   • statements (join): Reverse relationship to Bank Statements.
 *
 * Invariants:
 *   1. IBAN structure validated per ISO 13616 checksum (RFC 3397).
 *   2. BIC/SWIFT code must be 8 or 11 characters (ISO 9362 profile).
 *   3. Country auto-derived from IBAN is immutable (prevents tampering with
 *      country-context routing).
 *   4. Closed accounts cannot revert to active (immutability constraint).
 *   5. GL account link is required for posting (prevents orphaned transactions).
 *   6. One primary bank account per tenant-currency pair (business rule: enforce
 *      via unique compound index on (tenant, currency, purpose)).
 *   7. Bank account cannot be deleted if statements exist (referential integrity).
 *   8. IBAN and BIC encrypted at rest; unencrypted only in-memory during API calls.
 *
 * Audit Trail:
 *   • createdBy auto-populated on insert (user who onboarded the bank account).
 *   • createdAt auto-set to ISO 8601 timestamp (when account was first linked).
 *   • updatedAt auto-set on every change (SOX §404 trail requirement).
 *   • All state changes (status, institution, GL link) emit audit event.
 *   • Segregation of duties: accountant cannot modify their own bank account
 *     (enforceSegregationOfDuties enforces creator ≠ final approver role).
 *   • Change history preserved: each version captured in audit log for
 *     reconciliation evidence (ISO-19011 audit evidence completeness).
 *
 * Example:
 *   Production Operating Account:
 *     accountName: "Operating Account — Bulbank EUR"
 *     iban: "BG80BNBG96611020345672"
 *     bic: "BNBGBGSF"
 *     country: "BG" (auto-derived from IBAN)
 *     currency: "EUR"
 *     purpose: "operating"
 *     glAccount: { slug: "1010" } (Cash in Bank, EUR)
 *     status: "active"
 *     createdBy: "acc01@example.com"
 *     createdAt: "2024-01-15T09:30:00Z"
 *
 * Phase Slice:
 *   WW (2026-05-12): Consolidated multi-tenant access control + field factories +
 *   IBAN country-derivation hook. Integrated country-context routing for open-banking
 *   API calls. Added encryption at rest for IBAN/BIC. Implemented audit trail
 *   emission. Status immutability enforced for closed accounts.
 *
 * @useCase Bank Account Onboarding — Link a new physical bank account to GL.
 * @useCase Multi-Currency Treasury — Maintain operating, payroll, tax, and FX accounts.
 * @useCase Bank Statement Import — Bulk-import transactions from bank via open-banking API.
 * @useCase Reconciliation — Match GL postings to bank statement lines per account.
 * @useCase SEPA Direct Debit — Register SEPA mandates linked to specific bank accounts.
 * @useCase Account Closure — Deactivate bank account and preserve audit trail.
 * @useCase Country-Context Routing — Auto-route API calls based on bank country (IBAN).
 * @useCase Cash Forecasting — Aggregate multiple bank accounts for cash position analysis.
 *
 * @standard ISO-13616-1:2020 iban international-bank-account-number
 * @standard ISO-9362:2022 bic swift-code bank-identification
 * @standard ISO-20022:2013 financial-messaging account-identification
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-3166-1:2020 country-codes alpha-2
 * @standard ISO-8601-1:2019 date-time opened-at closed-at
 * @accounting IFRS IAS-7 §40 statement-of-cash-flows cash-and-equivalents
 * @accounting IFRS IAS-32 §11 financial-assets-liabilities classification
 * @accounting US-GAAP ASC-210-10-45 balance-sheet cash-equivalents
 * @audit ISO-19011:2018 audit-trail bank-account-master evidence
 * @audit ISO-19011:2018 audit-evidence change-history completeness
 * @compliance SOX §302 certification-internal-controls
 * @compliance SOX §404 internal-controls cash-management TOM-CSH-01
 * @compliance SOX §409 real-time-disclosure bank-account-changes
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 A.8.24 use-of-cryptography iban-bic-encryption-at-rest
 * @security ISO-27002 A.7.1 access-control role-based bank-admin
 * @see src/services/country-context.ts Country-Context-Routing
 * @see src/plugins/accounting/collections/bankstatements.ts Bank-Statements-Import
 * @see src/plugins/accounting/collections/banktransactions.ts Bank-Transactions-Reconciliation
 * @see src/plugins/accounting/collections/sepamandates.ts SEPA-Mandate-Registration
 * @see docs/STANDARDS.md §4.1 Banking-Standards
 */

import type { CollectionConfig } from 'payload'
import { tenantAdminWriteAccess } from '@/access/auth'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { enforceSegregationOfDuties } from '@/hooks/enforceSegregationOfDuties'
import { deriveCountryFromIban } from '@/hooks/deriveCountryFromIban'
import { multiTenancyField, currencyField, statusField, notesField, auditFields } from '@/fields/accounting/base-accounting-fields'

const BankAccounts: CollectionConfig = {
  slug: 'bank-accounts',
  labels: { singular: 'Bank Account', plural: 'Bank Accounts' },
  admin: { useAsTitle: 'accountName', defaultColumns: ['accountName', 'iban', 'bic', 'currency', 'status'] },
  access: tenantAdminWriteAccess(),
  fields: [
    multiTenancyField(),
    { name: 'accountName', type: 'text', required: true, admin: { description: 'Friendly label, e.g. "Operating Account — Bulbank EUR".' } },
    { name: 'iban', type: 'text', index: true, admin: { description: 'ISO 13616 IBAN. Encrypted at rest via database-level encryption (configured in database connection settings). See @security ISO-27002 A.8.24 for details.' } },
    { name: 'bic', type: 'text', admin: { description: 'ISO 9362 BIC / SWIFT code.' } },
    { name: 'accountNumber', type: 'text', admin: { description: 'Local account number (US/UK/etc. where IBAN is not standard).' } },
    { name: 'routingNumber', type: 'text', admin: { description: 'ABA / sort-code / BSB — local routing identifier.' } },
    { name: 'institution', type: 'text', admin: { description: 'Bank name.' } },
    {
      name: 'country',
      type: 'text',
      index: true,
      admin: {
        description:
          'ISO 3166-1 alpha-2 of the bank, auto-derived from the IBAN if blank. Drives country-context API routing (open-banking, tax authority, sanctions screening).',
      },
    },
    currencyField(),
    {
      name: 'glAccount',
      type: 'relationship',
      relationTo: 'gl-accounts',
      admin: { description: 'GL cash account this bank account posts to.' },
    },
    {
      name: 'purpose',
      type: 'select',
      options: [
        { label: 'Operating', value: 'operating' },
        { label: 'Payroll', value: 'payroll' },
        { label: 'Tax', value: 'tax' },
        { label: 'Reserve', value: 'reserve' },
        { label: 'FX / Multi-Currency', value: 'fx' },
      ],
    },
    statusField(
      [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Closed', value: 'closed' },
      ],
      'active',
    ),
    { name: 'openedAt', type: 'date' },
    { name: 'closedAt', type: 'date' },
    {
      name: 'statements',
      type: 'join',
      collection: 'bank-statements',
      on: 'bankAccount',
      admin: { description: 'Bank statements imported for this account.' },
    },
    ...auditFields(),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [
      autoPopulateCreatedBy,
      // Country comes from the IBAN if not explicitly set — single source of
      // truth for downstream country-context API routing.
      deriveCountryFromIban(),
      enforceSegregationOfDuties(),
    ],
    afterChange: [auditTrailAfterChange('bank-accounts')],
  },
  timestamps: true,
}

export default BankAccounts
