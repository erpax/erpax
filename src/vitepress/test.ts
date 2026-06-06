import { describe, it, expect } from 'vitest'
import { atomPage, routeOf, sitePages, samePage } from '@/vitepress'
import { pixel } from '@/pixel'

describe('vitepress — the corpus rendered (atom → page + pixel)', () => {
  it('routeOf is the path-address: `<path>/SKILL` (mirrors corpus.mts)', () => {
    expect(routeOf('identity/signal')).toBe('/identity/signal/SKILL')
    expect(routeOf('pixel')).toBe('/pixel/SKILL')
    expect(routeOf('a/b/c')).toBe('/a/b/c/SKILL')
  })

  it('atomPage carries the route AND the atom uuid-pixel', () => {
    const uuid = '12345678-1234-8123-8123-123456789abc'
    const page = atomPage('identity/signal', uuid)
    expect(page.route).toBe('/identity/signal/SKILL')
    expect(page.pixel).toEqual(pixel(uuid))
    expect(typeof page.pixel.color).toBe('string')
    expect(page.pixel.color.length).toBeGreaterThan(0)
  })

  it('deterministic: same path + same uuid ⇒ same page (render is read off identity)', () => {
    const uuid = 'aaaaaaaa-0000-8000-8000-000000000000'
    expect(atomPage('payload', uuid)).toEqual(atomPage('payload', uuid))
    expect(samePage(atomPage('payload', uuid), atomPage('payload', uuid))).toBe(true)
  })

  it('a different uuid recolours the page (cannot recolour without changing identity)', () => {
    const page1 = atomPage('payload', 'aaaaaaaa-0000-8000-8000-000000000000')
    const page2 = atomPage('payload', 'bbbbbbbb-0000-8000-8000-000000000007')
    expect(samePage(page1, page2)).toBe(false)
  })

  it('sitePages renders the whole corpus as pixel-coloured pages, order preserved', () => {
    const atoms = [
      { path: 'pixel', uuid: '12345678-1234-8123-8123-123456789abc' },
      { path: 'vitepress', uuid: 'aaaaaaaa-0000-8000-8000-000000000000' },
    ]
    const pages = sitePages(atoms)
    expect(pages).toHaveLength(2)
    expect(pages[0]).toEqual(atomPage('pixel', atoms[0]!.uuid))
    expect(pages[1]!.route).toBe('/vitepress/SKILL')
  })
})
