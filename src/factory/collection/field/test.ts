import { describe, it, expect } from 'vitest'
import { createCalculatedField, createGLAccountFields, createLineItemArray } from './index'

describe('factory/collection/field — a computed field is not a question', () => {
  it('a calculated field is hidden from the admin and carries its own calculator', () => {
    const f = createCalculatedField('total', (d) => Number(d.qty ?? 0) * 2, 'qty × 2')
    expect(f.name).toBe('total')
    expect(f.type).toBe('number')
    expect(f.admin.disabled).toBe(true)
    expect(f.admin.description).toBe('qty × 2')
    // The calculator travels WITH the field — a hook reads it rather than re-deriving it.
    expect(f._calculator({ qty: 21 })).toBe(42)
  })

  it('a GL account is a RELATION to gl-accounts — never a typed code', () => {
    const fields = createGLAccountFields([{ name: 'cash', description: 'Cash account' }])
    expect(fields.length).toBe(1)
    const f = fields[0] as { type: string; relationTo?: string; required?: boolean }
    expect(f.type).toBe('relationship')
    expect(f.relationTo).toBe('gl-accounts')
    expect(f.required).toBe(true)
  })

  it('a line-item array carries its own shape and refuses to be empty', () => {
    const a = createLineItemArray([{ name: 'qty', type: 'number' }])
    expect(a.name).toBe('lineItems')
    expect(a.type).toBe('array')
    expect(a.minRows).toBe(1)
    expect(a.fields.length).toBe(1)
  })
})
