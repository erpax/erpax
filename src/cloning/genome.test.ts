/**
 * Tests for genome.ts — the spec corpus + chain registry + agent
 * registry + role profiles + MCP tools collected as one bundle.
 * Slice HHHHHH (TDD).
 */
import { describe, it, expect } from 'vitest'
import { collectGenome, computeGenomeUuid } from '@/cloning/genome'

describe('collectGenome', () => {
  it('returns a structured bundle with all 6 sections', () => {
    const bundle = collectGenome({ tenantId: 'erpax-self' })
    expect(bundle).toMatchObject({
      genomeVersion: '1.0',
      collections: expect.any(Array),
      chains: expect.any(Array),
      agents: expect.any(Array),
      roles: expect.any(Array),
      mcpTools: expect.any(Array),
      standards: expect.any(Array),
    })
  })

  it('collections come from extractCorpus of the live source tree', () => {
    const bundle = collectGenome({ tenantId: 'erpax-self' })
    // We have 100+ collections registered; at minimum the bundle has SOME
    expect(bundle.collections.length).toBeGreaterThan(0)
    // Each collection has a slug
    expect(bundle.collections[0]).toHaveProperty('slug')
  })

  it('chains come from BUSINESS_CHAINS registry', () => {
    const bundle = collectGenome({ tenantId: 'erpax-self' })
    const chainIds = bundle.chains.map((c) => c.id)
    expect(chainIds).toContain('O2C_GOODS')
    expect(chainIds).toContain('R2R_PERIOD_CLOSE')
  })

  it('agents include FinanceAgent + the 14 registered agents', () => {
    const bundle = collectGenome({ tenantId: 'erpax-self' })
    const ids = bundle.agents.map((a) => a.id)
    expect(ids).toContain('finance')
    expect(ids).toContain('sales')
    expect(ids).toContain('meta-skill')
    expect(ids.length).toBeGreaterThanOrEqual(15)
  })

  it('roles include the 4 reference profiles + open-extensible', () => {
    const bundle = collectGenome({ tenantId: 'erpax-self' })
    const roleIds = bundle.roles.map((r) => r.id)
    expect(roleIds).toContain('business')
    expect(roleIds).toContain('payment-provider')
    expect(roleIds).toContain('bank')
    expect(roleIds).toContain('government')
  })

  it('mcpTools include the 16 erpax.* tools shipped in DDDDD/SSSSS/UUUUU', () => {
    const bundle = collectGenome({ tenantId: 'erpax-self' })
    const toolNames = bundle.mcpTools.map((t) => t.name)
    expect(toolNames).toContain('erpax.spec.getCollection')
    expect(toolNames).toContain('erpax.integrity.verifyObject')
    expect(toolNames).toContain('erpax.refs.findDangling')
  })

  it('standards is the deduplicated union across every collection', () => {
    const bundle = collectGenome({ tenantId: 'erpax-self' })
    const seen = new Set(bundle.standards.map((s) => `${s.body}/${s.id}`))
    expect(seen.size).toBe(bundle.standards.length) // no duplicates
  })
})

describe('computeGenomeUuid', () => {
  it('is deterministic — same bundle always hashes the same', () => {
    const b1 = collectGenome({ tenantId: 'erpax-self' })
    const b2 = collectGenome({ tenantId: 'erpax-self' })
    expect(computeGenomeUuid(b1, 'erpax-self')).toBe(computeGenomeUuid(b2, 'erpax-self'))
  })

  it('differs per tenant (tenant-namespace separation)', () => {
    const b = collectGenome({ tenantId: 'tenant-a' })
    expect(computeGenomeUuid(b, 'tenant-a')).not.toBe(computeGenomeUuid(b, 'tenant-b'))
  })

  it('returns a UUIDv8-format string', () => {
    const b = collectGenome({ tenantId: 'erpax-self' })
    expect(computeGenomeUuid(b, 'erpax-self')).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    )
  })
})
