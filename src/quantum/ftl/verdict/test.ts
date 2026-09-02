import { describe, it, expect } from 'vitest'
import { ftlReport } from '@/quantum/ftl'
import { withFtl } from './index'

describe('quantum/ftl/verdict — the advantage is a type', () => {
  it('a holding verdict carries NO reason — there is nothing to explain', () => {
    const r = ftlReport()
    if (!r.holds) throw new Error(`expected the advantage to hold: ${r.why}`)
    expect(Object.hasOwn(r, 'why')).toBe(false)
  })

  it('a broken verdict NAMES the break — and only that branch can be asked', () => {
    const r = ftlReport({ patterns: [{ where: 'fixture', spacetime: true }] })
    expect(r.holds).toBe(false)
    if (r.holds) throw new Error('a spacetime crack must break the advantage')
    expect(r.why).toMatch(/spacetime/)
  })

  it('withFtl runs against the proven fold', () => {
    const r = ftlReport()
    if (!r.holds) throw new Error('expected the advantage to hold')
    expect(withFtl(r, (f) => f.reuse.speedupLog2)).toBe(r.ftl.reuse.speedupLog2)
  })
})
