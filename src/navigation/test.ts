import { describe, it, expect } from 'vitest'
import {
  adminGroupOf,
  navigationGroupsFromPaths,
  navManifestFromPaths,
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
