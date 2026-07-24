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

if (import.meta.url === `file://${process.argv[1]}`) {
  const e = openExperiment('demo')
  console.log(`sandbox/experiment — opened ${e.dir}`)
  const seal = sealExperiment(e) // empty scratch passes trivially
  console.log(`  empty experiment sealed: ${seal.passed}`)
  discardExperiment(e)
  console.log('  discarded — no droppings')
}
