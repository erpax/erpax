/**
 * @standard ISO/IEC-25010:2023 §5.7 resource-utilisation (production hardware fit)
 */
import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { CLOUDFLARE_LIMITS, productionCapacity, workerImportsSkillIndex, assertFitsProduction } from './index'

// A hermetic edge: a worker entry, and an 80MB-shaped skill index. The one decidable production
// failure is whether the entry IMPORTS the index — if it does, the bundle blows the 3MB limit.
const seed = (importsIndex: boolean): string => {
  const dir = mkdtempSync(join(tmpdir(), 'erpax-capacity-'))
  mkdirSync(join(dir, 'src/skill/router'), { recursive: true })
  writeFileSync(join(dir, 'src/skill/router/skills.index.ts'), 'x'.repeat(4 * 1024 * 1024)) // a heavy build artifact
  writeFileSync(
    join(dir, 'src/payload.config.ts'),
    importsIndex ? "import { idx } from '@/skill/router/skills.index'\nexport default idx\n" : "export default {}\n",
  )
  mkdirSync(join(dir, 'src/a'), { recursive: true })
  writeFileSync(join(dir, 'src/a/index.ts'), "const C = { slug: 'accounts', fields: [] }\nexport const a = C\n")
  return dir
}

describe('cloudflare/capacity — erpax vs the production hardware', () => {
  it('the limit model is declared with sources, and the hard ones are the deploy-blockers', () => {
    expect(CLOUDFLARE_LIMITS.length).toBeGreaterThan(4)
    expect(CLOUDFLARE_LIMITS.every((l) => l.source.length > 0)).toBe(true)
    // the Worker script limit is the decisive hard one
    const script = CLOUDFLARE_LIMITS.find((l) => l.resource === 'worker-script-gzip')!
    expect(script.hard).toBe(true)
    expect(script.limit).toBe(3)
  })

  it('when the worker entry does NOT import the skill index, the bundle fits — the discipline holds', () => {
    const d = seed(false)
    expect(workerImportsSkillIndex(d)).toBe(false)
    const script = productionCapacity(d).find((f) => f.resource === 'worker-script-gzip')!
    expect(script.fits).toBe(true)
    expect(script.demand).toBe(0) // lazy-loaded, contributes nothing to the shipped bundle
    expect(() => assertFitsProduction(d)).not.toThrow()
    rmSync(d, { recursive: true, force: true })
  })

  it('when the worker entry IMPORTS the index, the demand exceeds the limit and the deploy is refused', () => {
    const d = seed(true)
    expect(workerImportsSkillIndex(d)).toBe(true)
    const script = productionCapacity(d).find((f) => f.resource === 'worker-script-gzip')!
    expect(script.fits).toBe(false) // 4MB demand > 3MB limit
    expect(script.headroom).toBeLessThan(0)
    expect(() => assertFitsProduction(d)).toThrow(/hard hardware limit\(s\) exceeded/)
    rmSync(d, { recursive: true, force: true })
  })

  it('collections are counted as a soft D1-table demand, not a deploy blocker', () => {
    const d = seed(false)
    const tables = productionCapacity(d).find((f) => f.resource === 'd1-tables')!
    expect(tables.demand).toBeGreaterThan(0) // the 'accounts' slug is found
    expect(tables.hard).toBe(false)
    rmSync(d, { recursive: true, force: true })
  })
})
