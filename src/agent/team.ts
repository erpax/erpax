/**
 * team — multiple agents sharing skills; competence is the union.
 *
 * The next scale above `agent` (./index). An agent IS its content
 * (name + skills + purpose), content-addressed, so identical clones merge to one
 * (self/holographic/merge). A TEAM is a set of agents that SHARE their skills:
 * the team's competence is the UNION of its members' skill-sets, and
 * `shareSkills` loads that union into every member — so after sharing any member
 * can do any team task, while each keeps its distinct PURPOSE (the team stays
 * many/specialised, its competence is one/whole — holographic).
 *
 * The society spawns in teams to cover a gap-cluster IN PARALLEL; teams are
 * themselves content-addressed and merge by content (federation — two peers'
 * identical teams collapse to one). Pure → testable; composes ./index
 * (AgentDef / cloneAgent / distinctAgents).
 *
 * @standard RFC 9562 §5.8 content-addressed identity (agent + team uuid)
 * @audit Conservation Law 8 content-uuid · merge set-union (no coordination)
 */
import { computeContentUuid } from '@/integrity'
import { simpson } from '@/diversity'
import { cloneAgent, distinctAgents, type AgentDef, type ClonedAgent } from './service'

export interface Team {
  readonly id: string
  /** distinct, content-addressed members (identical clones already merged away). */
  readonly members: ReadonlyArray<ClonedAgent>
}

/** Form a team from agents, deduplicating identical clones by content-uuid (merge). */
export function formTeam(id: string, members: ReadonlyArray<AgentDef>, tenantId: string): Team {
  return { id, members: distinctAgents(members, tenantId) }
}

/** The team's shared competence: the sorted union of every member's skills. */
export function teamSkills(team: Team): ReadonlyArray<string> {
  const set = new Set<string>()
  for (const m of team.members) for (const s of m.skills) set.add(s)
  return [...set].sort()
}

/**
 * Share skills across the team: load the union into EVERY member. After this,
 * any member can do any team task (holographic) while each keeps its distinct
 * purpose — so the team stays many but its competence is one.
 */
export function shareSkills(team: Team, tenantId: string): Team {
  const shared = teamSkills(team)
  const members = team.members.map((m) => cloneAgent(m, { skills: shared }, tenantId))
  return formTeam(team.id, members, tenantId)
}

/**
 * Spawn a team: specialise a base agent into N purpose-distinct children, then
 * share the union — the society fans out across the work while every member
 * holds the full competence.
 */
export function spawnTeam(
  id: string,
  base: AgentDef,
  specialisations: ReadonlyArray<{ name: string; purpose: string; skills?: ReadonlyArray<string> }>,
  tenantId: string,
): Team {
  const members = specialisations.map((s) =>
    cloneAgent(base, { name: s.name, purpose: s.purpose, skills: s.skills ?? base.skills }, tenantId),
  )
  return shareSkills(formTeam(id, members, tenantId), tenantId)
}

export interface TeamCoverage {
  readonly covered: ReadonlyArray<string>
  readonly gaps: ReadonlyArray<string>
  readonly complete: boolean
}

/** Does the team's shared skills cover the required set? Which are missing? */
export function teamCovers(team: Team, required: ReadonlyArray<string>): TeamCoverage {
  const have = new Set(teamSkills(team))
  const covered = required.filter((s) => have.has(s))
  const gaps = required.filter((s) => !have.has(s))
  return { covered, gaps, complete: gaps.length === 0 }
}

/** Merge two teams — set-union of members; identical agents collapse (federation). */
export function mergeTeams(a: Team, b: Team, tenantId: string): Team {
  return formTeam(a.id, [...a.members, ...b.members], tenantId)
}

/**
 * The team's content-uuid — over its id + sorted distinct member uuids; identical
 * teams merge. NB: the id rides under `teamId`, not `id` — `computeContentUuid`
 * strips a field literally named `id` (the Payload storage-id convention), which
 * would otherwise drop the team name from its identity.
 */
export function teamUuid(team: Team, tenantId: string): string {
  const memberUuids = [...new Set(team.members.map((m) => m.uuid))].sort()
  return computeContentUuid({ teamId: team.id, members: memberUuids }, tenantId)
}

// ── The {1,2,3} basic-team basis — one extreme sport, three aspects ──────────
// A team's competence is the union; its SIZE has a basis too. The basic teams
// are sizes 1·2·3 — cave·recreational·technical diving = self·duality·trinity
// (see src/decompression/SKILL.md). Every larger team is a GROUP of basic teams,
// just as every larger number folds onto the rodin helix. (1+2+3 = 1·2·3 = 6.)

/** The basic team sizes: 1 (self/cave), 2 (duality/recreational), 3 (trinity/technical). */
export const BASIC_TEAM_SIZES = [1, 2, 3] as const
export type BasicTeamSize = (typeof BASIC_TEAM_SIZES)[number]

/** One extreme sport, three aspects: each basic size is its diving discipline. */
export const TEAM_DISCIPLINE = { 1: 'cave', 2: 'recreational', 3: 'technical' } as const satisfies Record<
  BasicTeamSize,
  string
