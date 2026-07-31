import { describe, it, expect } from 'vitest'
import { clock, verifyChain, CLOCK_SEED } from './index'

describe('quantum/clock — one clock, and a tick that seals its own order', () => {
  it('descends from the seed and advances monotonically', () => {
    const c = clock()
    const a = c.tick({ e: 1 })
    const b = c.tick({ e: 2 })
    expect(a.index).toBe(1)
    expect(a.prev).toBe(CLOCK_SEED)
    expect(b.index).toBe(2)
    expect(b.prev).toBe(a.address)
    expect(c.now()?.address).toBe(b.address)
  })

  it('the same events from the same seed fold to the same head — order is content, not clock', () => {
    const one = clock()
    const two = clock()
    for (const e of [{ e: 'a' }, { e: 'b' }, { e: 'c' }]) {
      one.tick(e)
      two.tick(e)
    }
    expect(one.now()!.address).toBe(two.now()!.address)
  })

  it('REORDERING the same events gives a different head — the chain carries order', () => {
    const one = clock()
    const two = clock()
    one.tick({ e: 'a' })
    one.tick({ e: 'b' })
    two.tick({ e: 'b' })
    two.tick({ e: 'a' })
    expect(one.now()!.address).not.toBe(two.now()!.address)
  })

  it('one edited tick breaks every later address — this is what a wall clock cannot do', () => {
    const c = clock()
    c.tick({ e: 'boot' })
    c.tick({ e: 'gate' })
    c.tick({ e: 'seal' })
    expect(c.verify()).toBe(true)

    const forged = c.history().slice()
    forged[1] = { ...forged[1]!, contentUuid: 'tampered-uuid' }
    expect(verifyChain(forged)).toBe(false)
  })

  it('a spliced-out tick is caught — indexes and parents must both line up', () => {
    const c = clock()
    c.tick({ e: 1 })
    c.tick({ e: 2 })
    c.tick({ e: 3 })
    const cut = [c.history()[0]!, c.history()[2]!]
    expect(verifyChain(cut)).toBe(false)
  })

  it('since() counts EVENTS, never seconds', () => {
    const c = clock()
    const a = c.tick({ e: 1 })
    c.tick({ e: 2 })
    c.tick({ e: 3 })
    expect(c.since(a)).toBe(2)
  })

  it('wall is null unless a source is injected — an invented timestamp is unrefutable', () => {
    // 621 scattered Date.now()/new Date() reads each assert a "when" nothing can contradict.
    // Omitting the source yields null rather than a fabricated number.
    expect(clock().tick({ e: 1 }).wall).toBeNull()
  })

  it('an injected wall source is used verbatim and is freezable for tests', () => {
    const c = clock({ wall: () => 1_700_000_000_000 })
    expect(c.tick({ e: 1 }).wall).toBe(1_700_000_000_000)
  })

  it('the wall sample is NOT part of the address — order does not depend on the clock', () => {
    const withWall = clock({ wall: () => 123 })
    const without = clock()
    withWall.tick({ e: 'a' })
    without.tick({ e: 'a' })
    expect(withWall.now()!.address).toBe(without.now()!.address)
  })

  it('an empty chain verifies and has no head', () => {
    const c = clock()
    expect(c.now()).toBeNull()
    expect(c.verify()).toBe(true)
  })
})
