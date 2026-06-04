/**
 * WorkPhases — the reusable work-phase (operation) catalog: the routing
 * vocabulary a `lot` is produced through.
 *
 * A work-phase is a *kind* of process step (CONFEZIONE/sewing, TAGLIO/cutting,
 * OCCHIELLI/buttonholes, STIRO/steaming, RICAMO/embroidery, TINTORIA/dyeing,
 * RIFINITURA/finishing …) independent of any one lot — the industry-agnostic
 * unit a routing is composed of. It is the catalog `lotworkphases` cross to:
 * each routing step points OUT to one phase here and adds per-lot time + order.
 *
 * Data-truth (etrima `work_phases`, N=41 854):
 *  - It is a TREE: 20 329 roots ⊕ 21 525 children via the `ancestry` materialized
 *    path (Rails ancestry gem). Modeled as a self-referential `parent` (the
 *    coordinate axis — see [[coordinate]]).
 *  - `kind` is the operation family; CONFEZIONE (sewing) dominates (~26k), then
 *    OCCHIELLI/RIFINITURA/TAGLIO/RICAMO/TINTORIA/STIRO. Free vocabulary, not a
 *    closed enum (20 yrs of real shop-floor names).
 *  - `archived` is 100% NULL — a DEAD column. Dropped; lifecycle is `status`.
 *  - `machine_type_id` / `work_seconds` / `skill_level` describe the standard
 *    resource + standard time the phase runs at (the rate anchor — see
 *    src/accounting).
 *
 * @standard ISA-95:2013 / IEC-62264-1 §B.4 operations-definition process-segment
 * @standard ISO-22400-2:2014 manufacturing-operations KPIs standard-time
 * @audit ISO-19011:2018 audit-trail work-phase-definition-changes
 * @compliance SOX §404 internal-controls production-control
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @invariant tree — `parent` is acyclic; a phase is never its own ancestor.
 * @see src/lotworkphases (the routing step that crosses to this catalog)
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/standard/collection/hook'
import { accountingCollectionAccess } from '@/auth'
import { referenceField, statusField, auditFields, notesField } from '@/base/accounting/field'

const WorkPhases: CollectionConfig = {
  slug: 'work-phases',
  labels: { singular: 'Work Phase', plural: 'Work Phases' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['code', 'name', 'kind', 'workSeconds', 'status'],
    group: 'Manufacturing',
    description:
      'Reusable work-phase (operation) catalog — the routing vocabulary (sewing/cutting/buttonholes/steaming/embroidery/dyeing/finishing). A self-referential tree; lotworkphases compose these.',
  },
  // Same access spine as the manufacturing catalog (Operations) — feature-gated.
  access: accountingCollectionAccess({ feature: 'manufacturing' }),
  fields: [
    referenceField({ name: 'code', description: 'Work-phase code (e.g. `CONF_12`, `OCCHIELLI`).' }),
    { name: 'name', type: 'text', required: true, admin: { description: 'Work-phase name.' } },
    {
      name: 'kind',
      type: 'text',
      index: true,
      admin: {
        description:
          'Operation family — the shop-floor vocabulary (CONFEZIONE/sewing, TAGLIO/cutting, OCCHIELLI, RIFINITURA, RICAMO, TINTORIA, STIRO). Open text, not a closed enum (20 yrs of real names).',
      },
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'work-phases',
      index: true,
      admin: {
        description:
          'Parent work-phase — the operation-type hierarchy (the coordinate axis). 20 329 roots ⊕ 21 525 children in etrima; acyclic.',
      },
    },
    {
      name: 'machineType',
      type: 'text',
      admin: { description: 'Machine type the phase runs on (resource anchor; ISA-95 §B.4).' },
    },
    {
      name: 'workType',
      type: 'text',
      admin: { description: 'Work type (process classification within the family).' },
    },
    {
      name: 'workSeconds',
      type: 'number',
      min: 0,
      admin: {
        description:
          'Standard time per unit, in seconds (the rate anchor — pay = anchor × verified time; ISO-22400-2 standard-time).',
      },
    },
    {
      name: 'skillLevel',
      type: 'number',
      min: 0,
      admin: { description: 'Required skill level (allocation ladder input).' },
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
  hooks: standardCollectionHooks('work-phases'),
  timestamps: true,
}

export default WorkPhases
