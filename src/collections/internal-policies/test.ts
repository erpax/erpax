import { describe, it, expect } from 'vitest'
import { InternalPolicies } from '@/collections/internal-policies'

// Unified-node invariant test for the `internal-policies` collection.
describe('internal-policies collection node', () => {
  it('exports a valid collection config', () => {
    expect(InternalPolicies.slug).toBe('internal-policies')
    expect(Array.isArray(InternalPolicies.fields)).toBe(true)
    expect(InternalPolicies.fields.length).toBeGreaterThan(0)
  })
  it('keeps its version history natively and without limit (the folded policy-versions collection)', () => {
    expect(InternalPolicies.versions).toEqual({ maxPerDoc: 0 }) // 0 = keep every version; superseded policy text is evidence
    const names = InternalPolicies.fields.flatMap((x) => ('name' in x ? [x.name] : []))
    for (const name of ['versionNumber', 'versionName', 'releaseDate', 'changes']) expect(names, name).toContain(name)
  })
})

describe('internal-policies — acknowledgments (the folded policy-acknowledgments collection)', () => {
  it('records the version acknowledged: stored rows keep theirs, new rows take the current one, a caller cannot claim another', async () => {
    const { acknowledgedVersions } = await import('@/collections/internal-policies')
    const stored = [{ id: 'r1', employeeId: 'E1', policyVersion: '3.1' }]
    const rows = [{ id: 'r1', employeeId: 'E1', policyVersion: '9.9' }, { employeeId: 'E2', policyVersion: '9.9' }]
    expect(acknowledgedVersions(rows, stored, '4.0').map((r) => r.policyVersion)).toEqual(['3.1', '4.0'])
    expect(acknowledgedVersions([{ employeeId: 'E3' }], [], undefined)[0]?.policyVersion).toBeNull()
  })

  it('a person acknowledges a given version once', async () => {
    const { duplicateAcknowledgmentError } = await import('@/collections/internal-policies')
    expect(duplicateAcknowledgmentError([{ employeeId: 'E1', policyVersion: '3.1' }, { employeeId: 'E1', policyVersion: '4.0' }])).toBe(true)
    expect(duplicateAcknowledgmentError([{ employeeId: 'E1', policyVersion: '3.1' }, { employeeId: 'e1', policyVersion: '3.1' }])).toMatch(/once/)
    expect(duplicateAcknowledgmentError([{ employeeName: 'Ana', policyVersion: '3.1' }, { employeeName: 'Ivan', policyVersion: '3.1' }])).toBe(true)
  })
})
