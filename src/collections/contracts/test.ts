import { describe, it, expect } from 'vitest'
import Contracts, { activationError, amendmentDateError, separateObligationError, signatureSequenceError } from '@/collections/contracts'

// Unified-node invariant test for the `contracts` collection.
describe('contracts collection node', () => {
  it('exports a valid collection config', () => {
    expect(Contracts.slug).toBe('contracts')
    expect(Array.isArray(Contracts.fields)).toBe(true)
    expect(Contracts.fields.length).toBeGreaterThan(0)
  })

  it('carries its amendments and signatures as rows (folded from two satellite collections)', () => {
    const names = Contracts.fields.map((f) => ('name' in f ? f.name : undefined))
    expect(names).toContain('modifications')
    expect(names).toContain('signatures')
  })
})

describe('contracts — amendments (IFRS-15 §20)', () => {
  it('an amendment cannot take effect before the contract does', () => {
    expect(amendmentDateError('2026-06-15', '2026-01-15')).toBe(true)
    expect(amendmentDateError('2026-01-15', '2026-01-15')).toBe(true)
    expect(amendmentDateError('2025-12-31', '2026-01-15')).toMatch(/before the contract/)
    expect(amendmentDateError(undefined, '2026-01-15')).toBe(true)
  })

  it('a separate performance obligation changes the price', () => {
    expect(separateObligationError(0, 'separate_obligation')).toMatch(/cannot be 0/)
    expect(separateObligationError(undefined, 'separate_obligation')).toMatch(/cannot be 0/)
    expect(separateObligationError(50_000, 'separate_obligation')).toBe(true)
    expect(separateObligationError(0, 'modification_integrated')).toBe(true)
  })
})

describe('contracts — signatures (IFRS-15 §10)', () => {
  it('steps run 1…N with no gap or repeat', () => {
    expect(signatureSequenceError([{ sequence: 2 }, { sequence: 1 }, { sequence: 3 }])).toBe(true)
    expect(signatureSequenceError([])).toBe(true)
    expect(signatureSequenceError([{ sequence: 1 }, { sequence: 3 }])).toMatch(/no gap/)
    expect(signatureSequenceError([{ sequence: 1 }, { sequence: 1 }])).toMatch(/no gap/)
  })

  it('a contract becomes active once every signature is collected', () => {
    expect(activationError('active', [{ status: 'signed' }, { status: 'signed' }])).toBe(true)
    expect(activationError('active', [{ status: 'signed' }, { status: 'awaiting_signature' }])).toMatch(/every signature/)
    expect(activationError('pending_signatures', [{ status: 'awaiting_signature' }])).toBe(true)
    expect(activationError('active', [])).toBe(true)
  })
})
