import type { PayloadRequest } from 'payload'
import { describe, expect, it } from 'vitest'
import { getUser, getUserContext } from './index'

const req = (user: unknown): PayloadRequest => ({ user } as unknown as PayloadRequest)

describe('auth/context — the identity readers, as a leaf', () => {
  it('a machine identity (no roles) narrows to null, an app user narrows to itself', () => {
    expect(getUser(req(null))).toBeNull()
    expect(getUser(req({ id: 7, apiKey: 'k' }))).toBeNull()
    const u = { id: 3, roles: ['user'], tenants: [] }
    expect(getUser(req(u))).toBe(u)
  })

  it('derives the first tenant membership as a string, and the empty string when there is none', () => {
    expect(getUserContext(req({ id: 1, roles: ['admin'], tenants: [{ tenant: 42 }] }))).toEqual({ id: '1', tenant: '42', roles: ['admin'] })
    expect(getUserContext(req({ id: 'u-2', roles: [], tenants: [{ tenant: { id: 9 } }] }))).toEqual({ id: 'u-2', tenant: '', roles: [] })
    expect(getUserContext(req({ id: 5, roles: undefined }))).toEqual({ id: '5', tenant: '', roles: [] })
    expect(getUserContext(req({ id: 5 }))).toBeNull()
  })

  it('imports nothing but types — a leaf no import loop can close through', async () => {
    const { readFileSync } = await import('node:fs')
    const { join } = await import('node:path')
    const src = readFileSync(join(process.cwd(), 'src/auth/context/index.ts'), 'utf8')
    const runtimeImports = [...src.matchAll(/^import (?!type )[^\n]*from '([^']+)'/gm)].map((m) => m[1])
    expect(runtimeImports).toEqual([])
  })
})
