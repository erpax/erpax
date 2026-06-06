/**
 * quantum/particle — WAVE-PARTICLE duality: a content-uuid is both a PARTICLE (a discrete identity,
 * no-cloning) AND a WAVE (its [[digit]] — the position on the harmonic ring, the analog field the
 * uuid renders as colour/tone). The same 128 bits are particle (identity) and wave (signal).
 * Merges into [[particle]]. Composes [[quantum]] · [[particle]] · [[digit]] · [[signal]] · [[duality]].
 *
 * HONEST: identity-vs-digit read as particle-vs-wave — an analogy; no actual superposition.
 *
 *   tsx src/quantum/particle/index.ts
 *
 * @audit composed from @/particle (uuid) + @/digit (the ring digit); computed
 * @see ../../particle -- ../../digit -- ../../signal -- ../../duality -- ./SKILL.md
 */
import { particle } from '@/particle'
import { digitalRootOfUuid as digitalRoot } from '@/digit'

/** The PARTICLE face: the discrete content-uuid identity. */
export const asParticle = (atom: string): string | undefined => particle(atom)?.uuid

/** The WAVE face: the uuid's digit (its position on the harmonic ring — the analog wave). */
export const asWave = (atom: string): number | undefined => {
  const u = particle(atom)?.uuid
  return u === undefined ? undefined : digitalRoot(u)
}

/** Wave-particle duality: every atom has BOTH a particle (uuid) and a wave (digit) face. */
export const isDual = (atom: string): boolean => asParticle(atom) !== undefined

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('quantum/particle — wave-particle of merge: particle=' + asParticle('merge')?.slice(0, 8) + '… wave(digit)=' + asWave('merge'))
}
