import { describe, it, expect } from 'vitest'
import { credit } from '@/credit'

describe('credits — fold into credit', () => {
  it('re-exports credit matter', () => {
    expect(credit).toBe('credit')
  })
})
