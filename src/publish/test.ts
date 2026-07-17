import { describe, it, expect } from 'vitest'
import { publish, type GitRunner, type PublishOrder } from './index'
import type { GateVerdict } from '@/decide'

const V = (gate: string, pass: boolean): GateVerdict => ({ gate, pass })

// A recording git — proves WHAT the agent did without a real repo (the decision is the theorem, git is injected).
const recorder = () => {
  const calls: string[] = []
  const git: GitRunner = {
    add: (paths) => calls.push('add:' + paths.join(',')),
    commit: (m) => (calls.push('commit:' + m), 'sha-1'),
    push: () => calls.push('push'),
  }
  return { git, calls }
}

const order = (over: Partial<PublishOrder> = {}): PublishOrder => ({
  paths: ['src/x/index.ts'],
  message: 'feat(x): thing',
  commitVerdicts: [V('trinity', true), V('dead-links', true)],
  securityLanes: [V('tamper-cost', true), V('quantum-leak', true)],
  standardsLanes: [V('standards', true), V('load', true)],
  ...over,
})

describe('publish — the trained agent automates commit and push, fail-closed', () => {
  it('fully green → commits AND pushes, in order', () => {
    const { git, calls } = recorder()
    const r = publish(order(), git)
    expect(r.outcome).toBe('pushed')
    expect(calls).toEqual(['add:src/x/index.ts', 'commit:feat(x): thing', 'push']) // add → commit → push
    expect(r.sha).toBe('sha-1')
  })

  it('a blocked COMMIT refuses everything — nothing is committed, nothing pushed', () => {
    const { git, calls } = recorder()
    const r = publish(order({ commitVerdicts: [V('trinity', false)] }), git)
    expect(r.outcome).toBe('refused')
    expect(calls).toEqual([]) // git never touched
    expect(r.commit.by).toBe('trinity') // the axis that said no
  })

  it('commit warranted but a SECURITY lane red → commits, REFUSES the push', () => {
    const { git, calls } = recorder()
    const r = publish(order({ securityLanes: [V('tamper-cost', false)] }), git)
    expect(r.outcome).toBe('committed')
    expect(calls).toEqual(['add:src/x/index.ts', 'commit:feat(x): thing']) // no push
    expect(r.push.warranted).toBe(false)
    expect(r.push.blockers).toContain('tamper-cost') // quantum security decided no
  })

  it('a STANDARDS lane red also blocks the push — trained on the standards too', () => {
    const { git, calls } = recorder()
    const r = publish(order({ standardsLanes: [V('standards', false), V('load', true)] }), git)
    expect(r.outcome).toBe('committed')
    expect(calls).not.toContain('push')
    expect(r.push.blockers).toContain('standards')
  })

  // The training is the whole point: an agent with NOTHING to be trained on cannot push.
  it('UNTRAINED — no security or standards lane → commits but cannot push (nothing to be trained on)', () => {
    const { git, calls } = recorder()
    const r = publish(order({ securityLanes: [], standardsLanes: [] }), git)
    expect(r.outcome).toBe('committed') // the write-time seal still lets it commit
    expect(r.push.warranted).toBe(false) // but push has no lane to warrant it — fail-closed
    expect(calls).not.toContain('push')
  })

  it('emits a tamper-evident receipt — chained to the prior, so the automation cannot be re-ordered', () => {
    const { git } = recorder()
    const first = publish(order(), git)
    const second = publish(order({ message: 'feat(x): next', priorLeaf: first.leaf }), git)
    expect(first.leaf).toMatch(/^[0-9a-f-]{36}$/)
    expect(second.leaf).not.toBe(first.leaf) // a distinct act, folded onto the first
    // deterministic: same act + same prior ⇒ same leaf (content-addressed, no clock)
    const { git: g2 } = recorder()
    const replay = publish(order({ message: 'feat(x): next', priorLeaf: first.leaf }), g2)
    expect(replay.leaf).toBe(second.leaf)
  })

  it('push ⊇ commit — a pushed outcome means the commit was warranted too', () => {
    const { git } = recorder()
    const r = publish(order(), git)
    if (r.outcome === 'pushed') expect(r.commit.warranted).toBe(true)
  })
})
