/**
 * Bookings — reservation events against bookable-resources.
 *
 * Slice ZZZZ (2026-05-10): the canonical reservation primitive — one
 * row per (resource × time-window × guest/customer/employee). Drives
 * IFRS-15 §35 over-time recognition for hospitality / rental and
 * IFRS-15 §38 point-in-time for one-off bookings; pairs with
 * `invoices` (the billing artefact) and emits `booking:checked_in` /
 * `booking:checked_out` for downstream GL + housekeeping triggers.
 *
 * @standard ISO-18513:2021 tourism-services-vocabulary check-in check-out
 * @standard ISO-8601-1:2019 date-time start-end-windows
 * @standard ISO-4217:2015 currency-codes pricing
 * @standard rfc-5545 icalendar-rrule recurring-bookings
 * @standard HTNG-2017 hotel-technology-next-generation
 * @standard OpenTravel Alliance reservation-message
 * @accounting IFRS IFRS-15 §35 over-time-recognition (multi-night stay)
 * @accounting IFRS IFRS-15 §38 point-in-time-recognition (single-use)
 * @accounting IFRS IFRS-15 §B20-B27 right-of-return cancellation-policy
 * @accounting US-GAAP ASC-606-10-25-27 over-time-criteria
 * @audit ISO-19011:2018 audit-trail booking-lifecycle
 * @compliance SOX §404 internal-controls revenue-completeness TOM-RES-01
 * @compliance GDPR Art.6(1)(b) lawful-basis-contract guest-data
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./BookableResources.ts
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { autoSetTimestamp } from '@/hooks/autoSetTimestamp'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/plugins/auth/access'
import { multiTenancyField, currencyField, statusField, notesField, auditFields, referenceField } from '../fields/base-accounting-fields'

const Bookings: CollectionConfig = {
  slug: 'bookings',
  labels: { singular: 'Booking', plural: 'Bookings' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'resource', 'startAt', 'endAt', 'totalAmount', 'status'],
    description:
      'Reservation event for a bookable-resource. Status flow: requested → held → confirmed → checked_in → checked_out → settled.',
  },
  access: accountingCollectionAccess({ feature: 'resource_bookings' }),
  fields: [
    multiTenancyField(),
    referenceField({ description: 'Sequential booking reference (e.g. `BK-2026-04-001` or PMS confirmation number).' }),
    { name: 'resource', type: 'relationship', relationTo: 'bookable-resources', required: true, index: true },
    {
      name: 'guestType',
      type: 'select',
      required: true,
      defaultValue: 'customer',
      options: [
        { label: 'Customer (external)', value: 'customer' },
        { label: 'Employee (internal)', value: 'employee' },
        { label: 'Address (anonymous walk-in)', value: 'address' },
      ],
    },
    { name: 'customer', type: 'relationship', relationTo: 'customers',
      admin: { description: 'Required when guestType = `customer`.', condition: (d) => (d as { guestType?: string })?.guestType === 'customer' } },
    { name: 'employee', type: 'relationship', relationTo: 'employees',
      admin: { description: 'Required when guestType = `employee`.', condition: (d) => (d as { guestType?: string })?.guestType === 'employee' } },
    { name: 'address', type: 'relationship', relationTo: 'addresses',
      admin: { description: 'Required when guestType = `address`.', condition: (d) => (d as { guestType?: string })?.guestType === 'address' } },
    { name: 'guestName', type: 'text',
      admin: { description: 'Display name (denormalised for fast list views).' } },
    { name: 'guestEmail', type: 'email',
      admin: { description: 'Confirmation email destination.' } },
    { name: 'partySize', type: 'number', defaultValue: 1, min: 1,
      admin: { description: 'Number of people / units (must respect resource.capacity).' } },
    { name: 'startAt', type: 'date', required: true, index: true,
      admin: { description: 'ISO 8601 — start of the booking window (inclusive).' } },
    { name: 'endAt', type: 'date', required: true, index: true,
      admin: { description: 'ISO 8601 — end of the booking window (exclusive). Must be ≥ startAt.' } },
    { name: 'rrule', type: 'text',
      admin: { description: 'Optional RFC 5545 RRULE for recurring bookings (e.g. `FREQ=WEEKLY;BYDAY=TU;COUNT=12`).' } },
    {
      name: 'channel',
      type: 'select',
      defaultValue: 'direct',
      options: [
        { label: 'Direct (own portal / phone / walk-in)', value: 'direct' },
        { label: 'OTA (Booking.com / Expedia / Airbnb)', value: 'ota' },
        { label: 'GDS (Sabre / Amadeus)', value: 'gds' },
        { label: 'Marketplace (3rd party)', value: 'marketplace' },
        { label: 'Internal (employee booking)', value: 'internal' },
      ],
    },
    { name: 'channelReference', type: 'text', index: true,
      admin: { description: 'External-channel reference (e.g. Booking.com confirmation id).' } },
    { name: 'rateApplied', type: 'number', defaultValue: 0, min: 0,
      admin: { description: 'Effective rate per resource.rateBasis unit (cents).' } },
    { name: 'unitsBilled', type: 'number', defaultValue: 1, min: 0,
      admin: { description: 'How many `rateBasis` units this booking covers (e.g. 3 nights, 4 hours).' } },
    { name: 'subtotalAmount', type: 'number', defaultValue: 0, min: 0,
      admin: { description: 'rateApplied × unitsBilled (cents).' } },
    { name: 'taxAmount', type: 'number', defaultValue: 0, min: 0,
      admin: { description: 'VAT / sales-tax (cents).' } },
    { name: 'totalAmount', type: 'number', defaultValue: 0, min: 0,
      admin: { description: 'subtotalAmount + taxAmount (cents).' } },
    { name: 'depositAmount', type: 'number', defaultValue: 0, min: 0,
      admin: { description: 'Pre-payment / hold (cents).' } },
    currencyField(),
    {
      name: 'cancellationPolicy',
      type: 'select',
      defaultValue: 'flex',
      options: [
        { label: 'Flexible (free cancel until start)', value: 'flex' },
        { label: 'Moderate (free cancel >24h)', value: 'moderate' },
        { label: 'Strict (no refund within 7d)', value: 'strict' },
        { label: 'Non-refundable', value: 'non_refundable' },
      ],
      admin: { description: 'IFRS-15 §B40 — drives revenue / breakage recognition on no-show / cancel.' },
    },
    { name: 'invoice', type: 'relationship', relationTo: 'invoices',
      admin: { description: 'Invoice raised at check-out (or pre-paid at confirmation).' } },
    { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries',
      admin: { readOnly: true, description: 'JE booked at check-out / no-show recognition.' } },
    statusField(
      [
        { label: 'Requested', value: 'requested' },
        { label: 'Held (provisional)', value: 'held' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Checked In', value: 'checked_in' },
        { label: 'Checked Out', value: 'checked_out' },
        { label: 'Settled (invoice paid)', value: 'settled' },
        { label: 'No-show', value: 'no_show' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      'requested',
    ),
    { name: 'confirmedAt', type: 'date', admin: { readOnly: true } },
    { name: 'checkedInAt', type: 'date', admin: { readOnly: true } },
    { name: 'checkedOutAt', type: 'date', admin: { readOnly: true } },
    { name: 'cancelledAt', type: 'date', admin: { readOnly: true } },
    { name: 'cancelReason', type: 'text', localized: true },
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [
      autoPopulateTenant,
      async ({ data }) => {
        if (data?.startAt && data?.endAt) {
          const from = new Date(data.startAt as string).getTime()
          const to = new Date(data.endAt as string).getTime()
          if (to < from) throw new Error('endAt must be on or after startAt')
        }
        return data
      },
    ],
    beforeChange: [
      autoPopulateCreatedBy,
      autoSetTimestamp('confirmedAt', (d) => (d as { status?: string }).status === 'confirmed'),
      autoSetTimestamp('checkedInAt', (d) => (d as { status?: string }).status === 'checked_in'),
      autoSetTimestamp('checkedOutAt', (d) => (d as { status?: string }).status === 'checked_out'),
      autoSetTimestamp('cancelledAt', (d) => (d as { status?: string }).status === 'cancelled'),
    ],
    afterChange: [auditTrailAfterChange('bookings')],
  },
  timestamps: true,
}

export default Bookings
