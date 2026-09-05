import { describe, it, expect } from 'vitest'
import * as blocks from './index'

describe('blocks/config — the definitions, with no React in the import graph', () => {
  it('every export is a block definition carrying a slug', () => {
    const defs = Object.values(blocks) as { slug?: unknown }[]
    expect(defs.length).toBeGreaterThan(0)
    for (const d of defs) expect(typeof d.slug).toBe('string')
  })

  it('no two blocks claim the same slug — Payload would silently keep one', () => {
    const slugs = (Object.values(blocks) as { slug: string }[]).map((d) => d.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})
