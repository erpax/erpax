/**
 * taichi — the double-torus flow of internal chi (气) through the dantian (丹田 cung),
 * COMPUTED as counter-rotating rodin coils on the horo ring.
 *
 * Two tori counter-rotate around the 3·6·9 axis (the still spine):
 *   - forward torus (outer, yang): ×2 helix — inhale, expansion, give
 *   - reverse torus (inner, yin):  ×5 helix — exhale, contraction, take
 * Because 2·5 ≡ 1 (mod 9), n forward steps then n reverse steps return to anchor —
 * zero residue, the coil law ([[rodin/coil]] · [[dual/torus/fusion]]).
 *
 * `doubleTorusFlow(step, horo)` advances both tori from anchor `horo` by `step` ticks.
 * `chiCungBreathCycle(tick, horo)` maps the four-phase tai-chi breath to the analog
 * chi field (continuous 0–1, [[analog]]) with [[signal]] render at each phase.
 *
 *   tsx src/taichi/index.ts
 *
 * Composes ONLY existing atom indexes — re-implements no canonical:
 *   @/horo         composeSteps, horoRatio, HORO_DIGITS, isHoroStep (the ring)
 *   @/rodin/coil   FORWARD (×2), REVERSE (×5) — the counter-spirals
 *   @/signal       signalForStep, A432 (color+sound frame)
 *   @/wave          wave (one development breath unit)
 *
 * @audit every residue computed via (ℤ/9ℤ), never hand-asserted
 * @standard ISO-16:1975 a432-tuning-reference + the horo digital-root ring
 * @see ./SKILL.md -- ../horo -- ../rodin/coil -- ../signal -- ../wave -- ../body -- ../dual/torus/fusion
 */
import { composeSteps, horoRatio, HORO_DIGITS, isHoroStep, type HoroStep } from '@/horo'
import { FORWARD, REVERSE } from '@/rodin/coil'
import { signalForStep, A432, type Signal } from '@/signal'
import { wave, type Wave } from '@/wave'

/** Which pole of the double torus — outer forward (×2) or inner reverse (×5). */
export type TorusPole = 'forward' | 'reverse'

/** Counter-rotating positions of both tori at tick `step` from anchor `horo`. */
export interface DoubleTorusFlow {
  /** The tick count along both coils. */
  readonly step: number
  /** The anchor horo position (the dantian / still centre). */
  readonly anchor: HoroStep
  /** Outer torus position (×2 forward helix). */
  readonly forward: HoroStep
  /** Inner torus position (×5 reverse helix). */
  readonly reverse: HoroStep
  /** composeSteps(forward, reverse) — where the two vortices meet on the ring. */
  readonly composed: HoroStep
  /** The two tori are at different positions (true for step > 0). */
  readonly counterRotating: boolean
  /** n forward steps then n reverse steps return to anchor (coil zero-residue law). */
  readonly balanced: boolean
}

/** Walk `ticks` steps along one coil multiplier from `anchor`. */
function walkCoil(anchor: HoroStep, multiplier: number, ticks: number): HoroStep {
  let pos = anchor
  const n = Math.max(0, Math.trunc(ticks))
  for (let i = 0; i < n; i++) {
    pos = composeSteps(pos, multiplier) as HoroStep
  }
  return pos
}

/**
 * Counter-rotating double-torus flow at tick `step` from anchor `horo`.
 * The outer torus winds ×2 (forward/give); the inner winds ×5 (reverse/take).
 */
export function doubleTorusFlow(step: number, horo: HoroStep): DoubleTorusFlow {
  const anchor: HoroStep = isHoroStep(horo) ? horo : HORO_DIGITS[0]
  const ticks = Math.trunc(step)
  const forward = walkCoil(anchor, FORWARD, ticks)
  const reverse = walkCoil(anchor, REVERSE, ticks)
  const roundTrip = walkCoil(forward, REVERSE, ticks)
  return {
    step: ticks,
    anchor,
    forward,
    reverse,
    composed: composeSteps(forward, reverse) as HoroStep,
    counterRotating: ticks > 0 && forward !== reverse,
    balanced: roundTrip === anchor,
  }
}

