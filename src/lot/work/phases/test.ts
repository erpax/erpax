import { describe, it, expect, vi } from 'vitest'
import LotWorkPhases, { warnLotWorkPhaseFunnel } from '@/lot/work/phases'
import type { CollectionBeforeChangeHook } from 'payload'

// lot/work/phases — the routing step. `warnLotWorkPhaseFunnel` (beforeChange)
// enforces the funnel SOFTLY: unitsProduced > unitsOrdered WARNS (never blocks)
// so the 20-yr history stays admissible while disharmony surfaces. The hook
// always returns `data` unchanged.

const run = (
  data: Record<string, unknown>,
  warn: (msg: string) => void,
): Record<string, unknown> => {
  const hook = warnLotWorkPhaseFunnel as CollectionBeforeChangeHook
  const req = { payload: { logger: { warn } } }
   
  return hook({ data, req, operation: 'create' } as any) as Record<string, unknown>
}

describe('lot/work/phases — the routing step funnel (warn, never block)', () => {
  it('returns data unchanged and does NOT warn when produced ≤ ordered', () => {
    const warn = vi.fn()
    const data = { unitsOrdered: 100, unitsProduced: 80, name: 'cut' }
    const out = run(data, warn)
    expect(out).toBe(data)
    expect(warn).not.toHaveBeenCalled()
  })

  it('does NOT warn at the boundary (produced === ordered)', () => {
    const warn = vi.fn()
    run({ unitsOrdered: 50, unitsProduced: 50 }, warn)
    expect(warn).not.toHaveBeenCalled()
  })

  it('WARNS on over-run (produced > ordered) but still returns the data', () => {
    const warn = vi.fn()
    const data = { unitsOrdered: 10, unitsProduced: 12 }
    const out = run(data, warn)
    expect(out).toBe(data)
    expect(warn).toHaveBeenCalledTimes(1)
    expect(String(warn.mock.calls[0][0])).toMatch(/over-run/)
  })

  it('treats missing counters as 0 (no over-run, no warn)', () => {
    const warn = vi.fn()
    const out = run({ name: 'no-counters' }, warn)
    expect(warn).not.toHaveBeenCalled()
    expect(out).toEqual({ name: 'no-counters' })
  })

  it('exposes a lot-work-phases collection wired with the funnel beforeChange hook', () => {
    expect(LotWorkPhases.slug).toBe('lot-work-phases')
    expect(LotWorkPhases.hooks?.beforeChange).toContain(warnLotWorkPhaseFunnel)
    const fieldNames = (LotWorkPhases.fields ?? [])
      .map((f) => ('name' in f ? f.name : undefined))
      .filter(Boolean)
    expect(fieldNames).toContain('lot')
    expect(fieldNames).toContain('workPhase')
    expect(fieldNames).toContain('sort')
    expect(fieldNames).toContain('unitsOrdered')
    expect(fieldNames).toContain('unitsProduced')
  })
})
