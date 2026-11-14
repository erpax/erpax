/**
 * Auto-set ISO 8601 timestamp on a configurable field when a condition fires.
 *
 * Used for `postedAt` / `approvedAt` / `reconciledAt` / `authorizedAt` style
 * status-transition timestamps. Always emits canonical UTC ISO-8601 form.
 *
 * @standard ISO-8601-1:2019 date-time utc-canonical
 * @audit ISO-19011:2018 audit-trail status-transition-timestamp
 * @compliance SOX §404 internal-controls verifiable-event-time
 * @see docs/STANDARDS.md §4.1
 */

import type { CollectionBeforeChangeHook } from 'payload'

export function autoSetTimestamp(
  timestampField: string,
  condition: (data: Record<string, unknown>) => boolean,
): CollectionBeforeChangeHook {
  return async ({ data }) => {
    if (condition(data) && !data[timestampField]) {
      data[timestampField] = new Date().toISOString()
    }
    return data
  }
}
