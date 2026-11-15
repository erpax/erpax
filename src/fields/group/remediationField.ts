import type { Field } from 'payload'
import { validations } from 'payload/shared'

import { stampWhen } from '@/hooks/collections/shared/stampWhen'

/**
 * A remediation plan, as part of the deficiency it remediates (COSO-2013, SOX §404). It was the
 * remediation-plans collection, pointing at an audit finding or a compliance gap; both already carry
 * remediation in their own status lifecycle, so the plan is a group on each — one shape, two parents.
 *
 * A plan exists once it has a title. The fields are optional so a finding or gap can be recorded before
 * its plan; the rules below make the plan whole once it exists, and tie the parent's status to it.
 */

export interface Remediation {
  title?: string | null
  status?: string | null
  remediationType?: string | null
  priority?: string | null
  owner?: unknown
  targetDate?: string | null
}

/** A plan that exists names its type, priority, owner and target date. */
export const planFieldError = (value: unknown, plan: Remediation | undefined): string | true =>
  !plan?.title || (value !== undefined && value !== null && value !== '') ? true : 'A remediation plan names its type, priority, owner and target date.'

/**
 * The parent's status, held to its plan: some statuses need a plan to exist (`needsPlan`), and some need
 * it completed (`needsCompletion`) — a deficiency is not retested before it is remediated.
 */
export const remediationStateError = (
  status: unknown,
  plan: Remediation | undefined,
  rules: { needsPlan?: readonly string[]; needsCompletion?: readonly string[] },
): string | true => {
  if (typeof status !== 'string') return true
  if (rules.needsCompletion?.includes(status) && plan?.status !== 'completed') return `Status "${status}" needs its remediation plan completed.`
  if (rules.needsPlan?.includes(status) && !plan?.title) return `Status "${status}" needs a remediation plan.`
  return true
}

// ── Improving a policy goes through the policy ───────────────────────────────────────────────────
// A plan whose type is `policy-update` names the internal policy it improves, completes only once that
// policy has released a version on or after the deficiency was identified, and records which version
// carries the fix. The improvement lives in the policy's own version history, not beside it.

/** A policy-update plan names the policy it improves. */
export const policyNamedError = (policy: unknown, plan: Remediation | undefined): string | true =>
  plan?.remediationType !== 'policy-update' || Boolean(policy) ? true : 'A policy-update plan names the policy it improves.'

const day = (value: unknown): number => (value ? new Date(value as string).setUTCHours(0, 0, 0, 0) : Number.NaN)

/** A policy-update plan completes once its policy has released a version on or after the deficiency was identified. */
export const policyReleasedError = (releaseDate: unknown, identifiedDate: unknown): string | true =>
  !releaseDate
    ? 'A policy-update plan completes once its policy releases a new version.'
    : identifiedDate && day(releaseDate) < day(identifiedDate)
      ? 'A policy-update plan completes once its policy releases a version on or after the deficiency was identified.'
      : true

type Policy = { releaseDate?: string | null; versionNumber?: string | null }
type Req = { payload: { findByID: (args: Record<string, unknown>) => Promise<unknown> } }

/** The improved policy's release, read whatever the caller may see: it is evidence, not content. */
const policyOf = async (id: unknown, req: Req | undefined): Promise<Policy | undefined> => {
  if (!id || !req) return undefined
  const ref = typeof id === 'object' ? (id as { id?: unknown }).id : id
  try {
    return (await req.payload.findByID({ collection: 'internal-policies', id: ref, depth: 0, overrideAccess: true, req })) as Policy
  } catch {
    return undefined
  }
}

type Check = (value: unknown, args: never) => string | true | Promise<string | true>

/** Payload's own validation, then the plan rule (a bare `validate` would drop the option checks). */
const thenPlanRule =
  (base: unknown) =>
  async (value: unknown, args: never): Promise<string | true> => {
    const first = await (base as Check)(value, args)
    return first === true ? planFieldError(value, (args as { siblingData?: Remediation }).siblingData) : first
  }

