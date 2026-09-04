/**
 * collapse — trinity proof stub (monitor/violations improve).
 * @generated realtime improve — replace with real behavior tests
 */
import { describe, it, expect } from 'vitest'
import { atomAddress } from '@/atom/address'
import { WORD, atomPath } from './index'

describe('collapse — trinity proof (improve stub)', () => {
  it('exports vocabulary atom barrel', () => {
    expect(WORD).toBe(atomAddress(import.meta.url).path)
    expect(atomPath).toBe(atomAddress(import.meta.url).path)
  })
})
