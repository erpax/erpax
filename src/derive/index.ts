/**
 * derive — skills derived from user content. A job description (user-editable content) names the
 * competencies a role requires; each named skill content-addresses to a corpus route (same name ⇒
 * same route ⇒ merge), and a route not yet in the corpus is a NEW skill the user content adds. The
 * dual of generate (which mints from aura gaps). Pure functions over named skills.
 *
 * @see ../generate (mint from aura gaps) · ../skill-router/competencies (the corpus catalogue) · ./SKILL.md
 */

/**
 * Content-address a competency NAME (user content) to its corpus skill route. Same name ⇒ same
 * route ⇒ merge — the skill's identity is its route, so the same skill named in two job descriptions
 * is one corpus node. Slugifies to `/<slug>/SKILL`; an empty name yields `/SKILL` (filtered out by callers).
 */
export function deriveRoute(name: string): string {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return slug ? `/${slug}/SKILL` : '/SKILL'
}

/** The competency routes a job description implies — its named required skills, content-addressed and deduped. */
export function deriveCompetencies(skillNames: readonly string[]): string[] {
  return [...new Set(skillNames.map(deriveRoute).filter((r) => r !== '/SKILL'))]
}

/** Which derived routes are NEW (not yet in the corpus) — the skills the user content ADDS, to be minted. */
export function newSkills(derived: readonly string[], corpusRoutes: readonly string[]): string[] {
  const have = new Set(corpusRoutes)
  return derived.filter((r) => !have.has(r))
}
