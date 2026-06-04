import { describe, it, expect } from 'vitest'
import { agentUuid, cloneAgent, isSameAgent, distinctAgents, type AgentDef } from '@/agent/service'

const a: AgentDef = { name: 'auditor', skills: ['anti-corruption', 'perspective', 'standard'], purpose: 'detect fraud' }

describe('agent — cloning is content-addressing (the self/merge law)', () => {
  it('an identical clone has the IDENTICAL uuid — it is the SAME agent, not a copy', () => {
    expect(cloneAgent(a).uuid).toBe(agentUuid(a))
    expect(isSameAgent(a, cloneAgent(a))).toBe(true)
  })

  it('skill ORDER does not change identity (canonical sort) — true clones still merge', () => {
    expect(isSameAgent(a, { ...a, skills: ['standard', 'anti-corruption', 'perspective'] })).toBe(true)
  })

  it('a SPECIALISED clone (changed content) is a distinct child with a new uuid', () => {
    const child = cloneAgent(a, { purpose: 'detect procurement fraud only', skills: [...a.skills, 'aml'] })
    expect(child.uuid).not.toBe(agentUuid(a))
  })

  it('a swarm of identical clones collapses to ONE — replication is self-deduplicating', () => {
    expect(distinctAgents([a, cloneAgent(a), cloneAgent(a), cloneAgent(a)])).toHaveLength(1)
  })

  it('a swarm of differently-purposed agents stays distinct', () => {
    const swarm = [a, { ...a, purpose: 'p2' }, { ...a, purpose: 'p3' }]
    expect(distinctAgents(swarm)).toHaveLength(3)
  })
})
