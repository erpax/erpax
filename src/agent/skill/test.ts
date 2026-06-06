import { describe, it, expect } from 'vitest'
import { agentSkills, load, has } from '@/agent/skill'

describe('agent/skill — an agent loads skills (competence = union)', () => {
  it('load is idempotent (set union)', () => {
    const a = load(load(agentSkills('claude'), 'merge'), 'merge')
    expect(a.skills.size).toBe(1)
    expect(has(a, 'merge')).toBe(true)
  })
  it('an unloaded skill is not had', () => {
    expect(has(agentSkills('claude', ['a']), 'b')).toBe(false)
  })
})
