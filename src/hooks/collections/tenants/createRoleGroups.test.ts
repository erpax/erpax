import type { PayloadRequest } from 'payload'
import { describe, expect, it, vi } from 'vitest'

import { baseDomainOf, createRoleGroups, roleGroupRows } from '@/hooks/collections/tenants/createRoleGroups'

const run = (operation: 'create' | 'update', doc: Record<string, unknown>, create = vi.fn(async (_args: unknown) => ({}))) => {
  const warn = vi.fn()
  const req = { payload: { create, logger: { warn } } } as unknown as PayloadRequest
  return { done: createRoleGroups({ doc, operation, req } as never), create, warn }
}

describe('createRoleGroups — a tenant gets the groups that hold its roles', () => {
  it('a customer tenant gets the app group and the three role groups of each app it has', () => {
    const rows = roleGroupRows({ id: 't1', domain: 'acme.com', apps: ['sales'] })
    const emails = rows.map((row) => row.email)
    expect(emails).toContain('sales@acme.com')
    for (const role of ['admin', 'manager', 'user']) expect(emails).toContain(`${role}@sales.acme.com`)
    expect(emails.some((email) => email.endsWith('@stock.acme.com'))).toBe(false)
    expect(new Set(emails).size).toBe(emails.length)
    expect(rows.every((row) => row.tenant === 't1')).toBe(true)
  })

  it('a tenant that chose no apps has every app', () => {
    expect(roleGroupRows({ id: 't1', domain: 'acme.com' }).map((row) => row.email)).toEqual(expect.arrayContaining(['manager@sales.acme.com', 'manager@stock.acme.com']))
  })

  it('an app tenant gets only its own app, on the base domain', () => {
    const emails = roleGroupRows({ id: 't2', app: 'sales', domain: 'sales.erpax.com', apps: ['admin', 'sales', 'platform'] }).map((row) => row.email)
    expect(emails.sort()).toEqual(['admin@sales.erpax.com', 'manager@sales.erpax.com', 'sales@erpax.com', 'user@sales.erpax.com'])
    expect(baseDomainOf('Sales.ERPAX.com', 'sales')).toBe('erpax.com')
    expect(baseDomainOf('acme.com', null)).toBe('acme.com')
  })

  it('a tenant with no usable domain gets none', () => {
    for (const domain of [undefined, null, '', 'localhost', 'not a domain']) expect(roleGroupRows({ id: 't3', domain }), String(domain)).toEqual([])
  })

  it('creates the groups on create, under the system\'s own access, and not on update', async () => {
    const created = run('create', { id: 't1', domain: 'acme.com', apps: ['sales'] })
    await created.done
    expect(created.create).toHaveBeenCalled()
    expect(created.create.mock.calls.every(([args]) => (args as { overrideAccess: boolean; collection: string }).overrideAccess && (args as { collection: string }).collection === 'groups')).toBe(true)
    const updated = run('update', { id: 't1', domain: 'acme.com', apps: ['sales'] })
    await updated.done
    expect(updated.create).not.toHaveBeenCalled()
  })

  it('a group that cannot be created is logged and never blocks the tenant', async () => {
    const failing = run('create', { id: 't1', domain: 'acme.com', apps: ['sales'] }, vi.fn(async (_args: unknown) => { throw new Error('duplicate address') }))
    await expect(failing.done).resolves.toMatchObject({ id: 't1' })
    expect(failing.warn).toHaveBeenCalled()
  })
})
