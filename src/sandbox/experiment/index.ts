/**
 * sandbox/experiment — an agent may experiment freely, but its own standards hold at the boundary.
 *
 * The base [[sandbox]] gates an ACTION (permits · brokerCredential · allowlist — may the agent do this?).
 * This gates an EXPERIMENT: an isolated scratch corpus an agent mutates without touching the real tree,
 * where the folder-law standard ([[law]]/folder — one-word atoms, the SKILL·index·test trinity) runs at
 * the SEAM. A standard-violating experiment is caught in the sandbox and never promoted — the crackLeak
 * law ([[resonance]]) applied to experimentation: the seam is sealed, so a bad experiment leaks nothing
 * into the corpus. The agent gets to try anything; only what passes its own standards escapes.
 *
 *   const e = openExperiment('idea'); // write atoms under e.dir/src …
 *   if (!promoteIfSealed(e, join(process.cwd(),'src'))) discardExperiment(e)
 *
 * @see ../index — the capability sandbox this composes
 */
import { mkdtempSync, mkdirSync, rmSync, cpSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { folderViolations } from '@/law/folder'

export interface Experiment {
  /** the isolated scratch root; the agent writes atoms under `${dir}/src` */
  readonly dir: string
  readonly name: string
}

/** Open an isolated scratch corpus. Nothing here touches the real tree until it passes sealExperiment. */
export function openExperiment(name: string): Experiment {
  const safe = name.replace(/[^a-z0-9]/gi, '-').slice(0, 32) || 'exp'
  const dir = mkdtempSync(join(tmpdir(), `experiment-${safe}-`))
  mkdirSync(join(dir, 'src'), { recursive: true })
  return { dir, name: safe }
}

export interface ExperimentSeal {
  /** true ⇒ the experiment obeys the folder-law standard and MAY be promoted */
  readonly passed: boolean
  readonly nameViolations: number
  readonly trinityViolations: number
  /** the standards the experiment broke — empty when passed */
  readonly detail: readonly string[]
}

/** Run the folder-law standard against the scratch corpus — the seam the agent's output must clear. */
export function sealExperiment(exp: Experiment): ExperimentSeal {
  const v = folderViolations(join(exp.dir, 'src'))
  const detail = [
    ...v.name.map((n) => `name: ${JSON.stringify(n).slice(0, 60)}`),
    ...v.trinity.map((t) => `trinity: ${JSON.stringify(t).slice(0, 60)}`),
  ]
  return { passed: v.total === 0, nameViolations: v.name.length, trinityViolations: v.trinity.length, detail }
}

/**
 * Promote the experiment into the real corpus ONLY if it passes its own standards — otherwise nothing
 * moves. This is the wall: a standard-violating experiment cannot escape the sandbox. Returns whether
 * it was promoted; the caller discards on false.
 */
export function promoteIfSealed(exp: Experiment, targetSrc: string): boolean {
  if (!sealExperiment(exp).passed) return false
  const from = join(exp.dir, 'src')
  if (existsSync(from)) cpSync(from, targetSrc, { recursive: true })
  return true
}

/** Tear down the scratch corpus — an experiment leaves no droppings ([[rules]] cleanup-rides-every-wave). */
export function discardExperiment(exp: Experiment): void {
  rmSync(exp.dir, { recursive: true, force: true })
}

export interface StandardProposal {
  /** cracks the NEW standard closes that the old left open — new \ old */
  readonly sealed: readonly string[]
  /** cracks the new standard RE-OPENS that the old had sealed — old \ new; this is the leak of adopting it */
  readonly regressed: readonly string[]
  /** true ⇒ the new standard is a strict improvement: seals ≥1 crack, re-opens none */
  readonly promotes: boolean
}

/**
 * The revolutionary move — experiment on the STANDARD itself. A truly new idea may not pass the current
 * standard; it may need to REPLACE it. But a standard earns its place only by measurement, never by
 * assertion: run the OLD standard and the NEW standard over the same witness corpus (each returns the
 * violations it catches, by content-address), and the new one promotes iff it CLOSES a crack the old
 * left open (sealed) and RE-OPENS none the old had sealed (regressed = 0). The regressed set IS the
 * crackLeak of adopting it ([[resonance]]): a revolution that leaks what the old law held is refused.
 * Revolution is not breaking the wall — it is proving a wall that leaks less, then replacing the old one.
 */
export function proposeStandard(oldCaught: readonly string[], newCaught: readonly string[]): StandardProposal {
  const old = new Set(oldCaught)
  const now = new Set(newCaught)
  const sealed = [...now].filter((v) => !old.has(v)) // cracks the new standard newly closes
  const regressed = [...old].filter((v) => !now.has(v)) // cracks it re-opens — the leak
  return { sealed, regressed, promotes: regressed.length === 0 && sealed.length > 0 }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const e = openExperiment('demo')
  console.log(`sandbox/experiment — opened ${e.dir}`)
  const seal = sealExperiment(e) // empty scratch passes trivially
  console.log(`  empty experiment sealed: ${seal.passed}`)
  discardExperiment(e)
  console.log('  discarded — no droppings')
}

/** @index-cross.foldback child=sandbox/experiment parent=sandbox — this cross folds back into its parent. */
