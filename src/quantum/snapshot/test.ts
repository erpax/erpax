/**
 * quantum/snapshot — append-only chain; reconstructibility gate.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect } from 'vitest'
import { snapshotUuid, mergeIdentical, chainReconstructible, nestSnapshot } from '@/quantum/snapshot'

const TS = '2026-06-08T12:00:00.000Z'

describe('quantum/snapshot — content-addressed measurement chain', () => {
  it('snapshotUuid dedups identical states', () => {
    const s = { t: 1 }
    expect(mergeIdentical(s, s)).toBe(true)
    expect(mergeIdentical(s, { t: 2 })).toBe(false)
  })

  it('chainReconstructible verifies an intact nested chain', async () => {
    const p0 = { reading: 1 }
    const l0 = nestSnapshot(null, p0, TS)
    const l1 = nestSnapshot(l0, { reading: 2 }, TS)
    expect(await chainReconstructible([l0, l1])).toBe(true)
  })

  it('snapshotUuid is deterministic', () => {
    expect(snapshotUuid({ x: 1 })).toBe(snapshotUuid({ x: 1 }))
  })
})
