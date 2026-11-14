/**
 * enforceSeparation — a user may not hold account roles the registry declares exclusive.
 *
 * Runs on create and update. It judges the roles the document WILL have (the incoming data over the
 * stored document), so removing a conflicting role in the same update is allowed. Refused with a 400
 * naming the pair, never silently dropped.
 *
 * @standard ISO-27002 §5.3 segregation-of-duties
 * @standard ANSI/INCITS-359 static separation of duty
 * @see src/utilities/roles/separation/index.ts
 */
import { APIError, type CollectionBeforeChangeHook } from 'payload'

import { accountConflicts, conflictMessage } from '@/utilities/roles/separation'

export const enforceSeparation: CollectionBeforeChangeHook = ({ data, originalDoc }) => {
  const roles = (data?.roles ?? originalDoc?.roles ?? []) as string[]
  const conflicts = accountConflicts(roles)
  if (conflicts.length > 0) throw new APIError(conflictMessage(conflicts), 400)
  return data
}
