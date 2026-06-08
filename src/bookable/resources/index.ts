/**
 * Bookable Resources — catalog of anything reservable (rooms, vehicles,
 * equipment, beds, conference suites, machinery, time slots).
 *
 * Slice ZZZZ (2026-05-10): the agnostic resource-booking primitive.
 * Pairs with `bookings` (the reservation events). The `kind` discriminator
 * carries the domain (hospitality / fleet / equipment / meeting / etc.)
 * so a single backend serves hotels, car rentals, training rooms,
 * shared workspaces, and field-service equipment uniformly.
 *
 * @standard ISO-18513:2021 tourism-services-vocabulary (when kind=hotel_room)
 * @standard ISO-3166-1:2020 country-codes resource-country
 * @standard ISO-4217:2015 currency-codes pricing
 * @standard ISO-8601-1:2019 date-time availability-windows
 * @standard ISO-55000:2014 asset-management resource-as-asset
 * @standard ISO-41001:2018 facility-management bookable-spaces
 * @audit ISO-19011:2018 audit-trail resource-master-changes
 * @compliance SOX §404 internal-controls revenue-completeness
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./Bookings.ts
 * @see ./Spaces.ts
 * @see ./FixedAssets.ts
 */

import type { CollectionConfig } from 'payload'
import { MODALITIES } from '@/medical/device'
import { standardCollectionHooks } from '@/standard/collection/hook'
import { accountingCollectionAccess } from '@/auth'
import { currencyField, statusField, notesField, auditFields } from '@/base/accounting/field'

