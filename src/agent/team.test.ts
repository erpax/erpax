/**
 * team — agents sharing skills, proved. Green by construction: competence is
 * the union, spawn fans out while every member holds the whole, identical
 * teams/members merge. @see ./team.ts, src/team/SKILL.md
 */
import { describe, it, expect } from 'vitest'
import {
  formTeam, teamSkills, shareSkills, spawnTeam, teamCovers, mergeTeams, teamUuid,
  BASIC_TEAM_SIZES, TEAM_DISCIPLINE, isBasicTeam, basicTeams, teamGrouping,
} from './team'
import type { AgentDef } from './service'

const TENANT = 'tenant-team'
const A: AgentDef = { name: 'a', skills: ['accounting', 'tax'], purpose: 'book' }
const B: AgentDef = { name: 'b', skills: ['tax', 'commerce'], purpose: 'sell' }

describe('team: competence is the union of shared skills', () => {
  it('teamSkills is the sorted, deduped union', () => {
    expect(teamSkills(formTeam('t1', [A, B], TENANT))).toEqual(['accounting', 'commerce', 'tax'])
  })
  it('shareSkills loads the union into every member, purposes preserved', () => {
    const t = shareSkills(formTeam('t1', [A, B], TENANT), TENANT)
    const union = ['accounting', 'commerce', 'tax']
    for (const m of t.members) expect([...m.skills].sort()).toEqual(union)
    expect(t.members).toHaveLength(2) // distinct purposes ⇒ not merged
    expect(t.members.map((m) => m.purpose).sort()).toEqual(['book', 'sell'])
  })
})

describe('team: spawn fans out, every member holds full competence', () => {
  const base: AgentDef = { name: 'base', skills: ['society'], purpose: 'build' }
  const team = spawnTeam(
    'builders',
    base,
    [
      { name: 'minter', purpose: 'mint atoms', skills: ['generate', 'aura'] },
      { name: 'collapser', purpose: 'collapse nodes', skills: ['collapse', 'types'] },
    ],
    TENANT,
  )
  it('each member holds the union of all specialisations', () => {
    const union = ['aura', 'collapse', 'generate', 'types']
    for (const m of team.members) expect([...m.skills].sort()).toEqual(union)
  })
  it('members stay distinct (purpose-specialised)', () => {
    expect(team.members).toHaveLength(2)
    expect(new Set(team.members.map((m) => m.uuid)).size).toBe(2)
  })
  it('the team covers a required skill-set and reports gaps', () => {
    expect(teamCovers(team, ['generate', 'collapse']).complete).toBe(true)
    const cov = teamCovers(team, ['generate', 'tax'])
    expect(cov.complete).toBe(false)
    expect(cov.gaps).toEqual(['tax'])
  })
})

describe('team: federation — identical teams/members merge', () => {
  it('formTeam dedups identical agents (swarm → distinct)', () => {
    expect(formTeam('t', [A, A, A], TENANT).members).toHaveLength(1)
  })
  it('mergeTeams unions membership; identical clones collapse', () => {
    const m = mergeTeams(formTeam('t', [A], TENANT), formTeam('t', [A, B], TENANT), TENANT)
    expect(m.members).toHaveLength(2)
  })
  it('teamUuid is content-addressed — order-independent, id-sensitive', () => {
    expect(teamUuid(formTeam('t', [A, B], TENANT), TENANT)).toBe(teamUuid(formTeam('t', [B, A], TENANT), TENANT))
    expect(teamUuid(formTeam('other', [A, B], TENANT), TENANT)).not.toBe(teamUuid(formTeam('t', [A, B], TENANT), TENANT))
  })
})

describe('team: the {1,2,3} basic-team basis (cave·recreational·technical = self·duality·trinity)', () => {
  it('only 1·2·3 are basic; each maps to its diving discipline', () => {
    expect(BASIC_TEAM_SIZES).toEqual([1, 2, 3])
    expect([1, 2, 3].every(isBasicTeam)).toBe(true)
    expect(isBasicTeam(4)).toBe(false)
    expect(isBasicTeam(0)).toBe(false)
    expect(TEAM_DISCIPLINE[1]).toBe('cave') // solo — self
    expect(TEAM_DISCIPLINE[2]).toBe('recreational') // buddy — duality
    expect(TEAM_DISCIPLINE[3]).toBe('technical') // team of three — trinity
  })

  it('decomposes any larger team into a trinity-dense group of basic teams', () => {
    expect(basicTeams(1)).toEqual([1])
    expect(basicTeams(2)).toEqual([2])
    expect(basicTeams(3)).toEqual([3])
    expect(basicTeams(4)).toEqual([3, 1])
    expect(basicTeams(5)).toEqual([3, 2])
    expect(basicTeams(6)).toEqual([3, 3]) // 1+2+3 = 1·2·3 = 6
    expect(basicTeams(7)).toEqual([3, 3, 1])
    expect(basicTeams(0)).toEqual([])
    expect(basicTeams(-2)).toEqual([])
    expect(basicTeams(2.5)).toEqual([])
  })

  it('every decomposition conserves the size and uses only basic parts', () => {
    for (let n = 1; n <= 40; n++) {
      const parts = basicTeams(n)
      expect(parts.reduce((s, p) => s + p, 0)).toBe(n) // conserved
      expect(parts.every(isBasicTeam)).toBe(true) // only {1,2,3}
    }
  })

  it('teamGrouping covers a real team by its distinct member count', () => {
    const members = Array.from({ length: 5 }, (_, i) => ({ name: `m${i}`, skills: [`s${i}`], purpose: `p${i}` }))
    expect(teamGrouping(formTeam('big', members, TENANT))).toEqual([3, 2]) // 5 members → 3 + 2
  })
})
