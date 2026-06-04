/**
 * LotWorkPhases — the routing step: one position in a lot's sort-ordered phase
 * chain, crossing OUT to the `work-phases` catalog.
 *
 * This is where a lot meets its production route. A `lot` is produced through an
 * ORDERED sequence of these steps (`sort` = the position on the chain); each step
 * binds the lot to one catalog `work-phase`, the team that runs it, and the
 * per-step time + unit counters. It is the [[coordinate]] cross of the routing
 * graph: `lot` (the containing axis) ⊕ `work-phase` (the catalog) ⊕ the `sort`
 * sequence (prev/next on the chain).
 *
 * Data-truth (etrima `lot_work_phases`, N=291 011):
 *  - `work_phase_id` resolves into the catalog 100% (291 011/291 011) — the cross
 *    is TOTAL; a routing step always names a real phase.
 *  - `sort` ranges 0..127 (avg 13.3); a lot carries 1..95 steps (median 23,
 *    avg 25.2) — a deep, ordered chain. Modeled as the sequence axis.
 *  - There is NO `status` column — the step's state is derived from its
 *    watermarks (`started_at` → `completed_at` → `confirmed_at`) exactly as the
 *    lot's is. Status is null/derived, never stored.
 *  - `units_ordered ≥ units_produced` holds 290 816/291 011 = 99.93% (the funnel,
 *    encoded as `@invariant` + a soft guard hook).
 *  - `efficiency_percent` and `price_per_minute` are populated (~100%);
 *    `pay_per_hour` ~80%; `cost_per_minute` is 100% NULL — a DEAD column, dropped.
 *
 * @standard ISA-95:2013 / IEC-62264-1 §B.4 process-segment routing-step
 * @standard ISO-22400-2:2014 manufacturing-operations efficiency throughput
 * @audit ISO-19011:2018 audit-trail routing-step-changes
 * @compliance SOX §404 internal-controls production-control
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @invariant the routing cross is total — `workPhase` always resolves (100% in 20 yrs of data).
 * @invariant funnel — `unitsProduced ≤ unitsOrdered` (99.93% in etrima; over-run warns, never blocks).
 * @see src/lots (the chain's containing lot) · src/workphases (the catalog cross target)
 */

import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/standard/collection/hook'
import { accountingCollectionAccess } from '@/auth'
import { auditFields, notesField } from '@/base/accounting/field'

/** A non-negative integer unit/minute counter — the double-entry numbers (see src/accounting). */
const counter = (name: string, description: string): CollectionConfig['fields'][number] => ({
  name,
  type: 'number',
  min: 0,
  admin: { description },
})

/**
 * Funnel guard — `unitsProduced` must not exceed `unitsOrdered`. Data-true at
 * 99.93%; the residue is real shop-floor over-run, so this WARNS (never blocks)
 * to keep the 20-yr history admissible while still surfacing the disharmony.
 */
export const warnLotWorkPhaseFunnel: CollectionBeforeChangeHook = ({ data, req }) => {
  const ordered = Number((data as { unitsOrdered?: unknown })?.unitsOrdered ?? 0)
  const produced = Number((data as { unitsProduced?: unknown })?.unitsProduced ?? 0)
  if (produced > ordered) {
    req?.payload?.logger?.warn(
      `lot-work-phases: unitsProduced (${produced}) > unitsOrdered (${ordered}) — production over-run (funnel disharmony).`,
    )
  }
  return data
}

const LotWorkPhases: CollectionConfig = {
  slug: 'lot-work-phases',
  labels: { singular: 'Lot Work Phase', plural: 'Lot Work Phases' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['lot', 'sort', 'workPhase', 'unitsOrdered', 'unitsProduced', 'percentCompleted'],
    group: 'Manufacturing',
    description:
      'The routing step — one sort-ordered position in a lot’s phase chain, crossing to the work-phases catalog. Carries per-step time + unit counters; state is derived from watermarks.',
  },
  access: accountingCollectionAccess({ feature: 'manufacturing' }),
  fields: [
    {
      name: 'lot',
      type: 'relationship',
      relationTo: 'lots',
      required: true,
      index: true,
      admin: { description: 'The containing lot (the coordinate axis — a lot HOLDS its routing chain).' },
    },
    {
      name: 'workPhase',
      type: 'relationship',
      relationTo: 'work-phases',
      required: true,
      index: true,
      admin: {
        description:
          'The catalog phase this step runs (the routing cross — resolves 100% in etrima). What kind of step this is.',
      },
    },
    {
      name: 'sort',
      type: 'number',
      index: true,
      min: 0,
      admin: {
        description:
          'Position on the lot’s phase chain (the sequence axis — prev/next). Range 0..127 in etrima; reading sort order IS the route.',
      },
    },
    {
      name: 'team',
      type: 'relationship',
      relationTo: 'work-centers',
      admin: { description: 'The team / work-center that runs this step (the resource).' },
    },
    {
      name: 'machineType',
      type: 'text',
      admin: { description: 'Machine type for this step (overrides the catalog default; ISA-95 §B.4).' },
    },
    { name: 'code', type: 'text', admin: { description: 'Step code (denormalized from the phase for display).' } },
    { name: 'name', type: 'text', admin: { description: 'Step name (denormalized from the phase for display).' } },

    // The unit funnel — double-entry counters (numbers, not status). See src/accounting.
    counter('unitsOrdered', 'Units routed into this step (the funnel head for the step).'),
    counter('unitsProduced', 'Units produced at this step (≤ unitsOrdered — 99.93% in etrima).'),

    // Time + rate (the allocation anchor — see src/accounting allocation ladder).
    counter('seconds', 'Standard seconds per unit at this step (the time anchor).'),
    counter('minutes', 'Total minutes routed (standard time × units).'),
    counter('minutesProduced', 'Minutes of verified production at this step.'),
    counter('minutesRemaining', 'Minutes still to produce (minutes − minutesProduced).'),
    counter('minutesBackordered', 'Minutes backordered (overdue against schedule).'),
    {
      name: 'efficiencyPercent',
      type: 'number',
      admin: { description: 'Realized efficiency % (ISO-22400-2; produced-time ÷ standard-time). Catalog min/max band the target.' },
    },
    {
      name: 'percentCompleted',
      type: 'number',
      min: 0,
      max: 100,
      admin: { description: 'Step completion % — derived high-water (minutesProduced ÷ minutes). 0..100.' },
    },
    {
      name: 'payPerHour',
      type: 'number',
      min: 0,
      admin: { description: 'Pay rate per hour for this step (allocation ladder; ~80% populated in etrima).' },
    },
    {
      name: 'pricePerMinute',
      type: 'number',
      min: 0,
      admin: { description: 'Charge-out price per minute (the revenue anchor for the step).' },
    },

    // Roll-up counters (denormalized children counts — the variant/batch fan-out).
    counter('variantsCount', 'Number of lot-variants touching this step.'),
    counter('batchesCount', 'Number of batches at this step.'),

    // Derived-state watermarks (status is NOT stored — derived from these, like the lot).
    { name: 'startedAt', type: 'date', admin: { description: 'When work began (derived-state watermark).' } },
    { name: 'completedAt', type: 'date', admin: { description: 'When the step completed (derived-state watermark).' } },
    { name: 'confirmedAt', type: 'date', admin: { description: 'When the step was confirmed (derived-state watermark).' } },

    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('lot-work-phases', { beforeChange: [warnLotWorkPhaseFunnel] }),
  timestamps: true,
}

export default LotWorkPhases
