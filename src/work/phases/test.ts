import { describe, it, expect } from 'vitest'
import type { Field } from 'payload'
import WorkPhases from '@/work/phases'

// work/phases — the operation catalog (the routing vocabulary, a self-referential
// tree). Law: a work-phase is a product-independent KIND of process step carrying
// the STANDARD time/resource (the rate anchor); the catalog has no funnel of its
// own — its `parent` crosses self (the tree, acyclic).
describe('work/phases — the reusable work-phase catalog', () => {
  const byName = new Map<string, Field>()
  for (const f of WorkPhases.fields) {
    if ('name' in f && typeof f.name === 'string') byName.set(f.name, f)
  }

  it('is the work-phases collection in the Manufacturing group', () => {
    expect(WorkPhases.slug).toBe('work-phases')
    expect(WorkPhases.admin?.group).toBe('Manufacturing')
    expect(WorkPhases.admin?.useAsTitle).toBe('name')
  })

  it('parent is a self-referential relationship — the tree axis (acyclic)', () => {
    const parent = byName.get('parent')
    expect(parent?.type).toBe('relationship')
    // self-referential: a phase contains sub-phases (the coordinate axis).
    expect((parent as { relationTo?: string }).relationTo).toBe('work-phases')
  })

  it('kind is open free-text (not a closed enum — 20 yrs of shop-floor names)', () => {
    const kind = byName.get('kind')
    expect(kind?.type).toBe('text')
    expect('options' in (kind ?? {})).toBe(false)
  })

  it('carries the rate anchor — workSeconds, a non-negative standard time', () => {
    const ws = byName.get('workSeconds')
    expect(ws?.type).toBe('number')
    expect((ws as { min?: number }).min).toBe(0)
  })

  it('name is the required title field', () => {
    const name = byName.get('name')
    expect(name?.type).toBe('text')
    expect((name as { required?: boolean }).required).toBe(true)
  })

  it('the dead `archived` column is dropped — lifecycle is status only', () => {
    expect(byName.has('archived')).toBe(false)
    expect(byName.has('status')).toBe(true)
  })

  it('has timestamps for the audit trail', () => {
    expect(WorkPhases.timestamps).toBe(true)
  })
})
