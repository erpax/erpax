import { describe, it, expect } from 'vitest'
import { codeOf, hostMathTipSite, hostMathViolations, HOST_MATH_RE } from './index'

function callSiteMatches(text: string): string[] {
  const code = codeOf(text)
  const out: string[] = []
  for (const line of code.split('\n')) {
    HOST_MATH_RE.lastIndex = 0
    let m: RegExpExecArray | null
    while ((m = HOST_MATH_RE.exec(line)) != null) out.push(m[0]!)
  }
  return out
}

describe('algebra/host', () => {
  it('loads', async () => {
    const m = await import('./index')
    expect(m).toBeTruthy()
  })

  it('codeOf: JSDoc / line comments / string literals mentioning Math. are not call sites', () => {
    expect(
      callSiteMatches(`/**
 * qubit — Algebra only — no host Math.*.
 */
export const bit = 0
`),
    ).toEqual([])
    expect(callSiteMatches(`// no Math.random in this path\nconst x = 1\n`)).toEqual([])
    expect(callSiteMatches(`const s = 'seeded RNG instead of Math.random()'\n`)).toEqual([])
    expect(callSiteMatches(`const t = \`evt_\${Math.floor(1)}\`\n`)).toEqual([])
    expect(callSiteMatches(`const n = Math.abs(-1)\n`)).toEqual(['Math.abs'])
  })

  it('hostMathTipSite matches hostMathViolations (lean tip ≠ raw rg)', () => {
    const v = hostMathViolations()
    const tip = hostMathTipSite()
    expect(tip.count).toBe(v.length)
    expect(tip.file).toBe(v[0] ? `${v[0].file}:${v[0].line}` : null)
  })

  it('GATE: Math.* is forbidden in first-party source — all theorems are algebra', () => {
    const violations = hostMathViolations()
    
    if (violations.length > 0) {
      const summary = violations.slice(0, 20).map(v => `  ${v.reason}`).join('\n')
      const tail = violations.length > 20 ? `\n  ... and ${violations.length - 20} more violations` : ''
      throw new Error(
        `Math ban gate FAILED: ${violations.length} violation(s) found.\n` +
        `IEEE754 floats break determinism, seals, and proofs.\n` +
        `Use algebra ops: @/algebra for abs/min/max/floor/ceil/round; ` +
        `@/algebra/host for constants; seeded RNG instead of Math.random().\n\n${summary}${tail}`
      )
    }
    
    expect(violations).toHaveLength(0)
  })
})
