/** @index-cross.foldback child=invoices/hooks/transition parent=invoices/hooks — this cross folds back into its parent. */
/**
 * Status transitions an AR/AP document emits an event for — see ./SKILL.md.
 *
 * @standard IFRS IAS-1 presentation (a reversal is a transition, never an edit)
 */

/** Every status that means "taken back". AR and AP agree on this set; both are checked by test. */
export const REVERSED_STATUSES: ReadonlySet<string> = new Set(['cancelled', 'reversed', 'voided'])

/** AR: an invoice is live once issued, and stays live through its grace period. */
export const INVOICE_ACTIVE_STATUSES: ReadonlySet<string> = new Set([
  'issued',
  'open',
  'active',
  'past_due',
  'grace_period',
])

/** AP: a bill becomes live on APPROVAL — the AP-side authorisation AR has no equivalent of. */
export const BILL_ACTIVE_STATUSES: ReadonlySet<string> = new Set([
  'issued',
  'open',
  'approved',
  'active',
  'past_due',
])

/**
 * Became active on THIS write. With no previousDoc the write is a create, so an active status is
 * an activation; with one, only a crossing counts — a re-save while already active is not an event.
 */
export const justActivated = (
  active: ReadonlySet<string>,
  doc: Record<string, unknown>,
  previousDoc?: Record<string, unknown>,
): boolean => {
  const status = doc.status as string | undefined
  if (!status || !active.has(status)) return false
  if (!previousDoc) return true
  return !active.has(previousDoc.status as string)
}

/**
 * Was reversed on THIS write. Unlike activation, a create can NEVER be a reversal: a document that
 * arrives already cancelled reverses nothing, so there is no event and no GL entry to undo.
 */
export const justReversed = (
  active: ReadonlySet<string>,
  doc: Record<string, unknown>,
  previousDoc?: Record<string, unknown>,
): boolean => {
  const status = doc.status as string | undefined
  if (!status || !REVERSED_STATUSES.has(status)) return false
  if (!previousDoc) return false
  return active.has(previousDoc.status as string)
}
