import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it, expect } from 'vitest'
import { UUID_SUBSTRATE_PROBE } from '@/confirm/probe'

describe('confirm/probe — the substrate compiles', () => {
  it('loads and seals', () => {
    expect(UUID_SUBSTRATE_PROBE).toBe(true)
  })

  it('imports nothing that imports it back — a probe may not prove its own recursion', () => {
    const src = readFileSync(join(process.cwd(), 'src/confirm/probe/index.ts'), 'utf8')
    const specs = [...src.matchAll(/from\s+['"]([^'"]+)['"]/g)].map((m) => m[1])
    expect(specs.length).toBeGreaterThan(0)
    for (const s of specs) {
      expect(s.startsWith('@/confirm')).toBe(false)
      expect(s.startsWith('.')).toBe(false)
    }
  })
})
