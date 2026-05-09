import type { CollectionConfig } from 'payload'

/**
 * Default **versions** + **drafts** block for content collections (Payload Versions / Drafts).
 *
 * Versioning provides the write-side audit trail: every change becomes a
 * version row that survives publish/unpublish and supports scheduled-publish.
 *
 * @audit ISO-19011:2018 audit-trail content-versioning
 * @compliance SOX §404 internal-controls record-retention
 * @compliance GDPR Art.5(1)(e) storage-limitation maxPerDoc-cap
 * @see https://payloadcms.com/docs/versions/drafts
 * @see docs/STANDARDS.md §3
 */
export const defaultVersionedDrafts: NonNullable<CollectionConfig['versions']> = {
  drafts: {
    autosave: {
      interval: 100, // tuned for live preview responsiveness
    },
    /** @see https://payloadcms.com/docs/versions/drafts#scheduled-publish */
    schedulePublish: true,
  },
  maxPerDoc: 50,
}