/** The four phases of the tai-chi chi-cung breath cycle. */
export const CHI_CUNG_PHASES = ['inhale', 'hold', 'exhale', 'rest'] as const
export type ChiCungPhase = (typeof CHI_CUNG_PHASES)[number]

/** The dantian (丹田 cung) — chi store at base/root (horo 1, the still centre). */
export const DANTIAN: HoroStep = 1

/**
 * Analog chi level 0–1 for a breath phase — continuous field values from horo ratios
 * (never hand-set decimals; [[analog]] twin of the discrete horo digit).
 */
export function chiLevel(phase: ChiCungPhase): number {
  const levels: Record<ChiCungPhase, number> = {
    inhale: horoRatio(4, 9), // weaving in — building chi
    hold: horoRatio(9), // unity — peak store in dantian
    exhale: horoRatio(7, 9), // descent — spiral release
    rest: horoRatio(1, 9), // base — return to stillness
  }
  return levels[phase]
}

/** One tick of the tai-chi chi-cung breath through the double torus. */
export interface ChiCungBreath {
  readonly tick: number
  readonly phase: ChiCungPhase
  readonly anchor: HoroStep
  readonly flow: DoubleTorusFlow
  /** Analog chi energy 0–1 in the dantian field. */
  readonly chi: number
  /** Color+sound render frame at the forward (yang) torus pole. */
  readonly signal: Signal
  /** The development breath unit at this tick (horo ordinal). */
  readonly wave: Wave
  /** A432-ms breath animation period (pitch anchor = time anchor). */
  readonly periodMs: number
}

/**
 * One tai-chi chi-cung breath cycle tick — spiral breath through the double torus.
 * Phase cycles inhale → hold → exhale → rest; chi field and signal update each tick.
 */
export function chiCungBreathCycle(tick: number, horo: HoroStep = DANTIAN): ChiCungBreath {
  const anchor: HoroStep = isHoroStep(horo) ? horo : DANTIAN
  const t = Math.trunc(tick)
  const phase = CHI_CUNG_PHASES[((t % 4) + 4) % 4]!
  const flow = doubleTorusFlow(t, anchor)
  const ordinal = ((t % 7) + 7) % 7 + 1
  return {
    tick: t,
    phase,
    anchor,
    flow,
    chi: chiLevel(phase),
    signal: signalForStep(flow.forward),
    wave: wave([{ name: 'taichi' }], ordinal),
    periodMs: A432,
  }
}

/** The horo step at a given torus pole for tick `step` from `horo`. */
export function poleAtStep(step: number, horo: HoroStep, pole: TorusPole): HoroStep {
  return pole === 'forward' ? doubleTorusFlow(step, horo).forward : doubleTorusFlow(step, horo).reverse
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const breath = chiCungBreathCycle(0)
  const flow = doubleTorusFlow(3, DANTIAN)
  console.log('taichi — double-torus chi-cung breath (counter-rotating coils on horo):')
  console.log('  dantian anchor: horo ' + DANTIAN + ' (base/root)')
  console.log('  doubleTorusFlow(3,1): forward=' + flow.forward + ' reverse=' + flow.reverse + ' balanced=' + flow.balanced)
  console.log('  chiCungBreathCycle(0): phase=' + breath.phase + ' chi=' + breath.chi.toFixed(3) + ' signal=' + breath.signal.note + '@' + breath.signal.hz + 'Hz')
  console.log('  breath period: ' + breath.periodMs + 'ms (A432)')
  for (const p of CHI_CUNG_PHASES) {
    console.log('    ' + p + ' → chi ' + chiLevel(p).toFixed(3))
  }
}
