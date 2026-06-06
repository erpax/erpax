import { readFileSync } from 'node:fs'
import { describe, it, expect } from 'vitest'
import { schemaUuid, sameSchema, drifted } from '@/quantum/schema'
import { orphans } from '@/entropy'

// schema.org COMPLETENESS on the quantum scale: a schema.org-derived grain that sits orphaned
// (bound to nothing) in the matrix is INCOMPLETE — a disconnected thought ([[recycle]]). This gate
// FAILS while any schema.org atom is disconnected, and goes green only when every one is woven in.
// It is a forcing function: red until the recycle reconnects the schema.org vocabulary.
describe('quantum/schema — schema.org must be COMPLETE on the quantum scale', () => {
  it('no schema.org-derived grain is left orphaned (fails while schema.org is incomplete)', () => {
    const schemaOrphans = orphans().filter((atom) => {
      try {
        return /schema\.org/i.test(readFileSync('src/' + atom + '/SKILL.md', 'utf8'))
      } catch {
        return false
      }
    })
    expect(
      schemaOrphans,
      schemaOrphans.length + ' schema.org grains disconnected on the quantum scale: ' + schemaOrphans.slice(0, 12).join(', '),
    ).toHaveLength(0)
  })
})

// Schema identity = the content-uuid of its canonical form; any change → new uuid → re-verify.
describe('quantum/schema — schema identity + drift as a content-uuid', () => {
  it('schemaUuid is deterministic for a canonical form', () => {
    expect(schemaUuid('{name,price}')).toBe(schemaUuid('{name,price}'))
    expect(schemaUuid('{name,price}')).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  })
  it('same shape ⇒ same schema (merge); different shape ⇒ different', () => {
    expect(sameSchema('{name,price}', '{name,price}')).toBe(true)
    expect(sameSchema('{name,price}', '{name,price,tax}')).toBe(false)
  })
  it('a schema change drifts from its published version (re-verify by architecture)', () => {
    const v1 = schemaUuid('{name,price}')
    expect(drifted(v1, '{name,price}')).toBe(false)
    expect(drifted(v1, '{name,price,tax}')).toBe(true)
  })
})
