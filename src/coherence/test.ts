import { describe, it, expect } from 'vitest'
import { extractPulse, coherence, detrend } from '@/coherence'

// The edge-safe rPPG/coherence analyzer (runs unchanged in a Cloudflare Worker).
// Gated on SYNTHETIC signals with KNOWN ground truth — computed, not asserted.
function sine(freqHz: number, fps: number, seconds: number, amp = 4, dc = 128, driftHz = 0.05, drift = 8): number[] {
  const out: number[] = []
  for (let i = 0; i < Math.round(fps * seconds); i++) {
    out.push(dc + amp * Math.sin((2 * Math.PI * freqHz * i) / fps) + drift * Math.sin((2 * Math.PI * driftHz * i) / fps))
  }
  return out
}
// Deterministic pseudo-noise (LCG) — reproducible, no Math.random.
function noise(n: number, dc = 128, amp = 6): number[] {
  let s = 12345
  const out: number[] = []
  for (let i = 0; i < n; i++) {
    s = (1103515245 * s + 12345) % 2147483648
    out.push(dc + amp * (s / 2147483648 - 0.5))
  }
  return out
}

describe('coherence: edge-safe rPPG pulse extraction (synthetic ground truth)', () => {
  it('recovers 72 bpm from a 1.2 Hz pulse (with slow drift), high confidence', () => {
    const p = extractPulse(sine(1.2, 30, 15), 30)
    expect(p.bpm).toBeGreaterThan(69)
    expect(p.bpm).toBeLessThan(75)
    expect(p.confidence).toBe('good')
    expect(p.coherence).toBeGreaterThan(0.3)
  })

  it('recovers 120 bpm from a 2.0 Hz pulse', () => {
    const p = extractPulse(sine(2.0, 30, 15), 30)
    expect(p.bpm).toBeGreaterThan(117)
    expect(p.bpm).toBeLessThan(123)
  })

  it('a flat trace is inconclusive (no pulse to read)', () => {
    const p = extractPulse(new Array(450).fill(128) as number[], 30)
    expect(p.confidence).toBe('inconclusive')
    expect(p.bpm).toBe(0)
  })

  it('a too-short trace is inconclusive (needs >= 2s)', () => {
    expect(extractPulse([1, 2, 3], 30).confidence).toBe('inconclusive')
  })

  it('coherence is higher for a phase-locked tone than for noise', () => {
    const tone = coherence(sine(1.2, 30, 15, 4, 128, 0, 0), 30)
    const rand = coherence(noise(450), 30)
    expect(tone).toBeGreaterThan(rand)
  })

  it('detrend removes DC + slow drift (zero-mean output)', () => {
    const d = detrend(sine(1.2, 30, 10), 30)
    const m = d.reduce((a, b) => a + b, 0) / d.length
    expect(Math.abs(m)).toBeLessThan(1e-6)
  })
})