export const remediationField = (): Field => ({
  name: 'remediation',
  type: 'group',
  label: 'Remediation plan',
  admin: { description: 'COSO-2013 deficiency remediation: the plan, its steps and its completion.' },
  fields: [
    { name: 'title', type: 'text', admin: { description: 'A plan exists once it has a title.' } },
    { name: 'description', type: 'textarea' },
    {
      type: 'row',
      fields: [
        {
          name: 'remediationType',
          type: 'select',
          options: [
            { label: 'Design Change', value: 'design-change' },
            { label: 'Process Change', value: 'process-change' },
            { label: 'System Implementation', value: 'system-implementation' },
            { label: 'Training', value: 'training' },
            { label: 'Documentation', value: 'documentation' },
            { label: 'Resource Addition', value: 'resource-addition' },
            { label: 'Policy Update', value: 'policy-update' },
            { label: 'Organizational Change', value: 'organizational-change' },
          ],
          validate: thenPlanRule(validations.select) as never,
        },
        {
          name: 'priority',
          type: 'select',
          options: [
            { label: 'Critical', value: 'critical' },
            { label: 'High', value: 'high' },
            { label: 'Medium', value: 'medium' },
            { label: 'Low', value: 'low' },
          ],
          validate: thenPlanRule(validations.select) as never,
        },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'planned',
          options: [
            { label: 'Planned', value: 'planned' },
            { label: 'In Progress', value: 'in-progress' },
            { label: 'Completed', value: 'completed' },
            { label: 'Delayed', value: 'delayed' },
            { label: 'On Hold', value: 'on-hold' },
            { label: 'Superseded', value: 'superseded' },
          ],
          // a policy-update plan completes only once its policy has released the fix
          validate: (async (value: unknown, args: never) => {
            const first = await (validations.select as unknown as Check)(value, args)
            const { siblingData, data, req } = args as { siblingData?: Remediation & { policy?: unknown }; data?: { identifiedDate?: unknown }; req?: Req }
            if (first !== true || value !== 'completed' || siblingData?.remediationType !== 'policy-update') return first
            const policy = await policyOf(siblingData.policy, req)
            return policyReleasedError(policy?.releaseDate, data?.identifiedDate)
          }) as never,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'policy',
          type: 'relationship',
          relationTo: 'internal-policies',
          admin: { description: 'The internal policy a policy-update plan improves.' },
          validate: (async (value: unknown, args: never) => {
            const first = await (validations.relationship as unknown as Check)(value, args)
            return first === true ? policyNamedError(value, (args as { siblingData?: Remediation }).siblingData) : first
          }) as never,
        },
        {
          name: 'policyVersion',
          type: 'text',
          admin: { readOnly: true, description: 'The policy version that carries the fix: stamped at completion, never changed.' },
          hooks: {
            beforeChange: [
              async ({ siblingData, previousValue, req }) => {
                if (previousValue) return previousValue
                const plan = siblingData as (Remediation & { policy?: unknown }) | undefined
                if (plan?.status !== 'completed' || plan.remediationType !== 'policy-update') return null
                return (await policyOf(plan.policy, req as unknown as Req))?.versionNumber ?? null
              },
            ],
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'owner', type: 'relationship', relationTo: 'users', validate: thenPlanRule(validations.relationship) as never },
        { name: 'targetDate', type: 'date', validate: thenPlanRule(validations.date) as never },
        {
          name: 'completionDate',
          type: 'date',
          admin: { readOnly: true, description: 'Set by the server when the plan is completed.' },
          hooks: { beforeChange: [stampWhen('completed')] },
        },
      ],
    },
    {
      name: 'actionSteps',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'sequence', type: 'number', required: true, min: 1 },
            { name: 'description', type: 'text', required: true },
            {
              name: 'status',
              type: 'select',
              defaultValue: 'not-started',
              options: [
                { label: 'Not Started', value: 'not-started' },
                { label: 'In Progress', value: 'in-progress' },
                { label: 'Completed', value: 'completed' },
                { label: 'On Hold', value: 'on-hold' },
              ],
            },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'owner', type: 'text' },
            { name: 'targetDate', type: 'date' },
            { name: 'completedDate', type: 'date', admin: { readOnly: true }, hooks: { beforeChange: [stampWhen('completed')] } },
          ],
        },
      ],
    },
    { name: 'requiredResources', type: 'textarea' },
    { name: 'budget', type: 'number', min: 0 },
    { name: 'riskOfDelay', type: 'textarea' },
    {
      type: 'row',
      fields: [
        { name: 'approvedBy', type: 'relationship', relationTo: 'users' },
        { name: 'approvalDate', type: 'date' },
      ],
    },
  ],
})

/** The parent's `status` validate: Payload's own select check, then the status-to-plan rule. */
export const statusHeldToPlan =
  (rules: { needsPlan?: readonly string[]; needsCompletion?: readonly string[] }) =>
  async (value: unknown, args: never): Promise<string | true> => {
    const first = await (validations.select as unknown as Check)(value, args)
    return first === true ? remediationStateError(value, (args as { data?: { remediation?: Remediation } }).data?.remediation, rules) : first
  }
