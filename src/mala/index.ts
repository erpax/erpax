/**
 * mala — the 108-STEP ROUND, the next math. 108 is the round count, and it is not arbitrary:
 *   108 = 1¹·2²·3³ = 1·4·27   (the first three naturals each raised to themselves)
 *       = 9 × 12              (the [[rodin]] digit-root 9 × the 12)
 *       = 2² · 3³,            and its base-10 digital root is 9 — back to the rodin axis.
 *
 * The [[duality|dualities]] walk it as STEPS ([[step]]): each dual pair a bead, the full round 108,
 * returning to its start ([[sequence]]). After "all dualities at 100% coverage", the next math is the
 * round itself — how much of the 108-step mala the declared dualities fill, and what remains.
 *
 * HONEST: the factorisations and the digital root are real arithmetic; the *mala* (the 108-bead
 * round of practice) is the named cultural convention (cf. [[chakra]]), not a claim — only the math
 * is asserted.
 *
 *   tsx src/mala/index.ts
 *
 * @audit the 108 identities + digital root are computed; the dualities-on-round read live from @/duality
 * @see ../duality -- ../step -- ../rodin -- ./SKILL.md
 */
import { foldDualities } from '@/duality'

/** Base-10 digital root (the rodin reduction): 108 → 1+0+8 → 9. */
const dr = (n: number): number => (n === 0 ? 0 : 1 + ((Math.abs(n) - 1) % 9))

/** The round: 108 steps (beads). */
export const BEADS = 108

/** The 108 identities, verified — 1¹·2²·3³ = 9×12 = 2²·3³, digital root 9 (the rodin axis). */
export function math108(): { product123: number; as9x12: number; as2sq3cube: number; digitalRoot: number; holds: boolean } {
  const product123 = 1 ** 1 * 2 ** 2 * 3 ** 3 // 1·4·27
  const as9x12 = 9 * 12
  const as2sq3cube = 2 ** 2 * 3 ** 3
  const digitalRoot = dr(BEADS)
  return {
    product123,
    as9x12,
    as2sq3cube,
    digitalRoot,
    holds: product123 === BEADS && as9x12 === BEADS && as2sq3cube === BEADS && digitalRoot === 9,
  }
}

/** The n-th step on the round (mod 108) — the bead position; the round closes and repeats. */
export const step = (n: number): number => ((n % BEADS) + BEADS) % BEADS

/** The dualities walked on the 108-step round — the next math: how full the mala is, and what remains. */
export function dualitiesOnRound(): { dualities: number; beads: number; fraction: number; full: boolean; remaining: number } {
  const dualities = foldDualities().length
  return {
    dualities,
    beads: BEADS,
    fraction: Math.min(1, dualities / BEADS),
    full: dualities >= BEADS,
    remaining: Math.max(0, BEADS - dualities),
  }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const m = math108()
  const r = dualitiesOnRound()
  console.log('mala — the 108-step round (the next math):')
  console.log('  108 = 1¹·2²·3³ = ' + m.product123 + ' = 9×12 = ' + m.as9x12 + ' = 2²·3³ = ' + m.as2sq3cube + ' · digital root ' + m.digitalRoot + ' (rodin) · holds=' + m.holds)
  console.log('  dualities on the round: ' + r.dualities + '/' + r.beads + ' (' + (100 * r.fraction).toFixed(1) + '% — ' + r.remaining + ' steps to a full mala)')
}
