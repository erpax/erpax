import { describe, expect, it } from 'vitest'

import { Ability } from '@/utilities/ability'
import { abilityForRoles } from '@/utilities/ability/roles'
import { documentError, governedDocument, pageRead, pageWrite, typesFor } from '@/fields/group/governedDocument'

// a request whose role engine is unreachable: abilityOf grants nothing, so only the user's own roles count
const reqFor = (user: unknown) => ({ user, context: {}, payload: { findByID: async () => { throw new Error('offline') }, find: async () => { throw new Error('offline') } } })

const superAdmin = { id: 's', roles: ['admin'], tenants: [] }
const finance = { id: 'f', roles: ['user', 'finance'], tenants: [{ tenant: 't1' }] }
const tenantAdmin = { id: 'a', roles: ['user', 'admin'], tenants: [{ tenant: 't1', roles: ['admin'] }] }
const read = (user: unknown) => (pageRead as unknown as (a: object) => Promise<unknown>)({ req: reqFor(user) })

describe('governed documents on pages — never public, read and written by their type', () => {
  it('anonymous reads see published pages that are not governed', async () => {
    expect(JSON.stringify(await read(null))).toContain('"documentType":{"exists":false}')
    expect(JSON.stringify(await read(null))).toContain('published')
  })

  it('a signed-in reader sees website pages and the types their roles read', async () => {
    expect(await read(superAdmin)).toBe(true)
    expect(JSON.stringify(await read(finance))).toContain('"documentType":{"in":["reporting-standard"]}')
    expect(await read({ id: 'v', roles: ['user'] })).toEqual({ documentType: { exists: false } })
  })

  it('a role held through the role engine counts too (RBAC via the request context), and the broad rules do not widen it', async () => {
    const plain = { id: 'p', roles: ['user'] }
    expect(await typesFor(reqFor(plain) as never, 'read', async () => abilityForRoles({ roles: ['user', 'finance'] }))).toEqual(['reporting-standard'])
    expect(await typesFor(reqFor(plain) as never, 'read', async () => abilityForRoles({ roles: ['user'] }))).toEqual([])
    expect(await typesFor(reqFor(plain) as never, 'write', async () => abilityForRoles({ roles: ['admin'] }))).toEqual([])
    expect(await typesFor(reqFor(plain) as never, 'read', async () => new Ability())).toEqual([])
  })

  it('a reporting standard is written by a super-admin only, a website page by the site rule', async () => {
    expect(await typesFor(reqFor(tenantAdmin) as never, 'write')).toEqual([])
    expect(await typesFor(reqFor(superAdmin) as never, 'write')).toEqual(['reporting-standard'])
    const write = pageWrite(() => ({ tenant: { equals: 't1' } }))
    await expect(write({ req: reqFor(tenantAdmin), data: { documentType: 'reporting-standard' } } as never)).resolves.toBe(false)
    await expect(write({ req: reqFor(tenantAdmin), data: { title: 'About' } } as never)).resolves.toEqual({ and: [{ documentType: { exists: false } }, { tenant: { equals: 't1' } }] })
  })

  it('nobody turns a page into a type they may not write, and a type names what it requires', async () => {
    const run = (data: object, user: unknown, originalDoc?: object) => (governedDocument as unknown as (a: object) => Promise<unknown>)({ data, originalDoc, req: reqFor(user) })
    await expect(run({ documentType: 'reporting-standard' }, tenantAdmin, { documentType: null })).rejects.toThrow()
    await expect(run({ documentType: 'reporting-standard', document: { code: 'IFRS 15' } }, superAdmin)).rejects.toThrow(/names its effectiveDate, classification/)
    expect(await run({ documentType: 'reporting-standard', document: { code: 'IFRS 15', effectiveDate: '2018-01-01', classification: 'ifrs' } }, superAdmin)).toBeDefined()
    expect(documentError(null, {})).toBe(true)
  })
})
