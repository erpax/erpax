import { describe, it, expect } from 'vitest'
import {
  adminGroupOf,
  breadcrumbTrail,
  merkaba,
  navPyramid,
  navigationGroupsFromPaths,
  navManifestFromPaths,
  navPathsForGrouping,
  pathNavMeta,
  routeOfPath,
  segmentsOf,
  topNavAnchorsFromSequence,
} from '@/navigation'

const SAMPLE_PATHS = [
  'agents/mcp/tool',
  'agents/accounting',
  'vitepress',
  'corpus',
  'skill/router',
] as const

describe('navPyramid — nav from the (referrer × current) superposition', () => {
  it('empty referrer ⇒ full merkaba (base case, context = root)', () => {
    const p = navPyramid('', 'gl/accounts/period')
    expect(p.context).toBe('')
    expect(p.breadcrumb).toEqual(p.descend) // no context ⇒ breadcrumb is the whole descend
    expect(p.descend.length).toBe(3)
  })

  it('a deeper shared context collapses the breadcrumb referrer-relative (not stored, computed)', () => {
    const p = navPyramid('invoices/payments/refunds', 'invoices/payments/methods')
    expect(p.context).toBe('invoices/payments') // deepest shared prefix = the collapse point
    expect(p.breadcrumb.length).toBeLessThan(p.descend.length) // referrer-relative, shorter than root-relative
    expect(p.group).toBe('invoices')
  })

  it('an out-of-tree referrer falls back to the current atom own group', () => {
    const p = navPyramid('marketing/site', 'gl/accounts')
    expect(p.context).toBe('')
    expect(p.group).toBe('gl') // no shared context ⇒ pathNavMeta group
  })
})

describe('navigation — path-derived nav groups', () => {
  it('segmentsOf normalizes src/-relative paths', () => {
    expect(segmentsOf('agents/mcp/tool')).toEqual(['agents', 'mcp', 'tool'])
    expect(segmentsOf('src/vitepress')).toEqual(['vitepress'])
    expect(segmentsOf('/corpus/')).toEqual(['corpus'])
  })

  it('pathNavMeta computes nav · group · route from the path', () => {
    expect(pathNavMeta('agents/mcp/tool')).toEqual({
      path: ['agents', 'mcp', 'tool'],
      nav: ['agents', 'mcp'],
      group: 'agents',
      route: '/agents/mcp/tool/SKILL',
    })
    expect(pathNavMeta('vitepress')).toEqual({
      path: ['vitepress'],
      nav: [],
      group: 'vitepress',
      route: '/vitepress/SKILL',
    })
  })

  it('adminGroupOf is the first path segment (Payload admin.group)', () => {
    expect(adminGroupOf('internal/controls/audit/findings')).toBe('internal')
    expect(adminGroupOf('invoices')).toBe('invoices')
  })

  it('navigationGroupsFromPaths builds the fractal sidebar tree', () => {
    const tree = navigationGroupsFromPaths([...SAMPLE_PATHS])
    expect(tree).toEqual([
      {
        text: 'agents',
        collapsed: true,
        items: [
          { text: 'accounting', link: '/agents/accounting/SKILL' },
          {
            text: 'mcp',
            collapsed: true,
            items: [{ text: 'tool', link: '/agents/mcp/tool/SKILL' }],
          },
        ],
      },
      { text: 'corpus', link: '/corpus/SKILL' },
      {
        text: 'skill',
        collapsed: true,
        items: [{ text: 'router', link: '/skill/router/SKILL' }],
      },
      { text: 'vitepress', link: '/vitepress/SKILL' },
    ])
  })

  it('navigationGroupsFromPaths nests medical hub children', () => {
    const tree = navigationGroupsFromPaths(['medical', 'medical/clinic', 'medical/patient', 'clinic'])
    expect(tree).toEqual([
      {
        text: 'medical',
        link: '/medical/SKILL',
        collapsed: true,
        items: [
          { text: 'clinic', link: '/medical/clinic/SKILL' },
          { text: 'patient', link: '/medical/patient/SKILL' },
        ],
      },
    ])
  })

  it('navPathsForGrouping drops bare root when hub/leaf exists', () => {
    expect(navPathsForGrouping(['abdomen', 'body/abdomen', 'heart', 'body/heart'])).toEqual([
      'body/abdomen',
      'heart',
      'body/heart',
    ])
  })

  it('navPathsForGrouping keeps root pivot without hub child', () => {
    expect(navPathsForGrouping(['corpus', 'navigation'])).toEqual(['corpus', 'navigation'])
  })

  it('navManifestFromPaths emits one manifest row per atom', () => {
    const manifest = navManifestFromPaths(['agents/mcp/tool', 'vitepress'])
    expect(manifest).toHaveLength(2)
    expect(manifest[0]).toEqual(pathNavMeta('agents/mcp/tool'))
    expect(manifest[1]).toEqual(pathNavMeta('vitepress'))
  })

  it('routeOfPath matches corpus/vitepress route law', () => {
    expect(routeOfPath('skill/router')).toBe('/skill/router/SKILL')
  })

  it('topNavAnchorsFromSequence picks the first N live rodin-order skills', () => {
    const anchors = topNavAnchorsFromSequence(
      ['config', 'identity', 'access'],
      (p) => p === 'config' || p === 'identity',
    )
    expect(anchors).toEqual([
      { text: 'config', link: '/config/SKILL' },
      { text: 'identity', link: '/identity/SKILL' },
    ])
  })
})

