/**
 * Spaces — sub-property zones (floor / room / desk / zone) for IWMS
 * space management.
 *
 * Slice ZZZZ (2026-05-10): the granular FM unit per ISO 41011 §3.3.5
 * (space). Pairs with `properties` (parent) and is referenced by
 * `bookable-resources` (when a space is reservable), `maintenance-work-orders`
 * (CMMS work targets), and `assigned-employees` (occupancy lookups).
 *
 * @standard ISO-41001:2018 facility-management-management-systems
 * @standard ISO-41011:2017 §3.3.5 facility-management space-vocabulary
 * @standard ISO-19650-1:2018 information-management-using-bim
 * @standard EN-15221-6:2011 facility-management area-and-space-measurement
 * @audit ISO-19011:2018 audit-trail space-master-changes
 * @compliance SOX §404 internal-controls space-allocation
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./Properties.ts
 * @see ./MaintenanceWorkOrders.ts
 * @see ./BookableResources.ts
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/plugins/auth/access'
import { multiTenancyField, statusField, notesField, auditFields } from '../fields/base-accounting-fields'

const Spaces: CollectionConfig = {
  slug: 'spaces',
  labels: { singular: 'Space', plural: 'Spaces' },
  admin: {
    useAsTitle: 'code',
    defaultColumns: ['code', 'name', 'property', 'kind', 'floor', 'area', 'status'],
    description:
      'IWMS sub-property zone per ISO 41011 §3.3.5 — room / floor / zone / desk / corridor. Targets for bookings, maintenance work orders, occupancy.',
  },
  access: accountingCollectionAccess({ feature: 'facility_management' }),
  fields: [
    multiTenancyField(),
    { name: 'code', type: 'text', required: true, unique: true, index: true,
      admin: { description: 'Short code (e.g. `HQ-SOF-F03-R201`).' } },
    { name: 'name', type: 'text', localized: true, required: true },
    { name: 'property', type: 'relationship', relationTo: 'properties', required: true, index: true },
    { name: 'parentSpace', type: 'relationship', relationTo: 'spaces',
      admin: { description: 'Optional parent — supports hierarchical spaces (floor → wing → room → desk).' } },
    {
      name: 'kind',
      type: 'select',
      required: true,
      defaultValue: 'room',
      options: [
        { label: 'Floor', value: 'floor' },
        { label: 'Wing / Section', value: 'wing' },
        { label: 'Room (enclosed)', value: 'room' },
        { label: 'Open Plan Area', value: 'open_plan' },
        { label: 'Desk / Workstation', value: 'desk' },
        { label: 'Corridor / Circulation', value: 'corridor' },
        { label: 'Bathroom / Sanitary', value: 'sanitary' },
        { label: 'Kitchen / Pantry', value: 'kitchen' },
        { label: 'Storage / Plant Room', value: 'storage' },
        { label: 'Outdoor / Garden / Terrace', value: 'outdoor' },
        { label: 'Parking Bay', value: 'parking' },
        { label: 'Lift / Elevator Shaft', value: 'lift' },
        { label: 'Stairwell', value: 'stair' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'usageCategory',
      type: 'select',
      defaultValue: 'office',
      options: [
        { label: 'Office (workstation)', value: 'office' },
        { label: 'Meeting / Conference', value: 'meeting' },
        { label: 'Hospitality / Guest', value: 'hospitality' },
        { label: 'Production / Manufacturing', value: 'production' },
        { label: 'Storage / Warehouse', value: 'storage' },
        { label: 'Retail / Customer-facing', value: 'retail' },
        { label: 'Common / Shared', value: 'common' },
        { label: 'Technical / MEP', value: 'technical' },
      ],
    },
    { name: 'floor', type: 'text',
      admin: { description: 'Floor identifier (e.g. `G`, `1`, `2`, `B1`).' } },
    { name: 'area', type: 'number', min: 0,
      admin: { description: 'Net usable area in m² (per EN-15221-6).' } },
    { name: 'capacity', type: 'number', min: 0,
      admin: { description: 'Occupant capacity (people / desks / beds).' } },
    { name: 'currentOccupancy', type: 'number', min: 0,
      admin: { description: 'Currently assigned occupants — drives utilisation KPIs.' } },
    { name: 'isBookable', type: 'checkbox', defaultValue: false,
      admin: { description: 'When true, paired with a `bookable-resources` row for reservation flow.' } },
    {
      name: 'amenities',
      type: 'array',
      labels: { singular: 'Amenity', plural: 'Amenities' },
      fields: [
        { name: 'tag', type: 'text', required: true,
          admin: { description: 'Free-text tag (wifi, projector, av, accessibility, hvac).' } },
      ],
    },
    {
      name: 'safety',
      type: 'group',
      label: 'Safety / Compliance',
      fields: [
        { name: 'fireZone', type: 'text',
          admin: { description: 'Fire-compartment zone id (per local building code).' } },
        { name: 'maxOccupancy', type: 'number',
          admin: { description: 'Statutory max occupancy (per fire / ISO 41001 §8.1).' } },
        { name: 'isAccessible', type: 'checkbox', defaultValue: false,
          admin: { description: 'WCAG / ADA-equivalent accessibility certified.' } },
      ],
    },
    { name: 'bimElementId', type: 'text',
      admin: { description: 'ISO 19650 BIM element id (GUID in the property\'s BIM model).' } },
    { name: 'glAccount', type: 'relationship', relationTo: 'gl-accounts',
      admin: { description: 'Default cost-allocation GL account (e.g. for utility cross-charges).' } },
    { name: 'costCenter', type: 'relationship', relationTo: 'cost-centers',
      admin: { description: 'Cost-centre that absorbs occupancy costs for this space.' } },
    statusField(
      [
        { label: 'Active', value: 'active' },
        { label: 'Renovation', value: 'renovation' },
        { label: 'Vacant', value: 'vacant' },
        { label: 'Restricted Access', value: 'restricted' },
        { label: 'Decommissioned', value: 'decommissioned' },
      ],
      'active',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('spaces')],
  },
  timestamps: true,
}

export default Spaces
