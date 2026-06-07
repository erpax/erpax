import { describe, it, expect } from 'vitest'
import Shares from '@/shares'
import type { Field } from 'payload'

// shares — uuid-based RBAC share bindings (Law 59). The default export is the
// Payload CollectionConfig that IS the read-time access-control source of truth.
// These assert the service↔collection contract shape the SKILL documents.

const fieldByName = (name: string): Field => {
  const f = (Shares.fields as Field[]).find(
    (x): x is Field & { name: string } => 'name' in x && x.name === name,
  )
  if (!f) throw new Error(`no field ${name}`)
  return f
}

describe('shares — uuid-based RBAC share collection (Law 59)', () => {
  it('is the `shares` collection with shareUuid as its title', () => {
    expect(Shares.slug).toBe('shares')
    expect(Shares.admin?.useAsTitle).toBe('shareUuid')
    expect(Shares.timestamps).toBe(true)
  })

  it('carries the full grant binding the uuid-share service reads/writes', () => {
    const names = (Shares.fields as Field[])
      .filter((f): f is Field & { name: string } => 'name' in f)
      .map((f) => f.name)
    for (const required of [
      'shareUuid',
      'granteeUuid',
      'targetUuid',
      'accessRole',
      'grantedAt',
      'chainLeafUuid',
      'sealed',
      'revoked',
      'revokedAt',
      'revokeChainLeafUuid',
    ]) {
      expect(names).toContain(required)
    }
  })

  it('shareUuid is required + indexed but NOT unique (re-granting adds a fresh row)', () => {
    const f = fieldByName('shareUuid')
    expect((f as { required?: boolean }).required).toBe(true)
    expect((f as { index?: boolean }).index).toBe(true)
    expect((f as { unique?: boolean }).unique).toBeUndefined()
  })

  it('accessRole is the RBAC lattice select read < write < sign < admin + audit', () => {
    const f = fieldByName('accessRole') as Field & {
      type: string
      options: Array<{ value: string }>
    }
    expect(f.type).toBe('select')
    expect(f.options.map((o) => o.value)).toEqual(['read', 'write', 'sign', 'admin', 'audit'])
  })

  it('revocation is a soft flag (checkbox, default false, indexed) — never a delete', () => {
    const f = fieldByName('revoked')
    expect(f.type).toBe('checkbox')
    expect((f as { defaultValue?: boolean }).defaultValue).toBe(false)
    expect((f as { index?: boolean }).index).toBe(true)
    expect(fieldByName('sealed').type).toBe('checkbox')
  })

  it('access is tenant-scoped read with writes gated and a beforeValidate tenant hook', () => {
    expect(typeof Shares.access?.read).toBe('function')
    expect(typeof Shares.access?.create).toBe('function')
    expect(typeof Shares.access?.update).toBe('function')
    expect(typeof Shares.access?.delete).toBe('function')
    expect(Shares.hooks?.beforeValidate).toHaveLength(1)
  })
})
