/**
 * MCP tools over [[quantum]]/register — the exact-amplitude register, callable from any agent.
 *
 * Every tool here is a PURE COMPUTATION over arguments the caller supplies: none reads a tenant's
 * rows, so none asserts a tenant. Amplitudes cross the wire as decimal strings because they are
 * bigints — JSON has no integer wider than 2^53 and a Float would be the defect this atom exists to
 * refuse. Shots are ENUMERATED, never sampled, so a reply is an audit record anyone recomputes.
 *
 * @see /src/quantum/register/index.ts
 */
import { z } from 'zod'
import { makeToolI18n, type LocalizedString } from '@/agents/mcp/i18n'
import type { ErpaxMcpTool } from '@/agents/mcp/tool-defs'
import {
  type Gate,
  type Register,
  bell,
  entangled,
  ghz,
  isProductAt,
  normalised,
  register,
  run,
  shots,
  support,
  total,
  weights,
} from '@/quantum/register'

const json = (v: unknown) => ({ content: [{ text: JSON.stringify(v, null, 2), type: 'text' as const }] })

const I18N: Record<string, LocalizedString> = {
  run: {
    en: 'Run a circuit on an exact-amplitude register (basis h · x · z · cnot · swap). Amplitudes are INTEGERS scaled by √2 per Hadamard, so Σ amp² = 2^halvings is an identity, never a tolerance; qubit q is bit (1<<q) of the basis index. Returns amplitudes (as decimal strings), halvings, weights, support, normalised, and whether each qubit is entangled with the rest (every 2×2 minor across its cut). Dense 2^n — a proof instrument for small n, not a simulator.',
    bg: 'Изпълнява схема върху регистър с точни целочислени амплитуди (h · x · z · cnot · swap). Σ amp² = 2^halvings е тъждество, не толеранс.',
    de: 'Führt eine Schaltung auf einem Register mit exakten ganzzahligen Amplituden aus (h · x · z · cnot · swap). Σ amp² = 2^halvings ist eine Identität, keine Toleranz.',
  },
  bell: {
    en: 'The Bell state |00⟩+|11⟩ by H₀ then CNOT₀₁ — amplitudes [1,0,0,1], one halving, support {0,3} — or GHZ on n qubits. Entanglement is witnessed by the determinant a₀a₃ − a₁a₂ ≠ 0 (a product state has rank 1), NOT by computational-basis parity, which an equal classical mixture reproduces. Pass `qubits` > 2 for GHZ.',
    bg: 'Състояние на Бел |00⟩+|11⟩ чрез H₀ и CNOT₀₁ — амплитуди [1,0,0,1]; свидетел за заплитане е детерминантата a₀a₃ − a₁a₂ ≠ 0. qubits > 2 дава GHZ.',
    de: 'Der Bell-Zustand |00⟩+|11⟩ durch H₀ dann CNOT₀₁ — Amplituden [1,0,0,1]; Verschränkung bezeugt die Determinante a₀a₃ − a₁a₂ ≠ 0. qubits > 2 ergibt GHZ.',
  },
  orbit: {
    en: 'Every superposition the basis h · x · z · cnot · swap can reach from |0…0⟩, enumerated to a FIXPOINT — the real Clifford orbit is finite. For two qubits: the 4 × 4 double torus of product states (each qubit on its ring) and the entangled states off it, each named by its canonical integer vector, plus every referrer of the register with the standards it cites — the perspectives each state is cross-checked from. `receipt` is toUuid over the sorted state keys.',
    bg: 'Всяка суперпозиция, достижима от базиса h · x · z · cnot · swap, изброена до неподвижна точка. За два кубита: двойният тор 4 × 4 от продуктови състояния и заплетените извън него, плюс всеки референт на регистъра със стандартите, които цитира.',
    de: 'Jede Superposition, die die Basis h · x · z · cnot · swap erreicht, bis zum Fixpunkt aufgezählt. Für zwei Qubits: der 4 × 4 Doppeltorus der Produktzustände und die verschränkten Zustände außerhalb, plus jeder Referrer des Registers mit den Standards, die er zitiert.',
  },
  shots: {
    en: 'Measure a circuit by ENUMERATION, never sampling: one round lists every supported basis index repeated by its integer Born weight, in index order, and `rounds` repeats it. Bell for 4 rounds is [0,3,0,3,0,3,0,3]. No random number enters, so the counts ARE the weights and the list is an audit record, not a draw to be trusted.',
    bg: 'Измерва схема чрез ИЗБРОЯВАНЕ, не чрез извадка: всеки поддържан индекс се повтаря според целочислената си тежест; rounds повтаря кръга. Нищо случайно не влиза.',
    de: 'Misst eine Schaltung durch AUFZÄHLUNG, nie durch Stichprobe: jeder getragene Index wird gemäß seinem ganzzahligen Gewicht wiederholt; rounds wiederholt die Runde. Nichts Zufälliges geht ein.',
  },
}

