/**
 * # CSRD Disclosures
 *
 * @summary EU CSRD Directive 2022/2464 + ESRS sustainability disclosures: double-materiality assessment, narrative + KPIs, assurance evidence.
 *
 * ## Core Function
 *
 * CSRD Disclosures is the mandatory sustainability-reporting register for EU entities subject to Corporate
 * Sustainability Reporting Directive (CSRD 2022/2464). In-scope entities (turnover > €40M / assets > €20M /
 * employees > 250) must publish ESRS-aligned sustainability statements starting FY2024 (first report FY2025
 * for 2025 fiscal year). Each record is one ESRS datapoint per reporting year (e.g., ESRS-E1-6-1 = GHG Emissions
 * Energy, one row per FY). The collection structures per-disclosure: topic (E1-E5 environmental, S1-S4 social, G1
 * governance), narrative text (machine-extractable for XBRL filing), quantitative KPI (value + unit + year-on-year
 * comparison), IRO classification (Impact/Risk/Opportunity per ESRS 2), materiality assessment (double-materiality:
 * financial ↔ impact), and assurance evidence (ISAE 3000 limited assurance FY2024-2027, reasonable by 2028).
 * Pairs with carbon-emissions (per-Scope quantitative detail) and evidence-attestations (audit walk-through anchor).
 *
 * ## Architecture
 *
 * Multi-tenant + multi-entity: each CSRD disclosure references legalEntity + reportingYear (consolidated or
 * subsidiary scope per CSRD transitional rules). Double-materiality assessment (esrsCategory + esrsTopic + materiality
 * field) captures financial ↔ impact perspective. Narrative (machine-extractable per EFRAG ESRS-XBRL taxonomy) is
 * mapped to standard datapoint IDs (ESRS-E1-6-1, etc.) for XBRL filing conversion. quantitativeKpi group holds
 * value + unit + methodology + year-on-year comparison + target tracking. iro group captures ESRS 2 classification
 * (Impact/Risk/Opportunity + time-horizon + value-chain stage). assuranceStatus (not_assured → limited → reasonable)
 * and evidenceAttestation (audit walk-through reference) enable compliance audit trail. Filing status (draft → under_review
 * → approved → filed → restated per IAS-8 §42) enforces segregation of duties: draft/review by sustainability team, approval
 * by CFO, filing by legal/tax. EU Taxonomy eligibility flags (isEUTaxonomyEligible/isEUTaxonomyAligned) drive Taxonomy
 * Regulation 2020/852 reporting subset.
 *
 * ## Hooks & Validation
 *
 * - **beforeValidate:** autoPopulateTenant — multi-tenant scoping.
 * - **beforeChange:** autoPopulateCreatedBy.
 * - **afterChange:** auditTrailAfterChange — log all narrative updates, KPI changes, materiality shifts, assurance status transitions.
 *
 * ## Key Fields
 *
 * - **legalEntity (relationship to legal-entities, required):** Reporting entity (consolidated group or subsidiary). Used for scope determination per CSRD transitional rules.
 * - **datapointId (text, required, indexed):** EFRAG ESRS datapoint identifier (e.g., ESRS-E1-6-1, ESRS-S1-9-2). Maps to XBRL instance document element.
 * - **reportingYear (number, required, indexed):** Fiscal year of disclosure (YYYY, e.g., 2025). Used for period grouping and year-on-year comparison.
 * - **esrsCategory (select, required):** ESRS disclosure category: E (environmental) | S (social) | G (governance). @standard EU ESRS taxonomy.
 * - **esrsTopic (select, required):** ESRS sub-topic: E1 (Climate Change) | E2 (Pollution) | E3 (Water) | E4 (Biodiversity) | E5 (Resource Use) | S1 (Own Workforce) | S2 (Workers in Value Chain) | S3 (Affected Communities) | S4 (Consumers) | G1 (Business Conduct). @standard EU ESRS 1/2.
 * - **materiality (select, default=double_material):** Double-materiality assessment outcome: double_material (both financial + impact) | financial_material_only | impact_material_only | not_material. ESRS 1 §3 assessment.
 * - **narrative (textarea):** Disclosure narrative text (machine-extractable for XBRL instance document per EFRAG taxonomy). @standard EU EFRAG ESRS-XBRL mapping.
 * - **quantitativeKpi.value (number):** Metric value (e.g., 10000 for GHG Scope 1 in tCO2e).
 * - **quantitativeKpi.unit (text):** Unit of measurement (e.g., tCO2e, m³, %, €, FTE). @standard ISO 80000 (quantities + units).
 * - **quantitativeKpi.methodology (textarea):** Calculation methodology (e.g., "ISO 14064-1:2018 tier 1 calculation", "GRI 305 Scope 1 emissions"). Audit evidence for quantification approach.
 * - **quantitativeKpi.priorYearComparison (number):** Prior fiscal year value (enables year-on-year trend analysis).
 * - **quantitativeKpi.targetValue (number):** Disclosure target value (e.g., net-zero target for 2050).
 * - **quantitativeKpi.targetYear (number):** Target achievement year (YYYY).
 * - **iro.kind (select):** ESRS 2 classification: impact | risk | opportunity. Impact = current/historical; Risk = potential negative; Opportunity = potential positive.
 * - **iro.timeHorizon (select):** Time perspective: short (≤1yr) | medium (1-5yr) | long (>5yr).
 * - **iro.valueChainStage (select):** Scope: upstream (Tier 1+ suppliers) | own_ops (direct operations) | downstream (customers/distributors).
 * - **assuranceStatus (select, default=not_assured):** CSRD assurance level: not_assured | limited (ISAE 3000 limited, FY2024-2027) | reasonable (rises to reasonable by 2028 per CSRD Annex VI). @standard ISAE 3000.
 * - **assuranceProvider (text):** Name of assurance provider (Big 4 audit firm, regional firm, etc.). For transparency + compliance.
 * - **evidenceAttestation (relationship to evidence-attestations):** Audit walk-through anchor: signed PDF with assurance opinion, methodology detail, scope definition. Enables audit trail.
 * - **isEUTaxonomyEligible (checkbox, default=false):** EU Taxonomy Regulation 2020/852 eligibility flag. Drives Taxonomy-aligned KPI reporting (environmentally sustainable activities).
 * - **isEUTaxonomyAligned (checkbox, default=false):** Taxonomy-aligned flag (both eligible + DNSH criteria met). Used for green-finance disclosure.
 * - **status (select, default=draft):** Workflow: draft | under_review | approved | filed | restated. Controls edit access + filing permission.
 * - **auditFields() (group, readOnly):** createdBy, createdAt, updatedAt, updatedBy. Standard Payload audit metadata.
 * - **notes (textarea):** Internal notes (e.g., "Scope 3 GHG emissions methodology updated per IPCC AR6", "Materiality reassessed per ESG steering committee 2025-03-15").
 *
 * ## Core Invariants
 *
 * - **datapoint uniqueness:** (datapointId, legalEntity, reportingYear) tuple is unique. No duplicate disclosures per entity per fiscal year per datapoint.
 * - **status immutability forward:** Status transitions only: draft → under_review → approved → filed. Amendments require restated status (new record).
 * - **materiality immutability post-approved:** Once status=approved, materiality assessment cannot change (audit trail lock). Reassessments require new record + restated amendment.
 * - **assurance escalation:** assuranceStatus can only move forward (not_assured → limited → reasonable); no reversals.
 * - **Taxonomy eligibility logic:** isEUTaxonomyAligned=true requires isEUTaxonomyEligible=true (validation).
 * - **KPI year-on-year consistency:** priorYearComparison must reference prior fiscal year (reportingYear - 1) for continuity check.
 *
 * ## Audit Trail
 *
 * Every record captures: createdBy (user + timestamp), modifiedBy (user + timestamp), lastModified (ISO-8601), lastModifiedBy (user ID).
 * All changes logged to audit-events collection with full field deltas (datapointId, narrative old→new, value old→new, materiality old→new, assuranceStatus old→new).
 * Materiality shift (double_material → financial_material_only) is audit-logged (impacts disclosure scope under CSRD Annex II).
 * assuranceStatus transitions (not_assured → limited) are logged with assuranceProvider + evidenceAttestation reference.
 * Status transitions (draft → filed) are audit-logged with segregation-of-duties check (approver ≠ creator).
 * Restated amendments include backlink to prior year/version for audit chain (IAS-8 §42 restatement tracking).
 * @standard ISAE 3000 audit evidence retention (assurance report anchor via evidenceAttestation).
 * @standard EU CSRD Directive 2022/2464 Annex I audit-trail documentation.
 *
 * ## Example
 *
 * ```javascript
 * {
 *   "_id": "csrd-uuid",
 *   "legalEntity": "ref-to-legal-entity-bg",
 *   "datapointId": "ESRS-E1-6-1",
 *   "reportingYear": 2025,
 *   "esrsCategory": "E",
 *   "esrsTopic": "E1",
 *   "materiality": "double_material",
 *   "narrative": "Our company generated 15,000 tCO2e Scope 1 emissions in FY2025 (down 5% vs FY2024) from energy generation and logistics. We are committed to net-zero by 2050 per Science Based Targets initiative.",
 *   "quantitativeKpi": {
 *     "value": 15000,
 *     "unit": "tCO2e",
 *     "methodology": "ISO 14064-1:2018 Tier 1 calculation; natural gas + diesel fuel consumption × emission factors per IPCC AR6.",
 *     "priorYearComparison": 15789,
 *     "targetValue": 0,
 *     "targetYear": 2050
 *   },
 *   "iro": {
 *     "kind": "risk",
 *     "timeHorizon": "long",
 *     "valueChainStage": "own_ops"
 *   },
 *   "assuranceStatus": "limited",
 *   "assuranceProvider": "Deloitte Bulgaria",
 *   "evidenceAttestation": "ref-to-evidence-attestation-uuid",
 *   "isEUTaxonomyEligible": true,
 *   "isEUTaxonomyAligned": true,
 *   "status": "filed",
 *   "createdBy": "user-esg-123",
 *   "createdAt": "2025-03-15T10:00:00Z",
 *   "updatedAt": "2025-04-20T14:30:00Z"
 * }
 * ```
 *
 * @phase 2.12 JSDoc-as-spec implementation
 * @useCase CSRD Directive 2022/2464 mandatory disclosure: double-materiality + narrative + KPI + assurance.
 * @useCase ESRS (Environmental, Social, Governance) structured reporting per EU standards.
 * @useCase XBRL filing: machine-extractable narrative for regulatory submission.
 * @useCase Year-on-year KPI tracking: priorYearComparison + target progress monitoring.
 * @useCase Assurance escalation: limited (FY2024-2027) → reasonable (FY2028+) per CSRD timeline.
 * @useCase EU Taxonomy alignment: eligibility + alignment flags for sustainable-finance disclosure.
 *
 * @standard ISO-8601-1:2019 date-time reporting-year
 * @standard ISO 14064-1:2018 ghg-quantification (Scope 1/2/3 calculation basis for ESRS E1)
 * @standard EU ESRS 1 general-requirements double-materiality assessment
 * @standard EU ESRS 2 general-disclosures impacts-risks-opportunities
 * @standard EU EFRAG ESRS-XBRL taxonomy element mapping
 *
 * @accounting IFRS S1 general-sustainability-disclosure
 * @accounting IFRS S2 climate-change-disclosures
 * @accounting IFRS IAS-8 §42 accounting-policy-changes restatement
 *
 * @audit ISAE 3000 limited-assurance-engagement (FY2024-2027); reasonable by FY2028
 * @audit EU CSRD Annex VI assurance-standards compliance
 *
 * @compliance EU CSRD Directive 2022/2464 mandatory-disclosure in-scope entities
 * @compliance EU SFDR 2019/2088 sustainable-finance disclosure (sustainability risk integration)
 * @compliance EU Taxonomy Regulation 2020/852 sustainable-activity alignment
 * @compliance OECD GRI Standards (GRI 101 foundation + topic-specific GRI 200/300/400 standards)
 * @compliance Science Based Targets initiative (SBTi) net-zero commitment tracking
 *
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security Feature-gated access (accountingCollectionAccess with feature: esg_reporting)
 *
 * @see carbon-emissions (per-Scope quantitative GHG detail for ESRS E1)
 * @see evidence-attestations (audit walk-through reference via evidenceAttestation)
 * @see legal-entities (reporting entity scope per CSRD transitional rules)
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/access/auth'
import { multiTenancyField, statusField, notesField, auditFields, legalEntityField, taxonomySelect } from '@/fields/accounting/base-accounting-fields'
import {
  ESRS_CATEGORY_OPTIONS,
  ESRS_TOPIC_OPTIONS,
  ESRS_MATERIALITY_OPTIONS,
  ESRS_ASSURANCE_OPTIONS,
} from '@/standards/eu-csrd-esrs'

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
    multiTenancyField(),
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
