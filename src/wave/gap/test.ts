import { describe, it, expect } from 'vitest'
import { wavesFromGaps, clusterOfTarget, asksFromGapWaves, type GapKind } from './index'

const g = (kind: GapKind, cluster: string, where: string, what: string) => ({ kind, cluster, where, what })

describe('wave/gap — gaps grouped by the class they share', () => {
  it('groups by CLASS, not by file — the unit of repair is the tree', () => {
    const waves = wavesFromGaps([
      g('dead-reference', 'src/services/', 'a.ts', 'src/services/x/index.ts'),
      g('dead-reference', 'src/services/', 'b.ts', 'src/services/y/index.ts'),
      g('dead-reference', 'src/standards/', 'c.ts', 'src/standards/z.ts'),
    ])
    expect(waves).toHaveLength(2)
    expect(waves[0]!.cluster).toBe('src/services/')
    expect(waves[0]!.count).toBe(2)
  })

  it('orders biggest-first — a wave is worth running when one pattern closes many', () => {
    const waves = wavesFromGaps([
      g('dead-reference', 'src/small/', 'a.ts', 'src/small/x.ts'),
      g('dead-reference', 'src/big/', 'b.ts', 'src/big/1.ts'),
      g('dead-reference', 'src/big/', 'c.ts', 'src/big/2.ts'),
      g('dead-reference', 'src/big/', 'd.ts', 'src/big/3.ts'),
    ])
    expect(waves.map((w) => w.count)).toEqual([3, 1])
  })

  it('never merges different KINDS into one wave — they have different fixes', () => {
    const waves = wavesFromGaps([
      g('dead-reference', 'src/x/', 'a.ts', 'src/x/1.ts'),
      g('stray-ts', 'src/x/', 'x', 'loose.ts'),
    ])
    expect(waves).toHaveLength(2)
    expect(new Set(waves.map((w) => w.kind)).size).toBe(2)
  })

  it('the seal is content-addressed — same gaps fold to the same wave', () => {
    const items = [g('dead-reference', 'src/x/', 'a.ts', 'src/x/1.ts')]
    expect(wavesFromGaps(items)[0]!.seal).toBe(wavesFromGaps(items)[0]!.seal)
    const other = [g('dead-reference', 'src/x/', 'a.ts', 'src/x/2.ts')]
    expect(wavesFromGaps(other)[0]!.seal).not.toBe(wavesFromGaps(items)[0]!.seal)
  })

  it('clusters a pointer by the tree it AIMS at, not the file citing it', () => {
    expect(clusterOfTarget('src/services/uuid-kv/index.ts')).toBe('src/services/')
    expect(clusterOfTarget('src/standards/x.ts')).toBe('src/standards/')
    expect(clusterOfTarget('not-a-src-path')).toBe('not-a-src-path')
  })

  it('an ask names the class and warns off the wrong-target trap', () => {
    // rules/reference: a pointer to a wrong-but-EXISTING file passes the gate and is worse than a
    // dead one. The ask has to carry that, or the wave invites the sweep it exists to prevent.
    const asks = asksFromGapWaves(wavesFromGaps([g('dead-reference', 'src/services/', 'a.ts', 'src/services/x.ts')]))
    expect(asks).toHaveLength(1)
    expect(asks[0]).toContain('src/services/')
    expect(asks[0]).toMatch(/wrong-but-existing/)
  })

  it('no gaps means no waves — nothing to feed', () => {
    expect(wavesFromGaps([])).toEqual([])
    expect(asksFromGapWaves([])).toEqual([])
  })
})
