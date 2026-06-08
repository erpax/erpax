/**
 * @standard ISO/IEC-29119:2022 software-testing
 */
import { describe, it, expect } from 'vitest'
import Standards from '@/standards'
import type { Field } from 'payload'

// standards — the live registry collection backing erpax.standards.* MCP tools.
// The default export is a CollectionConfig assembled by createAccountingCollection.
// These assert the real registry surface: identity, family, supersession trail
// (Law 28), conflict graph (Law 27), and the factory-injected status workflow.

const named = (): Array<Field & { name: string }> =>
  (Standards.fields as Field[]).filter((f): f is Field & { name: string } => 'name' in f)

const fieldByName = (name: string): Field & { name: string } => {
  const f = named().find((x) => x.name === name)
  if (!f) throw new Error(`no field ${name}`)
  return f
}

describe('standards — live standards-registry collection', () => {
  it('is the `standards` collection titled by standardId', () => {
    expect(Standards.slug).toBe('standards')
    expect(Standards.admin?.useAsTitle).toBe('standardId')
  })

  it('carries identity + provenance + temporal scope fields', () => {
    const names = named().map((f) => f.name)
    for (const required of [
      'standardId',
      'title',
      'family',
      'publisher',
      'version',
      'url',
      'effectiveFrom',
      'effectiveUntil',
    ]) {
      expect(names).toContain(required)
    }
  })

  it('standardId is the canonical unique reference field', () => {
    const f = fieldByName('standardId')
    expect(f.type).toBe('text')
    expect((f as { unique?: boolean }).unique).toBe(true)
  })

  it('family is a select including the cited standards families', () => {
    const f = fieldByName('family') as Field & {
      type: string
      options: Array<{ value: string }>
    }
    expect(f.type).toBe('select')
    const values = f.options.map((o) => o.value)
    for (const fam of ['ifrs', 'iso', 'w3c', 'rfc', 'eu', 'oecd', 'nist']) {
      expect(values).toContain(fam)
    }
  })

  it('models the supersession trail (Law 28) as a self-referential relationship pair', () => {
    const by = fieldByName('supersededBy')
    expect(by.type).toBe('relationship')
    expect((by as { relationTo?: string }).relationTo).toBe('standards')
    const supersedes = fieldByName('supersedes')
    expect((supersedes as { relationTo?: string }).relationTo).toBe('standards')
    expect((supersedes as { hasMany?: boolean }).hasMany).toBe(true)
  })

  it('models the conflict graph (Law 27) as an array with rationale + severity', () => {
    const conflicts = fieldByName('conflicts') as Field & {
      type: string
      fields: Array<Field & { name: string }>
    }
    expect(conflicts.type).toBe('array')
    const sub = conflicts.fields.map((f) => f.name)
    expect(sub).toContain('otherStandard')
    expect(sub).toContain('rationale')
    expect(sub).toContain('severity')
  })

  it('adoptionStatus defaults to required for a tenant', () => {
    const f = fieldByName('adoptionStatus')
    expect(f.type).toBe('select')
    expect((f as { defaultValue?: string }).defaultValue).toBe('required')
  })

  it('the factory injected the status workflow (draft → published → superseded → withdrawn)', () => {
    const status = fieldByName('status') as Field & {
      type: string
      options: Array<{ value: string }>
      defaultValue?: string
    }
    expect(status.type).toBe('select')
    expect(status.defaultValue).toBe('draft')
    const values = status.options.map((o) => o.value)
    for (const s of ['draft', 'published', 'superseded', 'withdrawn']) {
      expect(values).toContain(s)
    }
  })
})
