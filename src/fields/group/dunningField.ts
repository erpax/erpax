import { APIError, type CollectionBeforeChangeHook, type Field } from 'payload'
import { validations } from 'payload/shared'

import { stampWhen } from '@/hooks/collections/shared/stampWhen'

/**
 * Dunning — the collection process of one overdue invoice, as part of the invoice (IFRS-9 §5.5 ECL
 * evidence, ASC-326-20). It was the dunning-cycles collection, one row per (tenant, invoice), repeating
 * the invoice's customer, due date and amount; on the invoice those come from the invoice itself.
 *
 * Its header said the 15-minute dunning job upserts it. It never did: that job runs SUBSCRIPTION dunning
 * (past due → grace → suspended) on `subscriptions`. This is the RECEIVABLES process — reminder, demands,
 * legal handover, write-off — moved by a person or a future job, and recorded here:
 *
 *   · every stage change appends its history entry, stamped by the server;
 *   · the history is append-only (an auditor reads it for ECL evidence): no stored entry is removed or changed;
 *   · a pause names its reason;
 *   · the write-off journal entry is written by the ledger, never by a caller.
 */

export const DUNNING_STAGES = [
  { label: '1 — Friendly reminder (day +5)', value: 'reminder' },
  { label: '2 — First demand (day +15)', value: 'first_demand' },
  { label: '3 — Second demand (day +30)', value: 'second_demand' },
  { label: '4 — Legal handover (day +60)', value: 'legal_handover' },
  { label: '5 — Written off (day +90)', value: 'written_off' },
] as const

interface Entry {
  id?: string | null
  stage?: string | null
  enteredAt?: string | null
  amountOverdueAtEntry?: number | null
}

export interface Dunning {
  stage?: string | null
  stageEnteredAt?: string | null
  history?: Entry[] | null
}

/** The history is append-only: every stored entry is still there, with its stage and time unchanged. */
export const historyError = (stored: readonly Entry[], incoming: readonly Entry[]): string | true => {
  const now = new Map(incoming.filter((e) => e.id).map((e) => [e.id, e]))
  const broken = stored.find((e) => {
    const kept = e.id ? now.get(e.id) : undefined
    return !kept || kept.stage !== e.stage || String(kept.enteredAt) !== String(e.enteredAt)
  })
  return broken ? 'The dunning history is append-only: a stored entry cannot be removed or changed.' : true
}

/** A stage change appends its entry and stamps when the stage was entered; otherwise both are kept. */
export const withStageEntry = (dunning: Dunning, previous: Dunning | undefined, now: string, amountDue: unknown): Dunning => {
  const history = dunning.history ?? previous?.history ?? []
  if (!dunning.stage || dunning.stage === previous?.stage) return { ...dunning, history, stageEnteredAt: previous?.stageEnteredAt ?? dunning.stageEnteredAt ?? null }
  const entry: Entry = { stage: dunning.stage, enteredAt: now, amountOverdueAtEntry: typeof amountDue === 'number' ? amountDue : null }
  return { ...dunning, stageEnteredAt: now, history: [...history, entry] }
}

/** A paused cycle names its reason. */
export const pauseError = (reason: unknown, paused: unknown): string | true => (!paused || reason ? true : 'A paused dunning cycle names its reason.')

/** The invoice's `beforeChange`: guards the history and records each stage change. */
export const dunningHistory: CollectionBeforeChangeHook = ({ data, originalDoc }) => {
  const incoming = (data as { dunning?: Dunning } | undefined)?.dunning
  if (!data || !incoming) return data
  const previous = (originalDoc as { dunning?: Dunning } | undefined)?.dunning
  const stored = previous?.history ?? []
  const error = historyError(stored, incoming.history ?? stored)
  if (error !== true) throw new APIError(error, 400)
  const amountDue =
    (data as { amounts?: { totalDue?: unknown } }).amounts?.totalDue ?? (originalDoc as { amounts?: { totalDue?: unknown } } | undefined)?.amounts?.totalDue
  return { ...data, dunning: withStageEntry(incoming, previous, new Date().toISOString(), amountDue) }
}

type Check = (value: unknown, args: never) => string | true | Promise<string | true>

export const dunningField = (): Field => ({
  name: 'dunning',
  type: 'group',
  label: 'Dunning',
  admin: { description: 'The collection process of this invoice once overdue (IFRS-9 §5.5 evidence).' },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'stage', type: 'select', options: [...DUNNING_STAGES] },
        { name: 'stageEnteredAt', type: 'date', admin: { readOnly: true, description: 'Set by the server when the stage changes.' } },
        { name: 'nextActionDate', type: 'date' },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Active', value: 'active' },
            { label: 'Paused', value: 'paused' },
            { label: 'Resolved (paid)', value: 'resolved' },
            { label: 'Written off', value: 'written_off' },
            { label: 'Closed', value: 'closed' },
          ],
        },
        { name: 'resolvedAt', type: 'date', admin: { readOnly: true }, hooks: { beforeChange: [stampWhen(['resolved', 'written_off'])] } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'paused', type: 'checkbox', defaultValue: false, admin: { description: 'Pause the progression (dispute, payment plan, legal hold).' } },
        {
          name: 'pauseReason',
          type: 'select',
          options: [
            { label: 'Disputed by customer', value: 'disputed' },
            { label: 'Payment plan agreed', value: 'payment_plan' },
            { label: 'Legal hold', value: 'legal_hold' },
            { label: 'Customer bankruptcy', value: 'bankruptcy' },
            { label: 'Manual review', value: 'manual_review' },
          ],
          validate: (async (value: unknown, args: never) => {
            const first = await (validations.select as unknown as Check)(value, args)
            return first === true ? pauseError(value, (args as { siblingData?: { paused?: unknown } }).siblingData?.paused) : first
          }) as never,
        },
        { name: 'paymentPlanRef', type: 'text' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'eclProvision', type: 'number', min: 0, admin: { description: 'Allowance for doubtful accounts attributable to this invoice.' } },
        {
          name: 'writeOffJournalEntry',
          type: 'relationship',
          relationTo: 'journal-entries',
          // written by the ledger when the invoice is written off, never by a caller
          access: { create: () => false, update: () => false },
          admin: { readOnly: true },
        },
      ],
    },
    {
      name: 'history',
      type: 'array',
      labels: { singular: 'Stage entry', plural: 'Stage history' },
      admin: { description: 'Append-only: each stage change adds its entry; stored entries cannot be removed or changed.' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'stage',
              type: 'select',
              required: true,
              options: [...DUNNING_STAGES, { label: 'Paused (manual)', value: 'paused' }, { label: 'Resolved (paid)', value: 'resolved' }],
            },
            { name: 'enteredAt', type: 'date', required: true },
            { name: 'amountOverdueAtEntry', type: 'number' },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'communicationSent',
              type: 'select',
              options: [
                { label: 'None', value: 'none' },
                { label: 'Email', value: 'email' },
                { label: 'SMS', value: 'sms' },
                { label: 'Postal letter', value: 'letter' },
                { label: 'Phone call (logged)', value: 'phone' },
                { label: 'Legal demand letter', value: 'legal_letter' },
              ],
            },
            { name: 'communicationReference', type: 'text' },
          ],
        },
        { name: 'notes', type: 'textarea' },
      ],
    },
  ],
})
