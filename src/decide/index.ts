/**
 * decide — the society's composed decision. Wires the three selection laws into one winner:
 * gate-correct (competition) → harmonic-preferred (logic) → most-efficient (cost) → cheapest →
 * deterministic by content-uuid. Pure function; the runtime dispatch it drives is the boundary.
 *
 * @see ../competition (Candidate, correctness) · ../cost (efficiency) · ../logic (harmonic-first) · ./SKILL.md
 */
import type { Candidate } from '@/competition'
import { efficiency, type Ledger } from '@/cost'
import type { GuardianVerdict } from '@/guardian'

/** A society candidate — a competition Candidate plus its harmony (logic), its cost ledger (cost), and its proof. */
export interface SocietyCandidate extends Candidate {
  /** logic: self-consistent ⇒ resolves first (preferred). */
  readonly harmonic: boolean
  /** cost: its output and spend, for the efficiency selection. */
  readonly ledger: Ledger
  /** trinity/proof: the candidate carries a proof leg (refutable) — a proven decision beats an asserted one. */
  readonly proven?: boolean
}

/**
 * The society's choice, collapsing the quantum trinity: keep the correct candidates (competition); prefer the
 * harmonic ones (logic); among those prefer the PROVEN ones (the trinity's proof leg — a decision backed by a
 * proof beats one merely asserted, [[rules]]/refutable turned on the choice); among those take the most efficient
 * (cost), ties broken by lowest cost then content-uuid. Each preference falls back if it would empty the pool, so
 * the collapse never loses a correct candidate. Returns null when nothing is correct.
 */
export function decide(candidates: readonly SocietyCandidate[]): SocietyCandidate | null {
  const correct = candidates.filter((c) => c.correct)
  if (correct.length === 0) return null
  const narrow = (pool: readonly SocietyCandidate[], pred: (c: SocietyCandidate) => boolean): readonly SocietyCandidate[] => {
    const kept = pool.filter(pred)
    return kept.length > 0 ? kept : pool // a preference never empties the pool (fall back)
  }
  const pool = narrow(narrow(correct, (c) => c.harmonic), (c) => c.proven === true)
  return [...pool].sort(
    (a, b) =>
      efficiency(b.ledger) - efficiency(a.ledger) ||
      a.cost - b.cost ||
      a.solutionUuid.localeCompare(b.solutionUuid),
  )[0]!
}

/**
 * Who decides COMMIT and PUSH is computable — the same law, turned on the git action itself.
 *
 * A commit is not the author's discretion and a push is not a reviewer's whim. Both are decided by GATES that
 * already run: the write-time seal ([[confirm]].uuidConfirm — trinity complete, no dead links/refs, import
 * purity) decides the commit; the full lanes ([[gate]] — does it LOAD, [[rules]], corpus) decide the push. This
 * makes the decider explicit and computed: given the gate verdicts, `commitDecision`/`pushDecision` return
 * whether the action is WARRANTED and NAME who decided — the blocking gate, or the registry when the tree is
 * clean. It is `decide` above at another scale: correctness first (a gate that says no wins), fail-closed, the
 * winner deterministic — never a person, never a reflex.
 *
 * Honest boundary: this computes the WARRANT and names its decider; it does not EXECUTE the irreversible push.
 * Sending commits outward stays a confirmed checkpoint (the push is the review point, and outward-facing action
 * is confirmed, not automated). The decision is computable and computed; pulling the trigger is not this atom's.
 */
export interface GateVerdict {
  readonly gate: string
  readonly pass: boolean
  readonly detail?: string
}

/** The computed decision on a git action — warranted or not, and WHO (which gate) decided it. */
export interface GitDecision {
  readonly action: 'commit' | 'push'
  /** true ⇔ every deciding gate passed. The seal fold, never discretion. */
  readonly warranted: boolean
  /** WHO decides — the first blocking gate, or the deciding registry when the tree is clean. Never a person. */
  readonly by: string
  /** the gates that said no (empty ⇔ warranted). */
  readonly blockers: readonly string[]
  readonly reason: string
}

/** Bridge a [[guardian]] ratchet verdict into a gate say — reuse the decider, do not re-derive it. */
export function verdictOf(g: GuardianVerdict): GateVerdict {
  return { gate: g.axis, pass: g.ok === true, detail: g.reason }
}

/** The pure warrant fold: warranted iff at least one gate ran and every gate passed; the decider is named either way. */
const warrant = (action: GitDecision['action'], registry: string, verdicts: readonly GateVerdict[]): GitDecision => {
  const blockers = verdicts.filter((v) => v.pass !== true).map((v) => v.gate) // fail-closed: only literal true passes
  const warranted = verdicts.length > 0 && blockers.length === 0
  const by = blockers.length > 0 ? blockers[0]! : registry
  const reason =
    verdicts.length === 0
      ? `${action}: no gate ran — a decision with no decider is not a yes (DENY)`
      : warranted
        ? `${action} warranted — decided by ${registry}; every gate passed`
        : `${action} blocked by ${blockers.length} gate(s): ${blockers.join(', ')} — the axis decides, fix it there`
  return { action, warranted, by, blockers, reason }
}

/**
 * The COMMIT decision — decided by the write-time seal ([[confirm]]: trinity · dead-links · dead-refs · import
 * purity). Bridge [[confirm]]'s guardians with `verdictOf`; the seal decides, fail-closed.
 */
export function commitDecision(verdicts: readonly GateVerdict[]): GitDecision {
  return warrant('commit', 'the write-time seal (confirm)', verdicts)
}

/**
 * The PUSH decision — decided by the full lanes ([[gate]]: load · rules · corpus), a SUPERSET of the commit. A
 * push is warranted iff the commit is AND every push lane passes; the commit verdicts fold in, so a blocked
 * commit blocks the push whatever the lanes say.
 *
 * @invariant push ⊇ commit — warranted only if the commit verdicts alone would also warrant
 */
export function pushDecision(
  commitVerdicts: readonly GateVerdict[],
  pushLanes: readonly GateVerdict[],
): GitDecision {
  return warrant('push', 'the full gate (load · rules · corpus)', [...commitVerdicts, ...pushLanes])
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const clean: GateVerdict[] = [
    { gate: 'trinity', pass: true },
    { gate: 'dead-links', pass: true },
    { gate: 'import-purity', pass: true },
  ]
  const lanes: GateVerdict[] = [{ gate: 'load', pass: true }, { gate: 'rules', pass: true }, { gate: 'corpus', pass: true }]
  console.log('decide — who decides commit and push is computable:\n')
  console.log(`  commit: ${commitDecision(clean).warranted ? 'WARRANTED' : 'BLOCKED'} — decided by ${commitDecision(clean).by}`)
  console.log(`  push:   ${pushDecision(clean, lanes).warranted ? 'WARRANTED' : 'BLOCKED'} — decided by ${pushDecision(clean, lanes).by}`)
  const blocked = commitDecision([{ gate: 'trinity', pass: false, detail: 'SKILL without index.ts + test.ts' }])
  console.log(`\n  a blocked commit names its decider: ${blocked.by}\n  ${blocked.reason}`)
  console.log('\n  the decider is an axis, never a person — and push ⊇ commit: you cannot push what you could not commit.')
}
