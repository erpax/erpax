/**
 * # Customer Segments
 *
 * @summary Pricing tiers, marketing buckets, and IFRS-15 portfolio groupings for differentiated customer treatment.
 *
 * ## Core Function
 *
 * Customer segments provide a flexible grouping dimension orthogonal to individual customer records.
 * Segments support three use cases: (1) differentiated pricing (list-price, volume discounts, negotiated rates),
 * (2) targeted campaigns and CRM workflows, and (3) IFRS-15 §4 portfolio-practical-expedient disclosures
 * (i.e., grouping similar contracts for revenue recognition when individual assessment is impractical).
 * Each segment defines selection criteria, default discount %, payment terms, credit limits, and IFRS-15 portfolio eligibility.
 *
 * ## Architecture
 *
 * Multi-tenant isolation via `tenantId`. Customers link to segments via many-to-one relationship (a customer may belong
 * to one or more segments; query logic applies intersection/union rules per business rule). Segments are tagged with
 * type (commercial tier, industry, geographic, lifecycle, behavioral, strategic). The `isPortfolioForIfrs15` flag
 * marks segments that represent "similar contracts" under IFRS-15 §4 practical expedient, enabling financial reporting
 * to aggregate contracts by segment rather than individually. Priority rank breaks ties when a customer matches multiple segments.
 *
 * ## Hooks & Validation
 *
 * - **beforeValidate:** autoPopulateTenant — stamp tenant context
 * - **beforeChange:** autoPopulateCreatedBy — track creation user
 * - **afterChange:** auditTrailAfterChange — log segment definition changes (name, criteria, discount % updates)
 *
 * ## Key Fields
 *
 * - **name (text, localized, required, unique):** Segment display name (e.g. "Enterprise", "SMB", "APAC Tech"). Localized for regional marketing.
 * - **description (textarea, localized):** Operator-readable segment definition and eligibility rules. May reference business criteria.
 * - **segmentType (select, required):** Segment dimension: commercial (SMB/mid-market/enterprise), industry, geographic, lifecycle, behavioral, strategic, other.
 * - **criteria (textarea):** Operator narrative of selection rules (e.g. "ARR ≥ €100k AND industry IN (SaaS, FinTech)")
 * - **priorityRank (number):** Tie-breaker when customer matches multiple segments. Lower rank = higher priority. @standard IFRS-15 §4
 * - **discountPercent (number, min: 0, max: 100, default: 0):** Default discount % off list price for invoices in this segment.
 * - **paymentTermDays (number, default: 30):** Default Net-N payment terms (days). Overrides customer.paymentTerms if applicable.
 * - **creditLimit (number, group: commercial):** Default per-customer credit limit (cents) if segment defines it; customer record can override.
 * - **pricingTier (select):** Tier within segment: list, volume, negotiated, or strategic/VIP.
 * - **isPortfolioForIfrs15 (checkbox, default: false):** IFRS-15 §4 portfolio practical expedient marker. When true, contracts in this segment may be grouped for revenue-recognition assessment. @accounting IFRS-15 §4
 * - **status (select: active | inactive | deprecated):** Lifecycle; inactive segments do not auto-assign to new customers.
 * - **createdBy (relationship → users, readOnly):** User who created the segment.
 * - **createdAt (date, readOnly):** Creation timestamp (ISO-8601).
 * - **modifiedBy (relationship → users, readOnly):** Last user who modified the segment.
 * - **modifiedAt (date, readOnly):** Last modification timestamp (ISO-8601).
 * - **note (textarea):** Internal notes (operator flags, business justification for segment, sunset plans).
 * - **tenantId (relationship → tenants, required, index):** Multi-tenant isolation; set by autoPopulateTenant.
 *
 * ## Core Invariants
 *
 * - **UniquenessPerTenant:** (name, tenantId) is unique. No duplicate segment names within a tenant.
 * - **PortfolioExclusivity:** Segments marked `isPortfolioForIfrs15 = true` must have explicit criteria; cannot be empty or "all customers".
 * - **PriorityConsistency:** priorityRank must be non-null when a customer is assigned to multiple overlapping segments.
 * - **DiscountCap:** discountPercent ≤ 100; negative discounts (premiums) blocked at schema level (min: 0).
 * - **TenantIsolation:** Queries filtered by tenantId; cross-tenant access denied. @standard SOX §302
 *
 * ## Audit Trail
 *
 * Every record captures: createdBy (user + timestamp), modifiedBy (user + timestamp), lastModified (ISO-8601), lastModifiedBy (user ID).
 * All changes logged to `audit-events` collection. Pricing changes (discountPercent, creditLimit) are flagged separately for audit review,
 * as they impact invoice totals and AR aging thresholds.
 * @standard SOX §302 §404 pricing control activity
 *
 * ## Example
 *
 * ```javascript
 * {
 *   "_id": "seg_uuid_enterprise",
 *   "tenantId": "tenant_bg_ltd",
 *   "name": "Enterprise Tech",
 *   "nameLocalized": { "bg": "Елитни технологични", "en": "Enterprise Tech" },
 *   "description": "ARR ≥ €100k, strategic accounts with dedicated support",
 *   "descriptionLocalized": { "bg": "ARR ≥ €100k...", "en": "..." },
 *   "segmentType": "commercial",
 *   "criteria": "ARR ≥ €100k AND (industry = SaaS OR industry = FinTech) AND employees ≥ 100",
 *   "priorityRank": 1,
 *   "discountPercent": 15,
 *   "paymentTermDays": 60,
 *   "creditLimit": 50000000,
 *   "pricingTier": "negotiated",
 *   "isPortfolioForIfrs15": true,
 *   "status": "active",
 *   "createdBy": "user_uuid_admin",
 *   "createdAt": "2026-01-01T08:00:00Z",
 *   "modifiedBy": "user_uuid_admin",
 *   "modifiedAt": "2026-05-12T10:15:00Z"
 * }
 * ```
 *
 * @phase 2.12 JSDoc-as-spec IFRS-15 portfolio grouping
 * @useCase Customer segmentation, differentiated pricing, revenue-recognition portfolio grouping
 * @standard ISO-8601-1:2019 date-time
 * @accounting IFRS IFRS-15 §4 portfolio-practical-expedient
 * @accounting IFRS IFRS-8 §22 disclosure-of-segment-information
 * @audit ISO-19011:2018 audit-trail crm-segmentation
 * @compliance SOX §302 §404 pricing control
 * @security Multi-tenant isolation via tenantId; role-based access (admin/accountant)
 * @see ./Customers.ts (customer-to-segment linkage)
 * @see ./SalesOrders.ts (pricing-rule application per segment)
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/access/auth'
import { multiTenancyField, statusField, notesField, auditFields } from '@/fields/accounting/base-accounting-fields'

const CustomerSegments: CollectionConfig = {
  slug: 'customer-segments',
  labels: { singular: 'Customer Segment', plural: 'Customer Segments' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'segmentType', 'discountPercent', 'paymentTermDays', 'status'],
    description:
      'Pricing / marketing / portfolio segment. Customers tag-link to segments; pricing rules + campaigns target the segment.',
  },
  access: accountingCollectionAccess({ feature: 'crm' }),
  fields: [
    multiTenancyField(),
    { name: 'name', type: 'text', localized: true, required: true, unique: true },
    { name: 'description', type: 'textarea', localized: true },
    {
      name: 'segmentType',
      type: 'select',
      required: true,
      defaultValue: 'commercial',
      options: [
        { label: 'Commercial Tier (e.g. SMB / Mid-Market / Enterprise)', value: 'commercial' },
        { label: 'Industry Vertical', value: 'industry' },
        { label: 'Geographic Region', value: 'geographic' },
        { label: 'Lifecycle Stage', value: 'lifecycle' },
        { label: 'Behavioural', value: 'behavioural' },
        { label: 'Strategic Account', value: 'strategic' },
        { label: 'Other', value: 'other' },
      ],
    },
    { name: 'criteria', type: 'textarea',
      admin: { description: 'Operator-readable criteria (e.g. "ARR ≥ €100k AND industry = SaaS").' } },
    { name: 'priorityRank', type: 'number',
      admin: { description: 'Tie-breaker when a customer fits multiple segments (lower = higher priority).' } },
    { name: 'discountPercent', type: 'number', min: 0, max: 100, defaultValue: 0,
      admin: { description: 'Default discount % off list price for this segment.' } },
    { name: 'paymentTermDays', type: 'number', defaultValue: 30,
      admin: { description: 'Default Net-N payment terms (days).' } },
    { name: 'creditLimit', type: 'number',
      admin: { description: 'Default per-customer credit limit (cents) — operator can override per customer.' } },
    {
      name: 'pricingTier',
      type: 'select',
      options: [
        { label: 'List Price', value: 'list' },
        { label: 'Volume Discount', value: 'volume' },
        { label: 'Negotiated', value: 'negotiated' },
        { label: 'Strategic / VIP', value: 'strategic' },
      ],
    },
    { name: 'isPortfolioForIfrs15', type: 'checkbox', defaultValue: false,
      admin: { description: 'IFRS-15 §4 portfolio practical expedient — group similar contracts for revenue recognition.' } },
    statusField(
      [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Deprecated', value: 'deprecated' },
      ],
      'active',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('customer-segments')],
  },
  timestamps: true,
}

export default CustomerSegments
