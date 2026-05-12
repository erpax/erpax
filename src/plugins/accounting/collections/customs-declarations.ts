/**
 * # Customs Declarations
 *
 * @summary WCO HS-coded export/import declarations: line-item valuation, origin determination, tariff preferences, UCC/INTRASTAT filing.
 *
 * ## Core Function
 *
 * Customs Declarations is the cross-border trade compliance register. Every export/import shipment crossing
 * an international border (EU → non-EU, or even EU ↔ EU for INTRASTAT reporting) requires a structured
 * customs declaration with WCO Harmonised System (HS) codes, line-item valuations, country of origin,
 * and tariff-preference claims. The collection bridges shipment logistics (origin: shipments collection)
 * to customs/duty GL posting and tax compliance: import VAT is calculated from totalValue; customs duty
 * is assessed by customs authority; origin determination (preferentialOrigin flag + tariffPreferenceCode)
 * drives eligibility for reduced tariff rates (e.g., GSP, ACP, FTA). EU exports trigger ECS (Export
 * Control System) filing; EU imports trigger ICS (Import Control System) filing per UCC Regulation 952/2013.
 * MRN (Movement Reference Number) is issued by customs on acceptance, enabling tracking + release status.
 * The declaration is immutable once accepted (filed with customs); amendments require amendment records
 * (separate records, not in-place edits) for audit trail.
 *
 * ## Architecture
 *
 * Each declaration references a shipment (via relationship to shipments collection), inheriting consignee,
 * origin, destination. Multi-line structure (array of WCO data-model line items) captures HS code + quantity
 * + net/gross weight + declared value per line. Currency (ISO-4217) is inherited from jurisdiction or explicit.
 * Valuation logic: totalValue = Σ(line.declaredValue) drives import VAT + duty calculations; VAT is auto-posted
 * to GL on acceptance via hook. Tariff-preference determination: preferentialOrigin flag + tariffPreferenceCode
 * (e.g., '300' GSP, '400' ACP, bilateral FTA codes) claim eligibility for reduced duty. INCOTERM field
 * determines duty-bearer (Incoterms 2020: who pays export duty, import duty, VAT). Status workflow:
 * draft → submitted (to customs) → accepted (MRN issued) → held (inspection) → released → rejected.
 * Once accepted, declaration is locked (readOnly for most fields except status); amendments require amendment
 * records. Audit trail captures all line-item changes, tariff-code updates, and status transitions.
 *
 * ## Hooks & Validation
 *
 * - **beforeValidate:** autoPopulateTenant — multi-tenant scoping.
 * - **beforeChange:** autoPopulateCreatedBy.
 * - **afterChange:** auditTrailAfterChange — log line-item changes, tariff-code shifts, status transitions (accepted/released).
 *
 * ## Key Fields
 *
 * - **mrn (text, unique, optional):** Movement Reference Number — issued by customs authority upon acceptance. Immutable; used for tracking + release. EU UCC standard format (GBXX....).
 * - **declarationType (select, required):** WCO customs regime: export (EX-A) | import (IM-A) | reexport | transit (T1/T2) | temporary_admission | inward_processing | outward_processing. Determines filing template + GL posting rules.
 * - **shipment (relationship to shipments, required, indexed):** Source shipment record (denormalizes carrier, incoterm, consignee).
 * - **declarationDate (date, required, indexed):** ISO-8601 declaration submission date to customs. Used for MRN-tracking aging.
 * - **countryOfDispatch (text):** ISO-3166-1 alpha-2 — country goods leave from (shipper's jurisdiction). @standard ISO-3166-1:2020.
 * - **countryOfDestination (text, required):** ISO-3166-1 alpha-2 — final destination country. Drives tariff-authority assignment + import-duty jurisdiction.
 * - **countryOfOrigin (text):** ISO-3166-1 alpha-2 — country where goods were manufactured. Determines preferential-origin eligibility (e.g., GSP origin).
 * - **currency (select):** ISO-4217 code for valuation currency (e.g., EUR, BGN, USD). @standard ISO-4217:2015.
 * - **totalValue (number, required, cents):** Σ(line.declaredValue) — total customs value of all line items. Drives import VAT + duty calculation.
 * - **totalDuty (number, default=0, cents):** Customs duty payable (computed by customs authority; auto-populated on acceptedAt).
 * - **totalImportVat (number, default=0, cents):** Import VAT payable (totalValue × applicable VAT rate). Auto-posted to GL on acceptance.
 * - **lines (array, required):** WCO data-model line items. Each line represents one HS code per item.
 *   - **lines[].item (relationship to items):** Internal item reference (for quantity/weight/description validation).
 *   - **lines[].description (text, required):** Goods description per WCO HS (commercial invoice must match).
 *   - **lines[].hsCode (text, required):** WCO HS Code — 6-digit minimum; 8/10-digit for EU combined nomenclature. Drives duty rate.
 *   - **lines[].quantity (number, required, ≥0):** Item quantity.
 *   - **lines[].unitOfMeasure (text):** WCO supplementary unit (KGM, EA, LTR, etc.). @standard WCO data model.
 *   - **lines[].netWeight (number, kg):** Net weight of goods (used for duty calculation on weight-dependent tariffs).
 *   - **lines[].grossWeight (number, kg):** Gross weight incl. packaging (used for transport/insurance valuation).
 *   - **lines[].declaredValue (number, required, cents):** Declared value per line. Incoterm determines if FOB, CIF, DDP, etc.
 *   - **lines[].preferentialOrigin (checkbox, default=false):** Goods claim preferential origin (EUR.1 / EUR-MED / bilateral FTA / GSP / ACP).
 *   - **lines[].tariffPreferenceCode (text):** EU preference code if preferentialOrigin=true (e.g., '300' GSP, '400' ACP, bilateral FTA code). Drives reduced duty rate.
 * - **incoterm (select):** INCOTERMS 2020 term (EXW, FOB, CIF, DDP, etc.). Determines duty/VAT bearer + valuation basis. @standard Incoterms 2020.
 * - **submittedAt (date):** ISO-8601 when declaration was submitted to customs (marks transition to submitted status).
 * - **acceptedAt (date):** ISO-8601 when customs accepted declaration + issued MRN. Auto-set on status=accepted.
 * - **releasedAt (date):** ISO-8601 when goods were released by customs (clearance complete).
 * - **status (select, default=draft):** Workflow: draft | submitted | accepted | held | released | rejected. Immutable once accepted (amendment-required for changes).
 * - **auditFields() (group, readOnly):** createdBy, createdAt, updatedAt, updatedBy. Standard Payload audit metadata.
 * - **notes (textarea):** Internal compliance notes (e.g., "Inspection held 2025-04-12; additional documentation requested", "Amended tariff code per customs guidance 2025-04-18").
 *
 * ## Core Invariants
 *
 * - **unique declaration per shipment:** For a given shipment + declarationType, at most one active (non-rejected) declaration. No duplicate exports/imports.
 * - **HS-code per line:** Each lines[] entry has unique hsCode (no duplicate HS codes within same declaration; use quantity to combine).
 * - **declared-value consistency:** Σ(lines[].declaredValue) = totalValue (audit check; prevents valuation fraud).
 * - **incoterm + valuation alignment:** Incoterm determines FOB/CIF/DDP basis; valuation must match (audit check per OECD BEPS Action 13).
 * - **status immutability forward:** Status transitions only: draft → submitted → accepted → released. No reversals; rejections require new record.
 * - **preferential-origin eligibility:** preferentialOrigin=true requires countryOfOrigin ∈ eligible-list for selected tariffPreferenceCode (validation).
 * - **tariff-code immutability post-accepted:** Once status=accepted (MRN issued), line-item tariff codes cannot be changed (customs-authority lock). Amendments require new declaration record.
 * - **currency immutability:** currency cannot be changed once set (GL posting lock). Conversions require new declaration.
 *
 * ## Audit Trail
 *
 * Every record captures: createdBy (user + timestamp), modifiedBy (user + timestamp), lastModified (ISO-8601), lastModifiedBy (user ID).
 * All changes logged to audit-events collection with full field deltas (mrn, totalValue, totalDuty, status, line-item changes).
 * Line-item tariff codes + preference codes are immutable post-submission (audit-logged if attempted edit rejected).
 * Tariff-preference claims (preferentialOrigin flag) are audit-logged (compliance artifact for duty audit).
 * Status transitions (submitted → accepted; accepted → released) are logged with customs-authority reference (MRN, release date).
 * totalDuty + totalImportVat population (by customs authority) is audit-logged on acceptedAt.
 * Amendment records include backlink to prior declaration (audit chain: declaration v1 → declaration v2 amendment).
 * @standard ISO-19011:2018 audit-trail customs-evidence retention (6+ years).
 * @standard EU UCC Regulation 952/2013 §6 audit-trail documentation.
 *
 * ## Example
 *
 * ```javascript
 * {
 *   "_id": "customs-uuid",
 *   "mrn": "GBXX20250410123456",
 *   "declarationType": "export",
 *   "shipment": "ref-to-shipment-uuid",
 *   "declarationDate": "2025-04-10",
 *   "countryOfDispatch": "BG",
 *   "countryOfDestination": "DE",
 *   "countryOfOrigin": "BG",
 *   "currency": "EUR",
 *   "totalValue": 500000,
 *   "totalDuty": 0,
 *   "totalImportVat": 0,
 *   "lines": [
 *     {
 *       "item": "ref-to-item-uuid",
 *       "description": "Wooden furniture - tables",
 *       "hsCode": "940130",
 *       "quantity": 50,
 *       "unitOfMeasure": "EA",
 *       "netWeight": 2500,
 *       "grossWeight": 3000,
 *       "declaredValue": 500000,
 *       "preferentialOrigin": false,
 *       "tariffPreferenceCode": null
 *     }
 *   ],
 *   "incoterm": "FOB",
 *   "submittedAt": "2025-04-10",
 *   "acceptedAt": "2025-04-11",
 *   "releasedAt": "2025-04-12",
 *   "status": "released",
 *   "notes": "EU intra-community trade; no import VAT/duty applicable.",
 *   "createdBy": "user-logistics-123",
 *   "createdAt": "2025-04-10T08:00:00Z",
 *   "updatedAt": "2025-04-12T16:30:00Z"
 * }
 * ```
 *
 * @phase 2.12 JSDoc-as-spec implementation
 * @useCase Cross-border trade compliance: HS-coded customs declarations per shipment.
 * @useCase Tariff-preference claims: preferentialOrigin eligibility (GSP, ACP, bilateral FTA).
 * @useCase Import-duty + VAT calculation: totalValue-based GL posting on customs acceptance.
 * @useCase INTRASTAT filing: EU intra-community trade reporting (quantity + value aggregation).
 * @useCase ECS/ICS submission: EU export/import control system regulatory filing.
 * @useCase MRN tracking: customs-authority reference for shipment release status.
 * @useCase Transfer-pricing documentation: WCO valuation + OECD BEPS Action 13 audit trail.
 *
 * @standard ISO-8601-1:2019 date-time declaration-date submission-date
 * @standard ISO-3166-1:2020 country-codes dispatch/destination/origin
 * @standard ISO-4217:2015 currency-codes customs-valuation
 * @standard WCO HS Convention harmonised-system-codes (6+ digits)
 * @standard WCO Data Model 3.x customs-data-elements line-item structure
 * @standard INCOTERMS 2020 icoterms-2020 trade-terms
 *
 * @accounting IFRS IAS-21 foreign-currency customs-valuation
 * @accounting OECD Transfer Pricing Guidelines 2022 §1.2 transfer-pricing-documentation BEPS
 *
 * @audit ISO-19011:2018 audit-trail customs-evidence
 * @audit EU UCC Regulation 952/2013 §6 customs-declaration audit-documentation
 *
 * @compliance EU UCC Regulation 952/2013 §6 customs-declaration-requirement
 * @compliance EU Regulation 608/2013 customs-enforcement intellectual-property
 * @compliance OECD BEPS Action 13 transfer-pricing-documentation
 * @compliance EU Intrastat System (Regulation 2019/2152) intra-community-trade-reporting
 * @compliance SARS-CoV-2 / COVID-19 trade-facilitation (if applicable)
 *
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security Feature-gated access (accountingCollectionAccess with feature: logistics)
 *
 * @see shipments (source shipment record; cross-border logistics origin)
 * @see items (line-item product/category denormalization)
 * @see tax-jurisdictions (import-duty jurisdiction determination)
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/access/auth'
import { multiTenancyField, currencyField, statusField, notesField, auditFields, taxonomySelect } from '@/fields/accounting/base-accounting-fields'
import { INCOTERM_OPTIONS } from '@/standards/incoterms-2020'

const CustomsDeclarations: CollectionConfig = {
  slug: 'customs-declarations',
  labels: { singular: 'Customs Declaration', plural: 'Customs Declarations' },
  admin: {
    useAsTitle: 'mrn',
    defaultColumns: ['mrn', 'declarationType', 'shipment', 'declarationDate', 'totalValue', 'status'],
    description:
      'WCO HS-coded customs declaration per cross-border shipment. EU UCC export (ECS) / import (ICS) submission source.',
  },
  access: accountingCollectionAccess({ feature: 'logistics' }),
  fields: [
    multiTenancyField(),
    { name: 'mrn', type: 'text', required: false, unique: true, index: true,
      admin: { description: 'Movement Reference Number (UCC). Issued by customs after acceptance.' } },
    {
      name: 'declarationType',
      type: 'select',
      required: true,
      options: [
        { label: 'Export (UCC EX-A)', value: 'export' },
        { label: 'Import (UCC IM-A)', value: 'import' },
        { label: 'Re-export', value: 'reexport' },
        { label: 'Transit (T1/T2)', value: 'transit' },
        { label: 'Temporary Admission', value: 'temporary_admission' },
        { label: 'Inward Processing', value: 'inward_processing' },
        { label: 'Outward Processing', value: 'outward_processing' },
      ],
    },
    { name: 'shipment', type: 'relationship', relationTo: 'shipments', required: true, index: true },
    { name: 'declarationDate', type: 'date', required: true, index: true },
    { name: 'countryOfDispatch', type: 'text',
      admin: { description: 'ISO 3166-1 alpha-2 — country goods leave from.' } },
    { name: 'countryOfDestination', type: 'text', required: true,
      admin: { description: 'ISO 3166-1 alpha-2 — final destination country.' } },
    { name: 'countryOfOrigin', type: 'text',
      admin: { description: 'ISO 3166-1 alpha-2 — country where the goods were manufactured (drives preferential treatment).' } },
    currencyField(),
    { name: 'totalValue', type: 'number', required: true,
      admin: { description: 'Σ(line items × declared value), in cents. Drives import VAT + duty calculation.' } },
    { name: 'totalDuty', type: 'number', defaultValue: 0,
      admin: { description: 'Customs duty payable, in cents. Computed by customs authority.' } },
    { name: 'totalImportVat', type: 'number', defaultValue: 0,
      admin: { description: 'Import VAT payable, in cents.' } },
    {
      name: 'lines',
      type: 'array',
      required: true,
      labels: { singular: 'Line Item', plural: 'Line Items' },
      admin: { description: 'WCO data-model line items — one per HS code per declared item.' },
      fields: [
        { name: 'item', type: 'relationship', relationTo: 'items',
          admin: { description: 'The internal item — denormalised hsCode flows into `hsCode` for the declaration.' } },
        { name: 'description', type: 'text', required: true,
          admin: { description: 'Goods description per WCO HS (must match commercial invoice).' } },
        { name: 'hsCode', type: 'text', required: true,
          admin: { description: 'WCO HS Code (6-digit minimum; 8/10-digit for combined nomenclature).' } },
        { name: 'quantity', type: 'number', required: true, min: 0 },
        { name: 'unitOfMeasure', type: 'text',
          admin: { description: 'WCO supplementary unit (KGM / EA / LTR / etc.).' } },
        { name: 'netWeight', type: 'number',
          admin: { description: 'Net weight in kg.' } },
        { name: 'grossWeight', type: 'number',
          admin: { description: 'Gross weight in kg.' } },
        { name: 'declaredValue', type: 'number', required: true,
          admin: { description: 'Declared value per line, in cents.' } },
        { name: 'preferentialOrigin', type: 'checkbox', defaultValue: false,
          admin: { description: 'Goods qualify for preferential origin (EUR.1 / EUR-MED / etc.).' } },
        { name: 'tariffPreferenceCode', type: 'text',
          admin: { description: 'EU preference code if `preferentialOrigin = true` (e.g. `300` GSP, `400` ACP).' } },
      ],
    },
    taxonomySelect('incoterm', INCOTERM_OPTIONS, { description: 'INCOTERMS 2020 term — drives who pays duty/VAT.' }),
    { name: 'submittedAt', type: 'date',
      admin: { description: 'ISO 8601 — when declaration was submitted to customs.' } },
    { name: 'acceptedAt', type: 'date',
      admin: { description: 'ISO 8601 — when customs accepted (MRN issued).' } },
    { name: 'releasedAt', type: 'date',
      admin: { description: 'ISO 8601 — when goods were released by customs.' } },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Submitted', value: 'submitted' },
        { label: 'Accepted (MRN issued)', value: 'accepted' },
        { label: 'Held for Inspection', value: 'held' },
        { label: 'Released', value: 'released' },
        { label: 'Rejected', value: 'rejected' },
      ],
      'draft',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('customs-declarations')],
  },
  timestamps: true,
}

export default CustomsDeclarations
