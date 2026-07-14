import { describe, it, expect } from 'vitest'
import { A432, signalForStep, uuidSignal, uuidSignalCssVars } from '@/signal'

describe('signal — horo position → color+sound', () => {
  it('decodes a step deterministically from the A432 anchor', () => {
    const a = signalForStep(1)
    expect(signalForStep(1)).toEqual(a)
    expect(a.hz).toBeGreaterThan(0)
  })
})

describe('signal — uuid realtime identity (uuidSignal)', () => {
  const rules = '335e5fa7-a91b-890f-a3db-2a3ebe2c8c0c'
  it('derives hue · spin · A432-tempered tone from the bytes, deterministically', () => {
    const s = uuidSignal(rules)
    expect(uuidSignal(rules)).toEqual(s)
    expect(s.hue).toBeGreaterThanOrEqual(0)
    expect(s.hue).toBeLessThan(360)
    expect(s.spinMs).toBeGreaterThanOrEqual(900)
    expect(s.frequency).toBeGreaterThanOrEqual(A432 / 4)
    expect(s.frequency).toBeLessThanOrEqual(A432 * 4)
  })
  it('distinct uuids render distinct identities — drift is visible', () => {
    expect(uuidSignal(rules).hue).not.toBe(uuidSignal('f07080b7-70bf-8860-b639-797acb2c4905').hue)
  })
  it('the CSS-variable bus carries the three vars', () => {
    const vars = uuidSignalCssVars(rules)
    expect(Object.keys(vars)).toEqual(['--erpax-hue', '--erpax-spin-ms', '--erpax-freq'])
    expect(vars['--erpax-spin-ms']).toMatch(/ms$/)
  })
})
