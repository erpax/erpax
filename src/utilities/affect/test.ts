import { describe, expect, it } from 'vitest'

import { CORNERS, STATES, angleOf, cycle, flip, mirror, order, same, times, turn } from '@/utilities/affect'

const everyState = (law: (s: (typeof STATES)[number]) => boolean) => STATES.every(law)

describe('affect — the twin of Affect.lean', () => {
  it('has six states: three corners, two valences', () => {
    expect(STATES).toHaveLength(6)
  })

  it('the turn has order three and moves every corner (no fixed corner)', () => {
    expect(order(turn)).toBe(3)
    expect(everyState((s) => turn(s).corner !== s.corner)).toBe(true)
  })

  it('the flip has order two and moves every state', () => {
    expect(order(flip)).toBe(2)
    expect(everyState((s) => !same(flip(s), s))).toBe(true)
  })

  it('flip and turn commute, so turn-and-flip generates the cyclic group C6', () => {
    expect(everyState((s) => same(flip(turn(s)), turn(flip(s))))).toBe(true)
    expect(order(cycle)).toBe(6)
  })

  it('with the commuting flip only the flip itself is an involution, not three flips', () => {
    expect(order((s) => flip(turn(s)))).toBe(6)
    expect(order((s) => flip(times(turn, 2, s)))).toBe(6)
  })

  it('the mirror reverses the loop and does not commute with the turn: the group is S3', () => {
    expect(order(mirror)).toBe(2)
    expect(everyState((s) => same(mirror(turn(mirror(s))), times(turn, 2, s)))).toBe(true)
    expect(everyState((s) => same(mirror(turn(s)), turn(mirror(s))))).toBe(false)
  })

  it('S3 has three genuine flips: the mirror, mirror·turn and mirror·turn² are all involutions', () => {
    expect(order(mirror)).toBe(2)
    expect(order((s) => mirror(turn(s)))).toBe(2)
    expect(order((s) => mirror(times(turn, 2, s)))).toBe(2)
  })

  it('places the corners 120° apart on the wheel', () => {
    expect(CORNERS.map(angleOf)).toEqual([0, 120, 240])
  })
})
