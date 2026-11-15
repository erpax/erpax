import { describe, expect, it } from 'vitest'

import { enforceSegregationOfDuties, idOf } from '@/hooks/collections/shared/enforceSegregationOfDuties'

describe('idOf — the id behind any reference shape', () => {
  it('reads plain ids, populated docs and Payload 4 authorship alike', async () => {
    expect(idOf('u1')).toBe('u1')
    expect(idOf({ id: 'u1' })).toBe('u1')
    expect(idOf({ relationTo: 'users', value: 'u1' })).toBe('u1')
    expect(idOf({ relationTo: 'users', value: { id: 'u1' } })).toBe('u1')
    expect(idOf(null)).toBeUndefined()
    const hook = enforceSegregationOfDuties('approvedBy', 'createdBy') as unknown as (a: object) => Promise<unknown>
    await expect(hook({ data: { approvedBy: 'u1' }, originalDoc: { createdBy: { relationTo: 'users', value: 'u1' } } })).rejects.toThrow(/Segregation of duties/)
  })
})
