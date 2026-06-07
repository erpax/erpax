import { describe, it, expect } from 'vitest'
import { coherence, decohered, purity, entropy, decoherenceTime } from '@/decoherence'

// Decoherence computed as the e^(−t/τ) decay of a two-state density matrix. Tests
// assert the RELATIONS — coherence decay, purity/entropy bounds, irreversibility,
// and dimension-driven speed — never a magic number.
describe('decoherence: a pure superposition decays to a classical mixture', () => {
  const tau = 1

  it('coherence starts pure (1) and decays monotonically toward classical (0)', () => {
    expect(coherence(0, tau)).toBe(1)
    expect(coherence(2, tau)).toBeLessThan(coherence(1, tau))
    expect(coherence(50, tau)).toBeLessThan(1e-6)
    expect(decohered(0, tau)).toBe(0)
  })

  it('purity = ½(1+c²): fully pure (1) at t=0, maximally mixed (½) as t→∞', () => {
    expect(purity(0, tau)).toBe(1)
    for (const t of [0.5, 1, 3]) expect(purity(t, tau)).toBeCloseTo(0.5 * (1 + coherence(t, tau) ** 2), 12)
    expect(purity(50, tau)).toBeCloseTo(0.5, 6)
  })

  it('von Neumann entropy rises irreversibly from 0 (pure) toward ln2 (one bit)', () => {
    expect(entropy(0, tau)).toBeCloseTo(0, 12)
    expect(entropy(0.5, tau)).toBeGreaterThan(entropy(0, tau))
    expect(entropy(2, tau)).toBeGreaterThan(entropy(0.5, tau)) // monotone ⇒ irreversible
    expect(entropy(50, tau)).toBeCloseTo(Math.LN2, 6) // maximally mixed = 1 bit
    expect(entropy(5, tau)).toBeLessThanOrEqual(Math.LN2)
  })

  it('more coupled dimensions ⇒ shorter τ ⇒ faster decoherence (why the macro corpus is classical)', () => {
    const tauSmall = decoherenceTime(1, 1)
    const tauBig = decoherenceTime(1, 1000)
    expect(tauBig).toBeLessThan(tauSmall)
    expect(coherence(0.01, tauBig)).toBeLessThan(coherence(0.01, tauSmall)) // decohered faster at the same t
  })
})
