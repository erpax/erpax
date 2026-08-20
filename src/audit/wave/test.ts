import { describe, it, expect } from 'vitest'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { trendOf, sequenceOf, trendWindow, type AuditWaveEntry } from '@/audit/wave'

describe('audit/waves — the self-improving sequence', () => {
  it('trendOf reads the trajectory — new, regression, improving, stuck', () => {
    expect(trendOf(null, 5)).toBe('new')
    expect(trendOf(3, 5)).toBe('regression')
    expect(trendOf(5, 3)).toBe('improving')
    expect(trendOf(4, 4)).toBe('stuck')
  })

  it('the sequence law: regressions outrank everything; stuck escalates over improving', () => {
    const entries: AuditWaveEntry[] = [
      { axis: 'improving-big', count: 900, prev: 950, trend: 'improving' },
      { axis: 'regressed-small', count: 2, prev: 0, trend: 'regression' },
      { axis: 'stuck', count: 60, prev: 60, trend: 'stuck' },
      { axis: 'fresh', count: 999, prev: null, trend: 'new' },
      { axis: 'improving-small', count: 8, prev: 10, trend: 'improving' },
    ]
    expect(sequenceOf(entries).map((e) => e.axis)).toEqual([
      'regressed-small', // a gate that got WORSE outranks any size of standing debt
      'stuck', // no movement — the approach is exhausted, escalate
      'improving-big', // then remaining debt, largest first
      'improving-small',
      'fresh',
    ])
  })

  it('within a trend class, larger debt ranks first', () => {
    const entries: AuditWaveEntry[] = [
      { axis: 'a', count: 1, prev: 0, trend: 'regression' },
      { axis: 'b', count: 100, prev: 50, trend: 'regression' },
    ]
    expect(sequenceOf(entries)[0]!.axis).toBe('b')
  })

  it('a trend states the window it is measured against', () => {
    const w = trendWindow()
    expect(w.to).toMatch(/^[0-9a-f]{40}$|^unknown$/)
    // `from` null means the previous run recorded no commit — and then `commits`
    // must be null too, never a number implying a known span
    if (w.from === null) expect(w.commits).toBeNull()
    else expect(w.from).toMatch(/^[0-9a-f]{7,40}$/)
  })

  it('outside a git tree the window degrades to unknown rather than throwing', () => {
    const outside = mkdtempSync(join(tmpdir(), 'erpax-nogit-'))
    const w = trendWindow(outside)
    expect(w.from).toBeNull()
    expect(w.commits).toBeNull()
    rmSync(outside, { recursive: true, force: true })
  })
})