// "The merkaba is the star tetrahedron trinity spinning both directions." Real navigation is TWO spins: the
// sidebar only descends (root→leaf), but an atom also ascends (leaf→root, the fold to [[law]]). The two are
// exact inverses about the shared center — that counter-rotation is the merkaba. The inverse traversal is the
// theorem; the star-tetrahedron geometry is a named overlay.
describe('merkaba — the star tetrahedron: two counter-rotating traversals, one center', () => {
  it('DESCEND is root → leaf, one route per nav level (the drill-in)', () => {
    expect(merkaba('agents/mcp/tool').descend).toEqual([
      '/agents/SKILL',
      '/agents/mcp/SKILL',
      '/agents/mcp/tool/SKILL',
    ])
  })

  it('ASCEND is DESCEND reversed — the two spins are inverse (the theorem)', () => {
    for (const p of ['agents/mcp/tool', 'skill/router', 'corpus']) {
      const m = merkaba(p)
      expect(m.ascend).toEqual([...m.descend].reverse())
    }
  })

  it('the round trip returns to the CENTER — descend then ascend rests on the atom', () => {
    const m = merkaba('agents/mcp/tool')
    expect(m.center).toBe('/agents/mcp/tool/SKILL') // the leaf, where both tetrahedra meet
    expect(m.descend[m.descend.length - 1]).toBe(m.center) // descend ends at center
    expect(m.ascend[0]).toBe(m.center) // ascend begins at center — the shared point
  })

  it('a root atom is its own center — the degenerate star tetrahedron', () => {
    const m = merkaba('corpus')
    expect(m.descend).toEqual(['/corpus/SKILL'])
    expect(m.center).toBe('/corpus/SKILL')
  })

  // The spin is REUSED from horo, not re-derived: the two flow trinities are the hexagram the star tetrahedron
  // shadows, and doubling (east) SWAPS them about the fixed axis — proven in horo/trinities, asserted here only
  // to show the merkaba carries the real counter-rotating structure.
  it('the SPIN is horo’s two counter-rotating flow trinities about the fixed axis', () => {
    const { spin } = merkaba('agents/mcp/tool')
    expect([...spin.flowEast].sort((a, b) => a - b)).toEqual([1, 4, 7])
    expect([...spin.flowWest].sort((a, b) => a - b)).toEqual([2, 5, 8])
    expect([...spin.axis].sort((a, b) => a - b)).toEqual([3, 6, 9])
    const dbl = (s: readonly number[]) => s.map((x) => (x * 2) % 9 || 9).sort((a, b) => a - b)
    expect(dbl(spin.flowEast)).toEqual([...spin.flowWest].sort((a, b) => a - b)) // E → W: the counter-rotation
    expect(dbl(spin.axis)).toEqual([...spin.axis].sort((a, b) => a - b)) // axis holds — the spin spine
  })
})

// The merkaba made REAL: the descend spin, labelled, is the breadcrumb src/ui/breadcrumb.tsx renders — the
// primitive components shipped with no source deciding which crumbs. This is the integration into real nav.
describe('breadcrumbTrail — the descend spin rendered', () => {
  it('is root → leaf, each segment linked to its route, leaf marked current', () => {
    expect(breadcrumbTrail('agents/mcp/tool')).toEqual([
      { text: 'agents', link: '/agents/SKILL', current: false },
      { text: 'mcp', link: '/agents/mcp/SKILL', current: false },
      { text: 'tool', link: '/agents/mcp/tool/SKILL', current: true },
    ])
  })

  it('its links ARE the merkaba descend — one geometry, read as crumbs', () => {
    const p = 'skill/router'
    expect(breadcrumbTrail(p).map((c) => c.link)).toEqual([...merkaba(p).descend])
  })

  it('exactly one crumb is current — the leaf, where the two tetrahedra meet', () => {
    const trail = breadcrumbTrail('agents/mcp/tool')
    expect(trail.filter((c) => c.current)).toHaveLength(1)
    expect(trail[trail.length - 1]!.current).toBe(true)
  })
})
