/**
 * quantum/torus — every superposition the gate basis can reach, and the double torus the
 * two-qubit ones live on. See SKILL.md.
 *
 * The orbit of |0…0⟩ under {H, X, Z, CNOT, SWAP} on exact integer amplitudes is FINITE — the real
 * Clifford orbit — so it can be enumerated to a fixpoint rather than sampled. One qubit reaches four
 * states; two qubits reach a 4 × 4 torus of product states (each qubit on its own ring) plus the
 * entangled states off it. Every state is discovered, named by its canonical integer vector, and
 * every referrer of the register is asked to agree with it.
 *
 * @see ../register/index.ts · ../../dual/torus/fusion (the double torus the corpus already names)
 * @standard Nielsen & Chuang §10.5 — stabilizer states; the real Clifford group is finite
 */
import ts from 'typescript'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { toUuid } from '@/uuid/matrix'
import { citationsIn } from '@/rules/citation'
import { type Gate, type Register, apply, determinant, isProductAt, normalised, register } from '@/quantum/register'

/** A state with its phase and scale removed: amplitudes divided down, first non-zero positive. */
export interface Canonical {
  readonly key: string
  readonly amplitudes: readonly bigint[]
  readonly halvings: number
}

export function canonical(r: Register): Canonical {
  let amps = [...r.amplitudes]
  let halvings = r.halvings
  // two halvings = one factor of 2 on every amplitude: fold it out while it is there
  while (halvings >= 2 && amps.every((a) => a % 2n === 0n)) {
    amps = amps.map((a) => a / 2n)
    halvings -= 2
  }
  const first = amps.find((a) => a !== 0n) ?? 1n
  if (first < 0n) amps = amps.map((a) => -a)
  return { key: `${amps.join(',')}/${halvings}`, amplitudes: amps, halvings }
}

/** Every gate of the basis on `qubits` qubits — the generators of the orbit. */
export function generators(qubits: number): Gate[] {
  const g: Gate[] = []
  for (let q = 0; q < qubits; q++) g.push({ name: 'h', q }, { name: 'x', q }, { name: 'z', q })
  for (let c = 0; c < qubits; c++) for (let t = 0; t < qubits; t++) if (c !== t) g.push({ name: 'cnot', c, t })
  for (let a = 0; a < qubits; a++) for (let b = a + 1; b < qubits; b++) g.push({ name: 'swap', a, b })
  return g
}

export interface OrbitState extends Canonical {
  /** Shortest gate depth from |0…0⟩ at which the state was discovered. */
  readonly depth: number
  readonly product: boolean
  /** Torus coordinates for a 2-qubit product state: each qubit's ring state. `null` off the torus. */
  readonly torus: readonly [string, string] | null
}

export interface Orbit {
  readonly qubits: number
  readonly states: readonly OrbitState[]
  readonly product: number
  readonly entangled: number
  /** The orbit is closed: no generator leaves it. */
  readonly closed: boolean
  /** Every discovered state satisfies Σ amp² = 2^halvings. */
  readonly allNormalised: boolean
  readonly receipt: string
}

const ONE_QUBIT_RING = ['1,0/0', '0,1/0', '1,1/1', '1,-1/1'] as const

/**
 * The ring coordinate of qubit `q` in a 2-qubit PRODUCT state: the factor it contributes. Any row
 * of the other qubit with a non-zero entry carries the factor; a basis factor has no halving, a
 * superposed one has one.
 */
function ringOf(r: Register, q: number): string {
  const mask = 1 << q
  const other = 1 - q
  for (const o of [0, 1]) {
    const lo = r.amplitudes[o << other]!
    const hi = r.amplitudes[(o << other) | mask]!
    if (lo !== 0n || hi !== 0n) {
      return canonical({ qubits: 1, amplitudes: [lo, hi], halvings: lo !== 0n && hi !== 0n ? 1 : 0 }).key
    }
  }
  return ONE_QUBIT_RING[0]
}

/**
 * The whole orbit of |0…0⟩ under the basis, to a fixpoint. Breadth-first, so `depth` is the shortest
 * circuit that reaches each state. Finite because the real Clifford group is; `maxStates` is a hard
 * ceiling so a widened basis cannot run away.
 */
