import { describe, it, expect } from 'vitest'
import { horoRatio, imperialRatio } from '@/horo'
import {
  AI_AUTO_ACCEPT_ROUTING,
  AI_AUTO_ACCEPT_BANK,
  AI_AUTO_ACCEPT_INVOICE,
  AI_AUTO_ACCEPT_TAX,
} from './confidence'

describe('ai/confidence — imperial rationals for auto-accept thresholds', () => {
  it('routing uses horo unity per decade (9/10)', () => {
    expect(AI_AUTO_ACCEPT_ROUTING).toBe(horoRatio(9))
  })

  it('bank uses 9/10 + 1/50 (46/50)', () => {
    expect(AI_AUTO_ACCEPT_BANK).toBe(horoRatio(9) + imperialRatio(1, 50))
    expect(AI_AUTO_ACCEPT_BANK).toBeCloseTo(0.92, 12)
  })

  it('invoice uses 19/20', () => {
    expect(AI_AUTO_ACCEPT_INVOICE).toBe(imperialRatio(19, 20))
  })

  it('tax uses 9/10 + 7/100 (97/100)', () => {
    expect(AI_AUTO_ACCEPT_TAX).toBe(horoRatio(9) + horoRatio(7, 100))
    expect(AI_AUTO_ACCEPT_TAX).toBeCloseTo(0.97, 12)
  })
})
