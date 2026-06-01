/**
 * Connections — the ONE universal edge between any two typeless users.
 *
 * erpax is the transparent global job·trade·social platform on a single graph:
 * **anyone connects to anyone**, in any capacity, at every level. Because the
 * user has NO type (the `all`/`one` actor), there is no business-vs-consumer
 * vs-government distinction — **B2B, C2B, C2C, B2G, C2G are not models, they
 * are directions on the same `from` → `to` party edge**. The edge — never the
 * user — carries the relation in `context`: social (follow/friend/block),
 * commercial (customer/supplier/agent), employment (employer/colleague), and
 * civic (member/represents/governs). All "platforms" merge onto this one
 * collection (the `dimension` law: a per-platform prefix becomes a context).
 *
 * Every edge is **accounted** (polymorphically accountable) and federates **in
 * sync**: each change emits a content-uuid event consumed in-process AND by
 * peers (the `event`/`merge` skills) — same content ⇒ same id ⇒ graphs
 * set-union with no coordination. This is what lets communities self-manage
 * directly at all levels, government included.
 *
 * @standard W3C ActivityStreams 2.0 social-graph-vocabulary (Follow/Block/Like)
 * @standard W3C ActivityPub server-to-server federation (the cross-platform sync)
 * @standard OASIS UBL 2.1 business-relationship (B2B trade edges)
 * @standard Peppol BIS billing-and-procurement (B2B / B2G interoperability)
 * @standard ISO 20022 financial-business-party-relationships
 * @standard RFC-4122 §4.3 content-uuid edge-identity
 * @compliance GDPR Art 17 right-to-erasure Art 21 right-to-object (mute/block)
 * @audit ISO-19011:2018 audit-trail transparent-relationship-ledger
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ../Users/index.ts · ../Posts/index.ts · ../Messages/index.ts · ../Competencies/index.ts
 */
import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '../../hooks/standardCollectionHooks'
import { accountingCollectionAccess } from '../../access/auth'
import { statusField, notesField, auditFields } from '../../fields/base-accounting-fields'

const Connections: CollectionConfig = {
  slug: 'connections',
  labels: { singular: 'Connection', plural: 'Connections' },
  admin: {
    useAsTitle: 'context',
    defaultColumns: ['from', 'context', 'to', 'status', 'createdAt'],
    description:
      'Directed social edge between two typeless users. The edge carries the relation (follow/friend/block…); all platforms merge onto one graph, federating in sync via ActivityPub-style events.',
    group: 'Social',
  },
  access: accountingCollectionAccess(),
  fields: [
    { name: 'from', type: 'relationship', relationTo: 'users', required: true, index: true,
      admin: { description: 'Actor initiating the edge (ActivityStreams `actor`).' } },
    { name: 'to', type: 'relationship', relationTo: 'users', required: true, index: true,
      admin: { description: 'Target of the edge (ActivityStreams `object`).' } },
    {
      name: 'context',
      type: 'select',
      required: true,
      defaultValue: 'follow',
      admin: { description: 'The nature of the edge — the merged-platform dimension (a context, never a user type). B2B/C2B/C2C/B2G are just directions here.' },
      options: [
        // social
        { label: 'Follow', value: 'follow' },
        { label: 'Friend (mutual)', value: 'friend' },
        { label: 'Subscribe', value: 'subscribe' },
        { label: 'Block', value: 'block' },
        { label: 'Mute', value: 'mute' },
        { label: 'Mention', value: 'mention' },
        // commercial (any direction — B2B/C2B/C2C)
        { label: 'Customer of', value: 'customer' },
        { label: 'Supplier to', value: 'supplier' },
        { label: 'Agent for', value: 'agent' },
        { label: 'Carrier for', value: 'carrier' },
        // employment / job-trade
        { label: 'Employer of', value: 'employer' },
        { label: 'Colleague', value: 'colleague' },
        { label: 'Contractor for', value: 'contractor' },
        // civic / government (all levels)
        { label: 'Member of', value: 'member' },
        { label: 'Represents', value: 'represents' },
        { label: 'Governs', value: 'governs' },
        { label: 'Regulated by', value: 'regulated_by' },
      ],
    },
    { name: 'reciprocal', type: 'checkbox', defaultValue: false,
      admin: { readOnly: true, description: 'Derived: a matching reverse edge exists (mutual follow ⇒ friend).' } },
    statusField(
      [
        { label: 'Pending (request sent)', value: 'pending' },
        { label: 'Active', value: 'active' },
        { label: 'Declined', value: 'declined' },
        { label: 'Severed', value: 'severed' },
      ],
      'active',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('connections'),
  timestamps: true,
}

export default Connections
