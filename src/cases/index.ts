/**
 * Cases — the public-order docket: adjudication as a balanced state-machine.
 *
 * The realization of the `justice` skill. A `case` (legal matter) is the docket
 * node; it carries parties under roles (complainant/defendant/prosecutor/judge/
 * counsel/witness) the same polymorphic way a transaction-bearing collection
 * does, and moves through a CLOSED lifecycle on the horo ring — never an
 * open-ended status set. The two-fold law (duality): charge↔defence balances
 * into a judgment, exactly as a ledger balances debit↔credit — and a matter
 * SEALS only when it does (`requireJudgmentToSeal`). Evidence and proceedings
 * are append-only (filed, never edited, only superseded), so the chain of
 * custody is recoverable from any part. Visibility is row-level: a party sees
 * only matters they are on (`partyRoleAccess`), the judicial twin of tenant
 * isolation. Content-addressed like every node (the global content-uuid plugin):
 * same matter content ⇒ same id ⇒ matters merge by design.
 *
 * @standard UN-COFOG-03 public-order-and-safety law-courts
 * @standard ISO-19011:2018 ISA-500 evidence chain-of-custody append-only
 * @audit ISO-19011:2018 audit-trail file·hear·rule·seal
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation party-scoped-read
 */
import type { CollectionConfig } from 'payload'
import { partyRoleAccess, scopedAccess } from '@/auth'
import { auditFields, countryCodeField, referenceField } from '@/field'
import { partyRefField, typeField } from '@/discriminator'
import { standardCollectionHooks } from '@/standard/collection/hook'
import { horoStateField } from '@/horo'
import { CASE_RING } from './lifecycle/index'
import { requireJudgmentToSeal, neverDelete } from './validator/index'

// Re-export for convenience
export { CASE_RING, type HoroState } from './lifecycle/index'
export { requireJudgmentToSeal, validateCaseTransition } from './validator/index'

export const Cases: CollectionConfig = {
  slug: 'cases',
  labels: { singular: 'Case', plural: 'Cases' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'type', 'status', 'forum', 'filedAt'],
    group: 'Public Order',
    description:
      'The public-order docket — a balanced state-machine on the horo ring. Parties under roles, append-only evidence, row-level visibility; a matter seals only when charge↔defence balance into a judgment.',
  },
  // Row-level: a party sees only the matters they are on; admins hold the capability.
  access: {
    read: partyRoleAccess(
      'cases',
      ['complainant', 'defendant', 'prosecutor', 'judge', 'counsel', 'witness'],
      { capabilityRoles: ['admin'] },
    ),
    create: scopedAccess(),
    update: scopedAccess(),
    delete: neverDelete,
  },
  fields: [
    referenceField({ description: 'Docket number — the matter reference (e.g. `2026-CV-001`).' }),
    typeField(['civil', 'criminal', 'administrative', 'disciplinary', 'arbitration', 'mediation'], {
      defaultValue: 'civil',
      description:
        'Matter type — `criminal` carries the offence record; `arbitration`/`mediation` are the dispute-resolution forks. One docket, many subtypes (branch on `type`).',
    }),
    horoStateField('status', CASE_RING, {
      defaultValue: 'filed',
      required: true,
      description:
        'Lifecycle on the 1·2·4·8·7·5·9 ring: filed → served → discovery → heard → adjudicated → remedied → sealed. Off-ring is disharmony.',
    }),
    { name: 'title', type: 'text', required: true, index: true },
    { name: 'forum', type: 'text', admin: { description: 'The court / tribunal / arbitrator (COFOG 03.3 law-courts).' } },
    countryCodeField({ description: 'Jurisdiction — ISO 3166-1 alpha-2 (the governing-law seat).' }),

    // The two-fold law (duality): each pole defines the other; they resolve into the judgment.
    { name: 'charge', type: 'textarea', admin: { description: 'The charge / claim / offence asserted — one pole of the matter.' } },
    { name: 'defence', type: 'textarea', admin: { description: 'The defence / answer — the opposing pole. Each pole defines the other.' } },
    {
      name: 'judgment',
      type: 'textarea',
      admin: {
        description:
          'The balanced resolution of charge↔defence — set at adjudication and REQUIRED to seal (the matter balances like a ledger).',
      },
    },

    // Parties under roles — multi-party by construction (the polymorphic party array).
    partyRefField(['complainant', 'defendant', 'prosecutor', 'judge', 'counsel', 'witness'], {
      name: 'parties',
      relationTo: ['users', 'customers', 'vendors', 'employees', 'legal-entities'],
      description: 'Parties under roles — the same polymorphic form a transaction-bearing collection uses.',
    }),

    { name: 'filedAt', type: 'date' },
    { name: 'sealedAt', type: 'date', admin: { description: 'When the matter closed (became precedent).' } },

    // Proceedings — append-only hearings/sessions (a docket holds proceedings, one scale down).
    {
      name: 'proceedings',
      type: 'array',
      admin: {
        readOnly: true,
        description: 'Hearings / sessions — append-only. A docket holds proceedings (the same form, one scale down).',
      },
      fields: [
        {
          name: 'kind',
          type: 'select',
          required: true,
          options: [
            { label: 'Hearing', value: 'hearing' },
            { label: 'Session', value: 'session' },
            { label: 'Motion', value: 'motion' },
            { label: 'Ruling', value: 'ruling' },
          ],
        },
        { name: 'heldAt', type: 'date' },
        { name: 'summary', type: 'textarea' },
        { name: 'ruling', type: 'textarea' },
      ],
    },

    // Evidence — append-only, content-addressed chain of custody (ISO 19011 / ISA 500).
    {
      name: 'evidence',
      type: 'array',
      admin: {
        readOnly: true,
        description:
          'Chain of custody — append-only and content-addressed. Once filed an exhibit is never edited or deleted, only superseded.',
      },
      fields: [
        {
          name: 'contentUuid',
          type: 'text',
          index: true,
          admin: { description: 'Content-uuid of the exhibit (RFC 9562 §5.8) — same content ⇒ same id.' },
        },
        { name: 'kind', type: 'text' },
        { name: 'summary', type: 'textarea' },
        { name: 'filedAt', type: 'date' },
        { name: 'filedBy', type: 'relationship', relationTo: 'users' },
        {
          name: 'supersedes',
          type: 'text',
          admin: { description: 'The content-uuid this exhibit supersedes (supersede — never delete).' },
        },
      ],
    },

    // Police/prosecution coordination — cross-references, not a new silo.
    {
      name: 'relatedMatters',
      type: 'relationship',
      relationTo: 'cases',
      hasMany: true,
      admin: { description: 'Cross-referenced matters (coordination is cross-reference, not a separate collection).' },
    },

    ...auditFields({ readOnly: true }),
  ],
  hooks: standardCollectionHooks('cases', { beforeChange: [requireJudgmentToSeal] }),
  timestamps: true,
}

export default Cases
