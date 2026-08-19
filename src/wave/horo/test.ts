import { describe, it, expect } from 'vitest'
import { HORO_DIGITS } from '@/horo'
import { UNITY, waveStep, wave, composeWaves, isClosingWave, waveOfBatch, featureUuid } from './index'

/**
 * horo — the ring a wave sits on. These pin the ORDINAL→STEP mapping and the
 * content-addressing of a wave, which is what makes two identical wave plans
 * fold to the same digest.
 */

describe('wave/horo — the ring', () => {
  it('rests at UNITY, which is a real point on the ring', () => {
    expect(UNITY).toBe(9)
    expect(HORO_DIGITS).toContain(UNITY)
  })

  it('maps a 1-based ordinal onto the ring, and WRAPS', () => {
    expect(waveStep(1)).toBe(HORO_DIGITS[0])
    expect(waveStep(HORO_DIGITS.length + 1)).toBe(HORO_DIGITS[0])
    expect(waveStep(HORO_DIGITS.length)).toBe(HORO_DIGITS[HORO_DIGITS.length - 1])
  })

  it('treats a non-positive ordinal as the ring start, never NaN', () => {
    for (const bad of [0, -1, Number.NaN]) expect(HORO_DIGITS).toContain(waveStep(bad))
  })
})

describe('wave/horo — a wave is content-addressed', () => {
  const features = [{ name: 'alpha' }, { name: 'beta' }]

  it('the SAME features fold to the same digest', () => {
    expect(wave(features, 1).digest).toBe(wave(features, 1).digest)
  })

  it('different features fold differently', () => {
    expect(wave(features, 1).digest).not.toBe(wave([{ name: 'alpha' }], 1).digest)
  })

  it('an empty wave has no digest — nothing to address', () => {
    expect(wave([], 1).digest).toBeUndefined()
  })

  it('a feature uuid is stable for the same name', () => {
    expect(featureUuid({ name: 'alpha' })).toBe(featureUuid({ name: 'alpha' }))
  })
})

describe('wave/horo — composition', () => {
  it('an empty composition rests at UNITY', () => {
    expect(composeWaves([])).toBe(UNITY)
  })

  it('composing yields a point ON the ring', () => {
    const composed = composeWaves([wave([{ name: 'a' }], 1), wave([{ name: 'b' }], 2)])
    expect(HORO_DIGITS).toContain(composed)
  })

  it('a wave closes only when it lands on UNITY', () => {
    const w = wave([{ name: 'x' }], 1)
    expect(isClosingWave(w)).toBe(w.step === UNITY)
  })

  it('a batch becomes a wave carrying its ordinal', () => {
    const w = waveOfBatch({ ordinal: 2, items: ['p', 'q'] } as never)
    expect(w.step).toBe(waveStep(2))
  })
})
