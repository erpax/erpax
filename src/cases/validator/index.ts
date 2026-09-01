/**
 * cases/validator — case balance law (charge ↔ defence → judgment).
 *
 * A case seals only when charge and defence balance into a judgment.
 * The ledger-closing rule applied to public order.
 *
 * @see ../index.ts (parent collection config)
 */
import type { CollectionBeforeChangeHook } from 'payload'

/**
 * A matter is sealed, never deleted (the append-only / no-erasure law).
 */
export const neverDelete = () => false

/**
 * The balance law as a guard: a matter SEALS (step 9, unity) only once
 * charge↔defence have balanced into a judgment — the ledger closing rule
 * applied to public order. Without the judgment the books do not balance, so
 * the matter cannot close.
 */
export const requireJudgmentToSeal: CollectionBeforeChangeHook = ({ data }) => {
  const status = (data as { status?: unknown })?.status
  const judgment = String((data as { judgment?: unknown })?.judgment ?? '').trim()
  if (status === 'sealed' && !judgment) {
    throw new Error(
      'cases: a matter seals only when charge↔defence balance into a judgment — set `judgment` before sealing (justice balances like a ledger).',
    )
  }
  return data
}

/**
 * Validate a case transition.
 */
export function validateCaseTransition(fromStep: number, toStep: number): boolean {
  if (fromStep === toStep) return true
  // Allow forward transitions only
  return toStep > fromStep
}

/** @index-cross.foldback child=cases/validator parent=cases — this cross folds back into its parent. */
