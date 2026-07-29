import { exactMax, exactMin, exactAbs, exactFloor, exactCeil, exactRound, exactTrunc } from '@/algebra'
/**
 * conservation -- the root of double-entry: nothing created or destroyed, only transformed.
 *
 * HONEST SCOPE: this module encodes the mathematical skeleton of conservation laws —
 * Noether's theorem applied to the ledger form (Pacioli double-entry) and the
 * open-system boundary-balance identity. The physics claims (energy, momentum, etc.)
 * are documented as the NOETHER table; the module itself does NOT simulate physics,
 * it exposes the algebraic identities that conservation implies.
 *
 *   tsx src/conservation/index.ts
 *
 * @standard Noether's theorem (E. Noether, 1918) — continuous symmetry ⇔ conserved quantity
 * @standard First Law of Thermodynamics — energy is conserved in an isolated system
 * @standard Double-entry bookkeeping (Pacioli, 1494) — Σdebit = Σcredit
 * @audit computed, never hand-asserted
 * @see ../balance ../entry ../sustainability ../ecosystem
 */

/** A double-entry ledger line: one debit and one matching credit. */
export type Entry = { debit: number; credit: number }

/**
 * trialBalance — Σdebit − Σcredit across all entries.
 * A balanced ledger (conservation holds) returns exactly 0.
 * An unbalanced ledger returns the signed net discrepancy.
 */
export const trialBalance = (entries: Entry[]): number =>
  entries.reduce((acc, e) => acc + e.debit - e.credit, 0)

/**
 * conserves — true iff |trialBalance| ≤ tol.
 * Default tol=0 (exact conservation); use a small positive value for floats.
 */
export const conserves = (entries: Entry[], tol = 0): boolean =>
  exactAbs(trialBalance(entries)) <= tol

/**
 * netFlow — Σ of signed flows across a boundary.
 * Inflows are positive, outflows negative. A closed conserved system nets 0.
 */
export const netFlow = (flows: number[]): number =>
  flows.reduce((acc, f) => acc + f, 0)

/**
 * boundaryConserves — open-system conservation law.
 * A system whose stock changes by deltaStock is conservative iff:
 *   deltaStock === Σinflows − Σoutflows  (within tol)
 * This is NOT stasis: stock may grow or shrink, but every change must be
 * accounted for by what actually crossed the boundary.
 */
export const boundaryConserves = (
  deltaStock: number,
  inflows: number[],
  outflows: number[],
  tol = 0,
): boolean =>
  exactAbs(deltaStock - (netFlow(inflows) - netFlow(outflows))) <= tol

/**
 * NOETHER — documentation-as-data: the canonical Noether pairs.
 * Each key is a continuous symmetry; its value is the conserved quantity it entails.
 * Frozen: this table is a mathematical fact, not a mutable record.
 */
export const NOETHER: Readonly<Record<string, string>> = Object.freeze({
  'time-translation': 'energy',
  'space-translation': 'momentum',
  'rotation': 'angular-momentum',
  'phase': 'charge',
})

export interface PyramidLevel {
  readonly level: 'biology' | 'chemistry' | 'physics' | 'accounting'
  /** what is conserved at this scale */
  readonly quantity: string
  /** signed flows across the boundary — inputs +, outputs −; conserved ⇔ they sum to 0 */
  readonly flows: readonly number[]
}

/**
 * The algebra-based trinity pyramid: biology decoded to its boundary conditions inverts DOWN to
 * chemistry and physics, and every level is the SAME algebra — netFlow = 0, Σin = Σout. Not metaphor;
 * each row is a real balance. Biology (metabolic mass balance) rests on chemistry (atom balance in a
 * reaction) rests on physics (energy conservation, Noether) — and all of it IS erpax's double-entry
 * (Σdebit = Σcredit). The pyramid's apex and base meet: the ledger is the universal conservation law.
 */
export const CONSERVATION_PYRAMID: readonly PyramidLevel[] = [
  { level: 'biology', quantity: 'mass (g/mol) — C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O', flows: [+180, +192, -264, -108] },
  { level: 'chemistry', quantity: 'H atoms — 2H₂ + O₂ → 2H₂O', flows: [+4, -4] },
  { level: 'physics', quantity: 'energy (J) — elastic collision', flows: [+10, -10] },
  { level: 'accounting', quantity: 'value — Σdebit = Σcredit', flows: [+100, -100] },
]

/** Every level of the pyramid conserves by the SAME algebra (netFlow = 0) — biology to accounting. */
export function pyramidConserves(): Array<{ readonly level: string; readonly net: number; readonly conserves: boolean }> {
  return CONSERVATION_PYRAMID.map((l) => {
    const net = netFlow([...l.flows])
    return { level: l.level, net, conserves: net === 0 }
  })
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const ledger: Entry[] = [
    { debit: 100, credit: 60 },
    { debit: 20, credit: 60 },
  ]
  console.log('conservation demo:')
  console.log('  trialBalance([100/60, 20/60]) =', trialBalance(ledger), '(0 = balanced)')
  console.log('  conserves:', conserves(ledger), '| boundaryConserves(40,[100],[60]):', boundaryConserves(40, [100], [60]))
  console.log('  NOETHER:', JSON.stringify(NOETHER))
}
