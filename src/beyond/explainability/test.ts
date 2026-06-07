import { describe, it, expect } from 'vitest'
import { autoExplain, isExplanationComplete } from '@/beyond/explainability'
import type { Explanation } from '@/beyond/types'

// Law 19 — explainability: every outcome ships a deterministic narrative citing
// standards, sources and chain steps; no LLM in the path so replay holds byte-identical.
describe('beyond/explainability — deterministic auto-narrative', () => {
  const base = {
    outcome: 'Invoice INV-2026-1234 posted',
    reason: 'Customer accepted quote QUO-2026-99',
    standardsCited: [{ body: 'EU AI Act', id: '2024/1689' }],
    sources: ['uuid-a', 'uuid-b'],
    chainPath: [
      { chainId: 'chain-1', stepIndex: 0 },
      { chainId: 'chain-1', stepIndex: 1 },
    ],
  }

  it('composes an EN narrative citing outcome, reason, standards, chain path and source count', () => {
    const exp = autoExplain(base)
    expect(exp.text.en).toContain('Invoice INV-2026-1234 posted')
    expect(exp.text.en).toContain('Reason: Customer accepted quote QUO-2026-99')
    expect(exp.text.en).toContain('EU AI Act 2024/1689')
    expect(exp.text.en).toContain('chain-1#0 → chain-1#1')
    expect(exp.text.en).toContain('2 record(s)')
  })

  it('is deterministic — identical inputs yield byte-identical text (no LLM in the path)', () => {
    expect(autoExplain(base).text.en).toBe(autoExplain(base).text.en)
  })

  it('non-EN locales are [en] stub markers prefixing the EN text', () => {
    const exp = autoExplain(base)
    expect(exp.text.bg).toBe(`[en] ${exp.text.en}`)
  })

  it('passes structured fields straight through into the Explanation', () => {
    const exp = autoExplain(base)
    expect(exp.standardsCited).toBe(base.standardsCited)
    expect(exp.sources).toBe(base.sources)
    expect(exp.chainPath).toBe(base.chainPath)
  })

  it('renders placeholder markers when nothing is cited', () => {
    const exp = autoExplain({ ...base, standardsCited: [], chainPath: [] })
    expect(exp.text.en).toContain('Standards: (none cited)')
    expect(exp.text.en).toContain('Chain path: (none)')
  })

  it('isExplanationComplete requires both locale text and a cited standard', () => {
    expect(isExplanationComplete(autoExplain(base))).toBe(true)
    expect(isExplanationComplete(autoExplain({ ...base, standardsCited: [] }))).toBe(false)
  })

  it('isExplanationComplete is false when there is no locale text', () => {
    const empty: Explanation = { text: {}, standardsCited: base.standardsCited, sources: [], chainPath: [] }
    expect(isExplanationComplete(empty)).toBe(false)
  })
})
