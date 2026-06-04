/**
 * Where-filter primitives — `wherePublished` / `wherePublishedAnd` for
 * public read predicates that require `versionStatus === 'published'`.
 *
 * @security ISO-27002 §5.15 access-control
 * @security ISO-27002 §8.3 information-access-restriction
 * @audit ISO-19011:2018 audit-trail draft-vs-published
 * @see ./constants.ts
 */

import type { Where } from 'payload'

import { VERSION_STATUS_FIELD, VersionStatus } from '@/scope/constants'

/** Public/anonymous reads: only rows whose version status is published. */
export const wherePublished: Where = {
  [VERSION_STATUS_FIELD]: {
    equals: VersionStatus.published,
  },
}

/** Combine published constraint with another clause (e.g. tenant `in`). */
export function wherePublishedAnd(rest: Where): Where {
  return {
    and: [wherePublished, rest],
  }
}
