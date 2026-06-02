import { describe, it, expect } from 'vitest'
import {
  projectContent,
  localeContent,
  searchableText,
  contentMatches,
  uuidHsl,
  uuidColor,
  uuidCssVars,
  project,
} from './index'

describe('uuid-projection — the uuid singularity (content → uuid · search · locale · css)', () => {
  it('projectContent strips storage-managed fields — the ONE content definition', () => {
    const r = { id: '1', uuid: 'x', createdAt: 't', updatedAt: 't', name: 'Acme', amount: 42 }
    expect(projectContent(r)).toEqual({ name: 'Acme', amount: 42 })
  })

  it('localeContent collapses {en,bg} fields to one locale (per-locale content ⇒ per-locale uuid)', () => {
    const r = { title: { en: 'Invoice', bg: 'Фактура' }, amount: 10 }
    expect(localeContent(r, 'bg')).toEqual({ title: 'Фактура', amount: 10 })
    expect(localeContent(r, 'en')).toEqual({ title: 'Invoice', amount: 10 })
  })

  it('searchableText is every string/number leaf — localized values contribute every locale; ids excluded', () => {
    const r = { id: 'sys-id', title: { en: 'Hello', bg: 'Здравей' }, n: 7, nested: { note: 'deep' }, tags: ['a', 'b'] }
    const t = searchableText(r)
    for (const s of ['Hello', 'Здравей', '7', 'deep', 'a', 'b']) expect(t).toContain(s)
    expect(t).not.toContain('sys-id') // id is stripped (not content)
    expect(contentMatches(r, 'здравей')).toBe(true) // case-insensitive, any locale
    expect(contentMatches(r, 'zzz')).toBe(false)
    expect(contentMatches(r, '')).toBe(false)
  })

  it('uuidColor is deterministic and lands in a readable band — the visual facet', () => {
    const u = '0190a1b2-c3d4-8e5f-9012-3456789abcde'
    expect(uuidColor(u)).toBe(uuidColor(u))
    const { h, s, l } = uuidHsl(u)
    expect(h).toBeGreaterThanOrEqual(0)
    expect(h).toBeLessThan(360)
    expect(s).toBeGreaterThanOrEqual(55)
    expect(s).toBeLessThanOrEqual(89)
    expect(l).toBeGreaterThanOrEqual(38)
    expect(l).toBeLessThanOrEqual(61)
    expect(uuidColor(u)).toMatch(/^hsl\(\d+ \d+% \d+%\)$/)
    expect(uuidCssVars(u)['--uuid-color']).toBe(uuidColor(u))
    // distinct uuids ⇒ distinct hue (well-distributed)
    expect(uuidHsl('ffffffff-0000-8000-8000-000000000000').h).not.toBe(uuidHsl('00000000-0000-8000-8000-000000000000').h)
  })

  it('project radiates identity + search + colour from ONE content (DRY — same content ⇒ same everything)', () => {
    const r = { title: 'Acme', amount: 42 }
    const a = project(r, 'tenant-1')
    expect(a).toEqual(project({ ...r }, 'tenant-1')) // same content ⇒ same uuid, searchText, colour
    expect(a.uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/) // uuidv8
    expect(a.searchText).toContain('Acme')
    expect(a.color).toBe(uuidColor(a.uuid))
    expect(project(r, 'tenant-2').uuid).not.toBe(a.uuid) // tenant-namespaced
  })
})
