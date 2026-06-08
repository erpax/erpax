/**
 * ai/industry — AI industry problems → erpax diamond remedies.
 *
 * Maps the ten canonical production failure modes to existing diamond facets
 * (thought · diamond · sandbox · receipt · memory · confirm · horo · merge) and
 * extends the top gaps with pure remediation fns: workflow correlation receipts,
 * grounded tool calls, cascade depth guard, trust-boundary verdict.
 *
 *   tsx src/ai/industry/index.ts hallucination
 *   tsx src/ai/industry/index.ts audit-trail-fragmentation
 *
 * @standard ISO/IEC 42001:2023 ai-management-system
 * @standard OWASP-LLM-Top-10:2025 LLM01 prompt-injection
 * @compliance GDPR Art.22(3) right-to-human-intervention
 * @see ./SKILL.md · ../ai-security · ../../sandbox · ../../receipt · ../../memory/session
 */
import { jcsCanonicalize, uuid } from '@/integrity'
import { MAX_BROADCAST_DEPTH } from '@/agent/sync'
import { permits, type ToolGrant, type ToolAction, type SandboxEvaluation } from '@/sandbox'
import { issueReceipt, type Decision } from '@/receipt'
import { detectPromptInjection } from '@/ai'
import {
  recordSessionArtifact,
  type SessionLattice,
  type SessionArtifact,
} from '@/memory/session'

/** Canonical AI industry failure modes (2025 production surveys). */
export const AI_INDUSTRY_PROBLEMS = [
  'hallucination',
  'context-memory-loss',
  'multi-agent-collision',
  'prompt-injection',
  'audit-trail-fragmentation',
  'cost-runaway',
  'model-drift',
  'pii-leakage',
  'human-in-the-loop',
  'vendor-lockin',
] as const

export type AiIndustryProblem = (typeof AI_INDUSTRY_PROBLEMS)[number]

export type RemedyCoverage = 'existing' | 'extended'

/** One problem → diamond facet binding (atoms + law). */
export interface DiamondRemedy {
  readonly problem: AiIndustryProblem
  readonly atoms: readonly string[]
  readonly facet: string
  readonly coverage: RemedyCoverage
  readonly law: string
}

const REMEDIES: Record<AiIndustryProblem, DiamondRemedy> = {
  hallucination: {
    problem: 'hallucination',
    atoms: ['horo', 'diamond', 'thought', 'integrity'],
    facet: 'seal+groundOutputVerdict',
    coverage: 'extended',
    law: 'Closed horo ring forbids escape; verifyDiamond seals; outputs cite sealed source uuids.',
  },
  'context-memory-loss': {
    problem: 'context-memory-loss',
    atoms: ['memory/architecture', 'thought', 'diamond'],
    facet: 'operationalMemoryIsArchitecture',
    coverage: 'existing',
    law: 'Operational memory IS the git lattice; save(thought) ⇐ isDiamond — chat is working set only.',
  },
  'multi-agent-collision': {
    problem: 'multi-agent-collision',
    atoms: ['memory/session', 'merge', 'identity'],
    facet: 'convergeAgentArtifacts',
    coverage: 'extended',
    law: 'Parallel sessions meet by content-uuid merge; same sealed artifact ⇒ one lattice vertex.',
  },
  'prompt-injection': {
    problem: 'prompt-injection',
    atoms: ['sandbox', 'receipt', 'ai'],
    facet: 'trustBoundaryVerdict',
    coverage: 'extended',
    law: 'Untrusted payload pre-flight + sandbox permits + receipt per action — fail-closed.',
  },
  'audit-trail-fragmentation': {
    problem: 'audit-trail-fragmentation',
    atoms: ['receipt', 'agents/mcp', 'identity'],
    facet: 'workflowCorrelationUuid+receiptAgentStep',
    coverage: 'extended',
    law: 'One workflow correlation uuid; every agent step receipts onto one chain — no fragmented logs.',
  },
  'cost-runaway': {
    problem: 'cost-runaway',
    atoms: ['chat', 'agent/sync/chat-broadcast'],
    facet: 'cascadeDepthVerdict',
    coverage: 'extended',
    law: 'MAX_BROADCAST_DEPTH caps society cascade hops — runaway loop guard.',
  },
  'model-drift': {
    problem: 'model-drift',
    atoms: ['ai', 'merge', 'identity'],
    facet: 'cache-vote+contentUuid',
    coverage: 'existing',
    law: 'Identical answers merge to one voted slot; content-uuid keys survive model swaps.',
  },
  'pii-leakage': {
    problem: 'pii-leakage',
    atoms: ['ai', 'memory/architecture', 'quantum/sanitization'],
    facet: 'sanitisePiiForAi+ephemeralStrip',
    coverage: 'existing',
    law: 'PII stripped before inference; ephemeral chat fields never enter architecture memory.',
  },
  'human-in-the-loop': {
    problem: 'human-in-the-loop',
    atoms: ['ai/suggestions', 'confirm'],
    facet: 'humanGateVerdict',
    coverage: 'extended',
    law: 'High-risk aiRiskClass refuses auto-accept — GDPR Art.22(3) human gate.',
  },
  'vendor-lockin': {
    problem: 'vendor-lockin',
    atoms: ['identity', 'self', 'diamond'],
    facet: 'contentUuidPortability',
    coverage: 'existing',
    law: 'Artifacts are content-addressed; corpus is self-sufficient — vendor models are optional faces.',
  },
}

