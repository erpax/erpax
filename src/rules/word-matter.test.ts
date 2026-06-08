import { describe, it, expect } from 'vitest'
import { computedBaseline, clearRatchetCache } from '@/law/folder/baseline'
import {
  camelTokens,
  wordMatterViolations,
  wordMatterAuditTop,
  WORD_MATTER_AUDIT_ATOMS,
  IDENTIFIER_MAX_LEN,
  IDENTIFIER_MAX_TOKENS,
} from '@/rules/word-matter'

describe('rules/word-matter — heuristics', () => {
  it('camelTokens counts PascalCase and camelCase parts', () => {
    expect(camelTokens('deriveInvoiceNumberFromFiscalProtocol')).toBe(6)
    expect(camelTokens('rulesOf')).toBe(2)
    expect(camelTokens('id')).toBe(1)
  })

  it('wordMatterViolations returns ranked violations with law tag', () => {
    clearRatchetCache()
    const v = wordMatterViolations()
    expect(v.length).toBeGreaterThan(0)
    expect(v.length).toBeLessThanOrEqual(computedBaseline('word-matter'))
    for (const row of v.slice(0, 5)) {
      expect(row.law).toBe('word-matter')
      expect(row.kind).toBeTruthy()
      expect(row.reason).toBeTruthy()
    }
    console.log(`word-matter violations: ${v.length}`)
  })

  it('audit scope covers session-touched atoms', () => {
    const top = wordMatterAuditTop(undefined, 50)
    expect(top.length).toBeGreaterThan(0)
    const covered = WORD_MATTER_AUDIT_ATOMS.filter((atom) =>
      top.some((r) => r.atomPath === atom || r.atomPath.startsWith(`${atom}/`)),
    )
    expect(covered.length).toBeGreaterThanOrEqual(2)
    console.log(
      'audit top:',
      top.slice(0, 8).map((t) => `${t.kind}:${t.file}:${t.identifier ?? '—'}`).join(' · '),
    )
  })

  it('thresholds match law constants', () => {
    expect(IDENTIFIER_MAX_LEN).toBe(28)
    expect(IDENTIFIER_MAX_TOKENS).toBe(4)
  })
})
