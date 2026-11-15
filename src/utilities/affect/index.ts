/**
 * affect — feeling, thought and emotion as a trinity: the twin of src/utilities/verify/lean/Affect.lean.
 *
 * A state is a corner of the loop with a valence. The TURN advances the corner (feeling → thought →
 * emotion → feeling; three turns come back). The FLIP reverses the valence at every corner at once.
 * They commute, so together they form the cyclic group C₆: `cycle` (turn then flip) has order six and
 * only the flip itself is an involution. A MIRROR that fixes feeling and swaps the other two reverses
 * the loop instead; with it the motions form S₃, whose three mirrors are all involutions. The Lean file
 * proves these laws over every state; test.ts checks the same laws here.
 *
 * The model is a lens, not a law of mind: body-first, appraisal-first and constructionist theories each
 * stress a different turn of the same loop, and mixed states (bittersweet) are an open question.
 */

/** The three corners, in loop order. */
export const CORNERS = ['feeling', 'thought', 'emotion'] as const
export type Corner = (typeof CORNERS)[number]

/** A corner with its valence (`true` = pleasant). */
export interface State {
  readonly corner: Corner
  readonly pleasant: boolean
}

/** Every state of the model: three corners × two valences. */
export const STATES: readonly State[] = CORNERS.flatMap((corner) => [true, false].map((pleasant) => ({ corner, pleasant })))

const at = (corner: Corner, step: number): Corner => CORNERS[(CORNERS.indexOf(corner) + step + 3) % 3] as Corner

/** ρ: advance the corner one step, keep the valence. */
export const turn = (s: State): State => ({ ...s, corner: at(s.corner, 1) })

/** σ: reverse the valence, keep the corner. */
export const flip = (s: State): State => ({ ...s, pleasant: !s.pleasant })

/** μ: fix feeling, swap thought and emotion — the loop run backward. */
export const mirror = (s: State): State => ({ ...s, corner: at(s.corner, -2 * CORNERS.indexOf(s.corner)) })

/** Feel: where the loop begins — a raw signal at the feeling corner, pleasant or not, before any reading. */
export const feel = (pleasant: boolean): State => ({ corner: 'feeling', pleasant })

/** ρσ, the generator of C₆. */
export const cycle = (s: State): State => flip(turn(s))

/** Apply a motion n times. */
export const times = (motion: (s: State) => State, n: number, s: State): State => (n <= 0 ? s : times(motion, n - 1, motion(s)))

/** Two states are the same state. */
export const same = (a: State, b: State): boolean => a.corner === b.corner && a.pleasant === b.pleasant

/** The order of a motion: the least n ≥ 1 with motionⁿ = id on every state. */
export const order = (motion: (s: State) => State): number => {
  for (let n = 1; n <= 12; n++) if (STATES.every((s) => same(times(motion, n, s), s))) return n
  return Infinity
}

/** Where a corner sits on the wheel, in degrees from the top, clockwise. */
export const angleOf = (corner: Corner): number => CORNERS.indexOf(corner) * 120