/** Lookup the diamond remedy for one industry problem. */
export function remedyFor(problem: AiIndustryProblem): DiamondRemedy {
  return REMEDIES[problem]
}

/** All registered problems in stable order. */
export function allProblems(): readonly AiIndustryProblem[] {
  return AI_INDUSTRY_PROBLEMS
}

/** Content-uuid of action arguments — binds tool calls to schema, not hallucinated labels. */
export function actionContentUuid(actionContent: unknown): string {
  return uuid(jcsCanonicalize(actionContent))
}

/**
 * Ground a tool call: sandbox permits + optional args content-uuid match.
 * Hallucinated API arguments fail when expectedArgsUuid is set and differs.
 */
export function groundToolCall(
  grant: ToolGrant,
  action: ToolAction,
  actionContent: unknown,
  expectedArgsUuid?: string,
): { readonly grounded: boolean; readonly reason?: string } {
  const permit = permits(grant, action)
  if (!permit.allowed) return { grounded: false, reason: permit.reason }
  if (expectedArgsUuid !== undefined) {
    const actual = actionContentUuid(actionContent)
    if (actual !== expectedArgsUuid) {
      return {
        grounded: false,
        reason: `args content-uuid mismatch: expected ${expectedArgsUuid}, got ${actual}`,
      }
    }
  }
  return { grounded: true }
}

/** One correlation uuid per multi-agent workflow — propagated through every receipt. */
export function workflowCorrelationUuid(
  tenantId: string,
  workflowKind: string,
  seed: unknown,
): string {
  return uuid(jcsCanonicalize({ tenantId, workflowKind, seed }))
}

const workflowActionLabel = (workflowUuid: string, agentId: string, stepKind: string, action: ToolAction): string =>
  `workflow:${workflowUuid} agent:${agentId} step:${stepKind} ${[action.capability, action.host, action.credentialHandle].filter(Boolean).join(' ')}`

/**
 * Receipt one agent step inside a workflow — sandbox evaluate with workflow-prefixed action.
 * Closes audit-trail fragmentation: one chain, one correlation uuid.
 */
export function receiptAgentStep(args: {
  readonly workflowUuid: string
  readonly agentId: string
  readonly stepKind: string
  readonly grant: ToolGrant
  readonly action: ToolAction
  readonly head: { leafUuid: string; seq: number } | null
  readonly timestampIso: string
  readonly untrustedPayload?: unknown
}): SandboxEvaluation {
  const label = workflowActionLabel(args.workflowUuid, args.agentId, args.stepKind, args.action)
  const base = trustBoundaryVerdict({
    grant: args.grant,
    action: args.action,
    actor: args.agentId,
    head: args.head,
    timestampIso: args.timestampIso,
    untrustedPayload: args.untrustedPayload,
    actionLabel: label,
  })
  return base
}