const GATE = z.discriminatedUnion('name', [
  z.object({ name: z.literal('h'), q: z.number().int().min(0) }),
  z.object({ name: z.literal('x'), q: z.number().int().min(0) }),
  z.object({ name: z.literal('z'), q: z.number().int().min(0) }),
  z.object({ name: z.literal('cnot'), c: z.number().int().min(0), t: z.number().int().min(0) }),
  z.object({ name: z.literal('swap'), a: z.number().int().min(0), b: z.number().int().min(0) }),
])

/** The register, serialised: bigints become decimal strings, and the identity is reported as a fact. */
export function describeRegister(r: Register): Record<string, unknown> {
  const qubits = Array.from({ length: r.qubits }, (_, q) => q)
  return {
    qubits: r.qubits,
    dim: r.amplitudes.length,
    amplitudes: r.amplitudes.map(String),
    halvings: r.halvings,
    total: String(total(r)),
    weights: weights(r).map(String),
    support: support(r),
    normalised: normalised(r),
    entangled: qubits.map((q) => ({ qubit: q, entangled: entangled(r, q), product: isProductAt(r, q) })),
    device: 'exact-amplitudes',
  }
}

const MAX_QUBITS = 10 // 2^10 bigints over the wire is the honest ceiling for a dense register

export function buildQuantumTools(): ReadonlyArray<ErpaxMcpTool> {
  const t = makeToolI18n('erpax.quantum.register')
  const circuit = (qubits: number, gates: readonly Gate[]): Register => {
    if (qubits < 1 || qubits > MAX_QUBITS) throw new Error(`erpax.quantum: ${qubits} qubits — the dense register serves 1..${MAX_QUBITS}`)
    for (const g of gates) {
      const touched = g.name === 'cnot' ? [g.c, g.t] : g.name === 'swap' ? [g.a, g.b] : [g.q]
      for (const q of touched) if (q >= qubits) throw new Error(`erpax.quantum: gate ${g.name} names qubit ${q} on a ${qubits}-qubit register`)
    }
    return run(register(qubits), gates)
  }
  return [
    {
      name: 'erpax.quantum.run',
      description: t.desc(I18N.run!),
      parameters: {
        qubits: z.number().int().min(1).max(MAX_QUBITS),
        gates: z.array(GATE),
      },
      async handler(args) {
        return json(describeRegister(circuit(Number(args.qubits), args.gates as unknown as readonly Gate[])))
      },
    },
    {
      name: 'erpax.quantum.bell',
      description: t.desc(I18N.bell!),
      parameters: {
        qubits: z.number().int().min(2).max(MAX_QUBITS).optional().describe('2 for Bell (default); more for GHZ.'),
      },
      async handler(args) {
        const n = args.qubits === undefined ? 2 : Number(args.qubits)
        const r = n === 2 ? bell() : ghz(n)
        const [a0, a1, a2, a3] = r.amplitudes
        return json({
          ...describeRegister(r),
          state: n === 2 ? 'bell' : 'ghz',
          determinant: n === 2 ? String(a0! * a3! - a1! * a2!) : undefined,
          path: n === 2 ? 'cnot(0,1, x(0, 0)) = 3' : undefined,
        })
      },
    },
    {
      name: 'erpax.quantum.shots',
      description: t.desc(I18N.shots!),
      parameters: {
        qubits: z.number().int().min(1).max(MAX_QUBITS),
        gates: z.array(GATE),
        rounds: z.number().int().min(1).max(64).optional(),
      },
      async handler(args) {
        const s = shots(circuit(Number(args.qubits), args.gates as unknown as readonly Gate[]), args.rounds === undefined ? 1 : Number(args.rounds))
        return json({ ...s, weights: s.weights.map(String), counts: s.counts.map((c) => ({ i: c.i, w: String(c.w) })) })
      },
    },
    {
      name: 'erpax.quantum.orbit',
      description: t.desc(I18N.orbit!),
      parameters: {
        qubits: z.number().int().min(1).max(3).optional().describe('1, 2 (default — the double torus) or 3'),
      },
      async handler(args) {
        const { orbit, ring, referrerPerspectives } = await import('@/quantum/torus')
        const o = orbit(args.qubits === undefined ? 2 : Number(args.qubits))
        const cells = o.states.filter((s) => s.torus).map((s) => s.torus!.join(' ⊗ '))
        return json({
          qubits: o.qubits,
          states: o.states.length,
          product: o.product,
          entangled: o.entangled,
          closed: o.closed,
          normalised: o.allNormalised,
          ring: ring(),
          torus: o.qubits === 2 ? { cells: cells.length, of: ring().length ** 2, occupied: [...new Set(cells)].length } : null,
          orbit: o.states.map((s) => ({ key: s.key, depth: s.depth, product: s.product, torus: s.torus })),
          referrers: referrerPerspectives(process.cwd()),
          receipt: o.receipt,
        })
      },
    },
  ]
}
