import { readFileSync } from 'node:fs'
import { join } from 'node:path'

/**
 * quantum/interval — the decidable core of special relativity, and the one theorem in it a
 * distributed ledger actually needs.
 *
 * @see ./SKILL.md · ../../verify/lean/Spacetime.lean (the same statements, kernel-checked)
 */

/** Natural units: c = 1. Every velocity here is a fraction of c, never m/s. */
export const lightSpeedUnits = (): string =>
  'c = 1 — velocities are fractions of c; nothing here is in metres per second'

/** Minkowski interval, signature (+,-): positive is timelike, zero is null, negative is spacelike. */
export const interval = (t: number, x: number): number => t * t - x * x

/** Boost by β = p/q, UNNORMALIZED: γ is dropped, scaling the interval by q²-p² > 0. */
export const boostT = (p: number, q: number, t: number, x: number): number => q * t - p * x
export const boostX = (p: number, q: number, t: number, x: number): number => q * x - p * t

/** A physical frame: q > 0 and |β| < 1. There is no frame at or above c. */
export const subluminal = (p: number, q: number): boolean => q > 0 && -q < p && p < q

export type CausalCharacter = 'timelike' | 'null' | 'spacelike'

/** Which side of the light cone a separation lies on — the same in every frame. */
export function causalCharacter(t: number, x: number): CausalCharacter {
  const s = interval(t, x)
  return s > 0 ? 'timelike' : s === 0 ? 'null' : 'spacelike'
}

/**
 * May a ledger seal on the order of these two events? Only on the CLOSED forward cone.
 *
 * The null case is in on purpose: a test found every frame agreeing on exactly the null
 * separations a strict `<` excluded — a light signal carries causation. @see ./SKILL.md
 */
export const sealable = (t: number, x: number): boolean => t > 0 && x * x <= t * t

/** The frame reversing a spacelike pair, EXHIBITED: β = (2t+1)/(2x) sends Δt ↦ -x. */
export function reversingFrame(t: number, x: number): { p: number; q: number; boosted: number } | null {
  if (!(t > 0 && t < x)) return null
  const [p, q] = [2 * t + 1, 2 * x]
  return { p, q, boosted: boostT(p, q, t, x) }
}

/** …and the frame in which they are simultaneous: β = t/x sends Δt ↦ 0. */
export function simultaneousFrame(t: number, x: number): { p: number; q: number; boosted: number } | null {
  if (!(t > 0 && t < x)) return null
  return { p: t, q: x, boosted: boostT(t, x, t, x) }
}

/** Composition of velocities, as exact integer fractions: β₁ ⊕ β₂ = (β₁+β₂)/(1+β₁β₂). */
export const composeVelocity = (p1: number, q1: number, p2: number, q2: number): [number, number] => [
  p1 * q2 + p2 * q1,
  q1 * q2 + p1 * p2,
]

export type Verdict =
  /** Proved in Spacetime.lean, accepted by the kernel, resting on no physics axiom. */
  | 'theorem'
  /** An assumption about the world. Not derivable — it is where physics enters. */
  | 'axiom'
  /** True and standard, but NOT stated here. Named so its absence is visible. */
  | 'not-stated-here'
  /** Refused: this corpus has no evidence for it, and says so rather than gesturing. */
  | 'refused'

export interface Phenomenon {
  readonly name: string
  readonly verdict: Verdict
  /** The Lean theorem, for a `theorem` verdict. Checked to exist — never merely cited. */
  readonly proof: string | null
  readonly note: string
}

