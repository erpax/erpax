import { describe, it, expect } from 'vitest'
import { PayloadRedirects } from '@/components/payload/redirect'
import { PayloadRedirects as Source } from '@/components/payload/redirect'

describe('payload/redirect — the barrel names the atom, not the file spelling', () => {
  it('re-exports the component itself, not a copy of it', () => {
    expect(PayloadRedirects).toBe(Source)
    expect(typeof PayloadRedirects).toBe('function')
  })
})
