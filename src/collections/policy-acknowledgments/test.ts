import { describe, it, expect } from 'vitest'
import type { CollectionBeforeChangeHook } from 'payload'
import { PolicyAcknowledgments, stampPolicyVersion } from '@/collections/policy-acknowledgments'

// Unified-node invariant test for the `policy-acknowledgments` collection.
describe('policy-acknowledgments collection node', () => {
  it('exports a valid collection config', () => {
    expect(PolicyAcknowledgments.slug).toBe('policy-acknowledgments')
    expect(Array.isArray(PolicyAcknowledgments.fields)).toBe(true)
    expect(PolicyAcknowledgments.fields.length).toBeGreaterThan(0)
  })
})

describe('policy-acknowledgments — an acknowledgment is of the policy as it stood', () => {
  type Args = Parameters<CollectionBeforeChangeHook>[0]
  const stamp = async (data: Record<string, unknown>, findByID: (a: { collection: string; id: unknown }) => Promise<unknown>) => {
    await stampPolicyVersion({ data, req: { payload: { findByID } } } as unknown as Args)
    return data.policyVersionNumber
  }
  const never = async () => { throw new Error('findByID should not be called') }

  it('records the version as text, not a link to a separate versions collection', () => {
    const field = PolicyAcknowledgments.fields.find((x) => 'name' in x && x.name === 'policyVersionNumber')
    expect(field?.type).toBe('text')
    expect(PolicyAcknowledgments.fields.some((x) => 'name' in x && x.name === 'policyVersion')).toBe(false)
  })
  it('stamps the policy\'s current version when none is given', async () => {
    expect(await stamp({ policy: 'p1' }, async ({ collection, id }) => (collection === 'internal-policies' && id === 'p1' ? { versionNumber: '3.1' } : null))).toBe('3.1')
    expect(await stamp({ policy: { id: 'p1', versionNumber: '2.0' } }, never)).toBe('2.0')
  })
  it('never overwrites a recorded version (a later revision does not change what was acknowledged)', async () => {
    expect(await stamp({ policy: 'p1', policyVersionNumber: '1.0' }, never)).toBe('1.0')
  })
  it('is best-effort: an unreachable or unversioned policy leaves it empty', async () => {
    expect(await stamp({ policy: 'p1' }, async () => { throw new Error('db down') })).toBeUndefined()
    expect(await stamp({ policy: 'p1' }, async () => ({}))).toBeUndefined()
    expect(await stamp({}, never)).toBeUndefined()
  })
})
