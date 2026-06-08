/**
 * Bank Accounts — master data, separate from BankStatements (transactions).
 *
 * Today bank info is implicit in `BankStatements`. The standards-required
 * normalization splits master (this) from transactions (statements +
 * the eventual `BankTransactions` collection).
 *
 * @standard ISO-13616-1:2020 iban
 * @standard ISO-9362:2022 bic
 * @standard ISO-20022 financial-messaging account-identification
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS IAS-7 statement-of-cash-flows cash-and-equivalents
 * @audit ISO-19011:2018 audit-trail bank-account-master
 * @compliance SOX §404 internal-controls cash-management
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 §8.24 use-of-cryptography iban-bic-encryption
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/standard/collection/hook'
import { tenantAdminWriteAccess } from '@/auth'
import { enforceSegregationOfDuties } from '@/enforce/segregation/of/duty'
import { deriveCountryFromIban } from '@/derive/country/from/iban'
import { currencyField, statusField, notesField, auditFields } from '@/base/accounting/field'
import { isValidIban } from '@/iban'
import { isSwiftBic } from '@/iso/9362'

const BankAccounts: CollectionConfig = {
  slug: 'bank-accounts',
  labels: { singular: 'Bank Account', plural: 'Bank Accounts' },
  admin: { useAsTitle: 'accountName', defaultColumns: ['accountName', 'iban', 'bic', 'currency', 'status'] },
  access: tenantAdminWriteAccess(),
  fields: [
    { name: 'accountName', type: 'text', required: true, admin: { description: 'Friendly label, e.g. "Operating Account — Bulbank EUR".' } },
    {
      name: 'iban',
      type: 'text',
      index: true,
      // ISO-13616-1 §6 mod-97 (ISO-7064) — gate at the field before deriveCountryFromIban runs.
      validate: (v: unknown) => (typeof v === 'string' && v !== '' ? isValidIban(v) || 'Invalid IBAN — ISO-13616-1 §6 mod-97 check failed' : true),
      admin: { description: 'ISO 13616 IBAN. Encrypted at rest (NIST AES-GCM).' },
    },
    {
      name: 'bic',
      type: 'text',
      validate: (v: unknown) => (typeof v === 'string' && v !== '' ? isSwiftBic(v) || 'Invalid BIC — ISO-9362 structure' : true),
      admin: { description: 'ISO 9362 BIC / SWIFT code.' },
    },
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
  hooks: standardCollectionHooks('bank-accounts', { beforeChange: [// Country comes from the IBAN if not explicitly set — single source of
      // truth for downstream country-context API routing.
      deriveCountryFromIban(), enforceSegregationOfDuties()] }),
  timestamps: true,
}

export default BankAccounts
