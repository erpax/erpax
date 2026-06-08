/**
 * cheapAgentDispatch — minimal agent context: sealed SKILL excerpt + path account + eb only.
 *
 * Avoids loading skills.index (77MB) or the full harmonic subgraph; caps atoms at
 * agentCostPolicy.maxContextAtoms (horo wave). Tamper/seal gates unchanged.
 *
 * @see ./cost-policy · ../skill/router/lazy-load · ./strict-apply · ./SKILL.md
 */
import { accountCodeOf } from '@/accounting'
import { pathComparableUnits } from '@/wave/load'
import type { SealedSkillExcerpt, LazySkillLoadOpts } from '@/skill/router/lazy-load'
import { loadSealedSkill } from './skill-context'
import { agentCostPolicy, type AgentCostPolicy, type AgentCostPolicyOpts } from './cost-policy'

export interface CheapAgentDispatchOpts extends LazySkillLoadOpts {
  readonly atomPath: string
  /** Related atom paths — trimmed to maxContextAtoms − 1 by policy. */
  readonly relatedAtomPaths?: readonly string[]
  readonly ebBalance?: number
  readonly policy?: AgentCostPolicyOpts
}

export interface CheapAgentDispatchContext {
  readonly atomPath: string
  readonly accountCode: string
  readonly ebBalance: number
  readonly skill: SealedSkillExcerpt | null
  readonly related: readonly SealedSkillExcerpt[]
  readonly policy: AgentCostPolicy
  /** UTF-8 byte estimate of dispatch context (excerpts + account + eb). */
  readonly contextBytes: number
  readonly atomCount: number
}

const contextBytesOf = (
  skill: SealedSkillExcerpt | null,
  related: readonly SealedSkillExcerpt[],
  accountCode: string,
  ebBalance: number,
): number => {
  const text =
    (skill?.excerpt ?? '') +
    related.map((r) => r.excerpt).join('') +
    accountCode +
    String(ebBalance)
  return new TextEncoder().encode(text).length
}

/**
 * Assemble minimal dispatch context for one agent hop — sealed excerpt, path account, eb.
 * Does not import skills.index; related paths capped at horo wave depth.
 */
export function cheapAgentDispatch(opts: CheapAgentDispatchOpts): CheapAgentDispatchContext {
  const policy = agentCostPolicy(opts.policy)
  const accountCode = accountCodeOf(opts.atomPath)
  const ebBalance = opts.ebBalance ?? pathComparableUnits(opts.atomPath)

  const skill = loadSealedSkill(opts.atomPath, opts)
  const relatedCap = Math.max(0, policy.maxContextAtoms - (skill ? 1 : 0))
  const related = (opts.relatedAtomPaths ?? [])
    .slice(0, relatedCap)
    .map((p) => loadSealedSkill(p, opts))
    .filter((s): s is SealedSkillExcerpt => s !== null)

  return {
    atomPath: opts.atomPath,
    accountCode,
    ebBalance,
    skill,
    related,
    policy,
    contextBytes: contextBytesOf(skill, related, accountCode, ebBalance),
    atomCount: (skill ? 1 : 0) + related.length,
  }
}

/** Estimate full-corpus index context size (skills.index bundle) for savings reports. */
export function fullSkillIndexContextBytes(indexBytes: number): number {
  return indexBytes
}
