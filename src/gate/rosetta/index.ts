/**
 * gate/rosetta — the INCREMENTAL fold-first gate. The old `pnpm check` ran 11 LINEAR O(n) lanes, each
 * re-scanning the whole corpus every push; that cost is why the team resorted to `git push --no-verify`
 * — a gate too slow to run gets skipped. This atom rebuilds the STRUCTURAL half of the gate as the fold:
 *
 *   1. corpusRoot() ([[fold]]) folds every atom's notary deed to ONE root — the sealed corpus state.
 *   2. That root is sealed as a notarial act into a hash-CHAIN ([[notary]]) in a gitignored receipt
 *      (node_modules/.cache/erpax/gate.json). Each green structural gate is one tamper-evident act; the
 *      chain is the gate's own append-only ledger — no green push can be inserted or back-dated.
 *   3. INCREMENTAL: compare the live root to the last sealed root.
 *        • UNCHANGED  → the structure is byte-for-byte the state that last passed → reuse the sealed
 *          verdict, O(1), zero per-atom work ("reuse the computed answer, never re-derive" — [[agent/mortality]]).
 *        • CHANGED    → diff the per-atom deeds, and verify ONLY the changed atoms (O(changed), never
 *          O(corpus)): cancerFree ([[fold]] — no NEW duplication) + the [[globe]] great-circle change-reach.
 *
 * HARD HONEST BOUNDARY — read before trusting this. The fold verifies INTEGRITY: structure (the deed:
 * path · horo · neighbours · seal-uuid), dedup ([[fold]] cancerFree), entropy, and tamper-evidence (the
 * notary chain). It does NOT compile TypeScript and does NOT run behaviour — an unchanged deed root proves
 * the corpus STRUCTURE is the last-sealed one, NOT that `tsc` passes or a test is green. So this is the
 * FAST FIRST lane for structure; the SEMANTIC lanes (typecheck + behavioural tests) remain the required
 * complement and run AFTER. The fold does NOT replace tsc/tests. Do not claim otherwise.
 *
 *   tsx src/gate/rosetta/index.ts
 *
 * Composes [[fold]] · [[merge]] · [[notary]] · [[globe]] · [[gate]] · [[seal]] · [[law]].
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { UUID_MATRIX_NODES as N } from '@/uuid/matrix'
import { atomDeed, cancerFree, corpusRoot } from '@/fold'
import { foldToRoot } from '@/merge'
import { greatCircleAngle, toGeodetic } from '@/globe'
import { chainIntact, notarize, protocolRoot, type NotarialAct } from '@/notary'

/** Canonical atom path. */
export const atomPath = 'gate/rosetta' as const

/** The gitignored gate ledger — under node_modules/.cache so it never enters git ([[seal]] receipt). */
export const RECEIPT_PATH = join('node_modules', '.cache', 'erpax', 'gate.json') as const

/** The notary officer that seals each structural gate act. */
const NOTARY = 'gate:rosetta' as const

/** A sealed gate receipt — the folded root, the per-atom deed map (for diffing), and the notary chain. */
export interface GateReceipt {
  readonly root: string
  readonly deeds: Readonly<Record<string, string>>
  readonly protocol: readonly NotarialAct[]
  readonly at: string
}

/** The incremental structural verdict — { root, changed, cancerFree, sealed, pass } + reach + short-circuit. */
export interface RosettaVerdict {
  readonly root: string
  readonly changed: readonly string[]
  readonly cancerFree: boolean
  readonly sealed: boolean
  readonly pass: boolean
  /** Max great-circle angle (°) among the changed atoms — how far across the [[globe]] the change spread. */
  readonly reach: number
  /** True when the live root equals the sealed root — the O(1) reuse path (no per-atom work). */
  readonly shortCircuit: boolean
}

/** Minimal atom shape atomDeed needs — the matrix node projected to its deed coordinates. */
type DeedNode = Parameters<typeof atomDeed>[0]

/** Per-atom deed map — path → notary deed. The corpus's registered leaves, keyed for the diff. */
export function atomDeeds(nodes: readonly DeedNode[] = N): Record<string, string> {
  const map: Record<string, string> = {}
  for (const n of nodes) map[n.path] = atomDeed(n)
  return map
}

/** Load the last sealed receipt, or null at genesis (no prior gate). */
export function loadReceipt(cwd: string = process.cwd()): GateReceipt | null {
  const p = join(cwd, RECEIPT_PATH)
  if (!existsSync(p)) return null
  try {
    return JSON.parse(readFileSync(p, 'utf8')) as GateReceipt
  } catch {
    return null
  }
}

/** Persist the sealed receipt (creates the cache dir). */
export function writeReceipt(receipt: GateReceipt, cwd: string = process.cwd()): void {
  const p = join(cwd, RECEIPT_PATH)
  mkdirSync(dirname(p), { recursive: true })
  writeFileSync(p, JSON.stringify(receipt, null, 2) + '\n')
}

