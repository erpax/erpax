import { describe, it, expect } from 'vitest'
import {
  costOfFightingHarmonics,
  harmonyDominates,
  lockInUuid,
  isUuidLocked,
  assertUuidLocked,
} from './harmonics'
import type { AgentDef, ClonedAgent } from './service'

const DEF: AgentDef = { name: 'finance-1', skills: ['/accounting/SKILL'], purpose: 'post journals' }

describe('harmonics — the agent is told the cost of fighting, and locked in uuid', () => {
  it('TAMPER is priced beyond the universe; verify stays O(N); harmony dominates', () => {
    const c = costOfFightingHarmonics({ kind: 'tamper', record: { leafDepth: 6, streamCount: 10, dimensionCount: 10 } })
    expect(c.fight.beyondUniverse).toBe(true)
    expect(c.fight.bits).toBeGreaterThan(800)
    expect(c.harmony.verifyOps).toBe(6) // O(N): one recompute per leaf
    expect(c.harmonyDominates).toBe(true)
  })

  it('PHANTOM leverage nets to zero and OFF-RING is rejected — harmony dominates both', () => {
    expect(harmonyDominates({ kind: 'phantom-leverage' })).toBe(true)
    expect(harmonyDominates({ kind: 'off-ring' })).toBe(true)
    expect(costOfFightingHarmonics({ kind: 'phantom-leverage' }).fight.note).toMatch(/zero|bends/)
  })

  it('LOCK IN UUID: an agent bound to its content-uuid verifies as locked', () => {
    const locked = lockInUuid(DEF)
    expect(typeof locked.uuid).toBe('string')
    expect(isUuidLocked(locked)).toBe(true)
    expect(assertUuidLocked(locked)).toBe(locked) // passes the gate
  })

  it('a tampered agent that kept its old uuid FAILS the lock (the actor is tamper-evident)', () => {
    const locked = lockInUuid(DEF)
    const tampered: ClonedAgent = { ...locked, skills: [...locked.skills, '/evil/SKILL'] } // same uuid, new content
    expect(isUuidLocked(tampered)).toBe(false) // re-derived uuid ≠ stored uuid
    expect(() => assertUuidLocked(tampered)).toThrow(/not uuid-locked/) // suspicious ⇒ may not act
  })
})