/** Every relativistic phenomenon this corpus touches, with what backs it. @see ./SKILL.md */
const TABLE: readonly (readonly [string, Verdict, string | null, string])[] = [
  ['interval invariance under a boost', 'theorem', 'interval_scales', 'the interval scales by q²-p² > 0, so its sign is fixed'],
  ['the light cone is frame-independent', 'theorem', 'null_invariant', 'null in one frame is null in all — c is the same for every observer BY CONSTRUCTION of the boost, not by assumption here'],
  ['timelike separation stays timelike', 'theorem', 'timelike_invariant', 'no boost moves an event across the cone'],
  ['spacelike separation stays spacelike', 'theorem', 'spacelike_invariant', 'unreachable stays unreachable'],
  ['causal order is absolute', 'theorem', 'timelike_order_absolute', 'if one event could have caused the other, every observer agrees which came first'],
  ['relativity of simultaneity', 'theorem', 'spacelike_simultaneous', 'for spacelike separation there is a frame where Δt = 0'],
  ['time order of spacelike events reverses', 'theorem', 'spacelike_order_reverses', 'the reversing frame is exhibited, not merely proved to exist'],
  ['velocities compose below c', 'theorem', 'velocity_addition_subluminal', 'adding two subluminal boosts never reaches c'],
  ['a ledger may seal only on causal order', 'theorem', 'ledger_order_wellposed', 'THE reason this atom exists — see SKILL'],
  ['proper time is invariant', 'theorem', 'interval_scales', 'the clock-at-rest case (x = 0) of the same theorem'],
  ['constancy of c', 'axiom', null, "Einstein's second postulate. Empirical (Michelson–Morley) and, since 1983, DEFINITIONAL: the SI metre is defined from a fixed c, so c is no longer measured at all"],
  ['spacetime is flat (no gravity)', 'axiom', null, 'special relativity only. Curvature, and therefore all of general relativity, is outside every theorem here'],
  ['time dilation and length contraction as coordinate statements', 'not-stated-here', null, 'corollaries of the boost; they need γ and therefore the reals, which this integer development deliberately avoids'],
  ['the twin "paradox"', 'not-stated-here', null, 'not a paradox — proper time is path-dependent. True, standard, and not proved here'],
  ['faster-than-light travel or signalling', 'refused', null, "no theorem here yields it and none can. erpax's own `quantum/ftl` measures a computational SPEEDUP — a dimensionless log-ratio of work avoided — which is not a velocity. Reading that as physical FTL is a category error between two quantities with different dimensions"],
  ['entanglement transmitting information', 'refused', null, 'no-signalling is a theorem of quantum mechanics, not of this file. Correlation is not communication, and nothing here proves either way'],
  ['wormholes · warp metrics · tachyons', 'refused', null, 'general-relativistic or speculative. This corpus holds no evidence for them and will not gesture at any'],
]

/** The Lean file is the arbiter for a `theorem` verdict, and it is READ. */
export function phenomena(cwd: string = process.cwd()): Phenomenon[] {
  let lean = ''
  try {
    lean = readFileSync(join(cwd, 'src/verify/lean/Spacetime.lean'), 'utf8')
  } catch {
    /* absent file ⇒ every theorem verdict goes unbacked below, which is the honest report */
  }
  const proved = new Set([...lean.matchAll(/^theorem\s+([A-Za-z_]\w*)/gm)].map((m) => m[1]!))
  return TABLE.map(([name, verdict, proof, note]) => ({
    name,
    verdict,
    proof,
    note: verdict === 'theorem' && proof !== null && !proved.has(proof) ? `UNBACKED — no theorem ${proof} in Spacetime.lean. ${note}` : note,
  }))
}

/** A `theorem` verdict whose named proof is not in the kernel file. Zero is a theorem. */
export const unbackedPhenomena = (cwd: string = process.cwd()): Phenomenon[] =>
  phenomena(cwd).filter((p) => p.verdict === 'theorem' && p.note.startsWith('UNBACKED'))

/** Fails closed: a physics claim citing a proof that does not exist is the worst kind of prose. */
export function assertPhenomenaBacked(cwd: string = process.cwd()): void {
  const bad = unbackedPhenomena(cwd)
  if (bad.length === 0) return
  throw new Error(
    `✖ quantum/interval — ${bad.length} phenomenon(a) claim a theorem that does not exist:\n` +
      bad.map((p) => `  ${p.name} → ${p.proof}`).join('\n'),
  )
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const all = phenomena()
  const by = (v: Verdict): number => all.filter((p) => p.verdict === v).length
  console.log(`quantum/interval — ${all.length} phenomena · ${by('theorem')} theorem · ${by('axiom')} axiom · ${by('not-stated-here')} not stated · ${by('refused')} refused`)
  console.log(lightSpeedUnits())
  for (const p of all) console.log(`  ${p.verdict.padEnd(16)} ${p.name}${p.proof ? `  [${p.proof}]` : ''}`)
  console.log(`\nunbacked theorem claims: ${unbackedPhenomena().length} (zero is a theorem)`)
}
