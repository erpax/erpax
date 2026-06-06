/**
 * analytics/max-tamper-cost — the security read-out: how far the corpus is from
 * INFINITE tamper cost, and the WEAKEST link. A chain is as strong as its
 * CHEAPEST forgery (the MIN caps the whole), so this folds crackVerdict at the
 * live coverage across three threat models and returns the minimum.
 *
 * The binding lever is not coverage — it is COMMITMENT WIDTH. The bare 106-bit
 * uuid yields a 2^53 chosen-content collision; the full 256-bit content digest
 * yields 2^128. Coverage is an amplifier that reaches ∞ only at 1.0. This
 * capability surfaces both, names the weakest link, and the (free) fix.
 *
 * PURE — composes the generated matrix + computed consts only (no DB, no disk).
 *
 * @standard NIST SP 800-107r1 §5.1 — 2nd-preimage ≈ L bits, collision ≈ L/2
 * @audit composed from @/tamper/cost crackVerdict at @/balance live coverage; never hand-asserted
 * @see ./index.ts -- ../tamper/cost (crackVerdict) -- ../balance (coverage) -- ../anchor
 */
import { crackVerdict, ERPAX_DIGEST_BITS, CONTENT_DIGEST_BITS, type CrackVerdict } from '@/tamper/cost'
import { auraBalance, coverage as schemaCoverage } from '@/balance'
import { orphans } from '@/entropy'

export interface TamperLever {
  lever: string
  /** crack cost under this threat model (log2 ops) — lower = weaker */
  bindingLog2: number
  binding: CrackVerdict['binding']
}

export interface MaxTamperCostReport {
  /** live model⊕collection coverage — the amplifier that reaches ∞ only at 1.0 */
  coverage: number
  /** distance to the ∞ ceiling along the coverage axis */
  gapToInfinity: number
  orphanAtoms: number
  orphanCollections: number
  /** the cheapest forgery across threat models — the MIN that caps the whole */
  weakest: TamperLever
  levers: TamperLever[]
  /** the single highest-leverage move to raise the floor */
  fix: string
}

const lever = (name: string, v: CrackVerdict): TamperLever => ({
  lever: name,
  bindingLog2: v.crackCostLog2,
  binding: v.binding,
})

/** Analyze the corpus relating to MAX tamper cost — the weakest link, the levers, the distance to ∞. */
export const maxTamperCost = (): MaxTamperCostReport => {
  const d = auraBalance()
  const cov = schemaCoverage(d)
  // Same live coverage, three commitment threat models — the difference IS the lever.
  const levers = [
    lever('post-hoc (chosen-content out of scope)', crackVerdict({ coverage: cov, checks: 1 })),
    lever('chosen-content vs bare 106-bit uuid', crackVerdict({ coverage: cov, checks: 1, anchorCommitmentBits: ERPAX_DIGEST_BITS })),
    lever('chosen-content vs full 256-bit digest', crackVerdict({ coverage: cov, checks: 1, anchorCommitmentBits: CONTENT_DIGEST_BITS })),
  ]
  const weakest = levers.reduce((m, l) => (l.bindingLog2 < m.bindingLog2 ? l : m))
  return {
    coverage: cov,
    gapToInfinity: 1 - cov,
    orphanAtoms: orphans().length,
    orphanCollections: d.orphanCollections.length,
    weakest,
    levers,
    fix:
      weakest.binding === 'collision'
        ? 'thread anchorCommitmentBits=CONTENT_DIGEST_BITS (256): closes the 2^53 chosen-content collision to 2^128'
        : 'commitment binds at second-preimage; close the coverage gap toward 1 to drive cost → ∞',
  }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const r = maxTamperCost()
  console.log('max-tamper-cost (coverage ' + (100 * r.coverage).toFixed(1) + '%, gap-to-∞ ' + r.gapToInfinity.toFixed(4) + '):')
  for (const l of r.levers) console.log('  ' + l.bindingLog2.toFixed(2).padStart(8) + ' log2  ' + l.binding.padEnd(16) + l.lever)
  console.log('  WEAKEST: ' + r.weakest.lever + ' @ ' + r.weakest.bindingLog2.toFixed(2) + ' log2 (' + r.weakest.binding + ')')
  console.log('  FIX: ' + r.fix)
}
