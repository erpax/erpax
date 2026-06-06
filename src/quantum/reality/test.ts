import { describe, it, expect } from 'vitest'
import { collapsed, eigenstate } from '@/quantum/reality'
import { realityRoot } from '@/reality'

describe('quantum/reality — the model collapses to one eigenstate', () => {
  it('reality collapses (the Merkle fold verifies — one true state)', () => {
    expect(collapsed()).toBe(true)
  })
  it('the eigenstate is the live root', () => {
    expect(eigenstate()).toBe(realityRoot())
  })
})
