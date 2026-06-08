import { describe, it, expect } from 'vitest'
import { award } from '@/award'

describe('awarded — fold into award', () => {
  it('re-exports award matter', () => {
    expect(award).toBe('award')
  })
})