/** Parallel agent artifacts converge — sessions meet by content-uuid (no collision). */
export function convergeAgentArtifacts(
  lattice: SessionLattice,
  artifacts: readonly SessionArtifact[],
  sessionIds: readonly string[],
): SessionLattice {
  if (artifacts.length !== sessionIds.length) {
    throw new Error(`artifacts/sessionIds length mismatch: ${artifacts.length} vs ${sessionIds.length}`)
  }
  let next = lattice
  for (let i = 0; i < artifacts.length; i++) {
    next = recordSessionArtifact(next, artifacts[i]!, sessionIds[i]!)
  }
  return next
}

/** Broadcast cascade hop guard — cost runaway / infinite agent loops. */
export function cascadeDepthVerdict(depth: number): { readonly allowed: boolean; readonly reason?: string } {
  if (depth >= MAX_BROADCAST_DEPTH) {
    return { allowed: false, reason: `depth ${depth} >= MAX_BROADCAST_DEPTH ${MAX_BROADCAST_DEPTH}` }
  }
  return { allowed: true }
}

/** Output must cite sealed source uuids — ungrounded hallucination fails closed. */
export function groundOutputVerdict(
  citedSourceUuids: readonly string[],
  sealedSourceUuids: ReadonlySet<string>,
): { readonly grounded: boolean; readonly reason?: string } {
  if (citedSourceUuids.length === 0) {
    return { grounded: false, reason: 'no sealed sources cited' }
  }
  for (const id of citedSourceUuids) {
    if (!sealedSourceUuids.has(id)) {
      return { grounded: false, reason: `cited source ${id} is not sealed` }
    }
  }
  return { grounded: true }
}

/** GDPR Art.22 human gate — high-risk refuses auto-accept. */
export function humanGateVerdict(riskClass: string): {
  readonly requiresHuman: boolean
  readonly autoAcceptAllowed: boolean
} {
  const high = riskClass === 'high' || riskClass === 'unacceptable'
  return { requiresHuman: high, autoAcceptAllowed: !high }
}

/**
 * Trust boundary in one step: injection pre-flight (fail-closed) then sandbox evaluate+receipt.
 */
const sandboxActionLabel = (action: ToolAction): string =>
  [action.capability, action.host, action.credentialHandle].filter(Boolean).join(' ')

export function trustBoundaryVerdict(args: {
  readonly grant: ToolGrant
  readonly action: ToolAction
  readonly actor: string
  readonly head: { leafUuid: string; seq: number } | null
  readonly timestampIso: string
  readonly untrustedPayload?: unknown
  readonly actionLabel?: string
}): SandboxEvaluation {
  const label = args.actionLabel ?? sandboxActionLabel(args.action)
  if (args.untrustedPayload !== undefined && detectPromptInjection(args.untrustedPayload)) {
    const decision: Decision = {
      action: label,
      actor: args.actor,
      outcome: 'block',
      tier: 'sandbox',
      capabilities: args.grant.capabilities,
    }
    const receipt = issueReceipt({ decision, head: args.head, timestampIso: args.timestampIso })
    return { allowed: false, reason: 'prompt-injection detected', decision, receipt }
  }
  const verdict = permits(args.grant, args.action)
  const decision: Decision = {
    action: label,
    actor: args.actor,
    outcome: verdict.allowed ? 'allow' : 'block',
    tier: 'sandbox',
    capabilities: args.grant.capabilities,
  }
  const receipt = issueReceipt({ decision, head: args.head, timestampIso: args.timestampIso })
  return {
    allowed: verdict.allowed,
    ...(verdict.reason ? { reason: verdict.reason } : {}),
    decision,
    receipt,
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const problem = (process.argv[2] ?? 'hallucination') as AiIndustryProblem
  const remedy = remedyFor(problem)
  console.log(`ai/industry — ${problem}`)
  console.log(`  facet: ${remedy.facet} (${remedy.coverage})`)
  console.log(`  atoms: ${remedy.atoms.join(' · ')}`)
  console.log(`  law: ${remedy.law}`)
}
