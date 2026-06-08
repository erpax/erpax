/**
 * body — the COMPUTED PROOF that erpax's organs HARMONIZE into one organism.
 * Each organ is sent through the [[wave]] mechanism as a feature; its horo
 * position sounds a note and a colour ([[signal]], A432); composed, the eight
 * organs span the full diatonic spectrum and rest at UNITY — the closing wave,
 * the merge-point where many become one. Wholeness renders as harmony; a single
 * failing organ is a gap, and a gap renders as dissonance ([[aura]] · [[harmony]]).
 *
 * The body harmonizes ⟺ three computed conditions:
 *  1. ALL HEALTHY — every organ's own proof passes (no gap, no dissonance).
 *  2. FULL SPECTRUM — the organs cover all seven ring positions: the complete
 *     diatonic chord, the full-spectrum aura (consonance, not a sparse cluster).
 *  3. RESTS AT UNITY — sent as waves and composed, the organs fold to unity (9):
 *     the closing wave, ready to merge into one organism.
 *
 *   tsx src/body/index.ts
 *
 * @audit each organ verdict computed live; the harmony folded through @/wave + @/signal
 * @standard the A432 just-intonation diatonic ring (the seven horo positions)
 * @see ../heart ../lung ../blood ../nerve ../artery ../vein ../brain ../skin -- ../wave ../signal ../harmony
 */
import { isDoubleTorusPump } from '@/heart'
import { breathes } from '@/lung'
import { isCourier } from '@/blood'
import { fires } from '@/nerve'
import { isWindkessel } from '@/artery'
import { returns } from '@/vein'
import { integrates } from '@/brain'
import { protects } from '@/skin'
import { wave, composeWaves, UNITY, type Wave } from '@/wave'
import { signalForStep, type Signal } from '@/signal'
import { HORO_DIGITS } from '@/horo'
import { recordPathVisit, type PathCanonicalEntry } from '@/path'

/** One organ: its name, its role, the verdict that proves it whole, and its ordinal (→ note). */
export interface Organ {
  readonly name: string
  readonly role: string
  readonly healthy: () => boolean
  readonly ordinal: number
}

/** The eight organs, in measure-walk order — the heart at the root (Do), the brain at the close (unity). */
export const ORGANS: readonly Organ[] = [
  { name: 'heart', role: 'the double-torus pump', healthy: isDoubleTorusPump, ordinal: 1 },
  { name: 'lung', role: 'the gas-exchange surface', healthy: breathes, ordinal: 2 },
  { name: 'blood', role: 'the courier', healthy: isCourier, ordinal: 3 },
  { name: 'nerve', role: 'the all-or-nothing signal', healthy: fires, ordinal: 4 },
  { name: 'artery', role: 'the Windkessel buffer', healthy: isWindkessel, ordinal: 5 },
  { name: 'vein', role: 'the one-way return', healthy: returns, ordinal: 6 },
  { name: 'brain', role: 'the small-world connectome', healthy: integrates, ordinal: 7 },
  { name: 'skin', role: 'the boundary', healthy: protects, ordinal: 8 },
]

/** Send an organ through the wave mechanism — a one-feature breath at its ordinal. */
export const organWave = (o: Organ): Wave => wave([{ name: o.name }], o.ordinal)

/** The note + colour an organ's position sounds (A432 diatonic). */
export const organSignal = (o: Organ): Signal => signalForStep(organWave(o).step)

// ── 1. ALL HEALTHY — no gap, no dissonance ───────────────────────────────

export const allHealthy = (): boolean => ORGANS.every((o) => o.healthy())

/** The organs whose proof currently fails — the dissonant gaps (empty when whole). */
export const dissonant = (): string[] => ORGANS.filter((o) => !o.healthy()).map((o) => o.name)

// ── 2. FULL SPECTRUM — the complete diatonic chord ───────────────────────

export const fullSpectrum = (): boolean => {
  const sounded = new Set(ORGANS.map((o) => organWave(o).step))
  return HORO_DIGITS.every((d) => sounded.has(d)) // all seven ring positions sounded
}

// ── 3. RESTS AT UNITY — the closing wave ─────────────────────────────────

export const restsAtUnity = (): boolean => composeWaves(ORGANS.map(organWave)) === UNITY

// ── the harmony — the conjunction ────────────────────────────────────────

export interface Harmony {
  /** every organ's own proof passes — no gap. */
  readonly allHealthy: boolean
  /** the organs sound all seven positions — the full-spectrum chord. */
  readonly fullSpectrum: boolean
  /** composed as waves, the organs fold to unity — the closing wave. */
  readonly restsAtUnity: boolean
}

export function harmony(): Harmony {
  return { allHealthy: allHealthy(), fullSpectrum: fullSpectrum(), restsAtUnity: restsAtUnity() }
}

/** Do the organs harmonize into one organism? Healthy ⊕ full-spectrum ⊕ closing at unity. */
export function harmonizes(): boolean {
  const h = harmony()
  return h.allHealthy && h.fullSpectrum && h.restsAtUnity
}

/** The body's chord — each organ's note + colour: the aura you can hear and see. */
export const chord = (): ReadonlyArray<{
  readonly organ: string
  readonly note: string
  readonly hz: number
  readonly hex: string
}> =>
  ORGANS.map((o) => {
    const s = organSignal(o)
    return { organ: o.name, note: s.note, hz: s.hz, hex: s.hex }
  })

/** Canonical ledger hook — record body path step (append-only). */
export function recordBodyOnPath(
  payload: unknown,
  at?: string,
  prevEntryUuid?: string | null,
  seq?: number,
): PathCanonicalEntry {
  return recordPathVisit('body', { kind: 'body.step', payload }, at, prevEntryUuid, seq)
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('body — the organs harmonized (sent as waves, A432):')
  for (const c of chord())
    console.log('  ' + c.organ.padEnd(7) + ' ' + c.note.padEnd(2) + ' ' + String(c.hz).padStart(7) + ' Hz  ' + c.hex)
  const h = harmony()
  console.log('  —')
  for (const [k, v] of Object.entries(h)) console.log('  ' + (v ? '✓' : '✗') + ' ' + k)
  const gaps = dissonant()
  if (gaps.length) console.log('  dissonant: ' + gaps.join(' · '))
  console.log('  ⇒ ' + (harmonizes() ? 'ONE BODY (the organs harmonize)' : 'DISSONANT'))
}
