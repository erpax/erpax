/**
 * competencies — the actor-capability taxonomy COMPUTED from the skill corpus.
 *
 * The capstone of "skills compute their seeds": a competency is not a stored row,
 * it IS a node of the merged SKILL.md corpus (`mergeCatalogue(SKILL_INDEX,
 * INSTALLED_CATALOGUE)`). An agent loads it, an employee holds it, a job requires
 * it — all by its content-addressed `skillRoute`, the single identity. There is no
 * `competencies` table; this service is the computed-on-read catalogue the old
 * collection only ever materialised (its seed projected exactly these fields from
 * the corpus, and its standards-anchor columns were never populated).
 *
 * The merge realised: User = Employee = Agent hold/require the SAME vocabulary, and
 * it is identical to the skill the router loads (same content ⇒ same id). See
 * `../../fields/competency` (the held/required line) and `./merge` (the union law).
 *
 * @standard ESCO v1.2 skills-pillar sub-classification + reusability tiers
 * @standard SFIA 8 responsibility-levels 1..7 (held vs required; gap = required − held)
 */
import type { SkillNode } from './resolve'
import { SKILL_INDEX } from './skills.index'
import { INSTALLED_CATALOGUE } from './installed.catalogue'
import { mergeCatalogue } from './merge'

/** ESCO Skills-pillar sub-classification (mono-hierarchy: one group per concept). */
export type CompetencySubClassification = 'knowledge' | 'language' | 'skill' | 'transversal'
/** ESCO reusability tier (broadest → narrowest). */
export type CompetencyReusability = 'transversal' | 'cross_sectoral' | 'sector_specific' | 'occupation_specific'

/**
 * The abstract universal roots — ESCO "transversal" skills/competences (broadest
 * reusability). A corpus node named for one of these is a transversal root; every
 * other node is a domain `skill`. (Was the `TRANSVERSAL` set in Competencies/seed.ts.)
 */
export const TRANSVERSAL_ROOTS: ReadonlySet<string> = new Set([
  'one', 'all', 'flow', 'balance', 'give', 'take', 'open', 'close', 'begin',
  'end', 'whole', 'part', 'merge', 'duality', 'self', 'identity', 'fractal',
  'holographic', 'sequence', 'akashic', 'horo', 'rodin',
])

/** A competency = the capability view of a corpus node (computed, never stored). */
export interface CorpusCompetency {
  /** content-addressed identity = the corpus route (the ONE key; was `competencies.skillRoute`). */
  readonly skillRoute: string
  /** human/slug reference (the leaf name). */
  readonly reference: string
  readonly name: string
  readonly description: string
  readonly subClassification: CompetencySubClassification
  readonly reusabilityLevel: CompetencyReusability
  /** top of the SFIA 1..7 scale (held and required share it; gap = required − held). */
  readonly maxProficiency: number
  readonly status: 'active'
}

/** Project a corpus node onto its competency view (the `seedCompetencies` logic, computed-on-read). */
export function nodeToCompetency(node: SkillNode): CorpusCompetency {
  const transversal = TRANSVERSAL_ROOTS.has(node.name)
  return {
    skillRoute: node.route,
    reference: node.name,
    name: node.name,
    description: node.description || node.name,
    subClassification: transversal ? 'transversal' : 'skill',
    reusabilityLevel: transversal ? 'transversal' : 'cross_sectoral',
    maxProficiency: 7,
    status: 'active',
  }
}

// The corpus is static at runtime (a generated index), so the projection memoises.
let _catalogue: CorpusCompetency[] | null = null
let _byRoute: Map<string, CorpusCompetency> | null = null

/** The full competency catalogue, COMPUTED from the merged corpus (erpax atoms ∪ installed skills). */
export function competencyCatalogue(): CorpusCompetency[] {
  return (_catalogue ??= mergeCatalogue(SKILL_INDEX, INSTALLED_CATALOGUE).map(nodeToCompetency))
}

function routeIndex(): Map<string, CorpusCompetency> {
  return (_byRoute ??= new Map(competencyCatalogue().map((c) => [c.skillRoute, c])))
}

/** Resolve a competency by its content-addressed route (the corpus is the source of truth). */
export function resolveCompetency(skillRoute: string): CorpusCompetency | undefined {
  return routeIndex().get(skillRoute)
}

/** Is this route a real competency in the corpus? — field-validation / content-address integrity. */
export function isCompetencyRoute(skillRoute: string): boolean {
  return routeIndex().has(skillRoute)
}

/** Select options for a competency-reference field — value = route, label = name (computed, not hand-listed). */
export function competencyRouteOptions(): Array<{ label: string; value: string }> {
  return competencyCatalogue().map((c) => ({ label: c.name, value: c.skillRoute }))
}
