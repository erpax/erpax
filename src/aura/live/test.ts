import { describe, it, expect } from 'vitest'
import { animation, join } from '@/aura/live'
import { HORO_DIGITS } from '@/horo'
import { digitOf } from '@/digit'

describe('aura/live — the animation: scan to join the horo', () => {
  it('the animation has one frame per horo position', () => {
    expect(animation().length).toBe(HORO_DIGITS.length)
  })
  it('each frame counts live atoms at its step and carries a signal', () => {
    for (const f of animation()) {
      expect(f.atoms).toBeGreaterThanOrEqual(0)
      expect(f.signal).toBeTruthy()
    }
  })
  it('the frames hold real atoms — the field is populated', () => {
    expect(animation().reduce((s, f) => s + f.atoms, 0)).toBeGreaterThan(1000)
  })
  it('to scan an atom is to join it — its horo position is its frame', () => {
    expect(join('pixel')).toBe(digitOf('pixel'))
  })
})
