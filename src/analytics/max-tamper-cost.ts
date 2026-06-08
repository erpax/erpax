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
import { crackVerdict, type CrackVerdict } from '@/tamper/cost'
import { ERPAX_DIGEST_BITS, CONTENT_DIGEST_BITS, bhtCollisionLog2 } from '@/cost'
import { auraBalance, coverage as schemaCoverage } from '@/balance'
import { orphans } from '@/entropy'
import { crossSeals } from '@/aura'

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

/**
 * Analyze the corpus relating to MAX tamper cost — the weakest link, the levers,
 * the distance to ∞. PURE by default (no disk): the live cross-seal count is passed
 * IN (`unsealedCrosses`) by the fs-allowed caller (the CLI), never read here.
 */
export const maxTamperCost = ({ unsealedCrosses = 0 }: { unsealedCrosses?: number } = {}): MaxTamperCostReport => {
  const d = auraBalance()
  const cov = schemaCoverage(d)
  // The PER-RECORD floor — three commitment threat models, coverage held OUT (its
  // amplifier is ∞ at coverage=1 and would mask every lever). This surfaces the
  // structural weakest link that exists regardless of coverage; the coverage
  // amplifier is reported separately (gapToInfinity).
  const levers: TamperLever[] = [
    lever('post-hoc (chosen-content out of scope)', crackVerdict({ checks: 1 })),
    lever('chosen-content vs bare 106-bit uuid', crackVerdict({ checks: 1, anchorCommitmentBits: ERPAX_DIGEST_BITS })),
    lever('chosen-content vs full 256-bit digest', crackVerdict({ checks: 1, anchorCommitmentBits: CONTENT_DIGEST_BITS })),
    // the missing cross — the quantum (BHT) collision, the 3rd harmonic D/3, the
    // lowest floor. A quantum adversary with quantum memory pays this; it also
    // breaks an RSA/ECC anchor (Shor), so the per-record floor IS the binding one.
    { lever: 'quantum (BHT) collision vs bare 106-bit uuid', bindingLog2: bhtCollisionLog2(ERPAX_DIGEST_BITS), binding: 'collision' },
    { lever: 'quantum (BHT) collision vs full 256-bit digest', bindingLog2: bhtCollisionLog2(CONTENT_DIGEST_BITS), binding: 'collision' },
  ]
  // The cross lever — duplication breaks the content-uuid binding. An UNSEALED cross
  // is the same meaning at two independent representations, so a forger edits one
  // diagonal and the twin never catches it: a 0-bit second-preimage, the cheapest
  // forgery of all (it caps the whole chain at 0 until the cross is sealed).
  if (unsealedCrosses > 0)
    levers.push({ lever: `${unsealedCrosses} unsealed cross(es) — duplicated meaning, content-uuid binding broken`, bindingLog2: 0, binding: 'second-preimage' })
  const weakest = levers.reduce((m, l) => (l.bindingLog2 < m.bindingLog2 ? l : m))
  const crossWeak = weakest.lever.includes('unsealed cross')
  const quantum = weakest.lever.startsWith('quantum')
  return {
    coverage: cov,
    gapToInfinity: 1 - cov,
    orphanAtoms: orphans().length,
    orphanCollections: d.orphanCollections.length,
    weakest,
    levers,
    fix: crossWeak
      ? 'seal the unsealed cross(es): make one diagonal re-point to / export * the other so the duplicated meaning collapses to one content-uuid (the merge law at path scale) — closes the 0-bit binding that caps the whole chain'
      : quantum
        ? 'quantum (BHT) collision on the bare uuid is the floor (2^35) — commit the FULL 256-bit content digest (→ 2^85) AND use a hash-based post-quantum anchor (Shor breaks RSA/ECC)'
        : weakest.binding === 'collision'
          ? 'thread anchorCommitmentBits=CONTENT_DIGEST_BITS (256): closes the 2^53 chosen-content collision to 2^128'
          : 'commitment binds at second-preimage; close the coverage gap toward 1 to drive cost → ∞',
  }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  // The fs-allowed edge: derive the live cross-seal count and pass it in (the
  // module itself stays pure — no disk read inside maxTamperCost).
  const r = maxTamperCost({ unsealedCrosses: crossSeals().unsealed.length })
  console.log('max-tamper-cost (coverage ' + (100 * r.coverage).toFixed(1) + '%, gap-to-∞ ' + r.gapToInfinity.toFixed(4) + '):')
  for (const l of r.levers) console.log('  ' + l.bindingLog2.toFixed(2).padStart(8) + ' log2  ' + l.binding.padEnd(16) + l.lever)
  console.log('  WEAKEST: ' + r.weakest.lever + ' @ ' + r.weakest.bindingLog2.toFixed(2) + ' log2 (' + r.weakest.binding + ')')
  console.log('  FIX: ' + r.fix)
}
