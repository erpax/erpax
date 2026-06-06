/**
 * test/hooks — the hook by which a [[test]] CONSUMES the aura projection and returns a COLOUR:
 * GREEN (the A432 heart [[color]]) when the aura is whole (the double-torus complete), else a
 * dissonant red. Tests don't just pass/fail — they render the aura's coherence as the heart/A432
 * colour. Analytics projects all auras into one spacetime field ([[quantum]]/matrix, gapless, at
 * no cost); these hooks consume it. Merges into [[hooks]]. Composes [[test]] · [[aura]] · [[color]].
 *
 *   tsx src/test/hooks/index.ts
 *
 * @standard A432 tuning; green = whole aura (a passing test)
 * @see ../../test -- ../../aura -- ../../color -- ../../quantum/matrix (torusComplete) -- ./SKILL.md
 */
import { GREEN, colorOf } from '@/color'
import { torusComplete } from '@/quantum/matrix'

/** The colour a test returns on consuming the aura: GREEN if whole, else red (the root, dissonant). */
export const passColor = (whole: boolean): string => (whole ? GREEN : colorOf(1))

/** Consume the LIVE aura projection: green iff the double-torus is complete (no gaps) — the A432 pass colour. */
export const auraColor = (): string => passColor(torusComplete().complete)

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('test/hooks — tests consume the aura → colour:')
  console.log('  whole=' + passColor(true) + ' (green/A432)  gap=' + passColor(false) + ' (red)  · live aura=' + auraColor())
}
