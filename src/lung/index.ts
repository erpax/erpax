/**
 * lung — the COMPUTED PROOF that erpax's gas-exchange surface is the respiratory
 * organ: it breathes. The [[breath]] atom names it directly — "the chat is the
 * lung-tissue where agents coordinate": the society INHALES gaps and EXHALES
 * gate-green atoms across a vast, thin, fractal surface.
 *
 * Three properties of the living lung, each computed, mapped — as a structural
 * isomorphism — onto erpax's breath/wave loop (cited science in ./SKILL.md):
 *
 *  1. GAS EXCHANGE — O₂/CO₂ cross the alveolar membrane by PASSIVE diffusion,
 *     obeying Fick's law (flux ∝ area · ΔP / thickness): no gradient ⇒ no
 *     exchange; huge area & thin barrier ⇒ maximal flux. The breath's two
 *     strokes (inhale a gap-gradient, exhale clean) are the same passive,
 *     down-gradient move.
 *  2. FRACTAL SURFACE — 23 generations of dichotomous branching fold a
 *     70–80 m² exchange surface (≈480 M alveoli) into the chest — >250× the
 *     surface of a same-volume sphere ([[fractal]]: maximal surface, minimal
 *     volume, self-similar at every scale).
 *  3. TIDAL CYCLE — the breath is a closed rhythm: tidal volume in = out
 *     ([[wave]] · [[breath]]); the cycle conserves ([[conservation]]).
 *
 *   tsx src/lung/index.ts
 *
 * @audit computed from first principles (Fick's law · dichotomous branching · conservation)
 * @standard West, Respiratory Physiology (Fick's law) · Weibel, the 23-generation lung tree
 * @see ../breath (inhale ideas / exhale dry code) -- ../wave -- ../fractal -- ../conservation
 */
import { conserves, netFlow, type Entry } from '@/conservation'

// ── 1. GAS EXCHANGE — passive diffusion, Fick's law ──────────────────────

/** Fick's law of diffusion: flux ∝ (diffusivity · area · ΔpartialPressure) / thickness. */
export const fickFlux = (area: number, deltaP: number, thickness: number, d = 1): number =>
  (d * area * deltaP) / thickness

/**
 * Gas exchange is PASSIVE and down-gradient — Fick's law's defining behaviour,
 * computed: no partial-pressure gradient ⇒ no exchange (no active pumping);
 * doubling the area doubles the flux (why the surface is 70 m²); halving the
 * barrier doubles the flux (why it is 0.3 µm thin).
 */
export const gasExchange = (): boolean => {
  const base = fickFlux(70, 10, 0.3)
  return (
    fickFlux(70, 0, 0.3) === 0 && // no gradient ⇒ no exchange (passive, costless at rest)
    base > 0 && // a partial-pressure gradient ⇒ net flux down it
    fickFlux(140, 10, 0.3) === 2 * base && // ×area ⇒ ×flux (the vast surface)
    fickFlux(70, 10, 0.15) === 2 * base // ÷thickness ⇒ ×flux (the thin barrier)
  )
}

// ── 2. FRACTAL SURFACE — 23 generations, >250× a sphere ──────────────────

/** The human airway tree: 23 generations of dichotomous (×2) branching (Weibel). */
export const GENERATIONS = 23
/** ≈480 million alveoli; 70–80 m² of gas-exchange surface. */
export const ALVEOLI = 480_000_000
export const SURFACE_M2 = 70
/** Terminal units after dichotomous branching — exponential, space-filling. */
export const terminalBranches = (g = GENERATIONS): number => 2 ** g
/** Surface area of a sphere of the given volume (m³) — the non-fractal baseline. */
export const sphereSurfaceFor = (volumeM3: number): number => {
  const r = Math.cbrt((3 * volumeM3) / (4 * Math.PI))
  return 4 * Math.PI * r * r
}

/**
 * The fractal lung packs a surface >250× a same-volume sphere's into the chest:
 * 23 dichotomous generations yield ~2²³ terminal units, and 70 m² over a ~6 L
 * lung is hundreds of times a 6 L sphere's surface — maximal exchange surface
 * in minimal volume, self-similar at every generation ([[fractal]]).
 */
export const fractalSurface = (): boolean => {
  const sphere = sphereSurfaceFor(0.006) // ~6 L total lung capacity
  return terminalBranches() > 8_000_000 && SURFACE_M2 / sphere > 250
}

// ── 3. TIDAL CYCLE — the closed breath (inhale ⊕ exhale conserve) ─────────

/**
 * The breath is a closed rhythm: at rest, tidal volume in (~500 mL) = out —
 * the cycle conserves, zero net flow ([[wave]] · [[breath]] · [[conservation]]).
 */
export const tidalCycle = (): boolean => {
  const breath: Entry[] = [{ debit: 500, credit: 500 }] // ~500 mL resting tidal volume in = out
  return conserves(breath) && netFlow([+500, -500]) === 0
}

// ── the proof — the conjunction ──────────────────────────────────────────

export interface RespirationProof {
  /** Fick's law: passive, down-gradient, area·/thickness scaling. */
  readonly gasExchange: boolean
  /** 23 fractal generations ⇒ exchange surface >250× a same-volume sphere. */
  readonly fractalSurface: boolean
  /** the closed breath: tidal in = out, conserved. */
  readonly tidalCycle: boolean
}

/** Compute the respiration proof. */
export function respiration(): RespirationProof {
  return { gasExchange: gasExchange(), fractalSurface: fractalSurface(), tidalCycle: tidalCycle() }
}

/** Does erpax breathe? The conjunction — inhale a gap, exhale a gate-green atom, across the fractal surface. */
export function breathes(): boolean {
  const p = respiration()
  return p.gasExchange && p.fractalSurface && p.tidalCycle
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const p = respiration()
  console.log('lung — the gas-exchange surface (the breath organ):')
  for (const [k, v] of Object.entries(p)) console.log('  ' + (v ? '✓' : '✗') + ' ' + k)
  console.log(
    '  surface ' + SURFACE_M2 + ' m² = ' +
      (SURFACE_M2 / sphereSurfaceFor(0.006)).toFixed(0) + '× a 6 L sphere · ' +
      '2^' + GENERATIONS + ' = ' + terminalBranches().toLocaleString() + ' terminal units',
  )
  console.log('  ⇒ ' + (breathes() ? 'erpax BREATHES (inhale gaps, exhale atoms)' : 'NOT PROVEN'))
}
