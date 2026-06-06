/**
 * agent/skill — an agent loads a SKILL (a capability) by name/route: the agent's competence is the
 * UNION of its loaded skills ([[team]] / [[holographic]] — a skill one agent loads, the team has).
 * Loading is idempotent (set union). This is the user's src/agent/[skill] capability.
 * Composes [[agent]] · [[skills]] · [[team]] · [[holographic]].
 *
 *   tsx src/agent/skill/index.ts
 *
 * @see ../../agent -- ../../skills -- ../../team -- ./SKILL.md
 */
export interface AgentSkills {
  readonly agent: string
  readonly skills: ReadonlySet<string>
}

/** An agent with a set of loaded skills. */
export const agentSkills = (agent: string, skills: Iterable<string> = []): AgentSkills => ({ agent, skills: new Set(skills) })

/** Load a skill into the agent — idempotent (set union). */
export const load = (a: AgentSkills, skill: string): AgentSkills => ({ agent: a.agent, skills: new Set([...a.skills, skill]) })

/** Does the agent have the skill loaded? */
export const has = (a: AgentSkills, skill: string): boolean => a.skills.has(skill)

if (import.meta.url === 'file://' + process.argv[1]) {
  const a = load(load(agentSkills('claude'), 'merge'), 'merge')
  console.log('agent/skill — has("merge")=' + has(a, 'merge') + ' · count=' + a.skills.size + ' (idempotent)')
}