const BookableResources: CollectionConfig = {
  slug: 'bookable-resources',
  labels: { singular: 'Bookable Resource', plural: 'Bookable Resources' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['code', 'name', 'kind', 'capacity', 'baseRate', 'status'],
    description:
      'Catalog of anything reservable. Domain-agnostic (rooms / vehicles / equipment / beds / time slots) via the `kind` discriminator.',
  },
  access: accountingCollectionAccess({ feature: 'resource_bookings' }),
  fields: [
    { name: 'code', type: 'text', required: true, unique: true, index: true,
      admin: { description: 'Short code (e.g. `ROOM-201`, `VAN-03`, `LATHE-A`).' } },
    { name: 'name', type: 'text', localized: true, required: true },
    { name: 'description', type: 'textarea', localized: true },
    {
      name: 'kind',
      type: 'select',
      required: true,
      defaultValue: 'meeting_room',
      options: [
        { label: 'Hotel Room (ISO 18513)', value: 'hotel_room' },
        { label: 'Meeting / Conference Room', value: 'meeting_room' },
        { label: 'Co-working Desk', value: 'desk' },
        { label: 'Vehicle (Fleet)', value: 'vehicle' },
        { label: 'Equipment / Tool', value: 'equipment' },
        { label: 'Machinery (Mfg)', value: 'machinery' },
        { label: 'Bed (Healthcare / Hostel)', value: 'bed' },
        { label: 'Field-service Slot', value: 'service_slot' },
        { label: 'Locker / Storage Unit', value: 'locker' },
        { label: 'Parking Spot', value: 'parking' },
        { label: 'Generic (other)', value: 'other' },
      ],
    },
    { name: 'category', type: 'text',
      admin: { description: 'Sub-category within kind (e.g. `executive_suite`, `cargo_van`, `5-axis_mill`).' } },
    {
      name: 'medicalModality',
      type: 'select',
      admin: {
        description: 'Clinical device modality — wired to medical/device registry (LOINC outputs).',
        condition: (data) => data?.kind === 'equipment' || data?.kind === 'bed',
        components: { Field: '@/admin/ui/fields/MedicalModalityPickerField' },
      },
      options: MODALITIES.map((m) => ({ label: m, value: m })),
    },
    { name: 'space', type: 'relationship', relationTo: 'spaces',
      admin: {
        description: 'For room-like resources, the FM space this resource lives in.',
        components: { Field: '@/admin/ui/fields/MatrixBondField' },
        custom: { atomPath: 'bookable/resources' },
      } },
    { name: 'fixedAsset', type: 'relationship', relationTo: 'fixed-assets',
      admin: {
        description: 'For tangible bookables (vehicle / equipment / machinery), the underlying IAS-16 asset row.',
        components: { Field: '@/admin/ui/fields/MatrixBondField' },
        custom: { atomPath: 'bookable/resources' },
      } },
    { name: 'capacity', type: 'number', defaultValue: 1, min: 0,
      admin: { description: 'Concurrent occupancy (people for room, kg/m³ for storage, hours for time slot).' } },
    { name: 'unitOfCapacity', type: 'text', defaultValue: 'persons',
      admin: { description: 'Free-text capacity unit (`persons`, `seats`, `kg`, `hours`, `slots`).' } },
    {
      name: 'rateBasis',
      type: 'select',
      defaultValue: 'per_night',
      options: [
        { label: 'Per Night (overnight)', value: 'per_night' },
        { label: 'Per Day', value: 'per_day' },
        { label: 'Per Hour', value: 'per_hour' },
        { label: 'Per Half-Day', value: 'per_half_day' },
        { label: 'Per Week', value: 'per_week' },
        { label: 'Per Month', value: 'per_month' },
        { label: 'Per Use (flat)', value: 'per_use' },
        { label: 'Per Mile / Km', value: 'per_distance' },
      ],
    },
    currencyField(),
    { name: 'baseRate', type: 'number', defaultValue: 0, min: 0,
      admin: { description: 'Standard rate per `rateBasis` unit (cents).' } },
    {
      name: 'pricingTiers',
      type: 'array',
      labels: { singular: 'Pricing Tier', plural: 'Pricing Tiers' },
      admin: { description: 'Optional yield-management ladder (peak / off-peak / member / corporate).' },
      fields: [
        { name: 'tierName', type: 'text', required: true },
        { name: 'rate', type: 'number', required: true, min: 0 },
        { name: 'effectiveFrom', type: 'date' },
        { name: 'effectiveTo', type: 'date' },
        { name: 'minStayDays', type: 'number' },
        { name: 'isActive', type: 'checkbox', defaultValue: true },
      ],
    },
    {
      name: 'amenities',
      type: 'array',
      labels: { singular: 'Amenity', plural: 'Amenities' },
      admin: { description: 'Free-text amenity tags (wifi, projector, accessibility, jacuzzi).' },
      fields: [
        { name: 'tag', type: 'text', required: true },
      ],
    },
    {
      name: 'availability',
      type: 'group',
      label: 'Availability defaults',
      fields: [
        { name: 'minBookingMinutes', type: 'number', defaultValue: 60 },
        { name: 'maxBookingDays', type: 'number', defaultValue: 365 },
        { name: 'noticeMinutes', type: 'number', defaultValue: 0,
          admin: { description: 'Minimum notice before booking start time.' } },
        { name: 'bufferBeforeMinutes', type: 'number', defaultValue: 0 },
        { name: 'bufferAfterMinutes', type: 'number', defaultValue: 0 },
      ],
    },
    { name: 'glAccount', type: 'relationship', relationTo: 'gl-accounts',
      admin: { description: 'Default revenue GL account for bookings of this resource.' } },
    { name: 'taxCode', type: 'relationship', relationTo: 'tax-codes',
      admin: { description: 'Default VAT / sales-tax code for bookings.' } },
    { name: 'country', type: 'text', admin: { description: 'ISO 3166-1 alpha-2 — drives tax + holiday calendar.' } },
    statusField(
      [
        { label: 'Active', value: 'active' },
        { label: 'Out of Service', value: 'out_of_service' },
        { label: 'Maintenance', value: 'maintenance' },
        { label: 'Retired', value: 'retired' },
      ],
      'active',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('bookable-resources'),
  timestamps: true,
}

export default BookableResources
