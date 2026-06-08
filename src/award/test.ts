import { describe, it, expect } from 'vitest'
import { award } from './index'

describe('award', () => {
  it('exports canonical vocabulary face', () => {
    expect(award).toBe('award')
  })
})
