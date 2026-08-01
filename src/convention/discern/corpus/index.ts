/**
 * convention/discern/corpus — the integrity of every security claim erpax makes, as one number.
 *
 * [[convention]]/discern types a single atom's claims. This runs the same instrument over **all of
 * them at once**, and it is the form the metric has to take to matter: a per-atom ratio is a local
 * opinion, while `passing verdicts / total public claims` across the corpus is a figure a reviewer
 * can hold the project to.
 *
 * ## Why the registry is dynamic
 *
 * The claim-bearing atoms import [[convention]]/discern for their types; a static import back would
 * put the aggregator inside a cycle ([[rules]]/cycle — an import loop makes initialisation order an
 * accident). `await import()` inside the function runs long after every module is initialised, so
 * the edge exists at call time and never at load time.
 *
 * ## Why the outcome comes from a RUN
 *
 * The two halves of evidence come from different places, and the split is the whole design. What a
 * proof *exercises* and what would *break* it are prose only the author can write — declared as
 * `EVIDENCE` beside each atom's `CLAIMS`. Whether it **passed** is a fact only an execution can
 * supply, so this spawns the named suites and reads their exit codes. Neither half alone is
 * evidence: a declaration with no run is a tautology, and a green run with no declaration says
 * nothing about what was tested.
 *
 * ## The gate, and what it does NOT gate
 *
 * `assertVerdictsHold` fails closed on a **failing verdict** — a claim asserting a property whose own
 * proof is red is a false statement about security, and there is no acceptable count of those. The
 * **ratio is reported, never ratcheted**: a compass is a legitimately open surface with a named owner,
 * and forcing the number upward would only push honest compasses into dishonest verdicts. Integrity
 * rises when a library is pinned and a proof is written — never by editing a page.
 *
 * @law a claim asserting a property whose proof is red is a false statement about security, and fails
 *      closed. The integrity ratio is reported, because a compass is an open surface, not a defect.
 * @invariant a verdict whose suite fails makes assertVerdictsHold throw
 * @invariant a verdict whose evidence is undeclared counts as ABSENT, never as passing
 * @invariant the ratio is computed from the registries, never written down
 * @standard ISO/IEC 25010:2023 §5.5 — testability: a claim is measured or it is not made
 * @see ./SKILL.md -- ../index.ts -- ../../../anchor/claims
 */
import { execFileSync } from 'node:child_process'

import { integrity, manifest, runFrom, verdictHolds, type EvidenceSource, type Manifest, type MeasureRun } from '../index'

/** The claim-bearing atoms. A new one is registered here, and its surfaces enter the denominator. */
export const REGISTRY: readonly string[] = ['@/entropy/source', '@/entropy/threshold', '@/anchor/claims']

interface Registered {
  readonly CLAIMS: Parameters<typeof manifest>[1]
  readonly SURFACES: readonly string[]
  readonly EVIDENCE: readonly EvidenceSource[]
}

/** Load every registry at CALL time — the edge exists here and never at module initialisation. */
export async function registries(): Promise<readonly (readonly [string, Registered])[]> {
  const out: (readonly [string, Registered])[] = []
  for (const spec of REGISTRY) {
    const mod = (await import(spec)) as unknown as Registered
    out.push([spec, mod] as const)
  }
  return out
}

export async function corpusManifests(): Promise<readonly Manifest[]> {
  return (await registries()).map(([spec, m]) => manifest(spec.replace('@/', ''), m.CLAIMS, m.SURFACES))
}

export async function corpusEvidence(): Promise<readonly EvidenceSource[]> {
  return (await registries()).flatMap(([, m]) => m.EVIDENCE)
}

/**
 * Run a suite and report whether it passed.
 *
 * A suite that cannot be run returns `undefined` rather than `false`: "did not run" and "ran and
 * failed" are different facts, and collapsing them would let a missing file read as a broken proof
 * (or, worse, the reverse).
 */
export function suitePassed(file: string): boolean | undefined {
  try {
    execFileSync('./node_modules/.bin/vitest', ['run', file], { stdio: 'pipe', encoding: 'utf8' })
    return true
  } catch (e) {
    const status = (e as { status?: number }).status
    return status === undefined ? undefined : false
  }
}

export interface CorpusIntegrity {
  readonly ratio: number
  readonly verdicts: number
  readonly compasses: number
  /** verdicts that do not hold, with the reason — the fail-closed list */
  readonly failing: readonly { property: string; reason: string }[]
  /** open surfaces with their owner — information, never a defect */
  readonly open: readonly { property: string; closedBy: string; owner: string }[]
}

export async function corpusIntegrity(passed: (file: string) => boolean | undefined = suitePassed): Promise<CorpusIntegrity> {
  const manifests = await corpusManifests()
  const run: MeasureRun = runFrom(await corpusEvidence(), passed)
  const failing: { property: string; reason: string }[] = []
  let verdicts = 0
  const open: { property: string; closedBy: string; owner: string }[] = []
  for (const m of manifests) {
    verdicts += m.verdicts.length
    for (const v of m.verdicts) {
      const r = verdictHolds(v, run)
      if (!r.holds) failing.push({ property: v.property, reason: r.reason })
    }
    for (const c of m.compasses) open.push({ property: c.property, closedBy: c.closedBy, owner: c.owner })
  }
  return { ratio: integrity(manifests, run), verdicts, compasses: open.length, failing, open }
}

export class VerdictFailed extends Error {
  constructor(readonly failing: readonly { property: string; reason: string }[]) {
    super(
      `convention/discern/corpus: ${failing.length} verdict(s) do not hold — a claim asserting a property ` +
        `whose proof is red is a false statement about security:\n${failing.map((f) => `  ${f.property} — ${f.reason}`).join('\n')}`,
    )
    this.name = 'VerdictFailed'
  }
}

/** The gate. Fails closed on a failing verdict; says nothing about the ratio. */
export function assertVerdictsHold(result: CorpusIntegrity): void {
  if (result.failing.length > 0) throw new VerdictFailed(result.failing)
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const r = await corpusIntegrity()
  const pct = (r.ratio * 100).toFixed(1)
  console.log(`discern — integrity ${pct}% · ${r.verdicts - r.failing.length}/${r.verdicts + r.compasses} claims proven`)
  console.log(`  verdicts ${r.verdicts} (failing ${r.failing.length}) · compasses ${r.compasses}`)
  for (const o of r.open) console.log(`  OPEN  ${o.property} — closed by ${o.closedBy} [${o.owner}]`)
  try {
    assertVerdictsHold(r)
    console.log('✓ every verdict holds — the ratio is information, not a ceiling')
  } catch (e) {
    console.error(`\n${(e as Error).message}`)
    process.exit(1)
  }
}
