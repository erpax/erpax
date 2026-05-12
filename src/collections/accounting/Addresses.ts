/**
 * Addresses — postal / billing / shipping / supplier address master.
 *
 * Slice XXXXXXXX (2026-05-11) — closes the single highest-impact
 * orphan-reference gap discovered by `scripts/find-implementation-gaps.py`:
 * 23+ collections declared `relationTo: 'addresses'` (billingAddress,
 * shippingAddress, supplier address, KYC subject address, beneficial
 * owner residence, warehouse location address, property address, …)
 * but the target collection did not exist. Payload silently allows the
 * field-declaration; the relation only blows up at query time when the
 * admin tries to resolve the picker. This commit creates the target.
 *
 * Per ISO-19160-4:2017 — addresses are NOT free text; they are structured
 * tuples (locality, sub-locality, post-code, country, street, building,
 * unit, etc.) so that postal / e-invoicing / customs / KYC pipelines can
 * machine-parse them. EN-14142-1 + UPU S42 mandate the same structure for
 * cross-border mail; EN-16931 §BG-8 / §BG-15 / §BT-50..BT-57 ties the
 * address fields directly to the e-invoice payer/seller party.
 *
 * Privacy posture: a postal address tied to a natural person is personal
 * data per GDPR Art.4(1); the `personType` switch lets us distinguish
 * legal-entity addresses (no GDPR scope) from natural-person addresses
 * (full Art.5 + Art.6 + Art.17 lifecycle). The optional `gdprErasedAt`
 * timestamp records right-to-erasure events without breaking the
 * accounting audit trail (immutable invoice still keeps a hash-only
 * reference to the redacted address row).
 *
 * @standard ISO-19160-4:2017 addressing-international-postal-address-components
 * @standard UPU-S42 international-postal-address-components
 * @standard EN-14142-1:2011 postal-services-address-databases
 * @standard EN-16931:2017 §BG-8 buyer-postal-address
 * @standard EN-16931:2017 §BG-15 deliver-to-address
 * @standard EN-16931:2017 §BT-50..BT-57 address-fields
 * @standard ISO-3166-1:2020 country-codes
 * @standard ISO-3166-2:2020 subdivision-codes
 * @standard UN-LOCODE:2024 locality-codes
 * @standard ISO-19011:2018 audit-trail
 * @compliance GDPR Art.4(1) personal-data (when personType=natural)
 * @compliance GDPR Art.5(1)(c) data-minimisation
 * @compliance GDPR Art.17 right-to-erasure via-gdprErasedAt
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ../factories/collection-factory.ts
 * @see ../fields/base-accounting-fields.ts
 */

import { createAccountingCollection } from '@/services/accounting/factories/collection-factory'
import { referenceField } from '@/fields/accounting/base-accounting-fields'

