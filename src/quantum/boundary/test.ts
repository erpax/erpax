import { describe, it, expect } from 'vitest'
import {
  parseTsImports,
  boundaryUuid,
  computeBoundary,
  boundaryDigest,
  verifyBoundary,
  planCollapse,
  classifyImports,
} from '@/quantum/boundary'
import { join } from 'node:path'

const ROOT = join(process.cwd(), 'src')

describe('quantum/boundary — computed import/export (derived, never authored)', () => {
  it('boundaryUuid is deterministic — same inputs ⇒ same uuid', () => {
    const a = boundaryUuid('digit/index.ts', ['@/horo', '@/uuid'], ['digitalRootOfUuid'])
    const b = boundaryUuid('digit/index.ts', ['@/horo', '@/uuid'], ['digitalRootOfUuid'])
    expect(a).toBe(b)
    expect(a).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  })

  it('one import flip ⇒ boundary uuid flips (tamper signal)', () => {
    const base = boundaryUuid('x/index.ts', ['@/a'], ['fn'])
    const flipped = boundaryUuid('x/index.ts', ['@/b'], ['fn'])
    expect(flipped).not.toBe(base)
  })

  it('parseTsImports extracts sorted unique @/ specs', () => {
    const specs = parseTsImports(`import { a } from '@/horo'\nimport { b } from '@/uuid'\nimport { a as c } from '@/horo'`)
    expect(specs).toEqual(['@/horo', '@/uuid'])
  })

  it('classifyImports separates barrels from deep escapes', () => {
    const { barrels, escapes } = classifyImports(['@/digit', '@/integrity/content-uuid'])
    expect(barrels).toContain('@/digit')
    expect(escapes).toContain('@/integrity/content-uuid')
  })

  it('computeBoundary on digit/index.ts matches verifyBoundary (zero drift)', () => {
    const abs = join(ROOT, 'digit/index.ts')
    const b = computeBoundary(abs, ROOT)
    expect(b.kind).toBe('ts')
    expect(b.imports.length).toBeGreaterThan(0)
    const v = verifyBoundary(abs, b.boundaryUuid, ROOT)
    expect(v.ok).toBe(true)
  })

  it('SKILL.md boundaries derive wikilink imports from live content', () => {
    const abs = join(ROOT, 'quantum/boundary/SKILL.md')
    const b = computeBoundary(abs, ROOT)
    expect(b.kind).toBe('skill')
    expect(b.imports.length).toBeGreaterThan(0)
    expect(b.exports[0]).toBeTruthy()
  })

  it('scanBoundaries covers the corpus (skills + ts)', () => {
    const d = boundaryDigest(ROOT)
    expect(d.files).toBeGreaterThan(1000)
    expect(d.skills).toBeGreaterThan(500)
    expect(d.tsFiles).toBeGreaterThan(500)
    console.log(`quantum/boundary digest: ${d.files} files · ${d.escapes} escapes in ${d.escapeFiles} files`)
  })

  it('planCollapse maps deep specs to nearest barrels', () => {
    const plan = planCollapse()
    const integrity = plan.find((r) => r.from === '@/integrity/content-uuid')
    if (integrity) expect(integrity.to).toBe('@/integrity')
  })
})
