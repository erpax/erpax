import { describe, it, expect } from 'vitest'
import { chakras, uuidOf, ANCHOR } from '@/chakra'
import { HORO_DIGITS, HORO_MEASURE, composeSteps } from '@/horo'
import { NOTES, signalForStep, A432 } from '@/signal'
import { nodeOf } from '@/uuid/matrix'

// The 7 chakras = the 7 horo positions. Every value is computed from the position
// math; the uuid is the content-uuid (NOT from the colour). The traditional
// rainbow is an overlay and is deliberately NOT asserted equal to the computed hue.
describe('chakra: the 7 centers = the 7 horo positions (uuid from math, colour from it)', () => {
  it('there are 7 centers, root → crown, in horo walk order = the ascending scale', () => {
    const cs = chakras()
    expect(cs).toHaveLength(7)
    expect(cs.map((c) => c.measure)).toEqual([...HORO_MEASURE]) // base..unity
    expect(cs.map((c) => c.digit)).toEqual([...HORO_DIGITS]) // 1,2,4,8,7,5,9
    expect(cs[0]!.name).toBe('Root')
    expect(cs[6]!.name).toBe('Crown')
    expect(cs.map((c) => c.note)).toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B'])
  })

  it('sound is computed from A432: each Hz = NOTES[digit].hz; Third Eye (La) = A432 itself', () => {
    const cs = chakras()
    for (const c of cs) expect(c.hz).toBe(NOTES[c.digit].hz)
    expect(cs.find((c) => c.name === 'Third Eye')!.hz).toBe(A432) // round = La = ratio 1
  })

  it('the uuid is the content-uuid computed from the position MATH — not the colour', () => {
    for (const c of chakras()) {
      expect(c.uuid).toBe(nodeOf(c.measure)!.uuid) // from math (content), via the matrix
      expect(c.uuid).toBe(uuidOf(c.measure)) // same coordinate regardless of how it renders
      expect(c.uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
    }
  })

  it('colour is RENDERED from the position (signalForStep) — the projection, downstream of the uuid', () => {
    for (const c of chakras()) {
      expect(c.hex).toBe(signalForStep(c.digit).hex)
      expect(c.hex).toMatch(/^#[0-9a-f]{6}$/i)
    }
  })

  it('movement is the rodin doubling step; the anchor is 0/K/black @ A432', () => {
    for (const c of chakras()) expect(c.movement).toBe(composeSteps(c.digit, 2))
    expect(ANCHOR.digit).toBe(0)
    expect(ANCHOR.channel).toBe('K')
    expect(ANCHOR.hz).toBe(A432)
  })
})
