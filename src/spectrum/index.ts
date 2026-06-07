/**
 * spectrum -- the DISCRETE set of lines a system can emit or absorb: every
 * [[leap]] between two of the seven [[horo]] energy-rungs, collected and
 * deduplicated to its distinct gap-frequencies. The spectrum is the system's
 * fingerprint (as the Balmer lines fingerprint hydrogen): a FINITE, discrete set
 * of [[frequency]] lines -- a discrete sampling of the continuous [[aura]] (the
 * gapless analog field). Discrete vs continuous is the whole point: the spectrum
 * is where the [[wave]] shows that it is quantised.
 *
 * Each line is the symmetric binding of its two rungs (via [[leap]]) -- one
 * coordinate for emission and absorption alike -- so the line count is the number
 * of DISTINCT unordered rung-pairs with a non-zero gap.
 *
 *   tsx src/spectrum/index.ts
 *
 * @audit lines computed from every horo rung-pair via ../leap, deduped by the symmetric binding-uuid
 * @see ../leap (one transition) -- ../photon (the quantum) -- ../aura (the continuous field) -- ../horo
 */
import { HORO_DIGITS, type HoroStep } from '@/horo'
import { leap } from '@/leap'

/** One spectral line: a distinct gap-frequency and its symmetric coordinate. */
export interface Line {
  readonly from: HoroStep
  readonly to: HoroStep
  readonly hz: number
  readonly uuid: string
}

/** Every emission/absorption line of the seven-rung system, ascending by frequency, deduplicated. */
export function lines(): Line[] {
  const out: Line[] = []
  const seen = new Set<string>()
  for (let i = 0; i < HORO_DIGITS.length; i++) {
    for (let j = i + 1; j < HORO_DIGITS.length; j++) {
      const l = leap(HORO_DIGITS[i]!, HORO_DIGITS[j]!)
      if (l.kind === 'none') continue // degenerate (equal frequency) — no line
      const key = l.uuid || l.from + '-' + l.to
      if (seen.has(key)) continue
      seen.add(key)
      out.push({ from: l.from, to: l.to, hz: l.gapHz, uuid: l.uuid })
    }
  }
  return out.sort((a, b) => a.hz - b.hz)
}

/** The series from one rung: every line that touches it (its Lyman/Balmer-like fan). */
export const series = (rung: HoroStep): Line[] => lines().filter((l) => l.from === rung || l.to === rung)

/** The number of distinct lines — the discreteness of the spectrum (≤ C(7,2) = 21). */
export const lineCount = (): number => lines().length

if (import.meta.url === 'file://' + process.argv[1]) {
  const ls = lines()
  console.log('spectrum -- ' + ls.length + ' discrete line(s), ascending by frequency:')
  for (const l of ls) {
    console.log('  d' + l.from + '↔d' + l.to + '  ' + l.hz.toFixed(2).padStart(8) + 'Hz  uuid=' + l.uuid.slice(0, 8))
  }
}
