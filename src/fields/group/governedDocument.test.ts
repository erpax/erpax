import { describe, expect, it } from 'vitest'

import { documentError, governedDocument, pageRead, pageWrite, typesFor } from '@/fields/group/governedDocument'

const superAdmin = { id: 's', roles: ['admin'], tenants: [] }
const finance = { id: 'f', roles: ['user', 'finance'], tenants: [{ tenant: 't1' }] }
const tenantAdmin = { id: 'a', roles: ['user', 'admin'], tenants: [{ tenant: 't1', roles: ['admin'] }] }
const read = (user: unknown) => (pageRead as unknown as (a: object) => unknown)({ req: { user } })

describe('governed documents on pages — never public, read and written by their type', () => {
  it('anonymous reads see published pages that are not governed', () => {
    expect(JSON.stringify(read(null))).toContain('"documentType":{"exists":false}')
    expect(JSON.stringify(read(null))).toContain('published')
  })

  it('a signed-in reader sees website pages and the types their roles read', () => {
    expect(read(superAdmin)).toBe(true)
    expect(JSON.stringify(read(finance))).toContain('"documentType":{"in":["reporting-standard"]}')
    expect(read({ id: 'v', roles: ['user'] })).toEqual({ documentType: { exists: false } })
  })

  it('a reporting standard is written by a super-admin only, a website page by the site rule', async () => {
    expect(typesFor(tenantAdmin, 'write')).toEqual([])
    expect(typesFor(superAdmin, 'write')).toEqual(['reporting-standard'])
    const write = pageWrite(() => ({ tenant: { equals: 't1' } }))
    await expect(write({ req: { user: tenantAdmin }, data: { documentType: 'reporting-standard' } } as never)).resolves.toBe(false)
    await expect(write({ req: { user: tenantAdmin }, data: { title: 'About' } } as never)).resolves.toEqual({ and: [{ documentType: { exists: false } }, { tenant: { equals: 't1' } }] })
  })

  it('nobody turns a page into a type they may not write, and a type names what it requires', () => {
    const run = (data: object, user: unknown, originalDoc?: object) => (governedDocument as unknown as (a: object) => unknown)({ data, originalDoc, req: { user } })
    expect(() => run({ documentType: 'reporting-standard' }, tenantAdmin, { documentType: null })).toThrow()
    expect(() => run({ documentType: 'reporting-standard', document: { code: 'IFRS 15' } }, superAdmin)).toThrow(/names its effectiveDate, classification/)
    expect(run({ documentType: 'reporting-standard', document: { code: 'IFRS 15', effectiveDate: '2018-01-01', classification: 'ifrs' } }, superAdmin)).toBeDefined()
    expect(documentError(null, {})).toBe(true)
  })
})
