/**
 * The quantum MCP tool: the register's run, exact, with bigints as decimal strings.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 */
import { describe, expect, it } from 'vitest'

import { quantumResult, quantumTool } from '@/plugins/mcp/quantum'

describe('plugins/mcp/quantum', () => {
  it('returns the Bell state exactly', () => {
    const out = quantumResult({ qubits: 2, circuit: [{ gate: 'h', qubits: [0] }, { gate: 'cnot', qubits: [0, 1] }] })
    expect(out).toMatchObject({ qubits: 2, halvings: 1, denominator: '2', support: 2, entangledAcrossQubit0: true })
    expect(out.states).toEqual([
      { ket: '|00⟩', amplitude: '1', weight: '1' },
      { ket: '|11⟩', amplitude: '1', weight: '1' },
    ])
  })

  it('reports a refused run as an MCP error, not a thrown one', async () => {
    const res = await quantumTool.handler({ input: { qubits: 1, circuit: [{ gate: 'x', qubits: [3] }] } } as never)
    expect(res.isError).toBe(true)
    expect(JSON.stringify(res.content)).toMatch(/outside/)
  })
})
