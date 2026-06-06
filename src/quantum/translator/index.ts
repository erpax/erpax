/**
 * quantum/translator — erpax as a QUANTUM translator. Translation through the content-uuid
 * interlingua ([[translator]]) is quantum on three counts:
 *
 *  - COLLAPSE: many surface forms (languages, spellings, modalities) collapse to ONE
 *    meaning-uuid — the eigenstate / interlingua. That collapse IS the [[merge]] law.
 *  - NO-CLONING: each meaning has exactly one uuid; a concept can't be forked into two
 *    identities ([[entanglement]] no-cloning). Translation preserves, never clones, meaning.
 *  - ENTANGLEMENT: the modalities (colour, sound, identity, capability) are entangled in
 *    the 128 bits — the uuid IS the whole message, self-decoding ([[quantum]]).
 *
 * This is the emergent interlingua of multilingual NMT (Johnson et al. 2017) made EXPLICIT
 * and content-addressed. HONEST: it is content-addressing over a classical graph — an
 * ANALOGY to wavefunction collapse, not a literal qubit measurement.
 *
 *   tsx src/quantum/translator/index.ts
 *
 * @standard Johnson et al. (2017, arXiv:1611.04558); RFC 9562 §5.8 content-uuid (the interlingua)
 * @audit composed from ../../translator + ../../entanglement; computed on the live matrix
 * @see ../../translator -- ../index.ts (collapse/no-cloning) -- ../../entanglement -- ./SKILL.md
 */
import { interlingua, areTranslations } from '@/translator'
import { noCloning } from '@/entanglement'

/** Collapse: every surface form collapses to its meaning-uuid (the interlingua eigenstate). */
export const collapse = (text: string): string => interlingua(text)

/** No-cloning of meaning: each concept has exactly one interlingua uuid (translation can't fork meaning). */
export const meaningIsUnique = (): boolean => noCloning()

/** Two surface forms collapse to the same eigenstate iff they are translations (re-exported). */
export { areTranslations }

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('quantum/translator — translation as collapse to the meaning eigenstate:')
  console.log('  collapse("merge") = ' + collapse('merge').slice(0, 8) + '… · meaning-is-unique (no-cloning) = ' + meaningIsUnique())
  console.log('  "merge" and "merge" collapse to one eigenstate: ' + areTranslations('merge', 'merge'))
}
