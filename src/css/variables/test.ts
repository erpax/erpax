import { describe, expect, it } from 'vitest'
import { cssVariables } from '@/css/variables'

describe('css/variables — the breakpoints, addressable', () => {
  it('descends, so a caller can pick the first match by width', () => {
    const widths = Object.values(cssVariables.breakpoints)
    expect(widths).toEqual([...widths].sort((a, b) => b - a))
  })

  it('carries the Tailwind screen names it must stay in sync with', () => {
    expect(Object.keys(cssVariables.breakpoints)).toEqual(['3xl', '2xl', 'xl', 'lg', 'md', 'sm'])
    expect(cssVariables.breakpoints.md).toBe(768)
  })
})
