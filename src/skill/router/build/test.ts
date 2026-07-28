import { describe, it, expect } from 'vitest'
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { pathNavMeta } from '@/navigation'
import { contentUuidOf } from '../upgrade/seal'
import { relatedOf, buildSkillIndexStub } from './index'

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

  it('buildSkillIndexStub writes empty pool under the Worker size budget', () => {
    const dir = mkdtempSync(join(tmpdir(), 'skill-stub-'))
    try {
      const r = buildSkillIndexStub(dir)
      expect(r.count).toBe(0)
      expect(r.bytes).toBeLessThan(2_000)
      const body = readFileSync(join(dir, r.out), 'utf8')
      expect(body).toContain('export const SKILL_INDEX')
      expect(body).toContain('[]')
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })
})
