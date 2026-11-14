import { describe, it, expect } from 'vitest'
import * as barrel from '@/collections'
import { candidates, handleOf, isUuid, parse, tagOf } from '@/utilities/uuid/handle'

const id = '0190a5b2-7c3d-7e41-9f20-3b5c6d7e8f90'

describe('handle — a uuid as a short piece of a URI', () => {
  it('is 24 URL-safe characters with the collection tag, 22 without', () => {
    expect(handleOf(id, 'invoices').length).toBe(24)
    expect(handleOf(id).length).toBe(22)
    expect(/^[A-Za-z0-9_-]+$/.test(handleOf(id, 'invoices'))).toBe(true)
  })
  it('reads back to the same uuid and tag', () => {
    expect(parse(handleOf(id, 'invoices'))).toEqual({ uuid: id, tag: tagOf('invoices') })
    expect(parse(handleOf(id))).toEqual({ uuid: id })
    expect(parse(id.toUpperCase())).toEqual({ uuid: id })
  })
  it('round-trips every byte value', () => {
    for (const uuid of ['00000000-0000-0000-0000-000000000000', 'ffffffff-ffff-ffff-ffff-ffffffffffff', '01234567-89ab-cdef-fedc-ba9876543210']) {
      expect(parse(handleOf(uuid, 'x'))!.uuid).toBe(uuid)
      expect(parse(handleOf(uuid))!.uuid).toBe(uuid)
    }
  })
  it('the same uuid in two collections has two handles', () => {
    expect(handleOf(id, 'invoices')).not.toBe(handleOf(id, 'orders'))
    expect(handleOf(id, 'invoices').slice(0, 21)).toBe(handleOf(id, 'orders').slice(0, 21))
  })
  it('refuses what is not a handle', () => {
    for (const bad of ['', 'short', 'x'.repeat(23), '!'.repeat(24), 'not-a-uuid-at-all-not-a-uuid-at-all!', handleOf(id).slice(0, 21) + 'B']) expect(parse(bad)).toBe(undefined)
    expect(isUuid(id)).toBe(true)
    expect(isUuid('nope')).toBe(false)
    let threw = false
    try { handleOf('nope') } catch { threw = true }
    expect(threw).toBe(true)
  })
  it('a tagged handle names its candidates; an untagged one needs the collection named', () => {
    const slugs = ['invoices', 'orders', 'pages']
    expect(candidates(parse(handleOf(id, 'orders'))!, slugs)).toEqual(['orders'])
    expect(candidates(parse(handleOf(id))!, slugs)).toEqual([])
    expect(candidates(parse(handleOf(id))!, slugs, 'pages')).toEqual(['pages'])
    expect(candidates(parse(handleOf(id))!, slugs, 'missing')).toEqual([])
    expect(candidates(parse(handleOf(id, 'orders'))!, slugs, 'pages')).toEqual([])
  })
  it('across the real collections a tag narrows to at most two', () => {
    const slugs = (Object.values(barrel) as Array<{ slug?: string }>).map((c) => c?.slug).filter((s): s is string => typeof s === 'string')
    const byTag = new Map<number, string[]>()
    for (const slug of slugs) byTag.set(tagOf(slug), [...(byTag.get(tagOf(slug)) ?? []), slug])
    expect(Math.max(...[...byTag.values()].map((group) => group.length)) <= 2).toBe(true)
    for (const slug of slugs) expect(candidates(parse(handleOf(id, slug))!, slugs)).toContain(slug)
  })
})
