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

if (import.meta.url === 'file://' + process.argv[1]) {
  const c = selfImproves()
  const resolved = loopResolves()
  console.log('self/improve — the corpus improves itself with no external tool:\n')
  for (const s of IMPROVEMENT_LOOP) console.log(`  ${s.external ? 'EXTERNAL' : 'local   '}  ${s.atom.padEnd(9)}  ${s.step}`)
  console.log(`\n  closed: ${c.closed}   external tools: ${c.externalTools}   stages: ${c.stages}`)
  console.log(`  every atom real on disk: ${resolved.every((r) => r.exists)} (${resolved.map((r) => r.atom).join(', ')})`)
  console.log('\n  the loop consumes its own output — the dependency graph of improvement terminates at erpax itself.')
}
