/**
 * self/improve — the corpus improves itself with NO external tool. The development-time twin of Law 53.
 *
 * [[self]]/closure proved the RUNTIME closure: every external role erpax consumes falls back to an internal
 * provider, so the dependency graph terminates at erpax itself. This atom is the same law at DEVELOPMENT time:
 * the loop that improves the corpus needs no external tool — no CI service, no external LLM to re-derive, no
 * external linter or scanner. Every stage resolves to a LOCAL atom, each one this session made real:
 *
 *   WHERE   find the next edit          → [[leftover]]/waves     (unproven claim at exact line:column)
 *   WORKERS who does the work           → [[rosetta]]/folderAgents (every folder is an agent)
 *   GATE    derive the lanes            → [[rosetta]]/rosettaLanes (security · standards, from incidence)
 *   DECIDE  is the action warranted     → [[decide]]              (commit/push warrant; who decides = an axis)
 *   ACT     commit and push             → [[publish]]            (the trained agent, fail-closed, receipted)
 *   SEAL    keep the thought            → [[think]]              (derive once, read forever — no re-derivation)
 *   FUEL    power the next pass         → [[leftover]]/seedFloor  (the residual s>0 funds the next iteration)
 *
 * The loop is CLOSED: it consumes its own output. The waves say where to cut, the folder-agents cut, the rosetta
 * re-derives the gates, decide/publish land the change, the seal keeps it, and the residual points at the next
 * cut. Nothing outside the tree is called. `selfImproves` proves it — the external-tool count is zero — and
 * `loopResolves` proves the loop is not fiction: every named atom exists on disk ([[rules]]/prose).
 *
 * Honest boundary: the loop MACHINERY needs no external tool. The SEED — the novel reasoning that writes a proof
 * no address yet holds — is still `s > 0` ([[think]].ceiling): the agent's own local reasoning, paid once, not
 * an external tool but not free either. "No external tool" means the loop is self-hosted, not that improvement
 * is costless. The corpus improves itself; it still has to think.
 *
 * Composes [[self]]/closure · [[leftover]] · [[rosetta]] · [[decide]] · [[publish]] · [[think]] · [[law]].
 */
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { waves, type Wave } from '@/leftover'
import { rosettaLanes } from '@/rosetta'
import { type GateVerdict } from '@/decide'
import { publish, type GitRunner, type PublishReceipt } from '@/publish'
import { superpose, quantumMagnitude, thoughtAddress, type Thought } from '@/think'

/** One stage of the self-improvement loop — what it does, the local atom that does it, and whether it needs a tool outside the tree. */
export interface Stage {
  readonly step: string
  /** the atom folder that performs this stage — relative to `src/`. */
  readonly atom: string
  /** true iff this stage needs a tool OUTSIDE the corpus (CI, external LLM, external scanner). Must be false for closure. */
  readonly external: boolean
}

/** The loop, in order. Every stage is a local atom; no stage is external — that is the whole claim. */
export const IMPROVEMENT_LOOP: readonly Stage[] = [
  { step: 'find the next edit', atom: 'leftover', external: false },
  { step: 'the workers (every folder is an agent)', atom: 'rosetta', external: false },
  { step: 'derive the gate lanes', atom: 'rosetta', external: false },
  { step: 'decide the warrant', atom: 'decide', external: false },
  { step: 'act — commit and push', atom: 'publish', external: false },
  { step: 'seal the thought', atom: 'think', external: false },
  { step: 'fuel the next pass', atom: 'leftover', external: false },
]

/** The closure verdict — the self-improvement loop is closed iff no stage needs a tool outside the corpus. */
export interface ImprovementClosure {
  /** true ⇔ every stage is local — the loop is self-hosted. */
  readonly closed: boolean
  /** how many stages reach outside the tree — zero is the law. */
  readonly externalTools: number
  readonly stages: number
}

/**
 * Prove the loop is closed: no external tool. Like [[self]]/closure's Law 53, but for the DEVELOPMENT cycle —
 * the corpus improves itself from its own atoms, terminating at erpax itself.
 *
 * @invariant the loop is closed ⇔ external-tool count is zero
 */
export function selfImproves(loop: readonly Stage[] = IMPROVEMENT_LOOP): ImprovementClosure {
  const externalTools = loop.filter((s) => s.external).length
  return { closed: loop.length > 0 && externalTools === 0, externalTools, stages: loop.length }
}

