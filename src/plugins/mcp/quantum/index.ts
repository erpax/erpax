/**
 * quantum — the exact register (src/utilities/quantum) as an MCP tool. An agent sends a width and a
 * circuit of H, X, Z, CNOT and CCX gates; the tool runs it from |0…0⟩ and returns the exact
 * distribution: each basis state's weight over 2^halvings, as decimal strings (bigints exceed JSON
 * numbers). The width is any number of qubits; the run refuses only when the superposition outgrows
 * the isolate's memory (SUPPORT_LIMIT). Registered through the MCP plugin's top-level `tools`
 * (payloadcms.com/docs/plugins/mcp).
 */
import { defineTool } from '@payloadcms/plugin-mcp'
import { z } from 'zod'

import { distribution, entangled, ket, run, SUPPORT_LIMIT } from '@/utilities/quantum'

const input = z.object({
  qubits: z.number().int().min(1).describe('The register width: any number of qubits.'),
  circuit: z
    .array(z.object({ gate: z.enum(['h', 'x', 'z', 'cnot', 'ccx']), qubits: z.array(z.number().int().min(0)) }))
    .describe('Gates in order: h/x/z take one qubit, cnot control then target, ccx two controls then target.'),
  limit: z.number().int().min(1).max(256).optional().describe('How many of the likeliest basis states to return (default 16).'),
})

/** The run as the tool returns it: exact, with every bigint as a decimal string. */
export const quantumResult = ({ qubits, circuit, limit = 16 }: z.infer<typeof input>) => {
  const r = run(qubits, circuit)
  return {
    qubits: r.qubits,
    halvings: r.halvings,
    denominator: (1n << BigInt(r.halvings)).toString(),
    support: r.amp.size,
    supportLimit: SUPPORT_LIMIT,
    entangledAcrossQubit0: entangled(r, 0),
    states: distribution(r)
      .slice(0, limit)
      .map(({ state, weight }) => ({ ket: ket(r, state), amplitude: (r.amp.get(state) ?? 0n).toString(), weight: weight.toString() })),
  }
}

export const quantumTool = defineTool({
  description:
    'Run a quantum circuit on an exact register (bigint amplitudes, one halving per Hadamard) and return the exact distribution. Any width; limited only by the superposition size the host memory holds.',
  input,
  annotations: { readOnlyHint: true, idempotentHint: true },
}).handler(({ input: args }) => {
  try {
    return { content: [{ type: 'text', text: JSON.stringify(quantumResult(args)) }] }
  } catch (err) {
    return { content: [{ type: 'text', text: err instanceof Error ? err.message : String(err) }], isError: true }
  }
})
