/**
 * render — the FULL SENSORY pixel. A [[pixel]] is an [[atom]]'s content-[[uuid]] made VISIBLE
 * (its colour). A **render** is that same uuid made SENSED across all three analog channels at once:
 *   - color     — the pixel (the visible face, [[pixel]] · [[color]]),
 *   - sound      — an A432 tone, the uuid's digit decoded on the diatonic ring ([[signal]]),
 *   - vibration  — the rodin doubling step, where the digit DOUBLES to on the helix ([[rodin]]).
 *
 * All three are READ OFF the one uuid (digit → spectrum / tone / double), never assigned — so the
 * full sensory face is tamper-evident and DRY by construction, exactly like the pixel: you cannot
 * change how an atom looks, sounds OR vibrates without changing its content (and thus its identity).
 * A stream of uuids rendered this way IS the [[analog]] [[aura]] — interactive multimedia, no payload.
 *
 *   tsx src/render/index.ts
 *
 * @audit colour/sound/vibration all computed from the uuid's digit (pixel · signal · rodin), never painted on
 * @standard the analog aura — colour/sound/vibration as projections of one content-uuid (A432)
 * @see ../pixel -- ../signal -- ../color -- ../digit -- ../rodin -- ../aura -- ../component -- ./SKILL.md
 */
import { pixel } from '@/pixel'
import { signalForStep, type Signal } from '@/signal'
import { DOUBLING } from '@/rodin'
import { isHoroStep, composeSteps, type HoroStep } from '@/horo'

/** A sound facet of the render — the A432 tone the uuid's digit decodes to (frequency + diatonic note). */
export interface Sound {
  /** the diatonic frequency in Hz, just-intonation over A432 */
  readonly hz: number
  /** the note name (C..B) */
  readonly note: string
  /** the solfège syllable (Do..Ti) */
  readonly solfege: string
  /** the horo ring position the digit was folded onto to sound the tone */
  readonly step: HoroStep
}

/** A vibration facet of the render — the rodin doubling step: where the digit DOUBLES to on the helix. */
export interface Vibration {
  /** the digit doubled mod 9 (×2 on the ring) — the next state the vibration moves to */
  readonly to: number
  /** index of the digit on the doubling helix [1,2,4,8,7,5] (0..5), or -1 for the off-helix axis {3,6,9} */
  readonly stepIndex: number
  /** true when the digit rides the doubling helix (a unit of (ℤ/9ℤ)*); false for the {3,6,9} axis */
  readonly onHelix: boolean
}

/** The full sensory pixel: one content-uuid rendered to colour + sound + vibration — the complete analog-aura unit. */
export interface Render {
  /** the uuid's digit (its position on the A432 ring) — the single source all three channels read off */
  readonly digit: number
  /** the visible face — the pixel's colour (hex) */
  readonly color: string
  /** the audible face — the A432 tone */
  readonly sound: Sound
  /** the felt face — the rodin doubling step */
  readonly vibration: Vibration
}

/**
 * Fold a digit (1..9) onto the diatonic horo ring {1,2,4,8,7,5,9} so it can sound a tone.
 * The ring positions sound directly; the off-ring axis {3,6} is folded by ×2 (composeSteps),
 * the proven move that always lands back on the ring. Deterministic: same digit ⇒ same step.
 */
function toHoroStep(digit: number): HoroStep {
  if (isHoroStep(digit)) return digit
  // {3,6} (and 0) are off the diatonic ring — double them onto it (3→6 stays off; 6→3 stays off,
  // so chain ×2 until on-ring). composeSteps(0,*)=9, composeSteps(3,2)=6, composeSteps(6,2)=3 …
  // 3 and 6 never land on the ring under a single ×2, so step through the orbit deterministically.
  let d = digit
  for (let i = 0; i < 9 && !isHoroStep(d); i++) d = composeSteps(d, 2)
  return (isHoroStep(d) ? d : 9) as HoroStep
}

/**
 * Render a content-uuid to its FULL SENSORY pixel — colour + sound + vibration, all computed
 * from the single uuid. The colour IS the pixel; the sound is the digit's A432 tone; the
 * vibration is the digit's rodin doubling step. Identity and full render are one.
 */
export function render(uuid: string): Render {
  const { digit, color } = pixel(uuid)
  const step = toHoroStep(digit)
  const sig: Signal = signalForStep(step)
  const stepIndex = DOUBLING.indexOf(digit as (typeof DOUBLING)[number])
  return {
    digit,
    color,
    sound: { hz: sig.hz, note: sig.note, solfege: sig.solfege, step },
    vibration: { to: composeSteps(digit, 2), stepIndex, onHelix: stepIndex >= 0 },
  }
}

/** Same content ⇒ same uuid ⇒ same full render: colour, sound AND vibration all match. Identity is the render. */
export const sameRender = (a: string, b: string): boolean => {
  const x = render(a)
  const y = render(b)
  return (
    x.color === y.color &&
    x.sound.hz === y.sound.hz &&
    x.sound.note === y.sound.note &&
    x.vibration.to === y.vibration.to
  )
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const u = '12345678-1234-8123-8123-123456789abc'
  const r = render(u)
  console.log('render — the full sensory pixel (uuid → colour + sound + vibration):')
  console.log('  ' + u.slice(0, 8) + '… → digit ' + r.digit)
  console.log('  color     : ' + r.color)
  console.log('  sound     : ' + r.sound.note + ' (' + r.sound.solfege + ') ' + r.sound.hz + ' Hz @ step ' + r.sound.step)
  console.log('  vibration : ×2 → ' + r.vibration.to + ' (helix index ' + r.vibration.stepIndex + ', onHelix=' + r.vibration.onHelix + ')')
}
