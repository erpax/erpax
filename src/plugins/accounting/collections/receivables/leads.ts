/**
 * # Leads
 *
 * @summary Pre-customer qualified-lead CRM pipeline with GDPR-minimized personal data and conversion tracking.
 *
 * ## Core Function
 *
 * Leads capture prospective customers before they sign contracts. Each lead represents a sales-qualified opportunity:
 * a person/company identified for outreach, scored for engagement potential (BANT/MEDDIC), and tracked through
 * qualification → conversion → customer. A lead may qualify into an opportunity (deal-pipeline progression); when
 * the opportunity closes-won, the lead auto-links to the resulting customer (conversion tracking). Personal-data fields
 * (email, phone, name) are subject to GDPR Art.5 minimization — only fields essential for B2B outreach are defaulted.
 * Leads are the foundation of the sales funnel (lead → opportunity → contract → customer → AR lifecycle).
 *
 * ## Architecture
 *
 * Multi-tenant isolation via `tenant`. Leads are CRM-domain records; address/location stored as country code (not full address)
 * to minimize storage. Lead source (website form, demo request, cold email, event, partner referral, etc.) tracks acquisition channel.
 * Lead score (0-100) combines BANT / MEDDIC criteria; may be AI-suggested. Status lifecycle (new → contacted → engaged → MQL/SQL → converted/disqualified)
 * gates progression. ConvertedOpportunity and convertedCustomer relationships (readOnly) record conversion outcome. ConsentRecord relationship
 * links to GDPR Art.7 marketing-consent record, ensuring lawful-basis documentation for B2B outreach (Art.6(1)(f) legitimate-interest).
 *
 * ## Hooks & Validation
 *
 * - **beforeValidate:** autoPopulateTenant — stamp tenant context
 * - **beforeChange:** autoPopulateCreatedBy — track lead creation user (sales rep or marketing)
 * - **afterChange:** emitLeadQualified, auditTrailAfterChange — emit chain event on SQL qualification; log all status changes
 *
 * ## Key Fields
 *
 * - **fullName (text, required, index):** Person's full name. @compliance GDPR Art.5 minimization (only for outreach necessity)
 * - **firstName (text):** Given name (optional; for CRM segmentation/personalization in emails).
 * - **lastName (text):** Family name (optional; for CRM segmentation/personalization in emails).
 * - **jobTitle (text):** Job title (e.g., "CTO", "CFO", "VP Sales"). Qualification signal for BANT/MEDDIC.
 * - **companyName (text, required, index):** Organization name. B2B focus; use for company-level targeting and deduplication.
 * - **email (text, email, index):** Business email address. @compliance GDPR Art.6(1)(f) — legitimate-interest for B2B prospecting outreach
 * - **phone (text):** Business phone number (optional; collection depends on consent record).
 * - **website (text):** Company website URL. Sourced from lead-gen / intent data.
 * - **industry (text):** Industry classification (e.g., "SaaS", "FinTech", "Manufacturing"). Segment filter.
 * - **companySize (select):** Employee count bucket: 1-10, 11-50, 51-200, 201-1000, 1000+. Qualification sizing.
 * - **countryCode (text, from countryCodeField):** ISO-3166-1 alpha-2 (e.g. BG, DE). Region targeting for localized outreach.
 * - **preferredLanguage (text):** BCP-47 language tag (e.g. en, de, bg-BG). Communication preference.
 * - **leadSource (select):** Acquisition channel: website_form, demo_request, content_download, cold_email, cold_call, event, partner, webinar, social, paid_ad, organic_search, other. Attribution.
 * - **campaign (text):** Campaign identifier (e.g., "Q2-2026-Webinar", "SpringEvent2026"). Marketing attribution.
 * - **leadScore (number, min: 0, max: 100, default: 0):** BANT/MEDDIC composite score (0-100). AI-suggested; operator may override. @standard BANT/MEDDIC qualification framework
 * - **estimatedValue (number, cents):** Operator estimate of contract value if won. Revenue forecast input.
 * - **estimatedCloseDate (date):** Operator estimate of close date. Forecast scheduling.
 * - **assignedTo (relationship → users):** Sales rep owner. CRM queue assignment.
 * - **convertedOpportunity (relationship → opportunities, readOnly):** Opportunity created when lead qualifies to SQL → converted_status. Reflects deal progression.
 * - **convertedCustomer (relationship → customers, readOnly):** Customer created when opportunity closes-won. Final conversion outcome.
 * - **convertedAt (date, readOnly):** Auto-set when status → converted. Conversion-funnel timestamp.
 * - **consentRecord (relationship → consent-records):** GDPR Art.7 marketing-consent documentation. Lawful basis for email outreach (Art.6(1)(f) legitimate-interest + consent for direct marketing). @compliance GDPR Art.6(1)(f) Art.7
 * - **status (select, required, default: new):** Lifecycle: new, contacted, engaged, mql (marketing-qualified), sql (sales-qualified), converted, disqualified, recycled. Gate progression logic.
 * - **createdBy (relationship → users, readOnly):** User who created the lead (marketing or sales).
 * - **createdAt (date, readOnly):** Creation timestamp (ISO-8601). Lead-age metric.
 * - **modifiedBy (relationship → users, readOnly):** Last user who updated status/assignment.
 * - **modifiedAt (date, readOnly):** Last modification timestamp.
 * - **note (textarea):** Internal notes (qualification reason, disqualification reason, follow-up actions).
 * - **tenant (relationship → tenants, required, index):** Multi-tenant isolation; set by autoPopulateTenant.
 *
 * ## Core Invariants
 *
 * - **GDPR Minimization:** fullName, email collected only when necessary for outreach. No home address, SSN, or unnecessary PII.
 * - **ConsentTracking:** consentRecord required if status progression includes marketing outreach (→ engaged → MQL → SQL). @compliance GDPR Art.7
 * - **ConversionConsistency:** convertedOpportunity is readOnly; set by opportunity-creation logic (emitLeadQualified chain event).
 * - **LeadSourceAccuracy:** leadSource must match actual acquisition channel; no fabricated sources for false attribution.
 * - **ScoreValidity:** leadScore ∈ [0, 100]; MQL/SQL status typically ≥ 50 (configurable per tenant).
 * - **TenantIsolation:** Queries filtered by tenant; cross-tenant access denied. @standard SOX §302
 *
 * ## Audit Trail
 *
 * Every record captures: createdBy (user + timestamp), modifiedBy (user + timestamp), lastModified (ISO-8601), lastModifiedBy (user ID).
 * All status transitions and lead-score updates logged to `audit-events`. Conversion events (→ opportunity, → customer) timestamped separately
 * for funnel-conversion analysis. Personal-data consent updates flagged for GDPR Art.7 verification (auditor reviews consent-record linkage).
 * @standard SOX §302 CRM pipeline control
 *
 * ## Example
 *
 * ```javascript
 * {
 *   "_id": "lead_uuid_2026_001",
 *   "tenant": "tenant_bg_ltd",
 *   "fullName": "Иван Петров",
 *   "firstName": "Иван",
 *   "lastName": "Петров",
 *   "jobTitle": "CFO",
 *   "companyName": "ООО Финтех Инновации",
 *   "email": "ivan.petrov@fintech.bg",
 *   "phone": "+359 2 555 1234",
 *   "industry": "FinTech",
 *   "companySize": "201_1000",
 *   "countryCode": "BG",
 *   "preferredLanguage": "bg",
 *   "leadSource": "event",
 *   "campaign": "FinTechSummit2026",
 *   "leadScore": 75,
 *   "estimatedValue": 30000000,
 *   "estimatedCloseDate": "2026-07-15",
 *   "assignedTo": "user_uuid_rep_ivan",
 *   "consentRecord": "con_uuid_fintech_2026",
 *   "status": "sql",
 *   "convertedOpportunity": null,
 *   "convertedCustomer": null,
 *   "createdBy": "user_uuid_marketing",
 *   "createdAt": "2026-04-15T11:20:00Z",
 *   "modifiedBy": "user_uuid_rep_ivan",
 *   "modifiedAt": "2026-05-12T09:30:00Z"
 * }
 * ```
 *
 * @phase 2.12 JSDoc-as-spec CRM pipeline conversion funnel
 * @useCase Lead qualification, BANT/MEDDIC scoring, lead→opportunity→customer conversion tracking
 * @standard ISO-8601-1:2019 date-time
 * @standard ISO-3166-1:2020 country-codes
 * @standard BANT Business Acumen, Authority, Need, Timeline (sales qualification)
 * @standard MEDDIC Metrics, Economic-Buyer, Decision-Criteria, Decision-Process, Identify-Pain, Champion (sales qualification)
 * @compliance GDPR Art.5 data-minimisation
 * @compliance GDPR Art.6(1)(f) legitimate-interest B2B prospecting
 * @compliance GDPR Art.7 consent marketing (via consentRecord)
 * @audit ISO-19011:2018 audit-trail crm-pipeline
 * @security Multi-tenant isolation; PII minimization compliance
 * @see ./Opportunities.ts (deal-pipeline progression)
 * @see ./Customers.ts (conversion outcome)
 * @see ./ConsentRecords.ts (GDPR Art.7 lawful basis)
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/access/auth'
import { multiTenancyField, statusField, notesField, auditFields, countryCodeField } from '@/fields/accounting/base-accounting-fields'
import { emitLeadQualified } from '@/hooks/chainEventEmitters'

const Leads: CollectionConfig = {
  slug: 'leads',
  labels: { singular: 'Lead', plural: 'Leads' },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'companyName', 'email', 'leadSource', 'leadScore', 'status'],
    description:
      'Pre-customer prospect (qualified lead). Converts to an opportunity → customer on close-won.',
  },
  access: accountingCollectionAccess({ feature: 'crm' }),
  fields: [
    multiTenancyField(),
    { name: 'fullName', type: 'text', required: true, index: true },
    { name: 'firstName', type: 'text' },
    { name: 'lastName', type: 'text' },
    { name: 'jobTitle', type: 'text' },
    { name: 'companyName', type: 'text', required: true, index: true },
    { name: 'email', type: 'email', index: true },
    { name: 'phone', type: 'text' },
    { name: 'website', type: 'text' },
    { name: 'industry', type: 'text' },
    { name: 'companySize', type: 'select', options: [
      { label: '1-10', value: '1_10' },
      { label: '11-50', value: '11_50' },
      { label: '51-200', value: '51_200' },
      { label: '201-1000', value: '201_1000' },
      { label: '1000+', value: '1000_plus' },
    ]},
    countryCodeField(),
    { name: 'preferredLanguage', type: 'text' },
    {
      name: 'leadSource',
      type: 'select',
      options: [
        { label: 'Inbound — Website Form', value: 'website_form' },
        { label: 'Inbound — Demo Request', value: 'demo_request' },
        { label: 'Inbound — Content Download', value: 'content_download' },
        { label: 'Outbound — Cold Email', value: 'cold_email' },
        { label: 'Outbound — Cold Call', value: 'cold_call' },
        { label: 'Event / Conference', value: 'event' },
        { label: 'Partner / Referral', value: 'partner' },
        { label: 'Webinar', value: 'webinar' },
        { label: 'LinkedIn / Social', value: 'social' },
        { label: 'Paid Ad', value: 'paid_ad' },
        { label: 'Organic Search', value: 'organic_search' },
        { label: 'Other', value: 'other' },
      ],
    },
    { name: 'campaign', type: 'text' },
    { name: 'leadScore', type: 'number', min: 0, max: 100, defaultValue: 0,
      admin: { description: 'BANT / MEDDIC composite score (0-100). May be AI-suggested.' } },
    { name: 'estimatedValue', type: 'number',
      admin: { description: 'Operator estimate of contract value if won (cents).' } },
    { name: 'estimatedCloseDate', type: 'date' },
    { name: 'assignedTo', type: 'relationship', relationTo: 'users' },
    { name: 'convertedOpportunity', type: 'relationship', relationTo: 'opportunities',
      admin: { readOnly: true } },
    { name: 'convertedCustomer', type: 'relationship', relationTo: 'customers',
      admin: { readOnly: true } },
    { name: 'convertedAt', type: 'date', admin: { readOnly: true } },
    { name: 'consentRecord', type: 'relationship', relationTo: 'consent-records',
      admin: { description: 'GDPR Art.7 marketing-consent record (if applicable).' } },
    statusField(
      [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Engaged', value: 'engaged' },
        { label: 'Marketing Qualified (MQL)', value: 'mql' },
        { label: 'Sales Qualified (SQL)', value: 'sql' },
        { label: 'Converted', value: 'converted' },
        { label: 'Disqualified', value: 'disqualified' },
        { label: 'Recycled (back to nurture)', value: 'recycled' },
      ],
      'new',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [emitLeadQualified, auditTrailAfterChange('leads')],
  },
  timestamps: true,
}

export default Leads