export function orbit(qubits: number, maxStates = 20_000): Orbit {
  const gens = generators(qubits)
  const seen = new Map<string, { r: Register; depth: number }>()
  const start = register(qubits)
  seen.set(canonical(start).key, { r: start, depth: 0 })
  let frontier = [start]
  let depth = 0
  let closed = true
  while (frontier.length > 0) {
    depth++
    const next: Register[] = []
    for (const r of frontier) {
      for (const g of gens) {
        const s = apply(r, g)
        const k = canonical(s).key
        if (!seen.has(k)) {
          if (seen.size >= maxStates) {
            closed = false
            break
          }
          seen.set(k, { r: s, depth })
          next.push(s)
        }
      }
    }
    frontier = next
  }
  const states: OrbitState[] = [...seen.entries()]
    .map(([key, { r, depth }]) => {
      const c = canonical(r)
      const product = Array.from({ length: qubits }, (_, q) => q).every((q) => isProductAt(r, q))
      const torus: readonly [string, string] | null = qubits === 2 && product ? [ringOf(r, 0), ringOf(r, 1)] : null
      return { key, amplitudes: c.amplitudes, halvings: c.halvings, depth, product, torus }
    })
    .sort((a, b) => a.depth - b.depth || a.key.localeCompare(b.key))
  const product = states.filter((s) => s.product).length
  return {
    qubits,
    states,
    product,
    entangled: states.length - product,
    closed,
    allNormalised: [...seen.values()].every(({ r }) => normalised(r)),
    receipt: toUuid(Buffer.from(states.map((s) => s.key).join('\n'), 'utf8')),
  }
}

/** The four single-qubit states — the ring each qubit of the double torus runs on. */
export const ring = (): readonly string[] => [...ONE_QUBIT_RING]

/** Two-qubit determinant for an orbit state, from its canonical amplitudes. */
export const orbitDeterminant = (s: OrbitState): bigint =>
  determinant({ qubits: 2, amplitudes: s.amplitudes, halvings: s.halvings })

export interface ReferrerPerspective {
  readonly file: string
  /** The standards that referrer cites — the perspective it reads the register from. */
  readonly standards: readonly string[]
}

/**
 * Every file that imports the register, with the standards it cites. Parsed: an `ImportDeclaration`
 * whose specifier is `@/quantum/register`, never a mention in prose. The perspectives a discovered
 * superposition must survive are exactly these — a referrer's law is the test it would write.
 */
export function referrerPerspectives(cwd: string = process.cwd()): ReferrerPerspective[] {
  const out: ReferrerPerspective[] = []
  const walk = (d: string): void => {
    for (const e of readdirSync(d)) {
      if (e === 'node_modules' || e.startsWith('.') || e === 'skills') continue
      const p = join(d, e)
      const st = statSync(p)
      if (st.isDirectory()) walk(p)
      else if (/\.tsx?$/.test(e) && !/generated|\.d\.ts$/.test(e)) {
        const text = readFileSync(p, 'utf8')
        if (!text.includes('@/quantum/register')) continue
        const src = ts.createSourceFile(p, text, ts.ScriptTarget.Latest, true)
        const imports = src.statements.some(
          (s) => ts.isImportDeclaration(s) && ts.isStringLiteral(s.moduleSpecifier) && s.moduleSpecifier.text === '@/quantum/register',
        )
        const rel = relative(cwd, p)
        if (imports && !rel.startsWith('src/quantum/register/')) out.push({ file: rel, standards: [...citationsIn(p, text)].sort() })
      }
    }
  }
  walk(join(cwd, 'src'))
  return out.sort((a, b) => a.file.localeCompare(b.file))
}

if (import.meta.url === `file://${process.argv[1]}`) {
  for (const n of [1, 2]) {
    const o = orbit(n)
    console.log(`orbit(${n}) — ${o.states.length} states · product ${o.product} · entangled ${o.entangled} · closed ${o.closed} · normalised ${o.allNormalised} · receipt ${o.receipt}`)
    if (n === 2) {
      const cells = new Set(o.states.filter((s) => s.torus).map((s) => s.torus!.join(' ⊗ ')))
      console.log(`  double torus: ${cells.size} of ${ring().length * ring().length} cells occupied by product states`)
      for (const s of o.states.filter((x) => !x.product).slice(0, 6)) console.log(`  entangled  [${s.amplitudes.join(',')}]/${s.halvings}  det ${orbitDeterminant(s)}  depth ${s.depth}`)
    }
  }
  const refs = referrerPerspectives()
  console.log(`referrers — ${refs.length}`)
  for (const r of refs) console.log(`  ${r.file}  ← ${r.standards.join(' · ') || '(cites no standard)'}`)
}
