import { describe, it, expect } from 'vitest'
import { fuse as crossFuse, fusionCost as crossCost } from '@/quantum/cross'
import { fuse, fusionCost } from '@/dual/torus/fusion'

describe('quantum/cross — IS dual/torus/fusion (the identity)', () => {
  it('the cross re-exports the fusion verbatim — same function, same result', () => {
    expect(crossFuse('a', 'b')).toBe(fuse('a', 'b'))
    expect(crossCost(0)).toBe(fusionCost(0))
  })
  it('the identity holds at the seal — both are 1/0 = ∞', () => {
    expect(crossCost(0)).toBe(Infinity)
  })
})
