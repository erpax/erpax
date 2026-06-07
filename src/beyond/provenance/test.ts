import { describe, it, expect, beforeEach } from 'vitest'
import {
  recordCausalLink,
  getCausalAncestry,
  getProvenance,
  provenanceUuid,
  __resetProvenanceRegistry,
} from '@/beyond/provenance'

beforeEach(() => __resetProvenanceRegistry())

describe('beyond/provenance — the WHY behind every value', () => {
  it('records a causal link and reads it back with a timestamp', () => {
    recordCausalLink({ leafHash: 'C', causedBy: ['A', 'B'], producedBy: 'finance-agent' })
    const prov = getProvenance('C')
    expect(prov).toBeDefined()
    expect(prov!.causalChain).toHaveLength(1)
    expect(prov!.causalChain[0].causedBy).toEqual(['A', 'B'])
    expect(prov!.causalChain[0].producedBy).toBe('finance-agent')
    expect(Number.isNaN(Date.parse(prov!.causalChain[0].atTime))).toBe(false)
  })

  it('appends successive links for the same leaf rather than overwriting', () => {
    recordCausalLink({ leafHash: 'C', causedBy: ['A'], producedBy: 'p1' })
    recordCausalLink({ leafHash: 'C', causedBy: ['B'], producedBy: 'p2' })
    expect(getProvenance('C')!.causalChain).toHaveLength(2)
  })

  it('walks the full transitive ancestry backwards, excluding self', () => {
    recordCausalLink({ leafHash: 'C', causedBy: ['B'], producedBy: 'p' })
    recordCausalLink({ leafHash: 'B', causedBy: ['A'], producedBy: 'p' })
    const ancestry = getCausalAncestry('C')
    expect([...ancestry].sort()).toEqual(['A', 'B'])
    expect(ancestry).not.toContain('C')
  })

  it('terminates on cycles (does not loop forever)', () => {
    recordCausalLink({ leafHash: 'X', causedBy: ['Y'], producedBy: 'p' })
    recordCausalLink({ leafHash: 'Y', causedBy: ['X'], producedBy: 'p' })
    const ancestry = getCausalAncestry('X')
    expect([...ancestry].sort()).toEqual(['Y'])
  })

  it('honours maxDepth — a shallow walk stops early', () => {
    recordCausalLink({ leafHash: 'C', causedBy: ['B'], producedBy: 'p' })
    recordCausalLink({ leafHash: 'B', causedBy: ['A'], producedBy: 'p' })
    // depth 1 stops before any ancestor is recorded; depth 2 reaches B but not A.
    expect(getCausalAncestry('C', 1)).toEqual([])
    expect(getCausalAncestry('C', 2)).toEqual(['B'])
    // a deep-enough walk reaches the full ancestry.
    expect([...getCausalAncestry('C', 10)].sort()).toEqual(['A', 'B'])
  })

  it('preserves the first source across appends', () => {
    recordCausalLink({ leafHash: 'C', causedBy: ['A'], producedBy: 'p', source: 'erp://invoice/1' })
    recordCausalLink({ leafHash: 'C', causedBy: ['B'], producedBy: 'p', source: 'erp://other' })
    expect(getProvenance('C')!.source).toBe('erp://invoice/1')
  })

  it('provenanceUuid is deterministic for the same provenance + tenant', () => {
    recordCausalLink({ leafHash: 'C', causedBy: ['A'], producedBy: 'p' })
    const prov = getProvenance('C')!
    expect(provenanceUuid(prov, 't1')).toBe(provenanceUuid(prov, 't1'))
    expect(provenanceUuid(prov, 't1')).not.toBe(provenanceUuid(prov, 't2'))
  })
})
