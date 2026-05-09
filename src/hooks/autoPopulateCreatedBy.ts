/**
 * Auto-populate `createdBy` from the request user on create.
 *
 * Drop into `beforeChange` to set the authoring user on first save without
 * trusting client input. Companion to {@link autoPopulateHost}.
 *
 * @audit ISO-19011:2018 audit-trail authorship-attribution
 * @compliance SOC-2 CC4.1 monitoring-and-evaluation
 * @compliance SOX §404 internal-controls
 * @security ISO-27002 §5.15 access-control
 * @see docs/STANDARDS.md §4.4
 */

import type { CollectionBeforeChangeHook } from 'payload'

export const autoPopulateCreatedBy: CollectionBeforeChangeHook = async ({ data, req, operation }) => {
  if (operation === 'create' && req.user?.id && !data.createdBy) {
    data.createdBy = req.user.id
  }
  return data
}
