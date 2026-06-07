import { describe, it, expect } from 'vitest'
import Shares from '@/shares'

describe('shares', () => {
  it('has the correct slug and labels', () => {
    expect(Shares.slug).toBe('shares')
    expect(Shares.labels?.singular).toBe('Share')
    expect(Shares.labels?.plural).toBe('Shares')
  })

  it('exports a collection with timestamps enabled', () => {
    expect(Shares.timestamps).toBe(true)
  })

  it('has all required fields present by name', () => {
    const names = Shares.fields.map((f) => ('name' in f ? f.name : null))
    expect(names).toContain('shareUuid')
    expect(names).toContain('granteeUuid')
    expect(names).toContain('targetUuid')
    expect(names).toContain('accessRole')
    expect(names).toContain('grantedAt')
    expect(names).toContain('chainLeafUuid')
    expect(names).toContain('sealed')
    expect(names).toContain('revoked')
    expect(names).toContain('revokedAt')
    expect(names).toContain('revokeChainLeafUuid')
  })

  it('marks shareUuid, granteeUuid, targetUuid, accessRole as required', () => {
    const required = Shares.fields
      .filter((f) => 'required' in f && f.required === true)
      .map((f) => ('name' in f ? f.name : null))
    expect(required).toContain('shareUuid')
    expect(required).toContain('granteeUuid')
    expect(required).toContain('targetUuid')
    expect(required).toContain('accessRole')
  })

  it('accessRole is a select with the five RBAC lattice options', () => {
    const field = Shares.fields.find((f) => 'name' in f && f.name === 'accessRole') as any
    expect(field.type).toBe('select')
    const values = (field.options as Array<{ value: string }>).map((o) => o.value)
    expect(values).toEqual(['read', 'write', 'sign', 'admin', 'audit'])
  })

  it('revoked and sealed default to false', () => {
    const revokedField = Shares.fields.find((f) => 'name' in f && f.name === 'revoked') as any
    const sealedField = Shares.fields.find((f) => 'name' in f && f.name === 'sealed') as any
    expect(revokedField.defaultValue).toBe(false)
    expect(sealedField.defaultValue).toBe(false)
  })

  it('shareUuid, granteeUuid, targetUuid, revoked are indexed', () => {
    const indexed = Shares.fields
      .filter((f) => 'index' in f && (f as any).index === true)
      .map((f) => ('name' in f ? f.name : null))
    expect(indexed).toContain('shareUuid')
    expect(indexed).toContain('granteeUuid')
    expect(indexed).toContain('targetUuid')
    expect(indexed).toContain('revoked')
  })

  it('has access functions for read, create, update, delete', () => {
    expect(typeof Shares.access?.read).toBe('function')
    expect(typeof Shares.access?.create).toBe('function')
    expect(typeof Shares.access?.update).toBe('function')
    expect(typeof Shares.access?.delete).toBe('function')
  })

  it('has a beforeValidate hook wired', () => {
    expect(Array.isArray(Shares.hooks?.beforeValidate)).toBe(true)
    expect((Shares.hooks?.beforeValidate ?? []).length).toBeGreaterThan(0)
    expect(typeof (Shares.hooks?.beforeValidate ?? [])[0]).toBe('function')
  })

  it('admin uses shareUuid as title field', () => {
    expect((Shares.admin as any)?.useAsTitle).toBe('shareUuid')
  })
})
