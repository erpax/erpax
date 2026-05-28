/**
 * Carbon Emissions — EU CSRD ESRS E1 + GHG Protocol Scope 1/2/3 register.
 *
 * Slice CCCC (2026-05-10): mandatory under CSRD ESRS E1 §44-50 for
 * in-scope entities. Each row is one emission event / period
 * accumulation broken into Scope 1 (direct), Scope 2 (purchased
 * electricity / heat / steam / cooling), Scope 3 (value-chain
 * upstream + downstream — 15 sub-categories per GHG Protocol).
 *
 * Pairs with `csrd-disclosures` (the narrative + KPI roll-up) and
 * `evidence-attestations` (per-source verification documents).
 *
 * @standard ISO 14064-1:2018 organisation-level-ghg-quantification
 * @standard ISO 14067:2018 carbon-footprint-of-products
 * @standard GHG Protocol Corporate Standard (revised 2015)
 * @standard GHG Protocol Scope 2 Guidance (2015)
 * @standard GHG Protocol Scope 3 Standard (2011)
 * @standard EU ESRS E1 §44-50 ghg-emissions-disclosure
 * @standard EU ESRS E1 AR-25 location-vs-market-based
 * @accounting IFRS S2 §29-32 climate-related-metrics
 * @audit ISAE 3410 greenhouse-gas-statements
 * @compliance EU SFDR PAI 1 ghg-emissions
 * @compliance EU CBAM Carbon Border Adjustment Mechanism (when applicable)
 * @compliance EU Taxonomy DNSH climate-mitigation
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./CsrdDisclosures.ts
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '../hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '../hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '../hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '../access/auth'
import { statusField, notesField, auditFields, referenceField, legalEntityField, taxonomySelect } from '../fields/base-accounting-fields'
import {
  GHG_SCOPE_OPTIONS,
  GHG_CATEGORY_OPTIONS,
  GHG_METHODOLOGY_OPTIONS,
  GWP_HORIZON_OPTIONS,
} from '../standards/ghg-protocol'

const CarbonEmissions: CollectionConfig = {
  slug: 'carbon-emissions',
  labels: { singular: 'Carbon Emission Record', plural: 'Carbon Emissions' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'scope', 'category', 'reportingYear', 'tCO2eValue', 'methodology', 'status'],
    description:
      'GHG Protocol Scope 1/2/3 emissions register. One row per (source × reporting period) — substantiates the ESRS E1 §44-50 disclosure totals.',
  },
  access: accountingCollectionAccess({ feature: 'esg_reporting' }),
  fields: [
    referenceField(),
    legalEntityField(),
    { name: 'reportingYear', type: 'number', required: true, index: true },
    { name: 'reportingPeriod', type: 'relationship', relationTo: 'fiscal-periods' },
    taxonomySelect('scope', GHG_SCOPE_OPTIONS, { required: true, description: 'GHG Protocol scope per Corporate Standard §6.' }),
    taxonomySelect('category', GHG_CATEGORY_OPTIONS, { required: true, description: '22-category disaggregation per GHG Protocol Scope 1/2/3 standards.' }),
    {
      name: 'activityData',
      type: 'group',
      fields: [
        { name: 'value', type: 'number', required: true,
          admin: { description: 'Underlying activity quantity (e.g. litres of diesel, kWh, km driven, kg of waste).' } },
        { name: 'unit', type: 'text', required: true,
          admin: { description: 'Unit of measure for the activity quantity.' } },
        { name: 'sourceDescription', type: 'text',
          admin: { description: 'What generated the emission (e.g. fleet vehicle reg, building meter ID).' } },
      ],
    },
    {
      name: 'emissionFactor',
      type: 'group',
      fields: [
        { name: 'value', type: 'number', required: true,
          admin: { description: 'Emission factor (e.g. kgCO2e per kWh, per litre, per kg).' } },
        { name: 'unit', type: 'text', required: true },
        { name: 'sourceRef', type: 'text',
          admin: { description: 'Source — DEFRA / IEA / EPA / supplier-specific (ISAE 3410 evidence trail).' } },
        taxonomySelect('gwpHorizon', GWP_HORIZON_OPTIONS, { defaultValue: 'gwp_100' }),
      ],
    },
    { name: 'tCO2eValue', type: 'number', required: true,
      admin: { description: 'Total tonnes CO2-equivalent (activityData.value × emissionFactor.value, normalised).' } },
    {
      name: 'gasBreakdown',
      type: 'group',
      admin: { description: 'Optional per-gas split (CO2 / CH4 / N2O / HFC / PFC / SF6 / NF3) per ESRS E1 §50.' },
      fields: [
        { name: 'co2', type: 'number', defaultValue: 0 },
        { name: 'ch4', type: 'number', defaultValue: 0 },
        { name: 'n2o', type: 'number', defaultValue: 0 },
        { name: 'hfc', type: 'number', defaultValue: 0 },
        { name: 'pfc', type: 'number', defaultValue: 0 },
        { name: 'sf6', type: 'number', defaultValue: 0 },
        { name: 'nf3', type: 'number', defaultValue: 0 },
      ],
    },
    taxonomySelect('methodology', GHG_METHODOLOGY_OPTIONS, { defaultValue: 'spend_based', description: 'GHG Protocol Scope 3 §7.3 data-quality hierarchy.' }),
    {
      name: 'dataQuality',
      type: 'select',
      defaultValue: 'measured',
      options: [
        { label: 'Measured (meter / sensor)', value: 'measured' },
        { label: 'Calculated', value: 'calculated' },
        { label: 'Estimated', value: 'estimated' },
        { label: 'Default Factor', value: 'default_factor' },
      ],
    },
    { name: 'isVerified', type: 'checkbox', defaultValue: false,
      admin: { description: 'ISAE 3410 third-party verification flag.' } },
    { name: 'verifierName', type: 'text' },
    { name: 'verificationDate', type: 'date' },
    { name: 'evidenceAttestation', type: 'relationship', relationTo: 'evidence-attestations' },
    { name: 'cbamRelevant', type: 'checkbox', defaultValue: false,
      admin: { description: 'EU CBAM (Carbon Border Adjustment Mechanism) relevance flag for cross-border carbon-intensive goods.' } },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Submitted (for verification)', value: 'submitted' },
        { label: 'Verified', value: 'verified' },
        { label: 'Filed (in CSRD report)', value: 'filed' },
        { label: 'Restated', value: 'restated' },
      ],
      'draft',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('carbon-emissions')],
  },
  timestamps: true,
}

export default CarbonEmissions
