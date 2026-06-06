/**
 * translator — erpax AS the translator. It translates by routing any surface form to its
 * INTERLINGUA: the content-uuid. The interlingua is the universal intermediate representation
 * every language and modality passes through — EXPLICIT here, where neural MT's is emergent
 * (Johnson et al. 2017: a shared multilingual model learns a universal interlingua that enables
 * zero-shot translation between unseen pairs). The translator's vocabulary IS the [[matrix]]:
 * every atom is one concept-uuid, and synonyms / cross-language forms MERGE to the same uuid —
 * the merge law IS the interlingua (translation = collapse to the shared meaning).
 *
 * HONEST: erpax supplies the interlingua (the content-uuid) and the merge that collapses
 * surface forms onto it; the bilingual surface dictionary is the [[translations]] catalogue.
 *
 *   tsx src/translator/index.ts
 *
 * @standard Johnson et al., "Google's Multilingual NMT System: Enabling Zero-Shot Translation," TACL (2017), arXiv:1611.04558
 * @audit the interlingua is the content-uuid; computed from the live matrix, never hand-asserted
 * @see ../translate (the i18n act) -- ../quantum/translator (the quantum facet) -- ../translation -- ./SKILL.md
 */
import { UUID_MATRIX_NODES as N, nodeOf, toUuid } from '@/uuid/matrix'

/** The interlingua: a surface form's meaning-uuid (an atom's content-uuid, or a content hash for free text). */
export const interlingua = (text: string): string => nodeOf(text)?.uuid ?? toUuid(Buffer.from('meaning:' + text, 'utf8'))

/** Two surface forms are translations iff they share the interlingua (the same meaning-uuid). */
export const areTranslations = (a: string, b: string): boolean => interlingua(a) === interlingua(b)

/** The translator's vocabulary = the matrix concepts (every atom is one interlingua entry). */
export const vocabularySize = (): number => N.length

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('translator — erpax as the interlingua translator:')
  console.log('  vocabulary: ' + vocabularySize() + ' concept-uuids (the interlingua)')
  console.log('  interlingua("merge") = ' + interlingua('merge').slice(0, 8) + '… · areTranslations("merge","merge")=' + areTranslations('merge', 'merge'))
}
