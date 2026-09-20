/**
 * rotation — two counter-rotating regular polygons, and when their torques cancel.
 *
 * A merkaba is two interpenetrating tetrahedra turning opposite ways. Its projection along the
 * shared axis is a hexagram: two equilateral triangles, offset by 60°. That projection is not a
 * metaphor for a hexacopter — it IS one. Six arms at 60° spacing, spin alternating around the ring,
 * and the three counter-clockwise motors sit at 30°·150°·270° while the three clockwise ones sit at
 * 90°·210°·330°. Two equilateral triangles, interpenetrating, counter-rotating.
 *
 * The parent atom ([[horo]]/merkaba) refuses an over-claimed SYMMETRY GROUP over the digits. This
 * child makes the weaker and checkable claim: the ROTATION geometry, and the one thing it buys —
 * torque cancellation.
 *
 * THE RESULT WORTH HAVING: the torques cancel if and only if the rotor count is EVEN. An odd-rotor
 * craft cannot balance yaw by alternating spin, which is why a tricopter needs a tilting tail servo
 * and a pentacopter needs canted motors. That is a fact about parity, not about lift.
 *
 * @standard ISO 1151-1 — flight dynamics, body axes and sign conventions
 */
export const atomPath = 'rotation' as const

/** Which way a rotor turns seen from above. */
export type Spin = 'CW' | 'CCW'

/** One rotor on the ring: where it sits, and which way it turns. */
export interface Rotor {
  readonly index: number
  /** Degrees clockwise from the nose. */
  readonly deg: number
  readonly spin: Spin
}

/**
 * A ring of `n` rotors, evenly spaced, spin alternating.
 *
 * The first arm sits at half a step so that no arm points at the nose — the X configuration. A
 * craft with an arm on the nose (the + configuration) is the same ring rotated, and the torque
 * result below is unaffected by that rotation.
 */
export function ring(n: number): readonly Rotor[] {
  if (!Number.isInteger(n) || n < 2) return []
  const step = 360 / n
  return Array.from({ length: n }, (_, i) => ({
    index: i,
    deg: (i * step + step / 2) % 360,
    spin: (i % 2 === 0 ? 'CCW' : 'CW') as Spin,
  }))
}

/** The rotors turning one way — one of the two interpenetrating figures. */
export function triad(rotors: readonly Rotor[], spin: Spin): readonly Rotor[] {
  return rotors.filter((r) => r.spin === spin)
}

/**
 * Is this set a regular polygon — every neighbour the same angle away?
 *
 * Read from the angles rather than assumed from the construction, so a hand-built ring with an arm
 * in the wrong place is refused rather than trusted.
 */
export function isRegular(rotors: readonly Rotor[]): boolean {
  if (rotors.length < 2) return false
  const sorted = [...rotors].map((r) => r.deg).sort((a, b) => a - b)
  const gaps: number[] = []
  for (let i = 0; i < sorted.length; i++) {
    const a = sorted[i] as number
    const b = (sorted[(i + 1) % sorted.length] as number) + (i + 1 === sorted.length ? 360 : 0)
    gaps.push(Math.round((b - a) * 1000) / 1000)
  }
  return gaps.every((g) => g === gaps[0])
}

/**
 * Net yaw torque with every rotor at equal thrust, in units of one rotor's reaction torque.
 *
 * A rotor's reaction torque opposes its own spin, so a CCW rotor pushes the airframe clockwise.
 * Counting CCW as +1 and CW as −1 gives the imbalance directly: zero means the two figures cancel
 * and the craft holds heading with no yaw input.
 */
export function netTorque(rotors: readonly Rotor[]): number {
  return rotors.reduce((sum, r) => sum + (r.spin === 'CCW' ? 1 : -1), 0)
}

/** The two figures cancel exactly. True for an even ring, false for an odd one. */
export function balanced(rotors: readonly Rotor[]): boolean {
  return rotors.length > 0 && netTorque(rotors) === 0
}

/**
 * The angle the two figures are offset by — half a step, which is what makes them interpenetrate
 * rather than coincide. For a hexagram it is 60°.
 */
export function interpenetration(n: number): number {
  if (!Number.isInteger(n) || n < 2 || n % 2 !== 0) return 0
  return 360 / n
}

export interface RotationFigure {
  readonly n: number
  readonly rotors: readonly Rotor[]
  readonly ccw: readonly Rotor[]
  readonly cw: readonly Rotor[]
  /** Each figure is a regular polygon with n/2 vertices. */
  readonly regular: boolean
  readonly netTorque: number
  readonly balanced: boolean
  /** Degrees between the two figures; 0 when there are not two of them. */
  readonly offset: number
}

/** The whole figure, computed from the rotor count alone. */
export function figure(n: number): RotationFigure {
  const rotors = ring(n)
  const ccw = triad(rotors, 'CCW')
  const cw = triad(rotors, 'CW')
  return {
    n,
    rotors,
    ccw,
    cw,
    regular: ccw.length > 1 && cw.length > 1 && isRegular(ccw) && isRegular(cw),
    netTorque: netTorque(rotors),
    balanced: balanced(rotors),
    offset: interpenetration(n),
  }
}
