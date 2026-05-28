/**
 * API Audit Events — generic landing collection for every external-API
 * call the project makes (FX rate lookups, VAT validation, sanctions
 * screening, e-invoicing discovery, business-registry lookups, mTLS
 * filings).
 *
 * Every `ApiResult<T>` returned by the resolvers in
 * `src/services/country-api-clients.ts` (or its country-clients/
 * sub-modules) lands here as one row, giving SOX §404 / ISO 19011
 * auditors a single grep target for "show me every external system
 * we contacted on date X for tenant Y".
 *
 * The shape mirrors the resolver `ApiResult` envelope:
 *   - kind          — taxonomy bucket (mirrors CountryApiKind + extras)
 *   - country       — ISO-3166-1 alpha-2 the call was made for
 *   - source        — human label (`'БНБ'`, `'ECB'`, `'VIES'`, …) for attribution
 *   - resultOk      — boolean from the resolver
 *   - errorMessage  — populated when `!resultOk`
 *   - payloadIn     — request envelope (sanitised; never carries secrets)
 *   - payloadOut    — response payload (typed `data` field of ApiResult)
 *
 * @standard ISO-19011:2018 audit-trail external-system-evidence
 * @standard ISO/IEC-27007:2020 isms-auditing
 * @audit ISO-19011:2018 audit-trail
 * @compliance SOX §404 internal-controls external-system-traceability
 * @compliance EU 910/2014 eidas signature-evidence
 * @see src/services/country-api-clients.ts
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '../hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '../hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '../hooks/auditTrailAfterChange'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '../access/auth'
import { notesField, auditFields } from '../fields/base-accounting-fields'

const ApiAuditEvents: CollectionConfig = {
  slug: 'api-audit-events',
  labels: { singular: 'API Audit Event', plural: 'API Audit Events' },
  admin: {
    useAsTitle: 'eventId',
    defaultColumns: ['eventId', 'kind', 'country', 'source', 'resultOk', 'createdAt'],
    description:
      'Every external-API call (FX / VAT / sanctions / e-invoicing / mTLS filing) — one row per call, source-attributed for SOX §404 traceability.',
  },
  access: {
    read: scopedAccess(),
    // External-API calls are system-recorded; only admin / auditor can write
    // them through the admin UI. Programmatic creates run with admin context.
    create: roleScopedAccess('admin', 'auditor'),
    update: roleScopedAccess('admin'),
    delete: tenantAdmin,
  },
  fields: [
    {
      name: 'eventId',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Stable id (e.g. APIE-2026-05-09-001 or a UUID).' },
    },
    {
      name: 'kind',
      type: 'select',
      required: true,
      // Mirrors CountryApiKind + the document-side extras the resolvers emit.
      options: [
        { label: 'FX rate (statistics)', value: 'fx_rate' },
        { label: 'VAT validation', value: 'vat_validation' },
        { label: 'Sanctions screening', value: 'sanctions' },
        { label: 'E-invoicing discovery', value: 'e_invoicing' },
        { label: 'Business registry', value: 'business_registry' },
        { label: 'Tax authority', value: 'tax_authority' },
        { label: 'Bank directory', value: 'bank_directory' },
        { label: 'Open banking', value: 'open_banking' },
        { label: 'Address validation', value: 'address_validation' },
        { label: 'Payroll', value: 'payroll' },
        { label: 'Statistics', value: 'statistics' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'country',
      type: 'text',
      required: true,
      index: true,
      admin: { description: 'ISO-3166-1 alpha-2 the call was made for.' },
    },
    {
      name: 'source',
      type: 'text',
      required: true,
      admin: {
        description:
          'Authority label from the resolver result (`БНБ`, `ECB`, `VIES`, `EU CFSP`, `Peppol Directory`, `НАП`, …).',
      },
    },
    {
      name: 'resultOk',
      type: 'checkbox',
      required: true,
      defaultValue: false,
      index: true,
      admin: { description: 'Mirrors `ApiResult.ok` — false rows are diagnostic.' },
    },
    {
      name: 'errorMessage',
      type: 'textarea',
      admin: {
        condition: (data) => !((data as { resultOk?: boolean })?.resultOk ?? false),
        description: 'Populated when `resultOk` is false — copied from `ApiResult.error`.',
      },
    },
    {
      name: 'payloadIn',
      type: 'json',
      admin: {
        description:
          'Request envelope — sanitise before persisting (never carries secrets). Optional.',
      },
    },
    {
      name: 'payloadOut',
      type: 'json',
      admin: {
        description: 'Response data — copied from `ApiResult.data`. Optional.',
      },
    },
    ...auditFields(),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('api-audit-events')],
  },
  timestamps: true,
}

export default ApiAuditEvents
