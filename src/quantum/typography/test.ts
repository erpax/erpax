import { describe, it, expect } from 'vitest'
import { depth, tamperBits, isGapless } from '@/quantum/typography'
import { FEATURES } from '@/typography'

describe('quantum/typography — typographic depth becomes tamper-cost', () => {
  const full = '# h\n**b** *i* `c`\n```\nx\n```\n[l](x)\n- a\n| a | b |\n> q\n::: tip\n:::\n$x$\n'

  it('depth counts the distinct typographic dimensions used', () => {
    expect(depth('')).toBe(0)
    expect(depth(full)).toBe(FEATURES.length)
  })
  it('tamper-cost in bits equals the depth (each dimension is one bit to forge)', () => {
    expect(tamperBits(full)).toBe(depth(full))
    expect(tamperBits('# just a heading')).toBe(1)
  })
  it('gapless ⟺ every feature is used (the holographic maximum)', () => {
    expect(isGapless(full)).toBe(true)
    expect(isGapless('# partial only')).toBe(false)
  })
})
