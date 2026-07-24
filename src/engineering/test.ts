import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import {
  QUALITY_ENFORCEMENT,
  ENGINEERING_TRINITIES,
  engineeringCitations,
  engineeringConformance,
  assertEngineeringEnforced,
  sealEngineeringTrinities,
  engineeringDesignBacklog,
} from './index'

// Reverse-engineer the engineering standards into gates. The citation scan runs on a hermetic fixture
// cwd (never the real corpus), so this is fixture-bounded — it obeys assertTestsBounded.
describe('engineering — the standards, reverse-engineered into enforcing gates', () => {
  let cwd: string
  const setup = (): string => {
    const dir = mkdtempSync(join(tmpdir(), 'eng-'))
    const a = join(dir, 'src', 'alpha')
    mkdirSync(a, { recursive: true })
    // an atom citing an ENFORCED concern (§5.7 maintainability → rules/cycle)
    writeFileSync(join(a, 'index.ts'), '/** @standard ISO/IEC 25010:2023 §5.7 maintainability */\nexport const a = 1\n')
    const b = join(dir, 'src', 'beta')
    mkdirSync(b, { recursive: true })
    // an atom citing an UNENFORCED concern (§5.3 compatibility → no gate yet)
    writeFileSync(join(b, 'index.ts'), '/** @standard ISO/IEC 25010:2023 §5.3 compatibility */\nexport const b = 1\n')
    return dir
  }

  it('the concern→gate map declares a gate per characteristic — derived from the trinities', () => {
    expect(QUALITY_ENFORCEMENT.find((q) => q.concern === 'maintainability')?.gate).toBe('rules/cycle')
    expect(QUALITY_ENFORCEMENT.find((q) => q.concern === 'reliability')?.gate).toBe('rules/refutable')
    // interaction-capability → rules/ask; compatibility → rules/compatibility (§5.3 sealed this wave)
    expect(QUALITY_ENFORCEMENT.find((q) => q.concern === 'interaction-capability')?.gate).toBe('rules/ask')
    expect(QUALITY_ENFORCEMENT.find((q) => q.concern === 'compatibility')?.gate).toBe('rules/compatibility')
    // every characteristic is now gate-enforced — no ungated concern remains
    const ungated = QUALITY_ENFORCEMENT.filter((q) => q.gate === null).map((q) => q.concern)
    expect(ungated).toEqual([])
  })

  it('the engineer types are organised in THREE trinities of three — form · code · proof', () => {
    expect(ENGINEERING_TRINITIES).toHaveLength(3)
    expect(ENGINEERING_TRINITIES.map((t) => t.axis)).toEqual(['form', 'code', 'proof'])
    for (const t of ENGINEERING_TRINITIES) expect(t.concerns).toHaveLength(3) // a trinity is exactly three
    // QUALITY_ENFORCEMENT is DERIVED from the trinities (one source, no duplication)
    expect(QUALITY_ENFORCEMENT).toHaveLength(9)
  })

  it('sealEngineeringTrinities: all three trinities sealed once §5.3 is gated — the surface is complete', () => {
    const seals = sealEngineeringTrinities()
    expect(seals.every((s) => s.sealed)).toBe(true) // form · code · proof all sealed
    expect(seals.find((s) => s.axis === 'form')!.design).toEqual([]) // compatibility now gated
    // the design backlog is empty — every standard-trinity sealed, the engineering surface complete
    expect(engineeringDesignBacklog()).toEqual([])
  })

  it('citations are COMPUTED from source and marked enforced iff their clause has a gate', () => {
    cwd = setup()
    try {
      const cites = engineeringCitations(cwd)
      const maint = cites.find((c) => c.clause === '§5.7')
      const compat = cites.find((c) => c.clause === '§5.3')
      expect(maint?.enforced).toBe(true) // §5.7 maintainability is gate-enforced
      expect(compat?.enforced).toBe(true) // §5.3 compatibility is now gated by rules/compatibility
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })

  it('conformance: every characteristic is now gate-enforced — the reverse-engineer list is empty', () => {
    cwd = setup()
    try {
      const c = engineeringConformance(cwd)
      expect(c.enforced).toBe(c.concerns) // all 9 gated
      expect(c.reverseEngineer).toEqual([])
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })

  it('assertEngineeringEnforced ratchets: passes at/above the ungated count, fails below it', () => {
    cwd = setup()
    try {
      const c = engineeringConformance(cwd)
      const n = c.reverseEngineer.length
      expect(() => assertEngineeringEnforced(cwd, n)).not.toThrow()
      expect(() => assertEngineeringEnforced(cwd, n - 1)).toThrow(/no enforcing gate/)
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })
})