/** The changed atoms — the deed diff (added · removed · altered) between the sealed map and the live map. */
export function changedAtoms(
  prev: Readonly<Record<string, string>> | undefined,
  curr: Readonly<Record<string, string>>,
): string[] {
  const changed = new Set<string>()
  const before = prev ?? {}
  for (const path of Object.keys(curr)) if (curr[path] !== before[path]) changed.add(path)
  for (const path of Object.keys(before)) if (!(path in curr)) changed.add(path) // removed atoms
  return [...changed].sort()
}

/** An atom's executable matter — its index.ts body, or '' when the atom has no code (a prose atom). */
function atomSource(cwd: string, path: string): string {
  const p = join(cwd, 'src', path, 'index.ts')
  return existsSync(p) ? readFileSync(p, 'utf8') : ''
}

/** The change-reach — the widest great-circle angle among the changed atoms' points on the [[globe]]. */
function changeReach(nodes: readonly { readonly horo: number }[]): number {
  if (nodes.length < 2) return 0
  const points = nodes.map((n) => toGeodetic(n.horo, (((n.horo % 9) + 9) % 9) / 9))
  let max = 0
  for (let i = 0; i < points.length; i++)
    for (let j = i + 1; j < points.length; j++) max = Math.max(max, greatCircleAngle(points[i]!, points[j]!))
  return max
}

/**
 * The incremental structural gate. Reuses corpusRoot() as the cache: on an unchanged root it returns the
 * sealed verdict in O(1); on a changed root it verifies ONLY the changed atoms and seals a new notary act.
 * `persist` (default true) writes the receipt on a green result — pass false for a dry read.
 */
export function rosettaGate(
  cwd: string = process.cwd(),
  nodes: readonly DeedNode[] = N,
  persist = true,
): RosettaVerdict {
  const curr = atomDeeds(nodes)
  // Reuse corpusRoot() literally for the live matrix; fold the same way for any injected node set (tests).
  const root = nodes === N ? corpusRoot() : foldToRoot(Object.values(curr).sort())
  const prior = loadReceipt(cwd)

  // O(1) short-circuit: the live root equals the last SEALED (green) root ⇒ the structure is unchanged ⇒
  // reuse the sealed verdict. No per-atom work. This is what lets the gate run on every push.
  if (prior && prior.root === root) {
    const sealed = chainIntact(prior.protocol)
    return { root, changed: [], cancerFree: true, sealed, pass: sealed, reach: 0, shortCircuit: true }
  }

  // Changed (or genesis) ⇒ verify ONLY the changed atoms — O(changed), not O(corpus).
  const changed = changedAtoms(prior?.deeds, curr)
  const changedNodes = nodes.filter((n) => changed.includes(n.path))
  const bodies = changedNodes.map((n) => atomSource(cwd, n.path)).filter((b) => b.length > 0)
  const cancer = cancerFree(bodies) // no NEW duplication introduced by the changed atoms
  const reach = changeReach(changedNodes)

  // Seal this structural gate as a notarial act, chained onto the prior ledger (tamper-evident).
  const protocol = prior?.protocol ?? []
  const act = notarize(protocol, root, new Date().toISOString(), NOTARY)
  const nextProtocol = [...protocol, act]
  const sealed = chainIntact(nextProtocol)
  const pass = cancer && sealed

  if (pass && persist) writeReceipt({ root, deeds: curr, protocol: nextProtocol, at: act.at }, cwd)
  return { root, changed, cancerFree: cancer, sealed, pass, reach, shortCircuit: false }
}

/** Human-readable one-block verdict — the gate's message leg ([[gate]]: check · message · heal). */
export function formatVerdict(v: RosettaVerdict): string {
  const head = v.shortCircuit
    ? `rosetta — root UNCHANGED ${v.root.slice(0, 12)}… → O(1) structural PASS (reused sealed verdict)`
    : `rosetta — root ${v.root.slice(0, 12)}… → verified ${v.changed.length} changed atom(s) in O(changed)`
  const detail = v.shortCircuit
    ? `  chain intact=${v.sealed}`
    : `  changed=[${v.changed.slice(0, 8).join(', ')}${v.changed.length > 8 ? ', …' : ''}] · cancerFree=${v.cancerFree} · reach=${v.reach.toFixed(1)}° · sealed=${v.sealed}`
  const boundary =
    '  boundary — structure/dedup/tamper only; tsc + tests are the semantic lanes that run AFTER (the fold does NOT replace them).'
  return `${head}\n${detail}\n  ${v.pass ? '✓' : '✗'} structural gate ${v.pass ? 'PASS' : 'FAIL'}\n${boundary}`
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const v = rosettaGate()
  console.log(formatVerdict(v))
  console.log(`  ledger root ${protocolRoot(loadReceipt()?.protocol ?? []).slice(0, 12)}…`)
  process.exit(v.pass ? 0 : 1)
}
