import type { AgentContext, AgentEffect } from '@/agent/types'
import type { SpecChainStep } from '@/spec/generator'

/**
 * agents/registered/step — the chain-step handler eleven agents each wrote out.
 *
 * @see ./SKILL.md
 */

/**
 * The standard `onChainStep`: claim the step if this agent owns the collection it names.
 *
 * A chain step carries its target in its note (`collection=… action=…`). An agent answers only for
 * the collections it owns, and answering means one audit leaf naming the step it handled.
 *
 * This body lived at ELEVEN addresses, byte-identical — 111 nodes each, addressed to one hash by
 * [[rules]]/copy. Eleven copies are one implementation and ten decoys: a fix to the note format, the
 * ownership check or the leaf shape had to be made eleven times, and nothing would have said which
 * copy was missed.
 *
 * `ownsCollections` is passed rather than read from `this`, so the helper is a function of its
 * inputs and an agent that needs different behaviour simply does not call it.
 */
export async function ownedChainStepAudit(
  ctx: AgentContext,
  step: SpecChainStep,
  ownsCollections: ReadonlyArray<string>,
): Promise<AgentEffect[]> {
  const collection = step.note?.match(/\bcollection=([\w-]+)/)?.[1]
  const action = step.note?.match(/\baction=([\w-]+)/)?.[1]
  if (!collection || !ownsCollections.includes(collection)) return []
  return [
    {
      kind: 'audit',
      leaf: {
        tenantId: ctx.tenantId,
        subjectCollection: collection,
        subjectId: 'pending',
        action: action ?? 'unknown',
        chainId: step.chainId,
        chainStepId: `${String(step.stepIndex).padStart(2, '0')}-${collection}-${action ?? 'step'}`,
      },
    },
  ]
}

/** @index-cross.foldback child=agents/registered/step parent=agents/registered — this cross folds back into its parent. */
