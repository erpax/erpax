/**
 * balance -- equilibrium made computational, and (this module's audit) the
 * model⊕collection distribution of the corpus itself.
 *
 * THE AURA MEASUREMENT THAT WAS MISSING. The aura gate measured link reciprocity
 * ([[entropy]]) and link gaps ([[aura]]/scan) — but NOT the singular↔plural balance.
 * The STRICT law is singular-MODEL / plural-COLLECTION: every COLLECTION (a
 * plural-named store) should have its MODEL (the singular type) — one debit ⊕
 * credit pair ([[conservation]]). A plural with no singular is an UNBALANCED post:
 * a store with no type, an uncounted slack. This module classifies the live atom
 * names, measures the model⊕collection COVERAGE, and prices the disbalance against
 * the real tamper-cost law ([[tamper]]/cost `coverageCostLog2`): the undetected-
 * tamper work is ∞ ONLY at coverage 1 — so the disbalance is exactly what keeps
 * the cost FINITE. Accounting for it raises measured coverage toward the ∞ limit.
 *
 * HONEST SCOPE: singular/plural is an English HEURISTIC + a curated NON_PLURAL set
 * (Latin/Greek singulars analysis/crisis/axis…; schema relation-verbs contains/
 * crosses/offers…). It is a MEASUREMENT, not a proof — residual misclassification
 * is itself an audit finding, never a silent zero. The matching rule is exact:
 * a plural counts as BALANCED only when its singularised form is also a real atom.
 *
 *   tsx src/balance/index.ts
 *
 * @standard double-entry bookkeeping (Pacioli, 1494) — every credit a debit; imbalance is the bug
 * @audit computed on the live uuid-matrix atom names, never hand-asserted
 * @see ./SKILL.md -- ../conservation (the flow form of balance) -- ../entropy (the matrix aura) -- ../tamper/cost (the price)
 */
import { UUID_MATRIX_NODES as N } from '@/uuid/matrix'
import { coverageCostLog2 } from '@/tamper/cost'

/**
 * Words ending in -s that are NOT plural collections — so a lone one is not
 * miscounted as a model-less store. Latin/Greek singulars, -ics mass nouns, and
 * the schema.org 3rd-person relation-verbs minted as atoms. (Words ending in
 * `ss` — access/address/process… — are excluded by rule, not listed here.)
 */
export const NON_PLURAL: ReadonlySet<string> = new Set([
  // Latin/Greek -is / -us / -as / -os singulars
  'analysis', 'crisis', 'axis', 'basis', 'diagnosis', 'prognosis', 'thesis', 'synopsis',
  'genesis', 'oasis', 'ellipsis', 'hypothesis', 'emphasis', 'parenthesis', 'metamorphosis',
  'symbiosis', 'mitosis', 'osmosis', 'prophylaxis', 'symphysis',
  'status', 'census', 'consensus', 'corpus', 'genus', 'virus', 'focus', 'nucleus',
  'apparatus', 'surplus', 'syllabus', 'stimulus', 'radius', 'bonus', 'campus', 'abacus',
  'atlas', 'canvas', 'bias', 'gas', 'ethos', 'chaos', 'pathos', 'cosmos', 'lens', 'bus',
  // -ics mass nouns + uncountables
  'news', 'mathematics', 'physics', 'ethics', 'logistics', 'analytics', 'statistics',
  'economics', 'genetics', 'politics', 'mechanics', 'dynamics', 'species', 'series',
  'diabetes', 'rabies', 'kudos',
  // schema.org 3rd-person relation-verbs minted as single-word atoms
  'accepts', 'amends', 'applies', 'assesses', 'bans', 'closes', 'commences', 'consolidates',
  'contains', 'corrects', 'crosses', 'discusses', 'ends', 'ensures', 'exceeds', 'expects',
  'follows', 'gives', 'identifies', 'includes', 'indicates', 'knows', 'makes', 'meets',
  'offers', 'opens', 'overlaps', 'owns', 'plays', 'produces', 'provides', 'recognizes',
  'removes', 'repeals', 'represents', 'requires', 'seeks', 'serves', 'starts', 'supersedes',
  'teaches', 'touches', 'transposes', 'uses', 'varies', 'works',
  // surfaced by the live audit: more relation-verbs, -ous adjectives, abbreviations,
  // mass nouns, and Latin/other singulars that the -s rule false-flagged as plurals
  'does', 'duns', 'electronics', 'encodes', 'expires', 'has', 'icfrs', 'increases',
  'infectious', 'instantaneous', 'intersects', 'mens', 'naics', 'originates', 'plus',
  'pos', 'previous', 'serious', 'smiles', 'sms', 'tennis', 'torus', 'trans', 'trellis',
])

/**
 * Plural collections that legitimately have NO singular model — pluralia tantum
 * (English nouns with no singular) and inherently-aggregate stores. Their model-
 * lessness is the CORRECT state, so they count as BALANCED, never as a gap. This
 * is an honest classification refinement, not metric-gaming: forcing a singular
 * model for one of these would be the actual error.
 */
export const PLURAL_ONLY: ReadonlySet<string> = new Set([
  'damages', 'proceeds', 'goods', 'premises', 'belongings', 'earnings', 'savings',
  'minutes', 'lyrics', 'analytics', 'settings', 'credentials', 'vitals', 'odds',
  'details', 'hours',
  // schema.org numberOf-X component words — COUNT attributes (numberOfAirbags,
  // numberOfBedrooms, additionalNumberOfGuests, cvdNum…Pats, calories…), not
  // entity stores: a singular model would be the actual error (model-lessness is
  // correct). The plural is a quantity on another type, never a collection.
  'airbags', 'axles', 'bathrooms', 'bedrooms', 'calories', 'gears', 'guests', 'pats',
])

