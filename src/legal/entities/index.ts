/**
 * Legal Entities — IFRS-10 §B86 group structure (distinct from `tenants`).
 *
 * Slice ZZZ (2026-05-10): added because `tenants` currently conflates
 * **two** orthogonal concepts: (1) the DB partition / SaaS customer, and
 * (2) the **reporting legal entity** — the company that issues invoices,
 * files tax returns, and signs financial statements. One tenant may
 * legitimately own many legal entities (a Bulgarian holding with a
 * Romanian subsidiary and a German GmbH operates one ERPax tenant but
 * three separately-reporting entities).
 *
 * IFRS 10 §B86 + ASC 810-10-45 require a distinct entity record per
 * subsidiary / associate / joint-venture so consolidation eliminations
 * (`consolidation-eliminations`) and intercompany pairings
 * (`intercompany-transactions`) can target the correct entity.
 *
 * The `tenant` partition still owns the row (data isolation per ISO
 * 27001 A.5.23); the legal-entity relationship lets every accounting
 * row optionally tag *which* entity it posts to.
 *
 * @standard ISO-3166-1:2020 country-codes
 * @standard ISO-4217:2015 currency-codes functional-currency
 * @standard ISO-17442-1:2020 lei legal-entity-identifier
 * @standard ISO-8601-1:2019 date-time effective-period
 * @accounting IFRS IFRS-10 §B86 consolidation-procedures
 * @accounting IFRS IFRS-12 §10 §11 §B4-B6 disclosure-of-interests-in-other-entities
 * @accounting IFRS IAS-27 §9 separate-financial-statements (parent-only FS use this same legal-entity registry)
 * @accounting IFRS IFRS-18 §9 §10 presentation-and-disclosure (effective 2027-01 — entity-level taxonomy)
 * @accounting IFRS IAS-21 §9 functional-currency
 * @accounting IFRS IAS-1 §138 disclosure-of-name-and-domicile
 * @accounting US-GAAP ASC-810-10-45 consolidation
 * @accounting US-GAAP ASC-280 segment-reporting
 * @compliance OECD BEPS Action 13 master-file-entity-list
 * @compliance EU DAC-6 reportable-cross-border-arrangements
 * @audit ISO-19011:2018 audit-trail entity-master
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./IntercompanyTransactions.ts
 * @see ./ConsolidationEliminations.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/standard/collection/hook'
import { accountingCollectionAccess } from '@/auth'
import { currencyField, statusField, notesField, auditFields, referenceField, countryCodeField, naceCodeField } from '@/base/accounting/field'

const LegalEntities: CollectionConfig = {
  slug: 'legal-entities',
  labels: { singular: 'Legal Entity', plural: 'Legal Entities' },
  admin: {
    useAsTitle: 'legalName',
    defaultColumns: ['legalName', 'countryCode', 'registrationNumber', 'consolidationMethod', 'isHeadEntity', 'status'],
    description:
      'Per IFRS-10 §B86 reporting entity (subsidiary / associate / joint-venture / head). Distinct from `tenants` (DB partition). Drives consolidation-eliminations + intercompany pairing.',
  },
  access: accountingCollectionAccess({ feature: 'consolidation' }),
  fields: [
    { name: 'legalName', type: 'text', required: true, index: true,
      admin: { description: 'Full legal name as registered in the home jurisdiction (IAS-1 §138(a)).' } },
    { name: 'tradeName', type: 'text',
      admin: { description: 'Trading / brand name when different from the legal name.' } },
    {
      name: 'legalForm',
      type: 'select',
      options: [
        { label: 'Sole Proprietor / ET', value: 'sole_proprietor' },
        { label: 'LLC / EOOD / SARL / GmbH / Ltd', value: 'llc' },
        { label: 'Joint-Stock Company / AD / SA / AG / plc', value: 'jsc' },
        { label: 'Partnership / SD', value: 'partnership' },
        { label: 'Limited Partnership / KD', value: 'limited_partnership' },
        { label: 'Cooperative', value: 'cooperative' },
        { label: 'Branch (foreign entity)', value: 'branch' },
        { label: 'Representative Office (no commercial activity)', value: 'rep_office' },
        { label: 'Non-Profit / Foundation', value: 'non_profit' },
        { label: 'Other', value: 'other' },
      ],
      admin: { description: 'Statutory legal form per the home jurisdiction commerce code.' },
    },
    countryCodeField({ required: true, description: 'ISO 3166-1 alpha-2 — country of registration (BG / DE / RO / etc.).' }),
    referenceField({ name: 'registrationNumber', description: 'Statutory company / commercial-register number (BG EIK, DE HRB, RO J-number, etc.).' }),
    { name: 'vatNumber', type: 'text', index: true,
      admin: { description: 'EU VAT identifier (BG123456789 / DE123456789 / etc.) — VIES-validatable.' } },
    { name: 'lei', type: 'text', unique: true, index: true,
      admin: { description: 'ISO 17442-1:2020 Legal Entity Identifier (20-char) — required for derivatives + securities reporting.' } },
    {
      name: 'consolidationMethod',
      type: 'select',
      defaultValue: 'full',
      options: [
        { label: 'Full Consolidation (subsidiary, control)', value: 'full' },
        { label: 'Equity Method (associate, significant influence)', value: 'equity' },
        { label: 'Proportionate (joint operation)', value: 'proportionate' },
        { label: 'Cost Method (no influence)', value: 'cost' },
        { label: 'Not Consolidated (head entity itself)', value: 'not_consolidated' },
      ],
      admin: { description: 'IFRS-10 §B86 / IAS-28 §16 / IFRS-11 §20 consolidation method for this entity in the group accounts.' },
    },
    {
      name: 'consolidationStatus',
      type: 'select',
      defaultValue: 'subsidiary',
      options: [
        { label: 'Head / Reporting Parent', value: 'head' },
        { label: 'Subsidiary (>50% / control)', value: 'subsidiary' },
        { label: 'Associate (20-50% / significant influence)', value: 'associate' },
        { label: 'Joint Venture (joint control)', value: 'joint_venture' },
        { label: 'Joint Operation', value: 'joint_operation' },
        { label: 'Investment (no influence)', value: 'investment' },
      ],
    },
    { name: 'isHeadEntity', type: 'checkbox', defaultValue: false,
      admin: { description: 'Mark the reporting parent — exactly one head per consolidation group; used by `consolidation-eliminations` to anchor eliminations.' } },
    { name: 'parent', type: 'relationship', relationTo: 'legal-entities',
      admin: { description: 'Direct parent in the group structure (null for the head entity).' } },
    { name: 'ownershipPercent', type: 'number', min: 0, max: 100,
      admin: { description: 'Direct ownership of this entity by `parent` (0-100%). For NCI calculation per IFRS-10 §22.' } },
    { name: 'votingPercent', type: 'number', min: 0, max: 100,
      admin: { description: 'Direct voting rights — may differ from ownership when dual-class shares exist (IFRS-10 §B36).' } },
    currencyField({ name: 'functionalCurrency', defaultValue: 'EUR' }),
    currencyField({ name: 'presentationCurrency', defaultValue: 'EUR' }),
    {
      name: 'reportingFramework',
      type: 'select',
      defaultValue: 'ifrs',
      options: [
        { label: 'IFRS', value: 'ifrs' },
        { label: 'IFRS for SMEs', value: 'ifrs_sme' },
        { label: 'US GAAP', value: 'us_gaap' },
        { label: 'Local GAAP', value: 'local_gaap' },
      ],
      admin: { description: 'Standalone (statutory) reporting framework. Group consolidation may translate up to a different parent framework.' },
    },
    { name: 'ifrsAdoptionDate', type: 'date',
      admin: { description: 'IFRS 1 first-time-adoption transition date.' } },
    { name: 'statutoryYearEnd', type: 'text',
      admin: { description: 'MM-DD format (e.g. `12-31`, `06-30`). Drives the entity\'s fiscal-period calendar.' } },
    {
      name: 'registeredAddress',
      type: 'group',
      fields: [
        { name: 'street', type: 'text' },
        { name: 'city', type: 'text' },
        { name: 'postalCode', type: 'text' },
        { name: 'region', type: 'text' },
        { name: 'countryCode', type: 'text' },
      ],
      admin: { description: 'Statutory registered office (IAS-1 §138(a)).' },
    },
    { name: 'sicCode', type: 'text',
      admin: { description: 'US Standard Industrial Classification code (US SIC).' } },
    naceCodeField(),
    { name: 'effectiveFrom', type: 'date', required: true,
      admin: { description: 'Date entity was incorporated / acquired into the group.' } },
    { name: 'effectiveTo', type: 'date',
      admin: { description: 'Date entity was deconsolidated / sold / dissolved (null = active).' } },
    statusField(
      [
        { label: 'Active', value: 'active' },
        { label: 'Dormant', value: 'dormant' },
        { label: 'In Liquidation', value: 'in_liquidation' },
        { label: 'Dissolved', value: 'dissolved' },
        { label: 'Acquired (subsumed)', value: 'acquired' },
      ],
      'active',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('legal-entities'),
  timestamps: true,
}

export default LegalEntities
