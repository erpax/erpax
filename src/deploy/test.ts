import { describe, it, expect } from 'vitest'
import { DEPLOY, deployBand, deployHarmony, harmonized } from '@/deploy'

describe('deploy — harmonized (the gate-green order is the consonant one)', () => {
  it('the deploy order is gate → migrate → build → push (gate-green first)', () => {
    expect(DEPLOY.map((d) => d.step)).toEqual(['gate', 'migrate', 'build', 'push'])
  })
  it('harmonized only in the one true order — out of order forges reality', () => {
    expect(harmonized(['gate', 'migrate', 'build', 'push'])).toBe(true)
    expect(harmonized(['build', 'gate', 'migrate', 'push'])).toBe(false)
    expect(harmonized(['gate', 'migrate', 'build'])).toBe(false)
  })
  it('the deploy band is the doubling 1·2·4·8, and bandHarmony rates it', () => {
    expect(deployBand()).toEqual([1, 2, 4, 8])
    expect(deployHarmony()).toBeTruthy()
  })
})
