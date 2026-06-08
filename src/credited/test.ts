import { describe, it, expect } from 'vitest'
import { credit } from '@/credit'

describe('credited — fold into credit', () => {
  it('re-exports credit matter', () => {
    expect(credit).toBe('credit')
  })
})
