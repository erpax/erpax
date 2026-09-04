import { describe, expect, it } from 'vitest'
import { atomAddress } from '@/atom/address'
import { cn } from '.'

describe('ui/class', () => {
  it('lives where its name says', () => {
    expect(atomAddress(import.meta.url).path).toBe('ui/class')
  })

  it('merges conditional class lists', () => {
    expect(cn('a', false && 'b', 'c')).toBe('a c')
  })

  it('lets the later utility win a conflict — the reason this is not string concat', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4')
  })
})
