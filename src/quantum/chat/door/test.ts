import { describe, expect, it } from 'vitest'
import { startSession } from '@/quantum/chat/routing'
import { chatDoor } from './index'

describe('quantum/chat/door — MCP areas from the chat', () => {
  it('the default door is the Bell state, and the session line carries the integers', async () => {
    const s = startSession('bell')
    const turn = await chatDoor(s)
    expect(turn.tool).toBe('erpax.quantum.bell')
    expect(turn.result.amplitudes).toEqual(['1', '0', '0', '1'])
    expect(turn.result.determinant).toBe('1')
    expect(turn.line).toBe('quantum.bell[amplitudes=[1,0,0,1]|halvings=1|normalised=true|support=0,3]')
    expect(turn.session.messageUuids).toHaveLength(s.messageUuids.length + 1)
    expect(turn.session.thread).not.toBe(s.thread)
  })

  it('shots is enumerated through the same door — [0,3,0,3] for two rounds', async () => {
    const turn = await chatDoor(startSession('shots'), {
      door: 'shots',
      args: { qubits: 2, gates: [{ name: 'h', q: 0 }, { name: 'cnot', c: 0, t: 1 }], rounds: 2 },
    })
    expect(turn.result.outcomes).toEqual([0, 3, 0, 3])
    expect(turn.line).toContain('sampled=false')
    expect(turn.line).toContain('outcomes=0,3,0,3')
  })

  it('run refuses a gate on a qubit the register does not have — nothing folds into the session', async () => {
    const s = startSession('run')
    await expect(chatDoor(s, { door: 'run', args: { qubits: 1, gates: [{ name: 'cnot', c: 0, t: 1 }] } })).rejects.toThrow(/qubit 1/)
    expect(s.messageUuids).toHaveLength(1)
  })

  it('the gate area opens from the same door: a refused cross folds nothing, and names the measured laws', async () => {
    const s = startSession('gate')
    await expect(chatDoor(s, { area: 'gate', door: 'cross', args: { a: 'copy', b: 'telepathy' } })).rejects.toThrow(/measured laws are copy, cycle/)
    await expect(chatDoor(s, { area: 'gate', door: 'nowhere' })).rejects.toThrow(/no door erpax.gate.nowhere/)
    expect(s.messageUuids).toHaveLength(1)
  })
})
