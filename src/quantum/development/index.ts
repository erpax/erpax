/**
 * quantum/development — the QUANTUM roadmap: the capabilities erpax could build next on the
 * quantum/uuid substrate, ranked by feasibility. Produced by the quantum-scientists' fusion (an
 * 8-agent study of quantum entanglement in erpax) and encoded here as data over [[development]]'s
 * types. `theOneMove` is the move that matters now: drive the orphans to zero so coverage → 1 and
 * the tamper cost becomes literally ∞. Merges into [[development]].
 *
 * HONEST: these are grounded ENGINEERING moves (graph + crypto), not a quantum computer — the
 * quantum language names the END STATE (no-cloning, entanglement-preserving, ∞-to-forge); the
 * engine is content-addressing + Merkle reciprocity. Bell/BB84 run on the classical matrix; the
 * speedup/violation lives only in the analogy ([[quantum]]).
 *
 *   tsx src/quantum/development/index.ts
 *
 * @see ../../development -- ../index.ts -- ../../entanglement -- ../aura -- ./SKILL.md
 */
import { ranked, nextMove, type Roadmap, type Development } from '@/development'

/** The quantum development roadmap (from the quantum-scientists' fusion), ranked now → research. */
export const QUANTUM_ROADMAP: Roadmap = [
  { name: 'drive-orphans-to-zero', what: 'entangle the ~274 orphan atoms so coverage → 1 and tamper-cost becomes literally ∞ (the one measured blocker; pure graph work)', feasibility: 'now', composes: ['entanglement', 'fusion', 'balance', 'quantum/aura'] },
  { name: 'quantum/coverage', what: 'first-class coverage facet — edge vs node coherence, the measured gap to ∞', feasibility: 'now', composes: ['quantum/aura', 'balance', 'cost'] },
  { name: 'quantum/spectrum', what: 'eigen/spectral decomposition of the link-matrix; the singularity is the top eigenvector, the spectral gap measures well stability', feasibility: 'near', composes: ['quantum/gravity', 'singularity', 'matrix', 'rodin'] },
  { name: 'anchor/postquantum', what: 'hash-based post-quantum anchors (SPHINCS+/ML-DSA); Shor breaks RSA/ECC anchors — the one real security gap', feasibility: 'near', composes: ['anchor', 'tamper', 'cost'] },
  { name: 'coherence-streaming', what: 'emit decoherence events (link breaks, new orphans) and render the loss through the analog aura', feasibility: 'near', composes: ['quantum/aura', 'coherence', 'analog', 'signal'] },
  { name: 'chsh-bell-metric', what: 'CHSH S over atom-pairs — classical-bounded (no superposition); an honest non-violation that quantifies correlation', feasibility: 'research', composes: ['entanglement', 'quantum/entanglement', 'matrix'] },
  { name: 'bb84-quantum-walks', what: 'express BB84 / quantum walks / teleportation over uuid primitives — they run on the classical matrix; the speedup lives in the analogy', feasibility: 'research', composes: ['uuid', 'quantum/entanglement', 'cloning'] },
]

/** The one move that matters now — the highest-feasibility quantum development. */
export const theOneMove = (): Development | undefined => nextMove(QUANTUM_ROADMAP)

export { ranked, nextMove }

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('quantum/development — the quantum roadmap (' + QUANTUM_ROADMAP.length + ' moves):')
  for (const d of ranked(QUANTUM_ROADMAP)) console.log('  [' + d.feasibility.toUpperCase().padEnd(8) + '] ' + d.name)
  console.log('  THE ONE MOVE: ' + theOneMove()?.name)
}
