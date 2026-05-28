/**
 * CSRD Disclosures — EU CSRD Directive 2022/2464 + ESRS 1/2 mandatory
 * sustainability-reporting register.
 *
 * Slice CCCC (2026-05-10): in-scope EU entities (turnover > €40M /
 * assets > €20M / employees > 250) must publish ESRS-aligned
 * sustainability statements alongside their financial statements
 * starting FY2024. This collection structures the per-disclosure topic
 * (ESRS E1-E5 environmental, S1-S4 social, G1 governance) so the
 * narrative + KPIs + assurance evidence sit in one auditable place.
 *
 * Pairs with `carbon-emissions` (the per-Scope quantitative side) and
 * `audit-findings` (assurance findings).
 *
 * @standard EU CSRD Directive 2022/2464
 * @standard EU ESRS 1 General Requirements
 * @standard EU ESRS 2 General Disclosures
 * @standard ISO 14064-1:2018 ghg-quantification (basis for ESRS E1)
 * @standard EU EFRAG ESRS-XBRL taxonomy
 * @accounting IFRS S1 general-sustainability-disclosure
 * @accounting IFRS S2 climate-disclosures
 * @audit ISAE 3000 limited-assurance (rises to reasonable-assurance under CSRD by 2028)
 * @compliance EU SFDR 2019/2088 sustainable-finance
 * @compliance EU Taxonomy Regulation 2020/852
 * @compliance OECD GRI Standards
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./CarbonEmissions.ts
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '../hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '../hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '../hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '../access/auth'
import { statusField, notesField, auditFields, legalEntityField, taxonomySelect } from '../fields/base-accounting-fields'
import {
  ESRS_CATEGORY_OPTIONS,
  ESRS_TOPIC_OPTIONS,
  ESRS_MATERIALITY_OPTIONS,
  ESRS_ASSURANCE_OPTIONS,
} from '../standards/eu-csrd-esrs'

const CsrdDisclosures: CollectionConfig = {
  slug: 'csrd-disclosures',
  labels: { singular: 'CSRD Disclosure', plural: 'CSRD Disclosures' },
  admin: {
    useAsTitle: 'datapointId',
    defaultColumns: ['datapointId', 'esrsTopic', 'reportingYear', 'materiality', 'assuranceStatus', 'status'],
    description:
      'EU CSRD / ESRS structured disclosure register. One row per ESRS datapoint per reporting year — narrative + KPIs + assurance evidence.',
  },
  access: accountingCollectionAccess({ feature: 'esg_reporting' }),
  fields: [
    legalEntityField({ description: 'Reporting legal entity (CSRD applies at consolidated + subsidiary level under different conditions).' }),
    { name: 'datapointId', type: 'text', required: true, index: true,
      admin: { description: 'EFRAG ESRS datapoint identifier (e.g. ESRS-E1-6-1, ESRS-S1-9-2).' } },
    { name: 'reportingYear', type: 'number', required: true, index: true,
      admin: { description: 'Reporting fiscal year (YYYY).' } },
    taxonomySelect('esrsCategory', ESRS_CATEGORY_OPTIONS, { required: true }),
    taxonomySelect('esrsTopic', ESRS_TOPIC_OPTIONS, { required: true }),
    taxonomySelect('materiality', ESRS_MATERIALITY_OPTIONS, { defaultValue: 'double_material', description: 'ESRS 1 §3 double-materiality assessment outcome.' }),
    { name: 'narrative', type: 'textarea',
      admin: { description: 'Disclosure narrative (machine-extractable for XBRL filing).' } },
    {
      name: 'quantitativeKpi',
      type: 'group',
      fields: [
        { name: 'value', type: 'number' },
        { name: 'unit', type: 'text', admin: { description: 'e.g. tCO2e, m³, %, €, FTE.' } },
        { name: 'methodology', type: 'textarea' },
        { name: 'priorYearComparison', type: 'number' },
        { name: 'targetValue', type: 'number' },
        { name: 'targetYear', type: 'number' },
      ],
    },
    {
      name: 'iro',
      type: 'group',
      admin: { description: 'ESRS 2 IRO (Impacts, Risks, Opportunities) classification.' },
      fields: [
        { name: 'kind', type: 'select', options: [
          { label: 'Impact', value: 'impact' },
          { label: 'Risk', value: 'risk' },
          { label: 'Opportunity', value: 'opportunity' },
        ]},
        { name: 'timeHorizon', type: 'select', options: [
          { label: 'Short-term (≤ 1 yr)', value: 'short' },
          { label: 'Medium-term (1-5 yr)', value: 'medium' },
          { label: 'Long-term (> 5 yr)', value: 'long' },
        ]},
        { name: 'valueChainStage', type: 'select', options: [
          { label: 'Upstream', value: 'upstream' },
          { label: 'Own Operations', value: 'own_ops' },
          { label: 'Downstream', value: 'downstream' },
        ]},
      ],
    },
    taxonomySelect('assuranceStatus', ESRS_ASSURANCE_OPTIONS, { defaultValue: 'not_assured', description: 'CSRD requires limited assurance from FY2024, scaling to reasonable assurance by 2028.' }),
    { name: 'assuranceProvider', type: 'text' },
    { name: 'evidenceAttestation', type: 'relationship', relationTo: 'evidence-attestations',
      admin: { description: 'Signed PDF evidence pack for the disclosure (audit walk-through anchor).' } },
    { name: 'isEUTaxonomyEligible', type: 'checkbox', defaultValue: false,
      admin: { description: 'EU Taxonomy 2020/852 eligibility flag (for E1-E2 environmental KPIs).' } },
    { name: 'isEUTaxonomyAligned', type: 'checkbox', defaultValue: false },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Under Review', value: 'under_review' },
        { label: 'Approved (locked for filing)', value: 'approved' },
        { label: 'Filed (XBRL submitted)', value: 'filed' },
        { label: 'Restated (IAS-8 §42)', value: 'restated' },
      ],
      'draft',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('csrd-disclosures')],
  },
  timestamps: true,
}

export default CsrdDisclosures