>

/** A basic team is one of size 1, 2, or 3; every larger team is a group of these. */
export const isBasicTeam = (size: number): size is BasicTeamSize => size === 1 || size === 2 || size === 3

/**
 * Decompose any team size into basic teams — trinity-dense (as many 3s as
 * possible, then a single 2 or 1). The canonical cover; a discipline may regroup
 * (e.g. recreational into all-2 buddy pairs). A non-positive / non-integer size
 * is no team.
 */
export function basicTeams(size: number): BasicTeamSize[] {
  if (!Number.isInteger(size) || size <= 0) return []
  const out: BasicTeamSize[] = Array.from({ length: Math.floor(size / 3) }, () => 3 as BasicTeamSize)
  const rem = size % 3
  if (rem === 1) out.push(1)
  else if (rem === 2) out.push(2)
  return out
}

/** This team's grouping into basic teams (over its distinct members). */
export const teamGrouping = (team: Team): BasicTeamSize[] => basicTeams(team.members.length)

// ── The lead-team refinement ──────────────────────────────────────────────
// A basic team's SIZE has a basis; a working team also has a LEADER. The law:
// any headcount organises as teams of 2 or 3 MEMBERS + one LEADER — total 3 or 4,
// never a solo. This is not rank for its own sake. A 2-member team DEADLOCKS (n=2,
// no majority — the deadlock [[think]].higherMind names), and the leader is the
// structural THIRD that makes the pair RESOLVABLE (2 members + 1 leader = 3 =
// MINIMUM_MINDS). So every lead-team is ≥3 and can form a higher mind; the leader
// is the tie-breaker, not a rank. And it is FRACTAL: the leaders recurse — 2-3
// leaders + a higher leader — the same unit at every scale, to one apex.

/** A lead-team's member count, excluding the leader: 2 or 3 — never 1, a solo cannot self-correct. */
export const LEAD_TEAM_MEMBERS = [2, 3] as const
export type LeadTeamMembers = (typeof LEAD_TEAM_MEMBERS)[number]

/** One lead-team: 2 or 3 members + exactly one leader. `size = members + 1 ∈ {3,4}`, always ≥ MINIMUM_MINDS. */
export interface LeadTeam {
  readonly members: LeadTeamMembers
  readonly leader: 1
  /** members + leader — 3 or 4; the leader is the third that resolves the pair's deadlock ([[think]].higherMind). */
  readonly size: number
}

export function leadTeam(members: LeadTeamMembers): LeadTeam {
  return { members, leader: 1, size: members + 1 }
}

/** Split a headcount into member-groups of 3 (trinity-dense) then 2 — never 1 (a solo is no team). N ≥ 2. */
export function memberGroups(headcount: number): LeadTeamMembers[] {
  if (!Number.isInteger(headcount) || headcount < 2) return []
  const out: LeadTeamMembers[] = []
  let n = headcount
  while (n > 0) {
    if (n === 2) { out.push(2); break }
    if (n === 4) { out.push(2, 2); break } // 4 → 2+2, never 3+1 (no solo left behind)
    out.push(3)
    n -= 3
  }
  return out
}

/** The recursive lead hierarchy: members form lead-teams, whose LEADERS form higher lead-teams, to one apex. */
export interface LeadHierarchy {
  readonly headcount: number
  /** lead-team count per level, bottom-up; the last level is 1 — the apex leader. */
  readonly levels: readonly number[]
  /** leadership tiers — ⌈log~3.5(headcount)⌉. */
  readonly depth: number
  /** total lead-teams across every level. */
  readonly teams: number
}

/**
 * Organise any headcount as lead-teams of 2-3 members + one leader, whose leaders recurse the same way — the
 * fractal [[think]].higherMind, one unit at every scale, all the way to a single apex leader.
 *
 * @invariant every lead-team is 2 or 3 members + 1 leader — size ∈ {3,4}, never a solo, always ≥ MINIMUM_MINDS
 * @invariant the leaders of one level are the members of the next — the structure closes to one apex
 */
export function leadHierarchy(headcount: number): LeadHierarchy {
  if (!Number.isInteger(headcount) || headcount < 2) return { headcount, levels: [], depth: 0, teams: 0 }
  const levels: number[] = []
  let n = headcount
  while (n >= 2) {
    const groups = memberGroups(n).length // this level's lead-teams; each elects one leader
    levels.push(groups)
    if (groups === 1) break // a single team ⇒ its leader is the apex
    n = groups // the leaders become the next level's members
  }
  return { headcount, levels, depth: levels.length, teams: levels.reduce((a, b) => a + b, 0) }
}

// ── The leader is COMPUTED, and it changes ────────────────────────────────
// The leader is not appointed by rank — it is COMPUTED to the extent it maximises
// top-quality projects COMPLETED, at the LEAST cost, with the MOST diversity. It
// changes when the numbers change; it is source-blind (chosen by the objective,
// never by who anyone is — [[theorem]].restsOnAuthority). And "maximum diversity"
// is not a slogan: the Diversity Prediction Theorem (Krogh–Vedelsby / Page) is an
// EXACT identity — collective error = average error − diversity — so diversity
// provably SUBTRACTS from the collective's error. Compute nature, and realise it.

