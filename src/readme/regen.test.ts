import { describe, it, expect } from 'vitest'
import { expandRegenScopes } from './regen'

describe('readme/regen — focused face regen', () => {
  it('expands a known atom scope', () => {
    const paths = expandRegenScopes(['readme'])
    expect(paths).toContain('readme')
  })
})
