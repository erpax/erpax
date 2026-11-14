import { describe, it, expect } from 'vitest'
import { codeOf, hostMathTipSite, hostMathViolations, HOST_MATH_RE } from '@/utilities/algebra/host'

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
    const m = await import('@/utilities/algebra/host')
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

})
