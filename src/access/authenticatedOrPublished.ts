/**
 * `authenticatedOrPublished` access predicate — auth users see drafts,
 * anonymous users see only published versions.
 *
 * @security ISO-27001 A.5.18 access-rights
 * @security ISO-27002 §5.15 access-control
 * @security ISO-27002 §8.3 information-access-restriction
 * @audit ISO-19011:2018 audit-trail draft-vs-published
 * @see docs/STANDARDS.md §4.4
 */

import type { Access } from 'payload'

import { wherePublished } from '@/utilities/scopes'

export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user) {
    return true
  }

  return wherePublished
}
