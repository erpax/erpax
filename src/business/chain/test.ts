import { describe, it, expect } from 'vitest'
import {
  BUSINESS_CHAINS,
  BUSINESS_CHAIN_IDS,
  chainsForCollection,
  chainsForFeature,
  type BusinessChain,
  type ChainStep,
} from '@/business/chain'

// business/chain (./index.ts barrel): each canonical workflow is encoded ONCE
// in the registry, traces to a published standard, and carries its Socratic
// check. These assert the registry's structural invariants through the barrel.
describe('business/chain — the registry is the single source of truth', () => {
  it('BUSINESS_CHAIN_IDS exactly enumerates the registry keys', () => {
    expect([...BUSINESS_CHAIN_IDS].sort()).toEqual(Object.keys(BUSINESS_CHAINS).sort())
    expect(BUSINESS_CHAIN_IDS.length).toBeGreaterThanOrEqual(15)
  })

  it('every entry`s id matches its registry key (encoded once, no drift)', () => {
    for (const [key, chain] of Object.entries(BUSINESS_CHAINS)) {
      expect(chain.id).toBe(key)
      expect(chain.id).toBe(chain.id.toUpperCase())
    }
  })

  it('every chain carries a name, standards, steps and a Socratic check', () => {
    for (const chain of Object.values(BUSINESS_CHAINS) as BusinessChain[]) {
      expect(chain.name.length).toBeGreaterThan(0)
      expect(chain.standards.length).toBeGreaterThan(0)
      expect(chain.steps.length).toBeGreaterThan(0)
      expect(typeof chain.socraticCheck.canDo).toBe('boolean')
      expect(['yes', 'partial', 'no']).toContain(chain.socraticCheck.wired)
      expect(chain.seedFile).toMatch(/\.ts$/)
      expect(chain.testFile).toMatch(/\.ts$/)
    }
  })

  it('each step`s `requires` reference events emitted by an EARLIER step in the same chain', () => {
    for (const chain of Object.values(BUSINESS_CHAINS) as BusinessChain[]) {
      const emittedSoFar = new Set<string>()
      for (const step of chain.steps as ChainStep[]) {
        for (const req of step.requires) {
          expect(emittedSoFar.has(req)).toBe(true)
        }
        if (step.emits !== null) emittedSoFar.add(step.emits)
      }
    }
  })

  it('a producer with onCreate never also pins onStatus (mutually exclusive)', () => {
    for (const chain of Object.values(BUSINESS_CHAINS) as BusinessChain[]) {
      for (const step of chain.steps) {
        if (step.producer?.onCreate) expect(step.producer.onStatus).toBeUndefined()
      }
    }
  })

  it('chainsForCollection returns exactly the chains touching that collection', () => {
    // P2P chain step writes the `payments` collection.
    const result = chainsForCollection('payments')
    expect(result.length).toBeGreaterThan(0)
    expect(result.every((c) => c.steps.some((s) => s.collection === 'payments'))).toBe(true)
    expect(result.some((c) => c.id === 'P2P_THREE_WAY_MATCH')).toBe(true)
    expect(chainsForCollection('__no_such_collection__')).toHaveLength(0)
  })

  it('chainsForFeature returns exactly the chains gated by that feature', () => {
    const result = chainsForFeature('period_end_closing')
    expect(result.length).toBeGreaterThan(0)
    expect(result.every((c) => c.featureGate === 'period_end_closing')).toBe(true)
    expect(chainsForFeature('__no_such_feature__')).toHaveLength(0)
  })
})
