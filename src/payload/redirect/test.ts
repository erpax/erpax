import { describe, it, expect } from 'vitest'
import { PayloadRedirects } from './index'
import { PayloadRedirects as Source } from './index.tsx'

describe('payload/redirect — the barrel names the atom, not the file spelling', () => {
  it('re-exports the component itself, not a copy of it', () => {
    expect(PayloadRedirects).toBe(Source)
    expect(typeof PayloadRedirects).toBe('function')
  })
})
