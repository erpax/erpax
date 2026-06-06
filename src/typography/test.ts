import { describe, it, expect } from 'vitest'
import { FEATURES, featuresUsed, coverage } from '@/typography'

describe('typography — the vitepress feature-set a page renders with', () => {
  it('detects the features a markdown sample uses', () => {
    const md = '# h\n\n**b** and `c` and [l](x)\n\n- item\n'
    const used = featuresUsed(md)
    expect(used).toContain('heading')
    expect(used).toContain('bold')
    expect(used).toContain('code')
    expect(used).toContain('link')
    expect(used).toContain('list')
  })
  it('coverage is the fraction of the feature-set used (0..1)', () => {
    expect(coverage('')).toBe(0)
    const full = '# h\n**b** *i* `c`\n```\nx\n```\n[l](x)\n- a\n| a | b |\n> q\n::: tip\n:::\n$x$\n'
    expect(coverage(full)).toBe(1)
    expect(featuresUsed(full).length).toBe(FEATURES.length)
  })
})
