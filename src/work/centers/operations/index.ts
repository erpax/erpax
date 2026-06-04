/**
 * Operations — the reusable operation-type catalog.
 *
 * An operation is a kind of process step (Cut, Sew, Mix, Assemble,
 * Inspect, Pack) independent of any one product — the industry-agnostic
 * unit a routing is composed of. A self-referential `parent` forms the
 * operation-type hierarchy; each has a default work-center. Routing
 * steps (`routings`) reference these and add per-order time + sequence.
 *
 * @standard ISA-95:2013 / IEC-62264-1 §B.4 operations-definition process-segment
 * @standard ISO-22400-2:2014 manufacturing-operations KPIs
 * @audit ISO-19011:2018 audit-trail operation-definition-changes
 * @compliance SOX §404 internal-controls production-control
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./Routings.ts
 * @see ./WorkCenters.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/standard/collection/hook'
import { accountingCollectionAccess } from '@/auth'
import { referenceField, statusField, auditFields, notesField } from '@/base/accounting/field'

const Operations: CollectionConfig = {
  slug: 'operations',
  labels: { singular: 'Operation', plural: 'Operations' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'name', 'defaultWorkCenter', 'status'],
    description:
      'Reusable operation-type catalog (Cut/Sew/Mix/Assemble/Inspect/Pack). Industry-agnostic; routings compose these.',
  },
  access: accountingCollectionAccess({ feature: 'manufacturing' }),
  fields: [
    referenceField({ description: 'Operation code (e.g. `OP-SEW`).' }),
    { name: 'name', type: 'text', required: true, admin: { description: 'Operation name.' } },
    {
      name: 'defaultWorkCenter',
      type: 'relationship',
      relationTo: 'work-centers',
      admin: { description: 'Default work-center this operation runs on (a routing step may override).' },
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'operations',
      admin: { description: 'Parent operation — the operation-type hierarchy.' },
    },
    statusField(
      [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
      'active',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('operations'),
  timestamps: true,
}

export default Operations
