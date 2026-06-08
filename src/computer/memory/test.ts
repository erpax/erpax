import { describe, it, expect } from 'vitest'
import {
  dedupHolds,
  createAddressSpace,
  read,
  write,
  inBounds,
  writeCostBits,
  recordComputerMemoryOnPath,
} from '@/computer/memory'
import { dedupHolds as canonical } from '@/memory/quantum'
import { LANDAUER_BIT } from '@/readme/entropy'

describe('computer/memory — quantum pivot + address space', () => {
  it('re-exports dedupHolds verbatim from @/memory/quantum', () => {
    expect(dedupHolds).toBe(canonical)
    expect(dedupHolds()).toBe(canonical())
  })

  it('read/write within bounds', () => {
    const space = createAddressSpace(4)
    const s1 = write(0, 'a', space)
    const s2 = write(2, 42, s1)
    expect(read(0, s2)).toBe('a')
    expect(read(2, s2)).toBe(42)
    expect(read(1, s2)).toBeUndefined()
  })

  it('rejects out-of-bounds access', () => {
    const space = createAddressSpace(2)
    expect(inBounds(1, space)).toBe(true)
    expect(inBounds(2, space)).toBe(false)
    expect(() => read(2, space)).toThrow(RangeError)
    expect(() => write(-1, 0, space)).toThrow(RangeError)
  })

  it('writeCostBits scales with occupied cells × Landauer bit', () => {
    let space = createAddressSpace(8)
    expect(writeCostBits(space)).toBe(0)
    space = write(0, 1, space)
    space = write(3, 2, space)
    expect(writeCostBits(space)).toBe(2 * LANDAUER_BIT)
  })

  it('recordComputerMemoryOnPath — content-addressed ledger row', () => {
    const a = recordComputerMemoryOnPath({ op: 'write' }, '2026-06-09T00:00:00.000Z', null, 0)
    const b = recordComputerMemoryOnPath({ op: 'write' }, '2026-06-09T00:00:00.000Z', null, 0)
    expect(a.entryUuid).toBe(b.entryUuid)
    expect(a.atomPath).toBe('computer/memory')
  })
})
