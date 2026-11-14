import { describe, it, expect } from 'vitest'
import { withPasswordStamp } from '@/hooks/collections/users/stampAuth'

describe('withPasswordStamp — a write that sets a password records when', () => {
  const now = new Date('2026-11-14T12:00:00.000Z')
  it('stamps when the write carries a password', () => {
    expect(withPasswordStamp({ password: 'x', name: 'A' }, now)).toEqual({ password: 'x', name: 'A', passwordChangedAt: '2026-11-14T12:00:00.000Z' })
  })
  it('leaves a write without a password as it was', () => {
    expect(withPasswordStamp({ name: 'A' }, now)).toEqual({ name: 'A' })
    expect(withPasswordStamp({ name: 'A', password: '' }, now)).toEqual({ name: 'A', password: '' })
  })
})
