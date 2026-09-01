import { describe, it, expect } from 'vitest'
import { agentUuid, cloneAgent, isSameAgent, distinctAgents, type AgentDef } from './index'

const def = (name: string, skills: string[], purpose = 'book invoices'): AgentDef => ({
  name,
  skills,
  purpose,
})

describe('agent/service — an agent IS its content', () => {
  it('an identical clone is the SAME agent, not a copy', () => {
    const a = def('booker', ['post', 'reconcile'])
    expect(agentUuid(a, 't1')).toBe(agentUuid(def('booker', ['post', 'reconcile']), 't1'))
    expect(isSameAgent(a, cloneAgent(a, {}, 't1'), 't1')).toBe(true)
  })

  it('specialising CHANGES the identity — a new skill is a new agent', () => {
    const a = def('booker', ['post'])
    const child = cloneAgent(a, { skills: ['post', 'audit'] }, 't1')
    expect(child.uuid).not.toBe(agentUuid(a, 't1'))
    expect(isSameAgent(a, child, 't1')).toBe(false)
  })

  it('a different tenant is a different agent — identity is tenant-scoped', () => {
    const a = def('booker', ['post'])
    expect(agentUuid(a, 't1')).not.toBe(agentUuid(a, 't2'))
  })

  it('a swarm of identical clones collapses to ONE — replication is self-deduplicating', () => {
    const a = def('booker', ['post'])
    const swarm = [a, { ...a }, { ...a }, def('auditor', ['audit'])]
    expect(distinctAgents(swarm, 't1').length).toBe(2)
  })
})
