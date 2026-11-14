import { describe, it, expect } from 'vitest'
import { mayLogIn, refuseInactive } from '@/hooks/collections/users/refuseInactive'

describe('refuseInactive — an inactive user cannot sign in', () => {
  it('only an explicit false refuses; unset counts as active', () => {
    expect(mayLogIn({ active: true })).toBe(true)
    expect(mayLogIn({})).toBe(true)
    expect(mayLogIn({ active: null })).toBe(true)
    expect(mayLogIn({ active: false })).toBe(false)
  })
  it('the hook throws for an inactive user and passes an active one through', () => {
    const run = (user: object) => (refuseInactive as unknown as (args: { user: object }) => unknown)({ user })
    expect(run({ id: 1, active: true })).toEqual({ id: 1, active: true })
    let message = ''
    try { run({ id: 2, active: false }) } catch (error) { message = (error as Error).message }
    expect(message).toBe('This account is inactive.')
  })
})
