/**
 * particle — an atom AS a particle: a content-[[uuid]] is a particle's identity in the [[matrix]]
 * field, and particles interact through [[links]] — the forces ([[gravity]] mass, [[entanglement]]
 * coupling). Discrete, content-addressed, no-cloning. The [[quantum]] facet adds wave-particle
 * duality (the same uuid is also a wave). Composes [[atom]] · [[uuid]] · [[matrix]] · [[gravity]].
 *
 * HONEST: a graph node read as a particle — an analogy, not physics.
 *
 *   tsx src/particle/index.ts
 *
 * @audit composed from the live matrix node + its mass; never hand-asserted
 * @see ../atom -- ../uuid/matrix -- ../gravity -- ../quantum/particle -- ./SKILL.md
 */
import { nodeOf } from '@/uuid/matrix'
import { massOf } from '@/gravity'

export interface Particle {
  readonly atom: string
  /** the particle's identity (content-uuid) */
  readonly uuid: string
  /** its mass = in-degree (the gravitational charge in the field) */
  readonly mass: number
}

/** The particle an atom IS: its identity (uuid) + its mass (in-degree). undefined if not an atom. */
export const particle = (atom: string): Particle | undefined => {
  const n = nodeOf(atom)
  return n === undefined ? undefined : { atom: n.atom, uuid: n.uuid, mass: massOf(atom) }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const p = particle('merge')
  console.log('particle — atom as particle · merge: ' + (p ? p.uuid.slice(0, 8) + '… mass ' + p.mass : 'n/a'))
}
