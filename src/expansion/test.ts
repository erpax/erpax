import { describe, it, expect } from 'vitest'
import { expandKeySync } from './index'

describe('expansion', () => {
  it('HKDF produces deterministic output', () => {
    const ikm = Buffer.from('test')
    const key1 = expandKeySync(ikm)
    const key2 = expandKeySync(ikm)
    expect(key1).toEqual(key2)
  })
})