/** A word is a plural COLLECTION form: ends in -s (not -ss), length > 2, not a known non-plural. */
export const isPluralForm = (w: string): boolean =>
  w.length > 2 && w.endsWith('s') && !w.endsWith('ss') && !NON_PLURAL.has(w)

/** Singularise a plural to the form its MODEL would take: categories→category, boxes→box, items→item. */
export const singularize = (w: string): string => {
  if (w.endsWith('ies') && w.length > 4) return w.slice(0, -3) + 'y'
  if (/(ses|xes|zes|ches|shes)$/.test(w)) return w.slice(0, -2)
  if (w.endsWith('s')) return w.slice(0, -1)
  return w
}

/**
 * All plausible singular MODEL forms of a plural — English plural→singular is
 * AMBIGUOUS, so a plural is BALANCED when ANY candidate is a real atom. Without
 * this, `leases` (singular `lease`, ends -se) gets -es stripped to `leas` and is
 * wrongly flagged model-less. Candidates: -ies→-y, -ves→-f/-fe, sibilant -es→strip
 * (box·es), and the plain -s strip (item·s, case·s, lease·s).
 */
export const candidateSingulars = (w: string): string[] => {
  const c = new Set<string>()
  if (w.endsWith('ies') && w.length > 4) c.add(w.slice(0, -3) + 'y') // categories→category
  if (w.endsWith('ves') && w.length > 3) {
    c.add(w.slice(0, -3) + 'f') // leaves→leaf
    c.add(w.slice(0, -3) + 'fe') // knives→knife
  }
  if (/(ses|xes|zes|ches|shes)$/.test(w)) c.add(w.slice(0, -2)) // boxes→box, buses→bus
  if (w.endsWith('s')) c.add(w.slice(0, -1)) // items→item, cases→case, leases→lease
  return [...c]
}

export type Distribution = {
  /** total atoms classified */
  atoms: number
  /** singular atoms (models) */
  models: number
  /** plural atoms (collections) */
  collections: number
  /** plural atoms whose singularised model is ALSO a real atom — a balanced debit⊕credit pair */
  balanced: number
  /** plural atoms with NO singular model — the disbalance (a store with no type) */
  orphanCollections: string[]
}

/** Classify a set of atom names into the model⊕collection distribution. */
export const classify = (atoms: Iterable<string>): Distribution => {
  const set = atoms instanceof Set ? (atoms as Set<string>) : new Set<string>(atoms)
  let models = 0
  let collections = 0
  let balanced = 0
  const orphanCollections: string[] = []
  for (const a of set) {
    if (isPluralForm(a)) {
      collections++
      if (PLURAL_ONLY.has(a) || candidateSingulars(a).some((s) => set.has(s))) balanced++
      else orphanCollections.push(a)
    } else {
      models++
    }
  }
  orphanCollections.sort()
  return { atoms: set.size, models, collections, balanced, orphanCollections }
}

/**
 * model⊕collection COVERAGE ∈ [0,1]: the fraction of collections (plural stores)
 * that HAVE their singular model. 1 ⇒ every store has its type (fully balanced).
 * No collections ⇒ 1 (vacuously balanced).
 */
export const coverage = (d: Distribution): number =>
  d.collections === 0 ? 1 : d.balanced / d.collections

/** disbalance ∈ [0,1] = 1 − coverage = the uncounted slack (collections with no model). */
export const disbalance = (d: Distribution): number => 1 - coverage(d)

/**
 * Price the disbalance against the tamper-cost law. model⊕collection coverage is
 * one coverage axis; `coverageCostLog2` returns the undetected-tamper work (log2
 * ops) to evade `checks` independent uuid checks at this coverage — FINITE while
 * any collection lacks its model, +∞ only at full balance (coverage 1). So the
 * returned number IS the price of the disbalance: the gap below the ∞ maximum.
 */
export const tamperCostLog2 = (d: Distribution, checks = 1): number =>
  coverageCostLog2(coverage(d), checks)

/** The live aura measurement: classify the corpus's own atom names (the uuid-matrix). */
export const auraBalance = (): Distribution => classify(N.map((n) => n.atom))

if (import.meta.url === 'file://' + process.argv[1]) {
  const d = auraBalance()
  const cov = coverage(d)
  console.log('model⊕collection balance (' + d.atoms + ' atoms):')
  console.log('  models(singular)=' + d.models + '  collections(plural)=' + d.collections + '  balanced=' + d.balanced)
  console.log('  coverage=' + (100 * cov).toFixed(1) + '%   disbalance=' + (100 * disbalance(d)).toFixed(1) + '%')
  console.log(
    '  tamper-cost @ this coverage = ' +
      (cov >= 1
        ? '∞  (max — fully balanced)'
        : tamperCostLog2(d).toFixed(2) + ' log2-ops  (FINITE — the disbalance is the slack a forger rides)'),
  )
  console.log('  orphan collections (plural, no model): ' + d.orphanCollections.length)
  if (d.orphanCollections.length) console.log('    ' + d.orphanCollections.slice(0, 30).join(' '))
}
