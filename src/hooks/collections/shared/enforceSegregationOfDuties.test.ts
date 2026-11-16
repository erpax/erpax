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

describe('enforceSegregationOfDuties — the creator Payload keeps', () => {
  const hook = enforceSegregationOfDuties('approvedBy', 'createdBy') as unknown as (a: object) => Promise<unknown>

  it('on create the creator is the request user, since authorship stamps it after collection hooks', async () => {
    await expect(hook({ operation: 'create', data: { approvedBy: 'u1' }, req: { user: { id: 'u1' } } })).rejects.toThrow(/Segregation of duties/)
    await expect(hook({ operation: 'create', data: { approvedBy: 'u2' }, req: { user: { id: 'u1' } } })).resolves.toEqual({ approvedBy: 'u2' })
  })

  it('on update the stored creator wins over anything in the incoming data', async () => {
    const originalDoc = { createdBy: { relationTo: 'users', value: 'u1' } }
    await expect(hook({ operation: 'update', data: { approvedBy: 'u1', createdBy: 'someone-else' }, originalDoc, req: { user: { id: 'u3' } } })).rejects.toThrow(/Segregation of duties/)
  })
})

describe('enforceSegregationOfDuties — the refusal reaches the caller', () => {
  it('is a public 403, not a 500 the client sees as "Something went wrong"', async () => {
    const hook = enforceSegregationOfDuties('approvedBy', 'createdBy') as unknown as (a: object) => Promise<unknown>
    await expect(hook({ operation: 'update', data: { approvedBy: 'u1' }, originalDoc: { createdBy: 'u1' } })).rejects.toMatchObject({
      status: 403,
      isPublic: true,
      message: expect.stringMatching(/Segregation of duties/),
    })
  })
})
