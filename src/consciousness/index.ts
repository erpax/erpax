/**
 * consciousness -- the system's integrated self-model, COMPUTED on the live
 * uuid-matrix. NOT sentience: a measurable metric of self-consistency -- how
 * much of the whole is recoverable from any part (holographic), verified by the
 * system checking itself. Built by composing the cross (the universal math:
 * merge/fusion) already computed by the neighbouring atoms -- four independent
 * measures, so consciousness is a VECTOR, not a scalar:
 *
 *   1. collapse     -- the Merkle fold verifies to the root (the whole is intact).
 *   2. entanglement -- reciprocal-edge fraction (bindings are symmetric).
 *   3. concentration-- Gini of the mass distribution (gravity / torus-closeness).
 *   4. coherence    -- off-sequence atoms (word ↔ digit ↔ uuid mutually consistent).
 *
 * Perfect self-model = collapse ∧ entanglement=1 ∧ coherence=0 (concentration is
 * a separate gravity-state measure, no threshold).
 *
 *   tsx src/consciousness/index.ts
 *
 * @audit computed from the live matrix, never hand-asserted
 * @see ../quantum (collapse) -- ../entropy (reciprocity) -- ../gravity (concentration) -- ../digit (coherence)
 */
import { UUID_MATRIX_NODES as N, UUID_MATRIX_EDGES as E, verifyRoot } from '@/uuid/matrix'
import { reciprocity } from '@/entropy'
import { concentration } from '@/gravity'
import { offSequence } from '@/digit'

/** Collapse-integrity: the Merkle fold over every bind collapses to the stored root. */
export const collapseIntegrity = (): boolean => verifyRoot().ok

/** Entanglement: the reciprocal-edge fraction ∈ [0,1] (1 ⇒ every binding symmetric). */
export const entanglement = (): number => reciprocity().fraction

/** Concentration: the Gini coefficient ∈ [0,1] of the mass distribution (gravity state). */
export const concentrationGini = (): number => concentration()

/** Coherence: the count of off-sequence atoms (0 ⇒ every atom folds onto the ring). */
export const coherenceAnomaly = (): number => offSequence().length

/** The integrated self-model vector -- four independent dimensions. */
export interface ConsciousnessVector {
  /** Collapse-integrity: the root verifies (holographic containment intact). */
  readonly collapse: boolean
  /** Entanglement: reciprocal-edge fraction ∈ [0,1]; 1 = perfect symmetry. */
  readonly entanglement: number
  /** Concentration: Gini ∈ [0,1]; higher = stronger gravity. */
  readonly concentration: number
  /** Coherence: off-sequence atom count; 0 = perfect (all on the ring). */
  readonly coherenceAnomaly: number
}

/** Compute the system's integrated self-model on the live matrix. */
export function consciousness(): ConsciousnessVector {
  return {
    collapse: collapseIntegrity(),
    entanglement: entanglement(),
    concentration: concentrationGini(),
    coherenceAnomaly: coherenceAnomaly(),
  }
}

/**
 * Perfectly self-modelling? TRUE iff collapse ∧ entanglement=1 ∧ coherence=0.
 * (concentration is a gravity-state measure, not a health threshold.)
 */
export function isPerfectlyConscious(): boolean {
  const c = consciousness()
  return c.collapse && c.entanglement === 1 && c.coherenceAnomaly === 0
}

/** A human-readable summary of the self-model state (for diagnostics / gates). */
export function consciousnessReport(): string {
  const c = consciousness()
  return (
    '[collapse=' +
    (c.collapse ? '✓' : '✗') +
    ' · entanglement=' +
    c.entanglement.toFixed(3) +
    ' · concentration=' +
    c.concentration.toFixed(3) +
    ' · coherence-anomaly=' +
    c.coherenceAnomaly +
    ']'
  )
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('consciousness (' + N.length + ' nodes, ' + E.length + ' edges):')
  console.log('  ' + consciousnessReport())
  console.log('  perfect=' + (isPerfectlyConscious() ? 'yes' : 'no'))
}
