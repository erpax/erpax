import { describe, it, expect } from 'vitest'
import { computedBaseline, clearRatchetCache } from '@/law/folder/baseline'
import {
  camelTokens,
  commentCodeRatio,
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

  it('duplicate-prefix is the accessor family, not any lexical prefix', () => {
    // The old scan flagged ANY name that is a string-prefix of another — 960 hits,
    // ZERO of them the get/getX family the law names. A shared root is cohesion
    // (`Lease`/`LeaseStatus`, `merge`/`mergeCorpusEntropy`, `Provider`/`Props`), never
    // duplication. Pin the fix: every duplicate-prefix violation's base is a real
    // accessor verb (get/is/has/set/…), so cohesive domain naming can never regress in.
    const dup = wordMatterViolations().filter((r) => r.kind === 'duplicate-prefix')
    for (const r of dup) {
      const prefix = /duplicates prefix (\S+)/.exec(r.reason)?.[1] ?? ''
      expect(prefix).toMatch(/^(get|set|is|has|fetch|find|load|read|list)[A-Z]/)
    }
  })
})

/**
 * Two laws were pulling opposite ways. `@standard` banners ARE the standards catalogue's source of
 * truth, rules/citation fails closed when one leaves the surface, and rules/refutable requires an
 * `@invariant` beside every claim — and this law counted all of them as bloat. The only way to satisfy
 * all three was to drop a banner another gate is built on.
 */
describe('rules/word-matter — a comment a MACHINE reads is not prose', () => {
  const code = Array.from({ length: 60 }, (_, i) => `const x${i} = ${i}`).join('\n')

  it('does not charge a file for the annotation surface other laws require', () => {
    const annotated = [
      '/**',
      ' * One line of prose.',
      ...Array.from({ length: 40 }, () => ' * @standard ISO/IEC-25010:2023 §5.6 maintainability'),
      ' */',
      code,
    ].join('\n')
    const { ratio, codeLines } = commentCodeRatio(annotated)
    expect(codeLines).toBe(60)
    expect(ratio).toBeLessThan(0.45) // 40 banners + 1 prose line, and only the prose line counts
  })

  it('still charges the same VOLUME of ordinary prose', () => {
    const prosey = [
      '/**',
      ...Array.from({ length: 41 }, (_, i) => ` * Sentence ${i} explaining something at length.`),
      ' */',
      code,
    ].join('\n')
    expect(commentCodeRatio(prosey).ratio).toBeGreaterThanOrEqual(0.45)
  })

  it('counts an @invariant and an @see as machine-read, not as prose', () => {
    const both = ['/**', ' * @invariant a claim must be refutable', ' * @see ./SKILL.md', ' */', code].join('\n')
    // Only the block DELIMITERS remain — the two annotation lines are the machine's surface, not prose.
    expect(commentCodeRatio(both).ratio).toBeCloseTo(2 / 60, 10)
  })
})
