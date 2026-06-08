import { describe, it, expect } from 'vitest'
import { pathNavMeta } from '@/navigation'
import { contentUuidOf } from '../upgrade/seal'
import { relatedOf } from './index'

describe('skill/router/build — index emit helpers', () => {
  it('contentUuidOf is deterministic v5-style', () => {
    const a = contentUuidOf('hello')
    const b = contentUuidOf('hello')
    expect(a).toBe(b)
    expect(a).toMatch(/^[0-9a-f-]{36}$/)
  })

  it('relatedOf extracts wikilink leaf words excluding self', () => {
    expect(relatedOf('See [[agents/mcp]] and [[skill/router|router]]', 'router')).toEqual(['mcp'])
  })

  it('pathNavMeta aligns with index node fields', () => {
    for (const p of ['agents/mcp/tool', 'skill/router'] as const) {
      const meta = pathNavMeta(p)
      const segs = p.split('/')
      expect({ nav: meta.nav, group: meta.group, route: meta.route }).toEqual({
        nav: segs.slice(0, -1),
        group: segs[0] ?? '',
        route: '/' + segs.join('/') + '/SKILL',
      })
    }
  })
})
