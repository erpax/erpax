import { describe, it, expect } from 'vitest'
import { Banner, Code, Content } from '@/blocks'

describe('blocks barrel', () => {
  it('exports payload block configs', () => {
    expect(Banner.slug).toBe('banner')
    expect(Code.slug).toBe('code')
    expect(Content.slug).toBe('content')
  })
})