/** One candidate for a lead-team — its competence, its price, and the perspectives it brings (for diversity). */
export interface Candidate {
  readonly id: string
  /** individual competence, 0..1. */
  readonly quality: number
  /** what it costs to include, > 0. */
  readonly cost: number
  /** the perspectives/skills it carries — diversity is measured over their spread. */
  readonly perspectives: readonly string[]
}

/** The Diversity Prediction Theorem — the proven identity behind "maximum diversity ⇒ top quality". */
export interface DiversityDecomposition {
  readonly averageError: number
  readonly diversity: number
  readonly collectiveError: number
}

/**
 * (p̄ − θ)² = mean(pᵢ − θ)² − mean(pᵢ − p̄)². An EXACT algebraic identity: the crowd's error equals the average
 * individual error MINUS the diversity of predictions. Diversity is not a preference — it literally subtracts.
 *
 * @invariant collectiveError === averageError − diversity, to floating precision (the theorem, refutable)
 */
export function diversityDecomposition(predictions: readonly number[], truth: number): DiversityDecomposition {
  const n = predictions.length
  if (n === 0) return { averageError: 0, diversity: 0, collectiveError: 0 }
  const mean = predictions.reduce((a, b) => a + b, 0) / n
  const averageError = predictions.reduce((s, p) => s + (p - truth) ** 2, 0) / n
  const diversity = predictions.reduce((s, p) => s + (p - mean) ** 2, 0) / n
  const collectiveError = (mean - truth) ** 2
  return { averageError, diversity, collectiveError }
}

/** Abundance of each distinct perspective across a team — the input to a diversity index. */
function perspectiveAbundances(team: readonly Candidate[]): number[] {
  const count = new Map<string, number>()
  for (const c of team) for (const p of c.perspectives) count.set(p, (count.get(p) ?? 0) + 1)
  return [...count.values()]
}

/**
 * Collective quality, grounded in the theorem: average quality LIFTED by diversity toward 1. A monoculture
 * (diversity 0) stays at its average; maximal diversity closes the gap to 1 — because diversity subtracts error.
 */
export function collectiveQuality(team: readonly Candidate[]): number {
  if (team.length === 0) return 0
  const avg = team.reduce((s, c) => s + c.quality, 0) / team.length
  const div = simpson(perspectiveAbundances(team)) // Simpson diversity ∈ [0,1]
  return Math.min(1, avg + div * (1 - avg))
}

/** A computed lead-team assignment and its value — the objective the leader is chosen to maximise. */
export interface LeadAssignment {
  readonly leader: Candidate
  readonly members: readonly Candidate[]
  /** (collective quality × completion) / cost — quality completed per unit cost, lifted by diversity. */
  readonly value: number
}

function combos<T>(arr: readonly T[], sizes: readonly number[]): T[][] {
  const out: T[][] = []
  const pick = (start: number, chosen: T[], k: number): void => {
    if (chosen.length === k) { out.push([...chosen]); return }
    for (let i = start; i < arr.length; i++) { chosen.push(arr[i]!); pick(i + 1, chosen, k); chosen.pop() }
  }
  for (const k of sizes) pick(0, [], k)
  return out
}

/** The value of leader + members: quality COMPLETED (completion gated by the leader's competence) per total cost. */
function assignmentValue(leader: Candidate, members: readonly Candidate[]): number {
  const team = [leader, ...members]
  const cost = team.reduce((s, c) => s + c.cost, 0)
  const completion = leader.quality // a weak leader leaves the team deadlocked → less completed
  return cost <= 0 ? 0 : (collectiveQuality(team) * completion) / cost
}

/**
 * The best lead-team over a candidate pool: 2-3 members + one leader, the assignment that maximises quality
 * completed per cost with the most diversity. The LEADER is whoever this computation names — and it changes when
 * the candidates' quality, cost, or perspectives change. No fixed leader, no rank; the objective decides.
 *
 * @invariant the chosen team is a valid lead-team — 2 or 3 members + exactly one leader
 * @invariant the leader is source-blind — chosen by value, never by identity or input order
 */
export function bestLeadTeam(candidates: readonly Candidate[]): LeadAssignment | null {
  if (candidates.length < 3) return null // need ≥3: 2 members + 1 leader
  let best: LeadAssignment | null = null
  for (const leader of candidates) {
    const rest = candidates.filter((c) => c !== leader)
    for (const members of combos(rest, LEAD_TEAM_MEMBERS)) {
      const value = assignmentValue(leader, members)
      if (!best || value > best.value) best = { leader, members, value }
    }
  }
  return best
}

/** The computed leader — the one the objective names, changing with the numbers. Source-blind, never appointed. */
export function computedLeader(candidates: readonly Candidate[]): Candidate | null {
  return bestLeadTeam(candidates)?.leader ?? null
}
