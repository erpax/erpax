import { describe, it, expect } from 'vitest'
import {
  windkessel,
  pulsatility,
  pulsatileSource,
  smoothsPulsatile,
  elasticRecoil,
  conservesFlow,
  arteryWindkessel,
  isWindkessel,
} from '@/artery'

describe('artery — the Windkessel (smooths pulsatile flow)', () => {
  it('output pulsatility is lower than input (the elastic reservoir damps the pulse)', () => {
    const inflow = pulsatileSource(40)
    const { outflow } = windkessel(inflow)
    expect(pulsatility(outflow.slice(20))).toBeLessThan(pulsatility(inflow.slice(20)))
    expect(smoothsPulsatile()).toBe(true)
  })
  it('recoil keeps outflow > 0 during diastole (continuous perfusion between beats)', () => {
    expect(elasticRecoil()).toBe(true)
  })
  it('conserves: Σ inflow = Σ outflow + reservoir held (mass balance)', () => {
    expect(conservesFlow()).toBe(true)
  })
})

describe('artery — the conjunction', () => {
  it('every Windkessel claim is true', () => {
    for (const [k, v] of Object.entries(arteryWindkessel())) expect(v, k).toBe(true)
  })
  it('the artery is the elastic buffer', () => {
    expect(isWindkessel()).toBe(true)
  })
})
