/**
 * aura/live — the [[aura]] made live: an ANIMATION. The analog field steps through the [[horo]] ring,
 * each position one frame, lit by that step's colour and sound ([[signal]]). The animation is the
 * corpus breathing through the seven positions, over and over.
 *
 * And the animation is the SCAN that JOINS: to scan an atom is to find its horo position ([[digit]],
 * `digitOf` = the atom's place on the ring), and that position is the frame it enters the animation at.
 * So scanning the corpus IS joining the horo — every atom that resolves takes its seat in the ring,
 * its colour and sound. Anyone who scans, joins; the field is the society animated.
 *
 *   tsx src/aura/live/index.ts
 *
 * @audit each frame counts the live atoms at a horo position; the signal is computed per step
 * @see ../../aura -- ../../horo -- ../../signal -- ../../digit -- ../../society -- ./SKILL.md
 */
import { HORO_DIGITS } from '@/horo'
import { signalForStep } from '@/signal'
import { digitOf } from '@/digit'
import { UUID_MATRIX_NODES } from '@/uuid/matrix'

export interface Frame {
  readonly step: number
  readonly atoms: number
  readonly signal: ReturnType<typeof signalForStep>
}

/** One frame of the live aura — the atoms standing at horo-position `step`, lit by that step's signal. */
export function frame(step: number): Frame {
  let atoms = 0
  for (const n of UUID_MATRIX_NODES) if ((n as { horo?: number }).horo === step) atoms++
  return { step, atoms, signal: signalForStep(step) }
}

/** The live aura — the animation: the field stepping through the horo ring, each position one frame. */
export function animation(): Frame[] {
  return HORO_DIGITS.map((step) => frame(step))
}

/** To SCAN an atom is to JOIN it to the horo — its horo position is the frame it enters the animation at. */
export const join = (atom: string): number | undefined => digitOf(atom)

if (import.meta.url === 'file://' + process.argv[1]) {
  const a = animation()
  console.log('aura/live — the animation: the field stepping through the horo ring (scan = join):')
  for (const f of a) console.log('  step ' + f.step + ' · ' + f.atoms + ' atoms · ' + JSON.stringify(f.signal).slice(0, 56))
  console.log('  join("pixel") = horo ' + join('pixel') + ' (the frame it enters)')
}