export default createAccountingCollection({
  slug: 'addresses',
  labels: { singular: 'Address', plural: 'Addresses' },
  useAsTitle: 'displayLine',
  defaultColumns: ['displayLine', 'addressType', 'city', 'countryCode', 'personType', 'status'],
  description:
    'Postal / billing / shipping / supplier address master. Structured per ISO-19160-4 + UPU S42 + EN-16931 §BG-8/§BG-15. Personal addresses (personType=natural) honour GDPR lifecycle.',

  // Spec metadata → MCP_STANDARDS_INDEX + event-graph + feature gating
  standards: [
    'ISO-19160-4:2017',
    'UPU-S42',
    'EN-14142-1:2011',
    'EN-16931:2017',
    'ISO-3166-1:2020',
    'ISO-3166-2:2020',
    'UN-LOCODE:2024',
    'GDPR',
  ],
  feature: 'address-master',
  // Slice AAAAAAAA (2026-05-11) — structured emits so the factory wires
  // afterChange hooks automatically. 'address:created' fires once at
  // row creation (any addressType); 'address:erased' fires when the
  // GDPR Art.17 right-to-erasure transitions the status. Aggregate type
  // 'order' is the closest fit in the current AggregateType union — a
  // later cut can broaden the union to include 'address'.
  emits: [
    { event: 'address:created', onCreate: true, aggregate: 'order' },
    { event: 'address:erased',  onStatus: 'gdpr_erased', aggregate: 'order' },
  ],

  // Address lifecycle — usable for natural-person GDPR purge flow
  injectStatusField: true,
  statusOptions: [
    { label: 'Active', value: 'active' },
    { label: 'Inactive (kept for audit)', value: 'inactive' },
    { label: 'GDPR-erased (PII redacted)', value: 'gdpr_erased' },
  ],
  statusDefault: 'active',

  fields: () => [
    referenceField({
      description: 'Tenant-unique handle (e.g. ADDR-2026-001). Used by integrations + audit trail.',
    }),

    // Display + type
    { name: 'displayLine', type: 'text', required: true,
      admin: { description: 'Single-line presentation (auto-built from structured fields on save in a later cut).' } },
    {
      name: 'addressType',
      type: 'select',
      required: true,
      defaultValue: 'postal',
      options: [
        { label: 'Postal', value: 'postal' },
        { label: 'Billing (EN-16931 §BG-8)', value: 'billing' },
        { label: 'Shipping / Deliver-to (EN-16931 §BG-15)', value: 'shipping' },
        { label: 'Registered office', value: 'registered' },
        { label: 'Trading / Doing-business-as', value: 'trading' },
        { label: 'Warehouse', value: 'warehouse' },
        { label: 'Site / Property', value: 'site' },
        { label: 'Residence (natural person)', value: 'residence' },
        { label: 'Tax-domicile', value: 'tax_domicile' },
        { label: 'Customs / Importer', value: 'customs' },
      ],
    },
    {
      name: 'personType',
      type: 'select',
      defaultValue: 'legal',
      options: [
        { label: 'Legal entity', value: 'legal' },
        { label: 'Natural person (GDPR scope)', value: 'natural' },
      ],
      admin: {
        description:
          'Drives GDPR posture. Natural-person addresses are personal data; legal-entity addresses are not.',
      },
    },

    // Owner relations — keep these soft (the user of an address is the
    // dominant entity; tracking the inverse here is informational).
    { name: 'customer', type: 'relationship', relationTo: 'customers' },
    { name: 'vendor', type: 'relationship', relationTo: 'vendors' },
    { name: 'legalEntity', type: 'relationship', relationTo: 'legal-entities' },
    { name: 'employee', type: 'relationship', relationTo: 'employees' },

    // Structured address fields per ISO-19160-4 + UPU S42
    { name: 'recipient', type: 'text',
      admin: { description: 'Person / company line — top of the envelope.' } },
    { name: 'careOf', type: 'text',
      admin: { description: 'c/o line — e.g. "c/o Smith Holdings GmbH".' } },
    { name: 'addressLine1', type: 'text', required: true,
      admin: { description: 'Street + house/building number. EN-16931 §BT-50 / BT-55.' } },
    { name: 'addressLine2', type: 'text',
      admin: { description: 'Apartment / suite / floor. EN-16931 §BT-51 / BT-56.' } },
    { name: 'addressLine3', type: 'text',
      admin: { description: 'Additional line (rare — use for non-Latin scripts or PO box). EN-16931 §BT-162 / BT-163.' } },
    { name: 'postCode', type: 'text', required: true,
      admin: { description: 'Postal / ZIP code. EN-16931 §BT-53 / BT-58.' } },
    { name: 'city', type: 'text', required: true,
      admin: { description: 'City / locality. EN-16931 §BT-52 / BT-57.' } },
    { name: 'cityCode', type: 'text',
      admin: { description: 'UN-LOCODE 5-char locality code where available.' } },
    { name: 'subdivisionCode', type: 'text',
      admin: { description: 'ISO 3166-2 subdivision (state / region / canton). EN-16931 §BT-54.' } },
    { name: 'countryCode', type: 'text', required: true,
      admin: { description: 'ISO 3166-1 alpha-2 country code. EN-16931 §BT-55 / BT-60.' } },
    { name: 'poBox', type: 'text',
      admin: { description: 'Post-office box number (when delivery is to PO box rather than street).' } },

    // Geo + validity
    { name: 'latitude', type: 'number',
      admin: { description: 'Decimal degrees (WGS-84). Optional — populated by geocoder.' } },
    { name: 'longitude', type: 'number',
      admin: { description: 'Decimal degrees (WGS-84). Optional — populated by geocoder.' } },
    { name: 'validFrom', type: 'date' },
    { name: 'validTo', type: 'date',
      admin: { description: 'Soft sunset — keeps the row for audit but excludes from active pickers.' } },
    { name: 'isVerified', type: 'checkbox', defaultValue: false,
      admin: { description: 'Set true once a verified-address service (e.g. EU postal API) confirms deliverability.' } },
    { name: 'verifiedBy', type: 'text',
      admin: { description: 'Source that verified the address (e.g. "DPAG", "USPS", "manual").' } },
    { name: 'verifiedAt', type: 'date' },

    // GDPR lifecycle (natural-person addresses only)
    { name: 'gdprErasedAt', type: 'date',
      admin: { description: 'Timestamp of right-to-erasure execution. When set, structured fields become null + hash kept for audit. Art.17.' } },
    { name: 'erasureHash', type: 'text',
      admin: { description: 'SHA-256 of (recipient || addressLine1 || postCode || city || countryCode) prior to erasure — preserves audit chain without retaining PII.' } },
  ],
})
