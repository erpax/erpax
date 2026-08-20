import { describe, it, expect } from 'vitest'
import { auditConstants, matrixCrackViolations, CONSTANTS_AUDIT_COORDINATE } from '@/matrix'
import { computedBaseline } from '@/law/folder/baseline'

describe('matrix constants-audit — auditConstants', () => {
  it('coordinates with 82bdf99d audit anchor', () => {
    expect(CONSTANTS_AUDIT_COORDINATE).toBe('82bdf99d')
  })

  it('categorizes lawful physical constants', () => {
    const audit = auditConstants()
    const horo = audit.entries.find((e) => e.constName === 'HORO_DIGITS')
    expect(horo?.category).toBe('lawful-physical')
    const landauer = audit.entries.find((e) => e.constName === 'LANDAUER_BIT')
    expect(landauer?.category).toBe('lawful-physical')
  })

  it('flags *_BASELINE as seal-debt not crack', () => {
    const audit = auditConstants()
    const baselines = audit.entries.filter((e) => e.constName.endsWith('_BASELINE'))
    expect(baselines.length).toBeGreaterThan(0)
    for (const b of baselines) {
      expect(b.category).toBe('seal-debt')
    }
  })

  it('a crack is a DATA literal only — a function-valued export const is code, not seal-debt', () => {
    // The scanner PARSES (ts.createSourceFile), never a regex. A regex over `export const X =`
    // cannot tell `export const RATE = 0.2` from `export const exactMax = (a,b) => …`, and counted
    // both: 57% of the old 1891 "cracks" were arrow functions. Pin the fix so it cannot regress.
    const entries = auditConstants().entries
    const exactMax = entries.find((e) => e.constName === 'exactMax')
    expect(exactMax?.category).toBe('lawful-code') // arrow function — computes, not a static datum
    // Per-atom i18n data and identity seeds are irreducible source, lawful (the test's own axioms).
    const translations = entries.filter((e) => e.constName === 'translations')
    expect(translations.length).toBeGreaterThan(0)
    for (const t of translations) expect(t.category).not.toBe('crack')
  })

  it('matrixCrackViolations holds below the telos — every crack is a genuine static datum', () => {
    const v = matrixCrackViolations()
    // Parser-honest count (2026-08-18): 791 real data-literal statics, well under the 1297 telos.
    // The old regex read 1891 (RED) — an artifact, not debt: it missed type-annotated data consts
    // and counted every arrow function. Down-only from here; a RISE fails closed.
    expect(v.length).toBeLessThanOrEqual(computedBaseline('matrix-crack'))
    console.log(
      `matrix cracks: ${v.length} (telos ${computedBaseline('matrix-crack')}) · lawful ${auditConstants().lawfulNames.length}`,
    )
  })

  it('the static-constant (crack) total does not grow beyond the sealed telos', () => {
    expect(auditConstants().crackTotal).toBeLessThanOrEqual(computedBaseline('matrix-crack'))
  })
})

describe('matrix constants-audit — what is NOT corpus matter', () => {
  // A crack is a HAND-WRITTEN static a theorem could have folded. Two kinds of file
  // can never be that, and both were counted until 2026-08-20.
  const cracks = matrixCrackViolations()

  it('excludes GENERATED faces — telling them to "compute from sealed state" is vacuous', () => {
    // They ARE the computed state. The old pattern needed a dot before "generated",
    // so a bare `generated.ts` (uuid/matrix) slipped through with 3 cracks.
    const generated = cracks.filter((c) =>
      /(^|\/)(catalogue|skills\.index|payload-types|generated)\.tsx?$/.test(c.file),
    )
    expect(generated).toEqual([])
  })

  it('excludes the Next App Router tree — those export names belong to the framework', () => {
    // `dynamic` · `revalidate` · `metadata` · `maxDuration` are read by exact
    // spelling by Next; erpax cannot derive them. Same reason rules/echo excludes
    // app/ and rules/compatibility refuses to model the framework's namespace.
    expect(cracks.filter((c) => c.file.startsWith('src/app/'))).toEqual([])
  })

  it('still audits a NESTED app folder — only the framework root is exempt', () => {
    // The exemption must not become "any folder called app".
    const nested = cracks.filter((c) => c.file.includes('/app/') && !c.file.startsWith('src/app/'))
    expect(nested.length).toBeGreaterThan(0)
  })

  it('still audits ordinary hand-written constants — the axis has not been hollowed out', () => {
    expect(cracks.length).toBeGreaterThan(700)
  })
})
