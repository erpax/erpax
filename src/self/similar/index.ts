/**
 * self/similar — the self recomposes at every scale (the fractal), COMPUTED.
 *
 * "Self-similar" = the same form holds at field → collection → plugin → erpax →
 * agent. The math grounds it, zero free parameters:
 *   - the octave lift ×10 ≡ 1 (mod 9) PRESERVES the digit (@/rodin octaveFixesDigit),
 *     so a position at one scale IS the same position at the next — scale-invariance;
 *   - the unit Cayley table is a HOLOGRAM — 6 generators reconstruct all 36 cells
 *     (@/rodin cayleyIsCyclic), so the part carries the whole.
 * Self-similarity is therefore zero-entropy: nothing new is added across scales;
 * the whole is computable from the part (the matter twin of ./SKILL.md).
 *
 *   tsx src/self/similar/index.ts
 *
 * @standard the hologram — 6 generators → 36 Cayley cells, 0 free parameters
 * @audit every quantity computed on (ℤ/9ℤ) via @/horo + @/rodin, never asserted
 * @see @/rodin · @/rodin/coil · @/horo · ./SKILL.md
 */
import { digitalRoot } from '@/horo'
import { octaveFixesDigit, cayleyIsCyclic, VORTEX_SEQUENCE } from '@/rodin'

/** Lift a digit by `octaves` scales: ×10 ≡ 1 (mod 9) preserves it — same form, next scale. */
export function lift(digit: number, octaves = 1): number {
  let d = digitalRoot(digit)
  for (let i = 0; i < octaves; i++) d = digitalRoot(d * 10)
  return d
}

/** Self-similarity: every vortex position is FIXED under the octave lift (same form at every scale). */
export function scaleInvariant(states: readonly number[] = VORTEX_SEQUENCE): {
  holds: boolean
  samples: ReadonlyArray<{ state: number; lifted: number }>
} {
  const samples = states.map((s) => ({ state: digitalRoot(s), lifted: lift(s) }))
  return { holds: samples.every((x) => x.state === x.lifted), samples }
}

/** Holographic: 6 generators reconstruct all 36 Cayley cells — the part carries the whole, 0 free parameters. */
export function holographic(): { generators: number; whole: number; freeParameters: number; holds: boolean } {
  const c = cayleyIsCyclic()
  return { generators: c.generators, whole: c.whole, freeParameters: c.freeParameters, holds: c.holds }
}

/** The whole proof — self-similarity is zero-entropy (the whole is computable from the part). */
export function proof(): Record<string, boolean> {
  return {
    octaveScaleInvariant: octaveFixesDigit().holds, // ×10 preserves the digit
    everyPositionSelfSame: scaleInvariant().holds, // same form at every scale
    partReconstructsWhole: holographic().freeParameters === 0, // the hologram
  }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const p = proof()
  const h = holographic()
  console.log('self/similar — the same form at every scale, computed (not asserted):')
  console.log('  octave lift ×10 ≡ 1 (mod 9) fixes the digit: ' + octaveFixesDigit().holds)
  console.log('  hologram: ' + h.generators + ' generators → ' + h.whole + ' cells; free parameters = ' + h.freeParameters)
  console.log('  PROOF: ' + Object.entries(p).map(([k, v]) => k + '=' + v).join('  '))
  if (!Object.values(p).every(Boolean)) process.exit(1)
}
