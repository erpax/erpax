/**
 * `authenticatedOrPublished` access predicate — auth users see drafts,
 * anonymous users see only published versions.
 *
 * @security ISO-27001 A.5.18 access-rights
 * @security ISO-27002 §5.15 access-control
 * @security ISO-27002 §8.3 information-access-restriction
 * @audit ISO-19011:2018 audit-trail draft-vs-published
 * @see src/standards/iso-27002/types.ts
 * @see docs/STANDARDS.md §4.4
 */

import type { Access } from 'payload'
import type { Iso27002ControlId } from '@/standards/iso-27002'

import { wherePublished } from '@/utilities/scopes'

export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user) {
    return true
  }

  return wherePublished
}

/**
 * Canonical ISO 27002 controls this predicate exercises:
 *   5.15 — Access control
 *   5.18 — Access rights (draft visibility = authenticated only)
 *   8.3  — Information access restriction (filter on published flag)
 */
export const controlsApplied: ReadonlyArray<Iso27002ControlId> = [
  '5.15',
  '5.18',
  '8.3',
] as const
