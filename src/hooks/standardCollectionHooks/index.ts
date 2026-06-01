/**
 * standardCollectionHooks — the one reused definition of the universal
 * collection lifecycle triple, so it is never re-declared per collection.
 *
 * Every accountable collection shares the same spine:
 *   beforeValidate → autoPopulateTenant   (tenant isolation, before validation)
 *   beforeChange   → autoPopulateCreatedBy (provenance)
 *   afterChange    → … , auditTrailAfterChange(slug)  (audit chain, LAST)
 *
 * Extra hooks compose around the spine via `opts`; the audit hook always runs
 * last so it records the final state. One factory, all collections — DRY.
 *
 * @audit ISO-19011:2018 audit-trail
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation tenant-field
 * @compliance SOX §404 internal-controls provenance
 */
import type {
  CollectionConfig,
  CollectionBeforeValidateHook,
  CollectionBeforeChangeHook,
  CollectionAfterChangeHook,
} from 'payload'
import { autoPopulateTenant } from '../autoPopulateTenant'
import { autoPopulateCreatedBy } from '../autoPopulateCreatedBy'
import { auditTrailAfterChange } from '../auditTrailAfterChange'

export const standardCollectionHooks = (
  slug: string,
  opts: {
    beforeValidate?: CollectionBeforeValidateHook[]
    beforeChange?: CollectionBeforeChangeHook[]
    afterChange?: CollectionAfterChangeHook[]
  } = {},
): NonNullable<CollectionConfig['hooks']> => ({
  beforeValidate: [autoPopulateTenant, ...(opts.beforeValidate ?? [])],
  beforeChange: [autoPopulateCreatedBy, ...(opts.beforeChange ?? [])],
  afterChange: [...(opts.afterChange ?? []), auditTrailAfterChange(slug)],
})
