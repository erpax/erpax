/**
 * `publishedAt` populator — sets the timestamp on first create/update if absent.
 *
 * @standard ISO-8601-1:2019 date-time
 * @audit ISO-19011:2018 audit-trail publication-timestamp
 * @see docs/STANDARDS.md §3
 */

import type { CollectionBeforeChangeHook } from 'payload'

export const populatePublishedAt: CollectionBeforeChangeHook = ({ data, operation, req }) => {
  if (operation === 'create' || operation === 'update') {
    if (req.data && !req.data.publishedAt) {
      const now = new Date()
      return {
        ...data,
        publishedAt: now,
      }
    }
  }

  return data
}
