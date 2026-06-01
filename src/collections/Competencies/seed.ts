import type { Payload } from 'payload'
import { SKILL_INDEX } from '../../services/skill-router/skills.index'

/**
 * Seed `competencies` from the ACTUAL skill corpus — the merge as living data.
 *
 * Every `SKILL.md` node IS a competency (an agent loads it, a job requires it,
 * an actor holds it). This derives the competency catalogue from the same
 * `SKILL_INDEX` the agent skill-router resolves — nothing re-typed, same
 * content ⇒ same id. Idempotent: keyed on `skillRoute` (re-runnable).
 *
 * The abstract universal roots (one/all/flow…) are `transversal`; everything
 * else defaults to `skill`. `reference` is the skill's leaf name.
 */
const TRANSVERSAL = new Set([
  'one', 'all', 'flow', 'balance', 'give', 'take', 'open', 'close', 'begin',
  'end', 'whole', 'part', 'merge', 'duality', 'self', 'identity', 'fractal',
  'holographic', 'sequence', 'akashic', 'horo', 'rodin',
])

export async function seedCompetencies(payload: Payload): Promise<void> {
  for (const node of SKILL_INDEX) {
    const existing = await payload.find({
      collection: 'competencies',
      where: { skillRoute: { equals: node.route } },
      limit: 1,
      overrideAccess: true,
    })
    const data = {
      reference: node.name,
      name: node.name,
      description: node.description || node.name,
      subClassification: TRANSVERSAL.has(node.name) ? ('transversal' as const) : ('skill' as const),
      reusabilityLevel: TRANSVERSAL.has(node.name)
        ? ('transversal' as const)
        : ('cross_sectoral' as const),
      skillRoute: node.route,
      status: 'active' as const,
    }
    if (existing.docs.length > 0) {
      await payload.update({ collection: 'competencies', id: existing.docs[0].id, data, overrideAccess: true })
    } else {
      await payload.create({ collection: 'competencies', data, overrideAccess: true })
    }
  }
}
