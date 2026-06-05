/**
 * chakra -- the seven chakras ARE the seven horo positions, each decoded to a
 * note (A432 just-intonation), a colour (CMYK channel) and a movement (the
 * doubling step) from the SAME content-uuid. Computed; the uuid is from the
 * position MATH (nodeOf(measure).uuid), never from the colour.
 *
 * walk order base·share·weave·crest·descent·round·unity
 *   = Do·Re·Mi·Fa·Sol·La·Ti = C·D·E·F·G·A·B = root → crown.
 * Anchor: 0 = K = black = A432 (the key/origin). ×10 octave ⇒ the same seven in
 * every dimension. The traditional rainbow + bija are the cultural overlay
 * (noted, not claimed identical to the computed signal).
 *
 *   tsx src/chakra/index.ts
 *
 * @standard ISO-16:1975 a432-tuning-reference (pitch from position)
 * @audit note, colour and uuid computed from the position math, never hand-asserted
 * @see ../signal ../horo ../rodin ./SKILL.md
 */
import { HORO_DIGITS, HORO_MEASURE, composeSteps, type HoroStep } from '@/horo'
import { NOTES, CMYK, signalForStep, A432 } from '@/signal'
import { nodeOf } from '@/uuid/matrix'

/** The anchor before the first center: 0 = K = black = A432 (the key/origin). */
export const ANCHOR = { digit: 0, channel: 'K' as const, hex: CMYK.K, hz: A432, role: 'key/origin' }

/** Traditional chakra overlay, root → crown (cultural association — NOT computed). */
const TRADITION = [
  { name: 'Root', sanskrit: 'Muladhara', bija: 'LAM', colour: 'red' },
  { name: 'Sacral', sanskrit: 'Svadhisthana', bija: 'VAM', colour: 'orange' },
  { name: 'Solar Plexus', sanskrit: 'Manipura', bija: 'RAM', colour: 'yellow' },
  { name: 'Heart', sanskrit: 'Anahata', bija: 'YAM', colour: 'green' },
  { name: 'Throat', sanskrit: 'Vishuddha', bija: 'HAM', colour: 'blue' },
  { name: 'Third Eye', sanskrit: 'Ajna', bija: 'OM', colour: 'indigo' },
  { name: 'Crown', sanskrit: 'Sahasrara', bija: 'AUM', colour: 'violet' },
] as const

export interface Chakra {
  readonly index: number // 0..6, root → crown
  readonly name: string
  readonly sanskrit: string
  readonly bija: string
  readonly measure: string // horo measure name (base..unity)
  readonly digit: HoroStep // the position digit (the math)
  readonly note: string // C..B
  readonly solfege: string // Do..Ti
  readonly hz: number // A432 just-intonation
  readonly uuid: string // THE COORDINATE — content-uuid, computed from the math
  readonly hex: string // computed colour (CMYK channel from the position)
  readonly channel: string
  readonly traditionalColour: string // the rainbow overlay (not claimed identical)
  readonly movement: number // doubling successor digit (the rodin step)
}

/** The seven centers, computed. uuid is from the position math; colour is derived from it. */
export function chakras(): Chakra[] {
  return HORO_DIGITS.map((digit, i) => {
    const measure = HORO_MEASURE[i]!
    const n = NOTES[digit]
    const sig = signalForStep(digit)
    const t = TRADITION[i]!
    return {
      index: i,
      name: t.name,
      sanskrit: t.sanskrit,
      bija: t.bija,
      measure,
      digit,
      note: n.note,
      solfege: n.solfege,
      hz: n.hz,
      uuid: nodeOf(measure)?.uuid ?? '',
      hex: sig.hex,
      channel: sig.channel,
      traditionalColour: t.colour,
      movement: composeSteps(digit, 2),
    }
  })
}

/** The coordinate of a center: its content-uuid, computed from the position MATH (never the colour). */
export function uuidOf(measure: string): string | undefined {
  return nodeOf(measure)?.uuid
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('chakra -- the 7 centers = the 7 horo positions (uuid from math, colour rendered from it):')
  console.log('  anchor 0/K/black @ ' + ANCHOR.hz + ' Hz')
  for (const c of chakras()) {
    console.log(
      '  ' + c.index + ' ' + c.name.padEnd(12) + ' ' + c.measure.padEnd(8) +
        ' d' + c.digit + ' ' + c.note + '/' + c.solfege + ' ' + String(c.hz).padStart(6) + 'Hz' +
        ' ' + c.channel + ' ' + c.hex + ' (trad ' + c.traditionalColour + ')' +
        ' move→d' + c.movement + ' uuid ' + c.uuid.slice(0, 8),
    )
  }
}
