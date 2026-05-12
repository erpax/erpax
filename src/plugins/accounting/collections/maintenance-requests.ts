/**
 * Maintenance Requests — user-raised tickets per ISO 41001 §8.1.
 *
 * Slice ZZZZ (2026-05-10): the front-of-house IWMS / CMMS ticket. An
 * occupant or sensor reports an issue; the FM team triages it and (if
 * actionable) raises a `maintenance-work-orders` row. Distinct from the
 * work order itself: a request may be rejected, deferred, or
 * consolidated into an existing work order.
 *
 * @standard ISO-41001:2018 §8.1 facility-management operational-control
 * @standard ISO-41011:2017 facility-management vocabulary
 * @standard ISO-55000:2014 asset-management corrective-maintenance
 * @standard ISO-8601-1:2019 date-time reported-at sla
 * @audit ISO-19011:2018 audit-trail maintenance-request-evidence
 * @compliance SOX §404 internal-controls fm-service-delivery
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./MaintenanceWorkOrders.ts
 * @see ./Properties.ts
 * @see ./Spaces.ts
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { autoSetTimestamp } from '@/hooks/autoSetTimestamp'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/access/auth'
import { multiTenancyField, statusField, notesField, auditFields, referenceField } from '@/fields/accounting/base-accounting-fields'

const MaintenanceRequests: CollectionConfig = {
  slug: 'maintenance-requests',
  labels: { singular: 'Maintenance Request', plural: 'Maintenance Requests' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'subject', 'priority', 'space', 'reportedAt', 'status'],
    description:
      'IWMS / CMMS service request per ISO 41001 §8.1. Occupant-raised tickets that may become maintenance work orders.',
  },
  access: accountingCollectionAccess({ feature: 'facility_management' }),
  fields: [
    multiTenancyField(),
    referenceField({ description: 'Sequential request reference (e.g. `MR-2026-04-001`).' }),
    { name: 'subject', type: 'text', required: true,
      admin: { description: 'Short summary (e.g. "Leaking tap room 201").' } },
    { name: 'description', type: 'textarea', localized: true, required: true },
    {
      name: 'requestType',
      type: 'select',
      required: true,
      defaultValue: 'corrective',
      options: [
        { label: 'Corrective (something broken)', value: 'corrective' },
        { label: 'Preventive (routine inspection)', value: 'preventive' },
        { label: 'Predictive (sensor anomaly)', value: 'predictive' },
        { label: 'Improvement (small upgrade)', value: 'improvement' },
        { label: 'Compliance (regulator-mandated)', value: 'compliance' },
        { label: 'Health & Safety', value: 'safety' },
        { label: 'Cleaning / Janitorial', value: 'cleaning' },
        { label: 'Move / Setup', value: 'move' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'priority',
      type: 'select',
      required: true,
      defaultValue: 'p3',
      options: [
        { label: 'P1 — Critical (safety / outage; <4h)', value: 'p1' },
        { label: 'P2 — High (significant impact; <24h)', value: 'p2' },
        { label: 'P3 — Medium (normal; <5 days)', value: 'p3' },
        { label: 'P4 — Low (minor; planned)', value: 'p4' },
      ],
    },
    { name: 'property', type: 'relationship', relationTo: 'properties', index: true,
      admin: { description: 'Property the issue is at.' } },
    { name: 'space', type: 'relationship', relationTo: 'spaces', index: true,
      admin: { description: 'Specific space (room / desk / zone), if known.' } },
    { name: 'fixedAsset', type: 'relationship', relationTo: 'fixed-assets',
      admin: { description: 'Specific asset (HVAC, lift, machinery) the issue concerns.' } },
    { name: 'bookableResource', type: 'relationship', relationTo: 'bookable-resources',
      admin: { description: 'When a bookable resource is impacted (vehicle / equipment / room).' } },
    { name: 'reportedBy', type: 'relationship', relationTo: 'users',
      admin: { description: 'User who raised the request (occupant / FM operator / sensor-fed system user).' } },
    { name: 'reportedByName', type: 'text',
      admin: { description: 'Free-text name (for anonymous portal submissions).' } },
    { name: 'reportedByEmail', type: 'email',
      admin: { description: 'Email for status notifications.' } },
    { name: 'reportedAt', type: 'date', required: true, index: true,
      admin: { description: 'When the request was raised.' } },
    { name: 'targetResolutionAt', type: 'date',
      admin: { description: 'SLA target resolution time — derived from priority + service-catalog rule.' } },
    {
      name: 'photos',
      type: 'array',
      labels: { singular: 'Photo', plural: 'Photos' },
      admin: { description: 'Optional photo evidence (URLs in R2 / object storage).' },
      fields: [
        { name: 'url', type: 'text', required: true },
        { name: 'caption', type: 'text', localized: true },
      ],
    },
    { name: 'workOrder', type: 'relationship', relationTo: 'maintenance-work-orders',
      admin: { description: 'Work order this request was promoted to (set by triage).' } },
    { name: 'triagedBy', type: 'relationship', relationTo: 'users',
      admin: { description: 'FM operator who triaged the request.' } },
    { name: 'triagedAt', type: 'date', admin: { readOnly: true } },
    { name: 'closedAt', type: 'date', admin: { readOnly: true } },
    { name: 'closureNote', type: 'textarea',
      admin: { description: 'Why closed (resolved / duplicate / not actionable / out of scope).' } },
    statusField(
      [
        { label: 'New', value: 'new' },
        { label: 'Triaged', value: 'triaged' },
        { label: 'Assigned (work order raised)', value: 'assigned' },
        { label: 'On Hold', value: 'on_hold' },
        { label: 'Resolved', value: 'resolved' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Duplicate', value: 'duplicate' },
        { label: 'Closed', value: 'closed' },
      ],
      'new',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [
      autoPopulateCreatedBy,
      autoSetTimestamp('triagedAt', (d) => (d as { status?: string }).status === 'triaged'),
      autoSetTimestamp('closedAt', (d) => {
        const s = (d as { status?: string }).status
        return s === 'resolved' || s === 'rejected' || s === 'duplicate' || s === 'closed'
      }),
    ],
    afterChange: [auditTrailAfterChange('maintenance-requests')],
  },
  timestamps: true,
}

export default MaintenanceRequests
