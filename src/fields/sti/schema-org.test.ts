import { describe, expect, it } from 'vitest'

import { isSubTypeOf, SCHEMA_ORG_PARENT, toJsonLd } from './schema-org'

describe('schema-org — one node hosts the type graph, projected to JSON-LD', () => {
  it('projects a typed node: @context + @type + @id + properties', () => {
    const ld = toJsonLd({ type: 'Organization', props: { name: 'Acme', legalName: 'Acme Inc' }, contentUuid: 'uuid-acme' })
    expect(ld['@context']).toBe('https://schema.org')
    expect(ld['@type']).toBe('Organization')
    expect(ld['@id']).toBe('uuid-acme')
    expect(ld.name).toBe('Acme')
  })

  it('blank/unknown type ⇒ Thing (the root, the identity element — every case defined)', () => {
    expect(toJsonLd({})['@type']).toBe('Thing')
    expect(toJsonLd({ type: '   ' })['@type']).toBe('Thing')
  })

  it('the address wins — props can never hijack @context/@type/@id', () => {
    const ld = toJsonLd({ type: 'Product', props: { '@type': 'Hacked', '@context': 'evil', '@id': 'forged' }, contentUuid: 'real-uuid' })
    expect(ld['@type']).toBe('Product')
    expect(ld['@context']).toBe('https://schema.org')
    expect(ld['@id']).toBe('real-uuid')
  })

  it('isSubTypeOf walks subClassOf — the hierarchy is a parent-pointer, not 800 collections', () => {
    expect(isSubTypeOf('Corporation', 'Organization')).toBe(true)
    expect(isSubTypeOf('Corporation', 'Thing')).toBe(true) // everything descends from Thing
    expect(isSubTypeOf('Invoice', 'Intangible')).toBe(true)
    expect(isSubTypeOf('Person', 'Organization')).toBe(false)
  })

  it('every seeded type ultimately roots at Thing (the tree is connected)', () => {
    for (const t of Object.keys(SCHEMA_ORG_PARENT)) {
      expect(isSubTypeOf(t, 'Thing')).toBe(true)
    }
  })
})
