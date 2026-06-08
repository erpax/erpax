/**
 * team — society hub proof (agent teams + comms gate).
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect } from 'vitest'
import { computeContentUuid } from '@/integrity'
import { formTeam, shareSkills, teamSkills, teamUuid } from '@/team'
import { enforceTeamCommsEmit } from '@/team'

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
