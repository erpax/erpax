import { describe, it, expect } from 'vitest'
import { atomPage, routeOf, sitePages, samePage, pathNavMeta, navigationGroupsFromPaths } from '@/vitepress'
import { pixel } from '@/pixel'
import { toUuid } from '@/uuid/matrix'

const UUID_A = toUuid(Buffer.from('vitepress:test:identity/signal', 'utf8'))
const UUID_B = toUuid(Buffer.from('vitepress:test:payload', 'utf8'))
const UUID_C = toUuid(Buffer.from('vitepress:test:payload-alt', 'utf8'))
const UUID_PIXEL = toUuid(Buffer.from('vitepress:test:pixel', 'utf8'))
const UUID_VP = toUuid(Buffer.from('vitepress:test:vitepress', 'utf8'))

describe('vitepress — the corpus rendered (atom → page + pixel)', () => {
  it('routeOf is the path-address: `<path>/SKILL` (mirrors corpus.mts)', () => {
    expect(routeOf('identity/signal')).toBe('/identity/signal/SKILL')
    expect(routeOf('pixel')).toBe('/pixel/SKILL')
    expect(routeOf('a/b/c')).toBe('/a/b/c/SKILL')
  })

  it('atomPage carries the route AND the atom uuid-pixel', () => {
    const uuid = UUID_A
    const page = atomPage('identity/signal', uuid)
    expect(page.route).toBe('/identity/signal/SKILL')
    expect(page.pixel).toEqual(pixel(uuid))
    expect(typeof page.pixel.color).toBe('string')
    expect(page.pixel.color.length).toBeGreaterThan(0)
  })

  it('deterministic: same path + same uuid ⇒ same page (render is read off identity)', () => {
    const uuid = UUID_B
    expect(atomPage('payload', uuid)).toEqual(atomPage('payload', uuid))
    expect(samePage(atomPage('payload', uuid), atomPage('payload', uuid))).toBe(true)
  })

  it('a different uuid recolours the page (cannot recolour without changing identity)', () => {
    const page1 = atomPage('payload', UUID_B)
    const page2 = atomPage('payload', UUID_C)
    expect(samePage(page1, page2)).toBe(false)
  })

  it('pathNavMeta · navigationGroupsFromPaths align vitepress route with nav groups', () => {
    const paths = ['agents/mcp/tool', 'vitepress'] as const
    const tree = navigationGroupsFromPaths([...paths])
    for (const p of paths) {
      const meta = pathNavMeta(p)
      expect(meta.route).toBe(routeOf(p))
      const leaf = p.split('/').pop()!
      const find = (items: typeof tree): boolean =>
        items.some(
          (i) =>
            (i.link === meta.route && i.text === leaf) ||
            (i.items ? find(i.items) : false),
        )
      expect(find(tree)).toBe(true)
    }
  })

  it('sitePages renders the whole corpus as pixel-coloured pages, order preserved', () => {
    const atoms = [
      { path: 'pixel', uuid: UUID_PIXEL },
      { path: 'vitepress', uuid: UUID_VP },
    ]
    const pages = sitePages(atoms)
    expect(pages).toHaveLength(2)
    expect(pages[0]).toEqual(atomPage('pixel', atoms[0]!.uuid))
    expect(pages[1]!.route).toBe('/vitepress/SKILL')
  })
})
