import { describe, it, expect, vi } from 'vitest'
import {
  agentUuid, cloneAgent, isSameAgent, distinctAgents,
  formTeam, teamSkills, shareSkills, teamCovers, basicTeams, isBasicTeam, BASIC_TEAM_SIZES, TEAM_DISCIPLINE,
  createAgentRegistry,
  processEffect, processEffects,
} from '@/agent'

const base = { name: 'alpha', skills: ['finance', 'audit'], purpose: 'invoice lifecycle' }
const tenant = 'tenant-a'

describe('agent', () => {
  // ── agentUuid — content-addressing ───────────────────────────────────────────
  it('identical defs produce the same uuid (clones merge)', () => {
    const a = agentUuid(base, tenant)
    const b = agentUuid({ ...base }, tenant)
    expect(a).toBe(b)
    expect(a).toMatch(/^[0-9a-f-]{36}$/)
  })

  it('skill order does not affect identity', () => {
    const shuffled = { ...base, skills: ['audit', 'finance'] }
    expect(agentUuid(base, tenant)).toBe(agentUuid(shuffled, tenant))
  })

  it('different tenants produce different uuids for the same content', () => {
    expect(agentUuid(base, 'tenant-a')).not.toBe(agentUuid(base, 'tenant-b'))
  })

  it('changed purpose produces a different uuid (distinct child)', () => {
    const child = { ...base, purpose: 'expense approval' }
    expect(agentUuid(base, tenant)).not.toBe(agentUuid(child, tenant))
  })

  // ── cloneAgent + isSameAgent ─────────────────────────────────────────────────
  it('clone with no overrides is the SAME agent (federated presence)', () => {
    const clone = cloneAgent(base, {}, tenant)
    expect(clone.uuid).toBe(agentUuid(base, tenant))
    expect(isSameAgent(base, clone, tenant)).toBe(true)
  })

  it('clone with purpose override is a DISTINCT child', () => {
    const child = cloneAgent(base, { purpose: 'expense' }, tenant)
    expect(child.uuid).not.toBe(agentUuid(base, tenant))
    expect(isSameAgent(base, child, tenant)).toBe(false)
  })

  // ── distinctAgents — swarm dedup ─────────────────────────────────────────────
  it('identical clones collapse to one in a swarm', () => {
    const swarm = [base, { ...base }, { ...base, skills: ['audit', 'finance'] }]
    const result = distinctAgents(swarm, tenant)
    expect(result).toHaveLength(1)
  })

  it('distinct agents are all preserved', () => {
    const beta = { ...base, purpose: 'payroll' }
    const result = distinctAgents([base, beta], tenant)
    expect(result).toHaveLength(2)
  })

  // ── createAgentRegistry ──────────────────────────────────────────────────────
  const agentA = { id: 'finance' as const, ownsCollections: ['invoices'], subscribesTo: ['invoice:created'], emits: [] }
  const agentB = { id: 'sales'   as const, ownsCollections: ['orders'],   subscribesTo: ['invoice:created', 'order:placed'], emits: [] }

  it('byId and byCollection resolve registered agents', () => {
    const reg = createAgentRegistry([agentA, agentB])
    expect(reg.byId('finance')).toBe(agentA)
    expect(reg.byCollection('invoices')).toBe(agentA)
    expect(reg.byId('hr')).toBeUndefined()
    expect(reg.byCollection('unknown')).toBeUndefined()
  })

  it('bySubscribedEvent returns all subscribers for an event', () => {
    const reg = createAgentRegistry([agentA, agentB])
    expect(reg.bySubscribedEvent('invoice:created')).toHaveLength(2)
    expect(reg.bySubscribedEvent('order:placed')).toHaveLength(1)
    expect(reg.bySubscribedEvent('nope')).toHaveLength(0)
  })

  it('duplicate agent id throws', () => {
    expect(() => createAgentRegistry([agentA, { ...agentA }])).toThrow(/duplicate agent id/)
  })

  it('duplicate collection ownership throws', () => {
    const clash = { id: 'sales' as const, ownsCollections: ['invoices'], subscribesTo: [], emits: [] }
    expect(() => createAgentRegistry([agentA, clash])).toThrow(/owned by both/)
  })

  it('all() returns every registered agent', () => {
    const reg = createAgentRegistry([agentA, agentB])
    expect(reg.all()).toHaveLength(2)
  })

  // ── team functions ───────────────────────────────────────────────────────────
  it('teamSkills returns the sorted union of all member skills', () => {
    const team = formTeam('t1', [
      { name: 'a', skills: ['finance', 'audit'], purpose: 'p1' },
      { name: 'b', skills: ['sales', 'audit'],   purpose: 'p2' },
    ], tenant)
    expect(teamSkills(team)).toEqual(['audit', 'finance', 'sales'])
  })

  it('shareSkills loads the full union into every member', () => {
    const team = formTeam('t1', [
      { name: 'a', skills: ['finance'], purpose: 'p1' },
      { name: 'b', skills: ['sales'],   purpose: 'p2' },
    ], tenant)
    const shared = shareSkills(team, tenant)
    for (const m of shared.members) {
      expect(m.skills).toContain('finance')
      expect(m.skills).toContain('sales')
    }
  })

  it('teamCovers reports gaps correctly', () => {
    const team = formTeam('t1', [{ name: 'a', skills: ['finance'], purpose: 'p' }], tenant)
    const cov = teamCovers(team, ['finance', 'sales'])
    expect(cov.complete).toBe(false)
    expect(cov.covered).toEqual(['finance'])
    expect(cov.gaps).toEqual(['sales'])
  })

  // ── basicTeams + BASIC_TEAM_SIZES constants ──────────────────────────────────
  it('basicTeams decomposes sizes into 3/2/1 pieces', () => {
    expect(basicTeams(0)).toEqual([])
    expect(basicTeams(1)).toEqual([1])
    expect(basicTeams(2)).toEqual([2])
    expect(basicTeams(3)).toEqual([3])
    expect(basicTeams(4)).toEqual([3, 1])
    expect(basicTeams(7)).toEqual([3, 3, 1])
  })

  it('BASIC_TEAM_SIZES and TEAM_DISCIPLINE are complete and consistent', () => {
    expect(BASIC_TEAM_SIZES).toEqual([1, 2, 3])
    expect(TEAM_DISCIPLINE[1]).toBe('cave')
    expect(TEAM_DISCIPLINE[2]).toBe('recreational')
    expect(TEAM_DISCIPLINE[3]).toBe('technical')
    for (const s of BASIC_TEAM_SIZES) expect(isBasicTeam(s)).toBe(true)
    expect(isBasicTeam(4)).toBe(false)
  })

  // ── processEffects — mock ctx, no Payload boot ───────────────────────────────
  it('audit effect calls ctx.audit with the leaf', async () => {
    const audit = vi.fn()
    const ctx = { audit, emit: vi.fn(), capture: vi.fn(), call: vi.fn() } as never
    const leaf = { tenantId: tenant, subjectCollection: 'invoices', subjectId: '1', action: 'create' }
    await processEffect({ kind: 'audit', leaf }, ctx)
    expect(audit).toHaveBeenCalledWith(leaf)
  })

  it('emit effect calls ctx.emit with the event', async () => {
    const emit = vi.fn()
    const ctx = { emit, audit: vi.fn(), capture: vi.fn(), call: vi.fn() } as never
    const event = { id: 'invoice:created', tenantId: tenant, payload: {}, emittedAt: new Date().toISOString() }
    await processEffect({ kind: 'emit', event }, ctx)
    expect(emit).toHaveBeenCalledWith(event)
  })

  it('capture effect calls ctx.capture with the frame', async () => {
    const capture = vi.fn()
    const ctx = { capture, emit: vi.fn(), audit: vi.fn(), call: vi.fn() } as never
    const frame = { workflow: 'onboard', stepId: 's1', captionKey: 'step.caption' }
    await processEffect({ kind: 'capture', frame }, ctx)
    expect(capture).toHaveBeenCalledWith(frame)
  })

  it('processEffects runs all effects in order', async () => {
    const calls: string[] = []
    const ctx = {
      emit: vi.fn(() => calls.push('emit')),
      audit: vi.fn(() => calls.push('audit')),
      capture: vi.fn(),
      call: vi.fn(),
    } as never
    const event = { id: 'e', tenantId: tenant, payload: {}, emittedAt: new Date().toISOString() }
    const leaf = { tenantId: tenant, subjectCollection: 'c', subjectId: '2', action: 'update' }
    await processEffects([{ kind: 'emit', event }, { kind: 'audit', leaf }], ctx)
    expect(calls).toEqual(['emit', 'audit'])
  })
})