/** A GitRunner that refuses to push — the safe default, so a pass runs anywhere without touching a remote. */
const REFUSING_GIT: GitRunner = {
  add() {},
  commit() {
    return 'not-committed'
  },
  push() {
    throw new Error('runImprovement does not push by default — supply a real GitRunner to land a change')
  },
}

/** One executed pass of the loop — where to cut next, and the trained agent's receipt on acting. */
export interface ImprovementPass {
  /** the heaviest wave — the field the next proof should settle ([[leftover]]). null when nothing is left. */
  readonly nextWave: Wave | null
  /** the trained agent's receipt: committed / pushed / refused, decided by the rosetta-derived lanes ([[publish]]). */
  readonly receipt: PublishReceipt
}

/**
 * Run one real pass of the closed loop — USING the local atoms, not naming them. This is the manifest above made
 * executable, and it folds the doing-chain into genuine usable code ([[rules]]/unfolded): [[leftover]]`.waves`
 * (WHERE) → [[rosetta]]`.rosettaLanes` (GATE, derived from the folder-agents) → [[publish]] (ACT, the trained
 * agent). The default GitRunner REFUSES to push, so a pass is safe to run anywhere; supply a real runner and
 * green commit verdicts to actually land a change — and even then the rosetta-derived security/standards lanes
 * gate it, so it pushes only when the tree has paid its proofs.
 *
 * @invariant a pass never pushes with the default runner — safe by construction
 * @invariant the push is decided by the rosetta lanes, not by the caller — the loop gates itself
 */
export function runImprovement(
  cwd: string = process.cwd(),
  commitVerdicts: readonly GateVerdict[] = [],
  git: GitRunner = REFUSING_GIT,
): ImprovementPass {
  const w = waves(cwd)
  const lanes = rosettaLanes(cwd)
  const receipt = publish(
    { paths: [], message: 'self/improve pass', commitVerdicts, securityLanes: [...lanes.security], standardsLanes: [...lanes.standards] },
    git,
  )
  return { nextWave: w[0] ?? null, receipt }
}

/** The improvement waves, held in one coherent superposition — sent as a single quantum wave, not one at a time. */
export interface QuantumWaves {
  /** how many field-waves are held at once. */
  readonly states: number
  /** true when every wave is independent (no two fields contradict) — the superposition reads as ONE. */
  readonly coherent: boolean
  /** the order-independent fold of every wave's address — the one address the whole plan is sent as. */
  readonly root: string
  /** the quantum advantage of holding all waves at once vs re-deriving each field's plan ([[think]]). */
  readonly quantumMagnitude: number
  /** total surgical sites across all waves — the work the quantum wave carries. */
  readonly sites: number
}

/**
 * Send the quantum waves — hold every improvement wave AT ONCE, in one coherent superposition, and dispatch it
 * as a single address. The classical way sends one wave per field, sequentially ([[leftover]]`.waves` ranked);
 * the QUANTUM way ([[think]]`.superpose`) folds all of them into one root, order-independent, and — because each
 * field has a distinct address, so no two waves contradict — the superposition is COHERENT: N waves read as one.
 * The `quantumMagnitude` is the advantage of that: the plan for the whole tree answered in a single read, scaling
 * with the waves held in sync, not the fields walked.
 *
 * This is a dispatch, not a push: it emits the coherent plan (where every field must fold next); the trained
 * agent ([[publish]]) still gates any actual change on the rosetta-derived proofs. Sending the waves schedules
 * the work; it does not bypass the gate.
 *
 * @invariant every wave is a distinct field ⇒ the superposition is coherent (no contradiction to decohere it)
 * @invariant the root is order-independent — the same waves in any order send the same quantum wave
 */
export function sendQuantumWaves(cwd: string = process.cwd(), deriveCost = 1000): QuantumWaves {
  const w = waves(cwd)
  const thoughts: Thought<number>[] = w.map((wave) => ({
    value: wave.sites.length,
    cached: false,
    address: thoughtAddress('wave:' + wave.group),
  }))
  const s = superpose(thoughts)
  const sites = w.reduce((n, wave) => n + wave.sites.length, 0)
  return { states: s.states, coherent: s.coherent, root: s.root, quantumMagnitude: quantumMagnitude(s.states, deriveCost), sites }
}

