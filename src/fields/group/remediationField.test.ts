import { describe, expect, it } from 'vitest'

import { planFieldError, remediationField, remediationStateError } from '@/fields/group/remediationField'

describe('remediationField — a deficiency carries its own remediation plan (COSO-2013)', () => {
  it('is one group with its steps, shared by audit findings and compliance gaps', () => {
    const field = remediationField() as { name: string; type: string }
    expect(field).toMatchObject({ name: 'remediation', type: 'group' })
  })

  it('a plan that exists names its type, priority, owner and target date', () => {
    expect(planFieldError(undefined, { title: 'Fix access reviews' })).toMatch(/names its type/)
    expect(planFieldError('', { title: 'Fix access reviews' })).toMatch(/names its type/)
    expect(planFieldError('training', { title: 'Fix access reviews' })).toBe(true)
    expect(planFieldError(undefined, {})).toBe(true)
  })

  it('holds the parent status to the plan', () => {
    const finding = { needsPlan: ['in-remediation'], needsCompletion: ['remediated-pending', 'remediated-confirmed'] }
    expect(remediationStateError('in-remediation', {}, finding)).toMatch(/needs a remediation plan/)
    expect(remediationStateError('in-remediation', { title: 'Plan', status: 'in-progress' }, finding)).toBe(true)
    expect(remediationStateError('remediated-pending', { title: 'Plan', status: 'in-progress' }, finding)).toMatch(/completed/)
    expect(remediationStateError('remediated-confirmed', { title: 'Plan', status: 'completed' }, finding)).toBe(true)
    expect(remediationStateError('open', {}, finding)).toBe(true)
    expect(remediationStateError('closed', {}, { needsPlan: ['remediation-planned', 'in-remediation'] })).toBe(true)
  })
})

describe('remediationField — improving a policy goes through the policy', () => {
  it('a policy-update plan names the policy it improves', async () => {
    const { policyNamedError } = await import('@/fields/group/remediationField')
    expect(policyNamedError(undefined, { remediationType: 'policy-update' })).toMatch(/names the policy/)
    expect(policyNamedError('policy-1', { remediationType: 'policy-update' })).toBe(true)
    expect(policyNamedError(undefined, { remediationType: 'training' })).toBe(true)
  })

  it('completes once the policy has released a version on or after the deficiency was identified', async () => {
    const { policyReleasedError } = await import('@/fields/group/remediationField')
    expect(policyReleasedError(undefined, '2026-03-01')).toMatch(/releases a new version/)
    expect(policyReleasedError('2026-02-01T00:00:00.000Z', '2026-03-01T00:00:00.000Z')).toMatch(/on or after/)
    expect(policyReleasedError('2026-03-01T15:00:00.000Z', '2026-03-01T00:00:00.000Z')).toBe(true)
    expect(policyReleasedError('2026-04-01', '2026-03-01')).toBe(true)
  })
})
