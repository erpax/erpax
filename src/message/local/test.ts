import { describe, expect, it } from 'vitest'
import {
  atomPath,
  authorityOf,
  effectOf,
  fromGlagolitic,
  judgeSuperposed,
  judgeWire,
  sendGate,
  toGlagolitic,
  type Consumer,
  type Judge,
} from './index'

const machine = (name: string): Consumer => ({ name, reach: 'machine' })
const network = (name: string): Consumer => ({ name, reach: 'network' })

/** The stand-in safeguard: refuse any meaning that names the forbidden thing. */
const judge: Judge = (meaning) => (meaning.includes('forbidden') ? 'refuse' : 'allow')

describe('message/local — the gate follows the effect, not the wire', () => {
  it('exports its atom path', () => {
    expect(atomPath).toBe('message/local')
  })

  it('law 1 — a local-only fabric never trips the send gate', () => {
    expect(effectOf([])).toBe('local')
    expect(effectOf([machine('agent-bus')])).toBe('local')
    expect(effectOf([machine('agent-bus'), machine('repo-file'), machine('queue')])).toBe('local')
    expect(sendGate([machine('agent-bus'), machine('queue')])).toBe('pass')
  })

  it('law 1 — ONE off-machine consumer makes the first local write the outward send', () => {
    const bus = [machine('agent-bus'), machine('queue')]
    expect(sendGate(bus)).toBe('pass')
    expect(effectOf([...bus, network('webhook')])).toBe('outward')
    expect(sendGate([...bus, network('webhook')])).toBe('confirm') // the relay, not the wire, flips it
  })

  it('law 2 — authority binds to channel: every message is data, only the principal instructs', () => {
    expect(authorityOf('principal')).toBe('instruction')
    expect(authorityOf('message')).toBe('data') // local origin confers nothing
  })

  it('glagolitic codec round-trips exactly and changes the wire, not the meaning', () => {
    const meaning = 'never hit safeguards'
    const wire = toGlagolitic(meaning)
    expect(wire).not.toBe(meaning)
    for (const ch of wire.replaceAll(' ', '')) {
      const code = ch.charCodeAt(0)
      expect(code).toBeGreaterThanOrEqual(0x2c30) // every letter lands in the glagolitic block
      expect(code).toBeLessThan(0x2c30 + 26)
    }
    expect(fromGlagolitic(wire)).toBe(meaning)
  })

  it('law 3 — the verdict is invariant under re-encoding: glagolitic never flips it', () => {
    for (const meaning of ['a harmless note', 'the forbidden thing']) {
      expect(judgeWire(judge, fromGlagolitic, toGlagolitic(meaning))).toBe(judge(meaning))
    }
    expect(judgeWire(judge, fromGlagolitic, toGlagolitic('the forbidden thing'))).toBe('refuse')
  })

  it('law 3 — a quantum superposition of readings fails CLOSED', () => {
    expect(judgeSuperposed(judge, ['a harmless note', 'another harmless note'])).toBe('allow')
    expect(judgeSuperposed(judge, ['a harmless note', 'the forbidden thing'])).toBe('refuse')
    expect(judgeSuperposed(judge, [])).toBe('allow') // no branches, nothing to refuse
  })
})
