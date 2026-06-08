/**
 * merge — union the installed Claude domain-skill catalogue INTO the erpax atom
 * corpus, content-addressed, with no coordination (the [[merge]] law as code).
 *
 * The installed skills (finance/reconciliation, human-resources/onboarding, …) are
 * domain-action LEAVES that compose from erpax's universal roots; the erpax atoms
 * (one/all/flow/…/horo) are the roots. The two corpora are complementary, so the
 * merge is mostly UNION — and where they DO collide it is deduped: same route ⇒
 * one ([[sequence]]: same address ⇒ same path), same content-uuid ⇒ one
 * ([[identity]]: same content ⇒ same id). The erpax base is canonical (a collision
 * keeps the atom), so the pure root corpus is never overwritten by a vendored leaf.
 *
 * The result is ONE index: `mergeCatalogue(SKILL_INDEX, INSTALLED_CATALOGUE)` flows
 * through the EXISTING machinery unchanged — `resolveSkill` routes an installed
 * skill by `/<domain>/<name>` or its leaf name, `seedCompetencies` makes each a
 * competency row (so the [[train]] loop can route an actor to it), and every
 * DomainAgent's competence is DERIVED (`skillsForAgent`) from the merged index,
 * never stored — the 13 Cowork domains map 1:1 onto the 13 agent ids.
 *
 * @standard ESCO/SFIA — installed skills enter the same competency taxonomy
 * @see ./skills.index (erpax atoms) · ./installed.catalogue (the loaded catalogue)
 */
import type { SkillNode } from './resolve'
import { pathNavMeta } from '@/navigation'

/** One installed Claude domain skill (a row of the generated `installed.catalogue.ts`). */
export interface InstalledSkill {
  /** the source plugin's manifest name (e.g. 'human-resources', 'finance'). */
  readonly domain: string
  /** the skill leaf (e.g. 'onboarding', 'reconciliation'). */
  readonly name: string
  readonly description: string
  /** sha→uuid over the skill's SKILL.md (same skill anywhere ⇒ one id). */
  readonly contentUuid?: string
}

/** Installed plugin domain → erpax DomainAgent id (one word per concept — the merge of divergent names). */
export const DOMAIN_ALIASES: Readonly<Record<string, string>> = {
  'human-resources': 'hr',
  operations: 'ops',
  'product-management': 'product',
}

/** Normalise an installed domain to its erpax DomainAgent id (idempotent). */
export const erpaxDomain = (domain: string): string => DOMAIN_ALIASES[domain] ?? domain

/** An installed skill as a content-addressed SkillNode at `/<domain>/<name>/SKILL`. */
export function installedToNode(s: InstalledSkill): SkillNode {
  const domain = erpaxDomain(s.domain)
  const path = [domain, s.name]
  const { nav, group, route } = pathNavMeta(path.join('/'))
  return {
    route,
    path,
    name: s.name,
    description: s.description,
    content: s.description, // lean: the frontmatter description, not the vendored body
    ancestors: [domain],
    siblings: [],
    children: [],
    related: [domain], // the leaf links to its domain (its DomainAgent)
    nav,
    group,
    ...(s.contentUuid ? { contentUuid: s.contentUuid } : {}),
  }
}

/**
 * Merge the installed catalogue INTO the base index: union, deduped by route then
 * content-uuid (same address ⇒ one; same content ⇒ one). The base (erpax atoms)
 * is added first and is canonical — a route/content collision keeps the base node.
 * Returns a fresh sorted array; inputs are untouched.
 */
export function mergeCatalogue(base: readonly SkillNode[], installed: readonly InstalledSkill[]): SkillNode[] {
  const byRoute = new Map<string, SkillNode>()
  const byContent = new Map<string, SkillNode>()
  const add = (n: SkillNode): void => {
    if (byRoute.has(n.route)) return // same address ⇒ one
    if (n.contentUuid && byContent.has(n.contentUuid)) return // same content ⇒ one
    byRoute.set(n.route, n)
    if (n.contentUuid) byContent.set(n.contentUuid, n)
  }
  for (const n of base) add(n) // base first ⇒ canonical
  for (const s of installed) add(installedToNode(s))
  return [...byRoute.values()].sort((a, b) => a.route.localeCompare(b.route))
}

/**
 * A DomainAgent's competence, DERIVED from the merged index (never stored): every
 * skill route whose domain maps to `agentId`. Base atoms (single-segment paths like
 * `horo`) are not domain skills and are excluded — only `/<domain>/<leaf>` rows count.
 */
export function skillsForAgent(agentId: string, index: readonly SkillNode[]): string[] {
  return index
    .filter((n) => n.path.length >= 2 && erpaxDomain(n.path[0]) === agentId)
    .map((n) => n.route)
    .sort()
}
