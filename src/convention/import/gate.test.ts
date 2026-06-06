import { describe, it, expect } from 'vitest'
// gate.mjs is a plain ESM module; tsc resolves its named exports under the project's
// module settings. The ratchet logic it exports is pure and is what we regression-lock here.
import { importRatchet, IMPORT_PURITY_BASELINE } from './gate.mjs'
import { nonIndexImports } from '@/tamper/import'

describe('convention/import — the import-purity RATCHET (the wire made a gate)', () => {
  it('FAILS when the live non-index count exceeds the baseline (a new deep import)', () => {
    const v = importRatchet({ violations: IMPORT_PURITY_BASELINE + 1, baseline: IMPORT_PURITY_BASELINE })
    expect(v.ok).toBe(false)
    expect(v.reason).toMatch(/above the baseline/)
  })

  it('PASSES at the baseline (the convention held, no regression)', () => {
    const v = importRatchet({ violations: IMPORT_PURITY_BASELINE, baseline: IMPORT_PURITY_BASELINE })
    expect(v.ok).toBe(true)
  })

  it('PASSES below the baseline and asks to ratchet the literal down', () => {
    const v = importRatchet({ violations: IMPORT_PURITY_BASELINE - 1, baseline: IMPORT_PURITY_BASELINE })
    expect(v.ok).toBe(true)
    expect(v.reason).toMatch(/lower IMPORT_PURITY_BASELINE/)
  })

  it('is FAIL-CLOSED on an un-gradeable scan: a non-finite or negative count is NOT a pass', () => {
    expect(importRatchet({ violations: Number.NaN, baseline: IMPORT_PURITY_BASELINE }).ok).toBe(false)
    expect(importRatchet({ violations: Number.POSITIVE_INFINITY, baseline: IMPORT_PURITY_BASELINE }).ok).toBe(false)
    expect(importRatchet({ violations: -1, baseline: IMPORT_PURITY_BASELINE }).ok).toBe(false)
    // a broken baseline literal must also deny
    expect(importRatchet({ violations: 0, baseline: Number.NaN }).ok).toBe(false)
  })

  it('the committed baseline is not below the live non-index count (the gate is green today)', () => {
    // If this fails, either a deep import was added without lowering nothing, or the
    // baseline literal was lowered past reality — both must be reconciled before push.
    expect(IMPORT_PURITY_BASELINE).toBeGreaterThanOrEqual(nonIndexImports().length)
  })
})
