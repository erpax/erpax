import { describe, it, expect } from 'vitest'
import { pathNavMeta, navManifestFromPaths } from '@/navigation'

/** Mirrors build-index.mjs `pathNavMeta(segments)` — kept in sync by law, not import. */
function indexNavOf(segments: readonly string[]) {
  return {
    nav: segments.slice(0, -1),
    group: segments[0] ?? '',
    route: '/' + segments.join('/') + '/SKILL',
  }
}

describe('skill/router — nav manifest aligned with path groups', () => {
  it('build-index nav · group fields match pathNavMeta (vitepress law)', () => {
    for (const p of ['agents/mcp/tool', 'vitepress', 'skill/router'] as const) {
      const meta = pathNavMeta(p)
      const segs = p.split('/')
      expect(indexNavOf(segs)).toEqual({ nav: meta.nav, group: meta.group, route: meta.route })
    }
  })

  it('navManifestFromPaths is the catalogue shape the index compiles', () => {
    const manifest = navManifestFromPaths(['agents/mcp/tool', 'vitepress'])
    expect(manifest.map((m) => m.route)).toEqual(['/agents/mcp/tool/SKILL', '/vitepress/SKILL'])
  })
})
