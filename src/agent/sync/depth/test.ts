import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

import { MAX_BROADCAST_DEPTH, withinBroadcastDepth } from './index'

describe('agent/sync/depth — the guard, and the property that makes it a cut point', () => {
  it('ZERO IMPORTS — this is the whole reason the atom exists', () => {
    // A constant that depends on nothing must be reachable without depending on anything. If an
    // import ever appears here, the 178-file component this cut split will start re-forming.
    const src = readFileSync(join(process.cwd(), 'src/agent/sync/depth/index.ts'), 'utf8')
    expect(src).not.toMatch(/^\s*import\s/m)
  })

  it('the guard is a positive integer — a zero bound would disable the check entirely', () => {
    expect(Number.isInteger(MAX_BROADCAST_DEPTH)).toBe(true)
    expect(MAX_BROADCAST_DEPTH).toBeGreaterThan(0)
  })

  it('the comparison is exclusive at the bound — depth === MAX is already too deep', () => {
    expect(withinBroadcastDepth(MAX_BROADCAST_DEPTH - 1)).toBe(true)
    expect(withinBroadcastDepth(MAX_BROADCAST_DEPTH)).toBe(false)
    expect(withinBroadcastDepth(0)).toBe(true)
  })

  it('a non-integer or negative depth is refused, not coerced', () => {
    expect(withinBroadcastDepth(-1)).toBe(false)
    expect(withinBroadcastDepth(1.5)).toBe(false)
    expect(withinBroadcastDepth(Number.NaN)).toBe(false)
  })

  it('the public surface is unchanged — @/agent/sync still exports it', async () => {
    const { MAX_BROADCAST_DEPTH: viaBarrel } = await import('@/agent/sync')
    expect(viaBarrel).toBe(MAX_BROADCAST_DEPTH)
  })
})
