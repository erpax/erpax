/**
 * Sectors — erpax's place for ANY part of society, named by the standards.
 *
 * Every part of society — a ministry, a hospital, a school, a farm, a court, a
 * union, a church, an NGO, a household, a firm — is NOT a new collection but a
 * coordinate on ONE taxonomy (the `dimension` law: a per-part prefix becomes a
 * code, not a table). A typeless party, a connection, a transaction, or a
 * tenant references its `sector`; that is how erpax holds the whole society on
 * one graph. Self-referential hierarchy; complete-in-itself even while the
 * data is empty (the sequence: all is defined via the identity element even
 * when nothing is defined yet).
 *
 * The parts are NAMED and ENCODED by the canonical UN/EU classification stack:
 * @standard UN SNA-2008 institutional-sectors (S.11/S.12 corporations · S.13 government · S.14 households · S.15 NPISH)
 * @standard UN ISIC Rev.4 international-standard-industrial-classification (economic activity)
 * @standard EU NACE Rev.2 economic-activities
 * @standard UN COFOG classification-of-the-functions-of-government (10 divisions)
 * @standard UN/Johns-Hopkins ICNPO international-classification-of-non-profit-organizations (civil society)
 * @standard UN COICOP household-consumption-functions
 * @standard UN 2030-Agenda Sustainable-Development-Goals (17 goals — society's outcomes)
 * @standard ISO 3166-1:2020 country-codes (geographic level)
 * @audit ISO-19011:2018 audit-trail transparent-societal-ledger
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ../Connections/index.ts · ../Users/index.ts · ../LegalEntities/index.ts
 */
import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '../../hooks/standardCollectionHooks'
import { accountingCollectionAccess } from '../../access/auth'
import { statusField, notesField, auditFields, referenceField, naceCodeField } from '../../fields/base-accounting-fields'

const Sectors: CollectionConfig = {
  slug: 'sectors',
  labels: { singular: 'Sector', plural: 'Sectors' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['reference', 'name', 'institutionalSector', 'isicCode', 'cofogDivision'],
    description:
      'The taxonomy of every part of society — named and encoded by SNA / ISIC / COFOG / ICNPO / SDG. Parties, connections, transactions and tenants reference their sector.',
    group: 'Society',
  },
  access: accountingCollectionAccess(),
  fields: [
    referenceField({ description: 'Sector code (the human key; content-uuid is the machine key).' }),
    { name: 'name', type: 'text', required: true, index: true },
    { name: 'description', type: 'textarea' },
    { name: 'parent', type: 'relationship', relationTo: 'sectors',
      admin: { description: 'Parent in the societal hierarchy (self-referential).' } },
    // ── Institutional sector (UN SNA-2008): the canonical partition of society ──
    { name: 'institutionalSector', type: 'select',
      admin: { description: 'UN SNA-2008 institutional sector — the top partition of society.' },
      options: [
        { label: 'S.11 Non-financial corporations', value: 's11_nonfinancial_corporations' },
        { label: 'S.12 Financial corporations', value: 's12_financial_corporations' },
        { label: 'S.13 General government', value: 's13_general_government' },
        { label: 'S.14 Households', value: 's14_households' },
        { label: 'S.15 Non-profit institutions serving households (NPISH)', value: 's15_npish' },
      ] },
    // ── Economic activity (ISIC Rev.4 / NACE Rev.2) ──
    { name: 'isicCode', type: 'text', index: true,
      admin: { description: 'UN ISIC Rev.4 economic-activity code (the sector of production).' } },
    naceCodeField({ description: 'EU NACE Rev.2 activity code (interoperable with ISIC Rev.4).' }),
    // ── Government function (COFOG) — for the S.13 public part ──
    { name: 'cofogDivision', type: 'select',
      admin: { description: 'UN COFOG division — the function of government this sector serves.' },
      options: [
        { label: '01 General public services', value: 'cofog_01' },
        { label: '02 Defence', value: 'cofog_02' },
        { label: '03 Public order and safety', value: 'cofog_03' },
        { label: '04 Economic affairs', value: 'cofog_04' },
        { label: '05 Environmental protection', value: 'cofog_05' },
        { label: '06 Housing and community amenities', value: 'cofog_06' },
        { label: '07 Health', value: 'cofog_07' },
        { label: '08 Recreation, culture and religion', value: 'cofog_08' },
        { label: '09 Education', value: 'cofog_09' },
        { label: '10 Social protection', value: 'cofog_10' },
      ] },
    // ── Civil society (ICNPO) — for the S.15 NPISH part ──
    { name: 'icnpoGroup', type: 'text',
      admin: { description: 'ICNPO group (civil-society / non-profit classification).' } },
    // ── Outcome alignment (UN SDG) ──
    { name: 'sdgGoal', type: 'number', min: 1, max: 17,
      admin: { description: 'UN Sustainable Development Goal (1-17) this sector primarily advances.' } },
    { name: 'countryCode', type: 'text', index: true,
      admin: { description: 'ISO 3166-1 alpha-2 — geographic scope (blank = supranational/global).' } },
    statusField(
      [
        { label: 'Active', value: 'active' },
        { label: 'Merged', value: 'merged' },
        { label: 'Retired', value: 'retired' },
      ],
      'active',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('sectors'),
  timestamps: true,
}

export default Sectors
