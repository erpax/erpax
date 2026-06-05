/**
 * coherence -- the MATTER-twin: phase-alignment as a measurable number, and the
 * edge-safe rPPG extractor that turns a camera colour-trace into a pulse.
 *
 * EDGE-SAFE BY CONSTRUCTION. Pure arithmetic on a number[] -- no Node builtins,
 * no filesystem, no native modules (no ffmpeg) -- so it runs UNCHANGED in a
 * Cloudflare Worker. That is the rPPG "escape the limitations": the heavy/native
 * capture stays in the BROWSER (getUserMedia + canvas extract a per-frame skin
 * ROI mean), and only this tiny number[] crosses the wire to the edge, where the
 * Worker computes the pulse and persists via a binding. See the route handler
 * src/app/(frontend)/next/coherence.
 *
 * coherence(signal) in [0,1] = spectral concentration = how phase-locked the
 * wave is (wholeness renders as coherence; a gap/tamper as decoherence). HRV /
 * rPPG coherence is a real, measured intra-body state; the inter-personal "aura
 * field coherence" claim is refuted (see SKILL.md) and is NOT computed here.
 *
 * @standard DSP magnitude-spectrum (DFT) + the 0.7..4 Hz human-pulse band
 * @audit computed from the input trace, never hand-asserted
 * @see ./SKILL.md ../signal (render bpm->colour/sound) ../analog ../biophoton
 */

/** The human-pulse band: 0.7..4 Hz = 42..240 bpm. */
export const PULSE_LO = 0.7
export const PULSE_HI = 4.0

function mean(x: readonly number[]): number {
  let s = 0
  for (const v of x) s += v
  return x.length ? s / x.length : 0
}

function std(x: readonly number[], m = mean(x)): number {
  let s = 0
  for (const v of x) s += (v - m) * (v - m)
  return x.length ? Math.sqrt(s / x.length) : 0
}

/** High-pass detrend: subtract a centred moving average (window samples), then z-normalise. */
export function detrend(x: readonly number[], window: number): number[] {
  const n = x.length
  const w = Math.max(1, Math.floor(window))
  const out: number[] = new Array(n)
  for (let i = 0; i < n; i++) {
    const a = Math.max(0, i - w)
    const b = Math.min(n, i + w + 1)
    let s = 0
    for (let j = a; j < b; j++) s += x[j]!
    out[i] = x[i]! - s / (b - a)
  }
  const m = mean(out)
  const sd = std(out, m) || 1
  for (let i = 0; i < n; i++) out[i] = (out[i]! - m) / sd
  return out
}

/** Hann-windowed copy (reduces spectral leakage). */
function hann(x: readonly number[]): number[] {
  const n = x.length
  const out: number[] = new Array(n)
  for (let i = 0; i < n; i++) out[i] = x[i]! * (0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (n - 1)))
  return out
}

/** |DFT(x)|^2 at frequency f (Hz), x sampled at fps. */
function powerAt(x: readonly number[], f: number, fps: number): number {
  const w = (2 * Math.PI * f) / fps
  let re = 0
  let im = 0
  for (let i = 0; i < x.length; i++) {
    re += x[i]! * Math.cos(w * i)
    im += x[i]! * Math.sin(w * i)
  }
  return re * re + im * im
}

/** Band magnitude-spectrum on a fine grid. */
function bandSpectrum(x: readonly number[], fps: number, lo: number, hi: number, step = 0.01): { f: number; p: number }[] {
  const out: { f: number; p: number }[] = []
  for (let f = lo; f <= hi + 1e-9; f += step) out.push({ f, p: powerAt(x, f, fps) })
  return out
}

/** Half-width (Hz) of the "around the peak" band used for spectral concentration. */
const PEAK_HALF = 0.2

/** Fraction of band power within ±PEAK_HALF of the dominant peak — concentration in [0,1]. */
function concentration(spec: readonly { f: number; p: number }[]): number {
  let total = 0
  let peak = spec[0]!
  for (const s of spec) {
    total += s.p
    if (s.p > peak.p) peak = s
  }
  if (total <= 0) return 0
  let near = 0
  for (const s of spec) if (Math.abs(s.f - peak.f) <= PEAK_HALF) near += s.p
  return near / total
}

/** Spectral coherence in [0,1]: power concentrated around the dominant peak (1 = one phase-locked tone). */
export function coherence(signal: readonly number[], fps = 30, lo = PULSE_LO, hi = PULSE_HI): number {
  if (signal.length < 4) return 0
  const x = hann(detrend(signal, Math.max(1, Math.round(fps))))
  return concentration(bandSpectrum(x, fps, lo, hi))
}

export interface Pulse {
  readonly hz: number
  readonly bpm: number
  readonly snr: number
  readonly coherence: number
  readonly confidence: 'good' | 'weak' | 'inconclusive'
  readonly frames: number
  readonly seconds: number
}

const inconclusive = (frames: number, fps: number): Pulse => ({
  hz: 0, bpm: 0, snr: 0, coherence: 0, confidence: 'inconclusive', frames, seconds: frames / fps,
})

/**
 * rPPG: a per-frame skin-ROI colour trace (e.g. mean green) -> pulse. Edge-safe
 * pure arithmetic, so the Worker runs it directly; the camera capture is the
 * BROWSER's job and only this number[] reaches the edge.
 */
export function extractPulse(trace: readonly number[], fps = 30): Pulse {
  const frames = trace.length
  if (frames < 2 * fps || std(trace) < 0.05) return inconclusive(frames, fps)
  const x = hann(detrend(trace, Math.round(fps)))
  const spec = bandSpectrum(x, fps, PULSE_LO, PULSE_HI)
  let peak = spec[0]!
  const ps: number[] = []
  for (const s of spec) {
    ps.push(s.p)
    if (s.p > peak.p) peak = s
  }
  ps.sort((a, b) => a - b)
  const median = ps[Math.floor(ps.length / 2)] || 1
  const snr = peak.p / median
  const confidence: Pulse['confidence'] = snr >= 6 ? 'good' : snr >= 3 ? 'weak' : 'inconclusive'
  return { hz: peak.f, bpm: peak.f * 60, snr, coherence: concentration(spec), confidence, frames, seconds: frames / fps }
}
