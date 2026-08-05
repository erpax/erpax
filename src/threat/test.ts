import { describe, it, expect } from 'vitest'
import { threatClassify } from './index'

describe('threat', () => {
  it('RSA-2048 is immediate-retire', () => {
    expect(threatClassify('RSA-2048')).toBe('immediate-retire')
  })
})
