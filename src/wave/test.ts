import { describe, it, expect } from 'vitest'
import { HORO_DIGITS, composeSteps } from '@/horo'
import {
  wave,
  waveStep,
  composeWaves,
  isClosingWave,
  featureUuid,
  waveEntropy,
  UNITY,
  type Feature,
} from '@/wave'

const FEATS: Feature[] = [{ name: 'wave' }, { name: 'feature' }, { name: 'breath' }]

describe('wave — the development EXHALE unit (a batch of features added then later collided)', () => {
  it('waveStep maps a 1-based ordinal onto the horo ring, wrapping at 7', () => {
    // base · share · weave · crest · descent · round · unity, then back to base
    expect(waveStep(1)).toBe(HORO_DIGITS[0]) // 1 = base
    expect(waveStep(7)).toBe(HORO_DIGITS[6]) // 7th = unity = 9
    expect(waveStep(8)).toBe(HORO_DIGITS[0]) // wraps to base
    expect(HORO_DIGITS).toContain(waveStep(99)) // never off-ring
  })

  it('waveStep falls to base for non-positive / non-numeric ordinals (never escapes)', () => {
    expect(waveStep(0)).toBe(HORO_DIGITS[0])
    expect(waveStep(-3)).toBe(HORO_DIGITS[0])
    expect(waveStep(Number.NaN)).toBe(HORO_DIGITS[0])
  })

  it('wave(features) addresses each feature to a content-uuid and folds them to one digest', () => {
    const w = wave(FEATS, 1)
    expect(w.uuids).toHaveLength(FEATS.length)
    // each uuid is the feature-name content-uuid (matches the collider primitive)
    expect(w.uuids[0]).toBe(featureUuid(FEATS[0]!))
    // a v8 hyphenated uuid (version nibble 8, variant 8..b)
    expect(w.uuids[0]).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
    expect(typeof w.digest).toBe('string')
  })

  it('the wave digest is deterministic and order-sensitive (content-addressed)', () => {
    expect(wave(FEATS, 1).digest).toBe(wave(FEATS, 1).digest) // stable
    const reversed = wave([...FEATS].reverse(), 1)
    expect(reversed.digest).not.toBe(wave(FEATS, 1).digest) // a different batch ⇒ a different digest
  })

  it('an empty wave carries no uuids and no digest (nothing to fold)', () => {
    const w = wave([], 1)
    expect(w.uuids).toHaveLength(0)
    expect(w.digest).toBeUndefined()
  })

  it('a wave owes the file-trinity matter+test legs per feature (pulled from @/trinity, not re-listed)', () => {
    const w = wave(FEATS, 1)
    expect(w.owes).toContain('index.ts')
    expect(w.owes).toContain('test.ts')
  })
})

describe('wave — waves ride the horo ring (the development-horo, closed under composition)', () => {
  it('composeWaves folds a plan to a single resting horo position, always on the ring', () => {
    const plan = [wave(FEATS, 1), wave(FEATS, 6), wave(FEATS, 7)] // steps 1, 5, 9
    const rest = composeWaves(plan)
    expect(HORO_DIGITS).toContain(rest)
    // composeSteps(composeSteps(1,5),9) = composeSteps(5,9) = digitalRoot(45) = 9 (unity)
    expect(rest).toBe(composeSteps(composeSteps(1, 5), 9))
    expect(rest).toBe(UNITY)
  })

  it('an empty plan rests at unity (the absorbing close); a single wave rests at its own step', () => {
    expect(composeWaves([])).toBe(UNITY)
    const w = wave(FEATS, 2) // step 2 = share
    expect(composeWaves([w])).toBe(w.step)
    expect(composeWaves([w])).toBe(HORO_DIGITS[1])
  })

  it('isClosingWave is true exactly at unity — the wave ready to collide (open the next octave)', () => {
    expect(isClosingWave(wave(FEATS, 7))).toBe(true) // 7th ordinal = unity = 9
    expect(isClosingWave(wave(FEATS, 1))).toBe(false) // base
    expect(isClosingWave(wave(FEATS, 6))).toBe(false) // round = 5
  })
})

describe('wave — the exhale borrows live entropy (read, never asserted)', () => {
  it('borrowed slack is the SAME number as @/entropy (no re-implementation), bounded [0,1]', () => {
    const w = wave(FEATS, 1)
    expect(w.borrowed).toBe(waveEntropy())
    expect(w.borrowed).toBeGreaterThanOrEqual(0)
    expect(w.borrowed).toBeLessThanOrEqual(1)
  })
})