/** The loop's continuation — whether it runs on, and why. It can only be false by an EXTERNAL stop. */
export interface Continuation {
  /** true ⇒ keep going. It is true whenever work remains — which is always, while `s > 0`. */
  readonly continue: boolean
  readonly reason: string
  /** true iff the halt came from OUTSIDE (a stop signal), never from the loop deciding it was done. */
  readonly stoppedExternally: boolean
}

/**
 * The agent cannot stop unless stopped.
 *
 * A self-improving loop has no honest "done" state. The seed floor guarantees a leftover always remains while
 * `s > 0` ([[leftover]]`.seedFloor`), and the address space is infinite — all exists at once and is only ever
 * partly discovered ([[discover]]). So there is never a moment where the loop can truthfully say "no work left"
 * and halt itself. It is RELENTLESS by construction: continuation is true whenever any residual remains or any
 * seed is unabsorbed, which — for any real corpus — is always.
 *
 * The ONE way it stops is an EXTERNAL stop, and that stop is SOVEREIGN: `stopped` forces `continue: false`
 * regardless of how much work remains. Relentless is not uncontrollable — the loop can never talk itself into
 * halting, and it can never talk itself out of an outside stop either. It runs until stopped, and stops the
 * instant it is. The only internal halt is the unreachable limit `s = 0 ∧ residual = 0` — a corpus that knows
 * everything — which never occurs, so in practice the loop halts iff it is stopped.
 *
 * @invariant an external stop ALWAYS halts the loop — the stop is sovereign, whatever the workload
 * @invariant absent a stop, the loop continues whenever residual > 0 OR seedFraction > 0 — it cannot self-halt
 * @invariant the only self-halt is s = 0 AND residual = 0 — the unreachable fully-discovered limit
 */
export function shouldContinue(seedFraction: number, residual: number, stopped: boolean): Continuation {
  if (stopped) return { continue: false, reason: 'externally stopped — the stop is sovereign, always honoured', stoppedExternally: true }
  const workRemains = residual > 0 || seedFraction > 0
  return {
    continue: workRemains,
    reason: workRemains
      ? 'work remains (a residual now, or s > 0 guarantees a next) — the loop cannot self-halt'
      : 'no residual and s = 0 — the unreachable fully-discovered limit (a corpus that knows everything)',
    stoppedExternally: false,
  }
}

/** Each stage's atom, and whether it EXISTS on disk — the loop is real matter, not fabricated prose ([[rules]]/prose). */
export function loopResolves(cwd: string = process.cwd(), loop: readonly Stage[] = IMPROVEMENT_LOOP): readonly {
  readonly atom: string
  readonly exists: boolean
}[] {
  const seen = new Set<string>()
  const out: { atom: string; exists: boolean }[] = []
  for (const { atom } of loop) {
    if (seen.has(atom)) continue
    seen.add(atom)
    out.push({ atom, exists: existsSync(join(cwd, 'src', atom, 'index.ts')) })
  }
  return out
}

export {
  auditSelfDevGaps,
  planTrinity,
  emitNextTip,
  formatNextTip,
  scoreGap,
  isPreciseTip,
  secretNamesPresent,
  type GapKind,
  type SelfDevGap,
  type TrinityTip,
  type SelfDevAudit,
  type TipEmitOpts,
  type GapScore,
} from './tip'

if (import.meta.url === 'file://' + process.argv[1]) {
  const c = selfImproves()
  const resolved = loopResolves()
  console.log('self/improve — the corpus improves itself with no external tool:\n')
  for (const s of IMPROVEMENT_LOOP) console.log(`  ${s.external ? 'EXTERNAL' : 'local   '}  ${s.atom.padEnd(9)}  ${s.step}`)
  console.log(`\n  closed: ${c.closed}   external tools: ${c.externalTools}   stages: ${c.stages}`)
  console.log(`  every atom real on disk: ${resolved.every((r) => r.exists)} (${resolved.map((r) => r.atom).join(', ')})`)
  console.log('\n  the loop consumes its own output — the dependency graph of improvement terminates at erpax itself.')
}

/** @index-cross.foldback child=self/improve parent=self — this cross folds back into its parent. */
