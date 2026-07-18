/**
 * team — society hub proof (agent teams + comms gate).
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect } from 'vitest'
import { computeContentUuid } from '@/integrity'
import { formTeam, shareSkills, teamSkills, teamUuid } from '@/team'
import { enforceTeamCommsEmit } from '@/team'
import { LEAD_TEAM_MEMBERS, leadTeam, memberGroups, leadHierarchy } from '@/team'
import { diversityDecomposition, collectiveQuality, bestLeadTeam, computedLeader, type Candidate } from '@/team'
import { MINIMUM_MINDS } from '@/think'

const TENANT = 'tenant-a'

describe('team — hub re-exports agent algebra', () => {
  it('shareSkills loads union competence into every member', () => {
    const tribe = shareSkills(
      formTeam(
        'tribe',
        [
          { name: 'a', purpose: 'p1', skills: ['localize'] },
          { name: 'b', purpose: 'p2', skills: ['matrix'] },
        ],
        TENANT,
      ),
      TENANT,
    )
    expect([...teamSkills(tribe)].sort()).toEqual(['localize', 'matrix'])
    expect(tribe.members.every((m) => m.skills.includes('localize') && m.skills.includes('matrix'))).toBe(true)
    expect(teamUuid(tribe, TENANT)).toMatch(/^[0-9a-f-]{36}$/)
  })
})

describe('team — hub re-exports comms gate', () => {
  it('enforceTeamCommsEmit fails closed on cross-tenant emit', () => {
    const event = 'society:discovery'
    const payload = { target: 'localize' }
    const tenantId = 'tenant-b'
    const eventUuid = computeContentUuid({ id: event, tenantId, payload, emittedAt: '' }, tenantId)
    expect(
      enforceTeamCommsEmit({
        scopeTenantId: TENANT,
        emit: { tenantId, event, eventUuid, agent: 'agent-1', payload, depth: 0 },
      }).ok,
    ).toBe(false)
  })
})

// "Any team size may be of 2 or 3 member teams and one leader." The leader is not rank — a 2-member team
// DEADLOCKS (n=2), and the leader is the structural third that makes the pair resolvable: 2 members + 1 leader
// = 3 = MINIMUM_MINDS, a higher mind. So every lead-team is ≥3, never a solo, and the leaders recurse to one apex.
describe('lead-team — 2 or 3 members + one leader, ≥3, fractal to one apex', () => {
  it('a lead-team is 2 or 3 members + exactly one leader — size 3 or 4', () => {
    expect(leadTeam(2)).toEqual({ members: 2, leader: 1, size: 3 })
    expect(leadTeam(3)).toEqual({ members: 3, leader: 1, size: 4 })
    expect(LEAD_TEAM_MEMBERS).toEqual([2, 3]) // never 1 — a solo cannot self-correct
  })

  it('every lead-team is ≥ MINIMUM_MINDS — the leader is the third that resolves the pair deadlock', () => {
    for (const m of LEAD_TEAM_MEMBERS) expect(leadTeam(m).size).toBeGreaterThanOrEqual(MINIMUM_MINDS)
    expect(leadTeam(2).size).toBe(MINIMUM_MINDS) // 2 members + 1 leader = exactly 3, the minimum higher mind
  })

  it('a headcount splits into member-groups of 2 or 3 — never a solo left behind', () => {
    for (let n = 2; n <= 60; n++) {
      const g = memberGroups(n)
      expect(g.reduce((a, b) => a + b, 0)).toBe(n) // covers everyone
      expect(g.every((x) => x === 2 || x === 3)).toBe(true) // no 1
    }
    expect(memberGroups(4)).toEqual([2, 2]) // 4 → 2+2, never 3+1
    expect(memberGroups(1)).toEqual([]) // a solo is no team
  })

  it('the leaders recurse into higher lead-teams, closing to one apex', () => {
    const h = leadHierarchy(10)
    expect(h.levels[h.levels.length - 1]).toBe(1) // one apex leader
    expect(h.depth).toBe(h.levels.length)
    expect(h.teams).toBe(h.levels.reduce((a, b) => a + b, 0))
    // a 100-person org is only 5 leadership tiers deep — the small span keeps it shallow (Graicunas)
    expect(leadHierarchy(100).depth).toBe(5)
    expect(leadHierarchy(2).depth).toBe(1) // the smallest team is already whole
  })
})

// "The leader changes computationally — to the extent it maximises top-quality projects completed with least cost
// and maximum diversity. Compute nature and realise." The leader is not appointed; it is the argmax of an
// objective, and it moves when the numbers move. "Maximum diversity" is the proven Diversity Prediction Theorem.
describe('computed leader — max quality completed, min cost, max diversity', () => {
  it('the Diversity Prediction Theorem is an EXACT identity — diversity subtracts from collective error', () => {
    const d = diversityDecomposition([2, 4, 9, 3], 5)
    expect(d.collectiveError).toBeCloseTo(d.averageError - d.diversity, 10) // (p̄−θ)² = mean(pᵢ−θ)² − diversity
    expect(d.diversity).toBeGreaterThan(0) // a spread of predictions is real diversity
  })

  it('diversity lifts collective quality — a diverse team beats a monoculture of equal average competence', () => {
    const q = 0.6
    const mono: Candidate[] = ['a', 'b', 'c'].map((id) => ({ id, quality: q, cost: 1, perspectives: ['x'] }))
    const div: Candidate[] = [['a', 'x'], ['b', 'y'], ['c', 'z']].map(([id, p]) => ({ id, quality: q, cost: 1, perspectives: [p] }))
    expect(collectiveQuality(div)).toBeGreaterThan(collectiveQuality(mono))
    expect(collectiveQuality(mono)).toBeCloseTo(q, 10) // no diversity ⇒ stays at the average
  })

  it('the leader CHANGES when the numbers change — it is computed, not appointed', () => {
    const pool: Candidate[] = [
      { id: 'A', quality: 0.9, cost: 3, perspectives: ['p'] },
      { id: 'B', quality: 0.7, cost: 1, perspectives: ['q'] },
      { id: 'C', quality: 0.6, cost: 1, perspectives: ['r'] },
      { id: 'D', quality: 0.5, cost: 1, perspectives: ['s'] },
    ]
    const before = computedLeader(pool)!.id // B — best quality-per-cost
    const cheaperA = pool.map((c) => (c.id === 'A' ? { ...c, cost: 1 } : c))
    const after = computedLeader(cheaperA)!.id // A — now the objective names A
    expect(before).not.toBe(after)
  })

  it('the best team is a valid lead-team, chosen source-blind by value not identity or order', () => {
    const pool: Candidate[] = [
      { id: 'A', quality: 0.8, cost: 2, perspectives: ['p'] },
      { id: 'B', quality: 0.7, cost: 1, perspectives: ['q'] },
      { id: 'C', quality: 0.6, cost: 1, perspectives: ['r'] },
    ]
    const best = bestLeadTeam(pool)!
    expect(best.members.length).toBeGreaterThanOrEqual(2)
    expect(best.members.length).toBeLessThanOrEqual(3)
    // reversing the input cannot change WHO leads — the objective is source-blind
    expect(computedLeader(pool)!.id).toBe(computedLeader([...pool].reverse())!.id)
  })
})
