/**
 * horo — a tribe joins the society circle, proved. Green by construction: the
 * team joins as one content-addressed presence, every member is rostered, each
 * move is voiced by the acting member, and the whole tribe steps out together.
 * @see ./horo.ts, src/team/SKILL.md
 */
import { describe, it, expect } from 'vitest'
import { joinHoro } from './horo'
import { connectAgentSociety, roomIdForTenant } from './society'
import type { AgentSociety } from './society'
import { spawnTeam, teamUuid } from '@/services/agent/team'
import type { AgentDef } from '@/services/agent'
import type { AgentContext, AgentRuntime, DomainEvent } from '@/services/agents/types'

const TENANT = 'tenant-horo'
const base: AgentDef = { name: 'base', skills: ['society'], purpose: 'build' }
const tribe = spawnTeam(
  'builders',
  base,
  [
    { name: 'minter', purpose: 'mint atoms', skills: ['generate', 'aura'] },
    { name: 'collapser', purpose: 'collapse nodes', skills: ['collapse', 'types'] },
  ],
  TENANT,
)

const ev: DomainEvent = {
  id: 'society:discovery',
  tenantId: TENANT,
  payload: { target: 'oid' },
  emittedAt: '2026-06-01T00:00:00.000Z',
}

type ConnectOpts = Parameters<typeof connectAgentSociety>[0]
const RUNTIME = {} as unknown as AgentRuntime
const CTX = {} as unknown as AgentContext

/** A fake breath: records how it was opened, every publish, and the close — no socket. */
function fakeBreath() {
  const calls = {
    opts: undefined as ConnectOpts | undefined,
    published: [] as Array<{ ev: DomainEvent; asAgent?: string }>,
    closed: 0,
  }
  const connect = (opts: ConnectOpts): AgentSociety => {
    calls.opts = opts
    return {
      publish: (e, asAgent) => {
        calls.published.push({ ev: e, asAgent })
      },
      close: () => {
        calls.closed += 1
      },
    }
  }
  return { connect, calls }
}

const join = (connect: typeof connectAgentSociety) =>
  joinHoro(tribe, { runtime: RUNTIME, ctx: CTX, tenantId: TENANT, host: 'h', connect })

describe('horo: a tribe joins the society circle — many but one', () => {
  it('joins as ONE content-addressed presence, in the tenant room', () => {
    const { connect, calls } = fakeBreath()
    const horo = join(connect)
    // one breath for the whole tribe, named by its teamUuid, in the per-tenant room
    expect(horo.presence).toBe(teamUuid(tribe, TENANT))
    expect(horo.roomId).toBe(roomIdForTenant(TENANT))
    expect(calls.opts?.agentName).toBe(teamUuid(tribe, TENANT))
    expect(calls.opts?.roomId).toBe(roomIdForTenant(TENANT))
    expect(calls.opts?.tenantId).toBe(TENANT)
  })

  it('rosters every member (distinct purposes preserved)', () => {
    const { connect } = fakeBreath()
    const horo = join(connect)
    expect(horo.members.map((m) => m.name).sort()).toEqual(['collapser', 'minter'])
    expect(new Set(horo.members.map((m) => m.uuid)).size).toBe(2)
  })

  it('voices a move as the specific member who made it — by name OR by uuid', () => {
    const { connect, calls } = fakeBreath()
    const horo = join(connect)
    const minter = horo.members.find((m) => m.name === 'minter')
    expect(minter).toBeDefined()
    horo.publish(ev, 'minter') // by human name
    horo.publish(ev, minter?.uuid) // by content-uuid
    expect(calls.published[0]?.asAgent).toBe(minter?.uuid)
    expect(calls.published[1]?.asAgent).toBe(minter?.uuid)
  })

  it('voices as the team (default breath identity) when no member — or an unknown one — is named', () => {
    const { connect, calls } = fakeBreath()
    const horo = join(connect)
    horo.publish(ev) // unattributed ⇒ the team acted
    horo.publish(ev, 'stranger') // not a member ⇒ the team acted
    expect(calls.published[0]?.asAgent).toBeUndefined()
    expect(calls.published[1]?.asAgent).toBeUndefined()
  })

  it('the whole tribe steps out together on close', () => {
    const { connect, calls } = fakeBreath()
    const horo = join(connect)
    horo.close()
    expect(calls.closed).toBe(1)
  })
})
