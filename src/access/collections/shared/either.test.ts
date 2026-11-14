import { describe, it, expect } from 'vitest'
import type { Access } from 'payload'
import { either } from '@/access/collections/shared/either'

describe('either — the union of access rules', () => {
  type Args = Parameters<Access>[0]
  const args = {} as Args
  const yes: Access = () => true
  const no: Access = () => false
  const mine: Access = () => ({ owner: { equals: 'u1' } })
  const tenant: Access = () => ({ tenant: { equals: 't1' } })

  it('true from any rule wins, and later rules are not consulted', async () => {
    let consulted = false
    const spy: Access = () => { consulted = true; return false }
    expect(await either(no, yes, spy)(args)).toBe(true)
    expect(consulted).toBe(false)
  })
  it('false from every rule is false', async () => {
    expect(await either(no, no)(args)).toBe(false)
    expect(await either()(args)).toBe(false)
  })
  it('a constraint survives a denial; two constraints are OR-ed', async () => {
    expect(await either(no, mine)(args)).toEqual({ owner: { equals: 'u1' } })
    expect(await either(mine, tenant)(args)).toEqual({ or: [{ owner: { equals: 'u1' } }, { tenant: { equals: 't1' } }] })
  })
  it('awaits asynchronous rules', async () => {
    const later: Access = async () => ({ owner: { equals: 'u1' } })
    expect(await either(later, no)(args)).toEqual({ owner: { equals: 'u1' } })
  })
})
