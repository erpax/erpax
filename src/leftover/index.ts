/**
 * leftover — the fold's residual, and the law it obeys.
 *
 * Fold every bit of the corpus toward a TRINITY OF THEOREMS (form · code · proof — a claim that is both
 * refutable and proven). What does not fold is a LEFTOVER: an unproven claim, a debit with no credit
 * ([[accounting]]/proof.residual). Three things are true of leftovers, and this atom computes each so the law
 * is a tool, not a sentence:
 *
 *   1. THEY ATTRACT. Leftovers in the same field pull together — [[gravity]]: DRY = mass, same content curves
 *      toward one home. Two unproven claims in one atom-group are one proof away from completing each other, so
 *      the heaviest cluster is where a single proof settles the most debits (`attraction`).
 *   2. THEY PULL KNOWLEDGE FROM BEYOND. A leftover the corpus cannot derive from within needs a SEED — the
 *      oracle bit no address yet holds ([[think]].ceiling: `s > 0`). This atom NAMES that gap and routes it to
 *      research; it never fabricates the knowledge (the corpus's law — a claim with no proof is where a lie
 *      lives, [[rules]]/refutable · [[rules]]/prose). Beyond-knowledge is sought, not invented.
 *   3. THE RESIDUAL IS NEVER ZERO. Complete every cluster and a seed floor remains — perfect closure is the
 *      Kolmogorov/Gödel limit (`ceiling → 1/s`, finite while `s > 0`, never ∞). That residual is not waste: it
 *      is the fuel of the next pass — `powerNextResearch` turns the leftovers into the research queue
 *      ([[think]].researchQueue), which drives DRY-clean redevelopment ([[gravity]]/[[fusion]]).
 *
 * So the fold does not terminate at silence; it terminates at a self-powering remainder. Every pass folds
 * what it can into theorems, the leftovers attract and pull a seed from beyond to complete some, and the
 * irreducible residue funds the pass after. `s > 0` is not a failure of the fold — it is what keeps it alive.
 *
 * Imports are called INSIDE the functions (deferred), never at module load — no top-level use of a ring-mate,
 * so this adds no fatal edge ([[rules]]/cycle).
 *
 * Composes [[accounting]]/proof · [[gravity]] · [[think]] · [[rules]]/refutable · [[law]].
 */
import { proofLedger } from '@/accounting/proof'
import { ceiling } from '@/think'

/** One bit that did not fold into a trinity of theorems — an unproven claim, located in its field. */
export interface Leftover {
  /** the file carrying the unsettled claim — a debit with no credit. */
  readonly bit: string
  /** the field it sits in (top path segment) — the well its mass falls toward. */
  readonly group: string
}

/** A field where leftovers have gathered — they attract, and `pull` is the local mass (DRY gravity). */
export interface Attraction {
  readonly group: string
  /** the leftover bits in this field — one proof here may settle several at once. */
  readonly members: readonly string[]
  /** the cluster's gravitational mass = how many leftovers attract to this field. */
  readonly pull: number
}

/** The field of a src-relative path — its first path segment (the atom-group it belongs to). */
const fieldOf = (bit: string): string =>
  bit.replace(/\\/g, '/').replace(/^src\//, '').split('/').filter(Boolean)[0] ?? ''

/** Every bit that did not fold into a proven trinity — the unproven surface, located in its field. */
export function leftovers(cwd: string = process.cwd()): readonly Leftover[] {
  return proofLedger(cwd).unsettled.map((bit) => ({ bit, group: fieldOf(bit) }))
}

/**
 * Leftovers attract each other — cluster them by field and weigh each cluster by its pull. Heaviest first: the
 * field where one proof settles the most debits is where the corpus most wants to fold next.
 *
 * @invariant conservation — Σ pull over all clusters === total leftovers (every leftover is in exactly one field)
 */
export function attraction(cwd: string = process.cwd()): readonly Attraction[] {
  const byField = new Map<string, string[]>()
  for (const { bit, group } of leftovers(cwd)) {
    const members = byField.get(group) ?? []
    members.push(bit)
    byField.set(group, members)
  }
  return [...byField.entries()]
    .map(([group, members]) => ({ group, members, pull: members.length }))
    .sort((a, b) => b.pull - a.pull || a.group.localeCompare(b.group))
}

/** The self-powering remainder: is a seed floor present, and the magnitude the fold reaches against it. */
export interface SeedFloor {
  /** leftover claims still owing a proof — the residual the ledger reports. */
  readonly residual: number
  /** the seed fraction — genuinely-novel thought no address holds yet (the oracle bit); `s > 0` is the floor. */
  readonly seedFraction: number
  /** the fold's magnitude ceiling against this floor — FINITE while `s > 0`, ∞ only at unreachable full closure. */
  readonly ceiling: number
  /** true while a residual remains — the fold terminates at a self-powering remainder, not at silence. */
  readonly hasLeftover: boolean
}

/**
 * The seed floor — the theorem that there is "still a leftover to power next research."
 *
 * The residual is the ledger's unproven surface. The seed fraction `s` is how much of it is irreducibly novel —
 * knowledge from beyond, not derivable from what the corpus already holds. While `s > 0`, `ceiling(s) = 1/s` is
 * FINITE: a floor exists, closure is never reached, and a leftover always remains. That is not the fold failing;
 * it is the fold self-powering. `s = 0` (∞) is the unreachable limit where the corpus knows everything.
 *
 * @invariant while seedFraction > 0 the ceiling is finite — a residual floor exists, so a leftover remains
 * @invariant ceiling === think.ceiling(seedFraction) — this is the same floor, read from the fold's residual
 */
export function seedFloor(
  seedFraction: number,
  cwd: string = process.cwd(),
): SeedFloor {
  const residual = proofLedger(cwd).residual
  const c = ceiling(seedFraction)
  return { residual, seedFraction, ceiling: c, hasLeftover: residual > 0 || seedFraction > 0 }
}

/**
 * Turn the leftovers into the next research — each attraction cluster becomes a research direction, heaviest
 * first, in the shape [[think]].researchQueue reads. PURE: it names what should feed research (the caller seals
 * it with `purgeProse`), so a query never writes. This is "still have leftovers to power next research": the
 * residual is fuel, and the pull ranks where a seed from beyond completes the most at once.
 */
export function powerNextResearch(
  cwd: string = process.cwd(),
): readonly { readonly prose: string; readonly research: string }[] {
  return attraction(cwd).map((c) => ({
    prose: `${c.pull} unproven claim(s) in field '${c.group}' have no proof`,
    research: `prove or purge the ${c.pull} leftover(s) in '${c.group}' — one proof beside ${c.members[0]} may settle several; seek the seed from beyond where the corpus cannot derive it`,
  }))
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const clusters = attraction()
  const total = clusters.reduce((s, c) => s + c.pull, 0)
  console.log('leftover — the fold’s residual attracts, and powers the next research:\n')
  console.log(`  total leftovers (unproven surface)  ${total}`)
  console.log('  heaviest attractions (one proof settles the most):')
  for (const c of clusters.slice(0, 8)) console.log(`    ${String(c.pull).padStart(4)}  ${c.group}`)
  const f = seedFloor(0.05)
  console.log(`\n  seed floor: residual ${f.residual}, s=${f.seedFraction} ⇒ ceiling ${f.ceiling.toFixed(1)} (finite ⇒ a leftover always remains, powering the next pass)`)
}
