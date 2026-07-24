import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import {
  QUALITY_ENFORCEMENT,
  engineeringCitations,
  engineeringConformance,
  assertEngineeringEnforced,
} from './index'

// Reverse-engineer the engineering standards into gates. The citation scan runs on a hermetic fixture
// cwd (never the real corpus), so this is fixture-bounded — it obeys assertTestsBounded.
describe('engineering — the standards, reverse-engineered into enforcing gates', () => {
  let cwd: string
  const setup = (): string => {
    const dir = mkdtempSync(join(tmpdir(), 'eng-'))
    const a = join(dir, 'src', 'alpha')
    mkdirSync(a, { recursive: true })
    // an atom citing an ENFORCED concern (§5.6.2 modularity → rules/cycle)
    writeFileSync(join(a, 'index.ts'), '/** @standard ISO/IEC 25010:2023 §5.6.2 modularity */\nexport const a = 1\n')
    const b = join(dir, 'src', 'beta')
    mkdirSync(b, { recursive: true })
    // an atom citing an UNENFORCED concern (§5.4 interaction-capability → no gate)
    writeFileSync(join(b, 'index.ts'), '/** @standard ISO/IEC 25010:2023 §5.4 interaction */\nexport const b = 1\n')
    return dir
  }

  it('the concern→gate map declares an enforcing gate for the maintainability concerns', () => {
    const modularity = QUALITY_ENFORCEMENT.find((q) => q.concern === 'modularity')
    expect(modularity?.gate).toBe('rules/cycle')
    expect(QUALITY_ENFORCEMENT.find((q) => q.concern === 'testability')?.gate).toBe('rules/refutable')
    // the reverse-engineer list is exactly the null-gate concerns
    const ungated = QUALITY_ENFORCEMENT.filter((q) => q.gate === null).map((q) => q.concern)
    expect(ungated).toContain('interaction-capability')
    expect(ungated).toContain('compatibility')
  })

  it('citations are COMPUTED from source and marked enforced iff their clause has a gate', () => {
    cwd = setup()
    try {
      const cites = engineeringCitations(cwd)
      const modul = cites.find((c) => c.clause === '§5.6.2')
      const inter = cites.find((c) => c.clause === '§5.4')
      expect(modul?.enforced).toBe(true) // §5.6.2 is gate-enforced
      expect(inter?.enforced).toBe(false) // §5.4 is cited but ungated
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })

  it('conformance names the ungated concerns as the reverse-engineer list', () => {
    cwd = setup()
    try {
      const c = engineeringConformance(cwd)
      expect(c.enforced).toBeLessThan(c.concerns) // not everything is gated yet
      expect(c.reverseEngineer.length).toBe(QUALITY_ENFORCEMENT.filter((q) => q.gate === null).length)
      expect(c.reverseEngineer.some((r) => r.concern === 'interaction-capability')).toBe(true)
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
