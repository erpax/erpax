/**
 * Leads — pre-customer state qualified-lead pipeline.
 *
 * Slice EEEE (2026-05-10): CRM domain — captures prospects before they
 * become `customers`. A lead is qualified into an `opportunity`; an
 * opportunity that closes-won converts the lead into a customer.
 *
 * Personal-data fields are subject to GDPR Art.5 minimisation —
 * defaults shown to the operator are the minimum required for outreach.
 *
 * @standard ISO-8601-1:2019 date-time
 * @standard ISO-3166-1:2020 country-codes
 * @compliance GDPR Art.5 data-minimisation
 * @compliance GDPR Art.6(1)(f) legitimate-interest (B2B prospecting)
 * @audit ISO-19011:2018 audit-trail crm-pipeline
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./Opportunities.ts
 * @see ./Customers.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '../../hooks/standardCollectionHooks'
import { accountingCollectionAccess } from '../../access/auth'
import { statusField, notesField, auditFields, countryCodeField } from '../../fields/base-accounting-fields'
import { emitLeadQualified } from '../../hooks/chainEventEmitters'

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
  hooks: standardCollectionHooks('leads', { afterChange: [emitLeadQualified] }),
  timestamps: true,
}

export default Leads
