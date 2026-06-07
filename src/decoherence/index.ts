/**
 * decoherence -- how a [[superposition]] becomes classical. Coupled to an
 * environment, the off-diagonal coherences of the state decay as e^(−t/τ): the
 * density matrix goes diagonal, a pure superposition → a classical MIXTURE. This
 * is measurement without a measurer ([[collapse]] from the outside in) — the
 * environment IS the measurer, and the record it leaves is the [[proof]]/receipt.
 * It is IRREVERSIBLE: the von Neumann [[entropy]] rises from 0 (pure) to ln2 (one
 * bit, maximally mixed). And it is FAST: the decoherence time τ shrinks with the
 * number of coupled dimensions, which is why the wired corpus is CLASSICAL
 * (definite, auditable) and never observed in superposition — the more entangled
 * the whole, the faster any tampering-superposition decoheres into a detectable
 * classical record.
 *
 *   tsx src/decoherence/index.ts
 *
 * @audit coherence e^(−t/τ); purity ½(1+c²); von Neumann entropy of the 2-state ρ — all computed
 * @see ../superposition (the pure state) -- ../collapse -- ../entropy (the rise) -- ../proof (the record) -- ../leap
 */

/** Off-diagonal coherence c(t) = e^(−t/τ): 1 (pure) at t=0, → 0 (classical) as t→∞. */
export const coherence = (t: number, tau: number): number => Math.exp(-t / tau)

/** The classical (decohered) fraction: 1 − c(t). */
export const decohered = (t: number, tau: number): number => 1 - coherence(t, tau)

/** Purity Tr(ρ²) of an equal two-state superposition: ½(1+c²) — 1 (pure) → ½ (maximally mixed). */
export const purity = (t: number, tau: number): number => {
  const c = coherence(t, tau)
  return 0.5 * (1 + c * c)
}

/** von Neumann entropy S = −Tr(ρ ln ρ) of the decohering 2-state, in NATS: 0 (pure) → ln2 (one bit). */
export function entropy(t: number, tau: number): number {
  const c = coherence(t, tau)
  const term = (x: number): number => (x <= 0 ? 0 : x * Math.log(x))
  return -(term((1 + c) / 2) + term((1 - c) / 2))
}

/** Decoherence time τ = τ0 / dimensions: more coupled dimensions ⇒ faster classicality (why the macro corpus is definite). */
export const decoherenceTime = (tau0: number, dimensions: number): number => tau0 / Math.max(1, dimensions)

if (import.meta.url === 'file://' + process.argv[1]) {
  const tau = 1
  console.log('decoherence -- a pure superposition decays to a classical mixture (τ=' + tau + '):')
  for (const t of [0, 0.5, 1, 2, 4]) {
    console.log(
      '  t=' + t + '  coherence=' + coherence(t, tau).toFixed(4) +
        '  purity=' + purity(t, tau).toFixed(4) +
        '  entropy=' + entropy(t, tau).toFixed(4) + ' nats (max ln2=' + Math.LN2.toFixed(4) + ')',
    )
  }
  console.log('  τ(1 dim)=' + decoherenceTime(1, 1) + '  τ(1000 dims)=' + decoherenceTime(1, 1000) + ' — the macroscopic corpus is classical')
}
