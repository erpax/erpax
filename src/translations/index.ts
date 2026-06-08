/**
 * Translations — per-tenant override layer above the platform-default
 * localizations.
 *
 * Slice AAAAAAAAA (2026-05-11) — per user "tenants may override app
 * translations using the translations collection". A bank tenant wants
 * regulatory phrasing for `invoice:activated`; a government tenant
 * wants public-administration terminology for the same string; a
 * multi-jurisdiction tenant wants Bulgarian + Macedonian variants
 * neither of which the platform ships by default.
 *
 * Resolution order at request time (highest → lowest priority):
 *
 *   1. `translations` row scoped to (tenant, scope, key) — TENANT OVERRIDE
 *   2. `mcp-tool-metadata` row (Slice ZZZZZZZZ) — PLATFORM-DEFAULT TRANSLATION
 *   3. Code's English fallback (LocalizedString in tools/<area>.ts) — STATIC
 *
 * Both 1 and 2 use Payload's `localized: true` field — the request's
 * `Accept-Language` selects the locale; the layer that matches first
 * wins. No code rebuild required to add a translation at any layer.
 *
 * The `scope` enum keeps the namespace flat but groupable:
 *
 *   mcp-tool             — description / displayName for an MCP tool
 *   ui-surface           — admin UI labels (buttons, headings, empty states)
 *   event-label          — domain-event human labels (for notifications)
 *   notification-template— SMS/email template body
 *   standard-citation    — per-standard custom labels
 *   chain-step           — BUSINESS_CHAINS step display names
 *   other                — escape hatch
 *
 * Per Conservation Law 8 the canonical key is `<scope>:<key>`; the
 * `contentUuid` row field stores the sha-256 of (tenant, scope, key,
 * locale-map) so federation peers can verify two tenants share an
 * override (e.g. all government tenants standardising on the same
 * IPSAS phrasing).
 *
 * @standard W3C HTTP Content-Language (RFC 7231 §3.1.3.2)
 * @standard BCP-47 language tags
 * @standard EU 1958/1 official-languages-of-the-european-union
 * @audit Conservation Law 8 content-uuid
 * @audit Conservation Law 10 referential-harmony (relatedTo back to the source row)
 * @audit ISO 19011:2018 §6.4.6 (translation changes audit-trailed)
 * @see ./McpToolMetadata.ts (platform-default translation layer)
 * @see ../../services/agents/mcp/i18n.ts (runtime resolution order)
 */
import { createAccountingCollection } from '@/factory'
import { referenceField } from '@/base/accounting/field'

export default createAccountingCollection({
  slug: 'translations',
  labels: { singular: 'Translation', plural: 'Translations' },
  useAsTitle: 'translationKey',
  defaultColumns: ['translationKey', 'scope', 'enabled', 'updatedAt'],
  description:
    'Per-tenant override layer above the platform-default localizations. Resolution order: tenant translation > mcp-tool-metadata > code default. Edit value.<locale> via admin UI; runtime resolver picks it up automatically (Payload i18n).',

  standards: [
    'W3C-HTTP-Content-Language',
    'BCP-47',
    'EU-1958/1',
    'ISO/IEC-25010:2023',
  ],
  feature: 'tenant-translations',
  emits: [
    { event: 'translation:added',    onCreate: true,                aggregate: 'order' },
    { event: 'translation:enabled',  onStatus: 'enabled',           aggregate: 'order' },
    { event: 'translation:disabled', onStatus: 'disabled',          aggregate: 'order' },
  ],

  injectStatusField: true,
  statusOptions: [
    { label: 'Enabled (override applies)',                                value: 'enabled' },
    { label: 'Disabled (resolver falls back to platform default)',        value: 'disabled' },
    { label: 'Pending approval (translator drafted; not yet enabled)',    value: 'pending_approval' },
    { label: 'Archived (kept for audit; superseded by a newer override)', value: 'archived' },
  ],
  statusDefault: 'pending_approval',

  fields: () => [
    referenceField({
      name: 'translationKey',
      description: 'Composite key: `<scope>:<key>` — e.g. `mcp-tool:erpax.consistency.scan.description`, `ui-surface:dashboard.welcome.heading`, `event-label:invoice.activated`.',
    }),

    {
      name: 'scope',
      type: 'select',
      required: true,
      admin: { description: 'Namespace of the override. Determines which platform layer this row supersedes.' },
      options: [
        { label: 'MCP tool (description / displayName)',           value: 'mcp-tool' },
        { label: 'UI surface (admin labels / empty states)',       value: 'ui-surface' },
        { label: 'Event label (notification headings)',            value: 'event-label' },
        { label: 'Notification template (SMS / email body)',       value: 'notification-template' },
        { label: 'Standard citation (per-standard custom label)',  value: 'standard-citation' },
        { label: 'Chain step display name',                         value: 'chain-step' },
        { label: 'Other (escape hatch — use sparingly)',            value: 'other' },
      ],
    },

    {
      name: 'key',
      type: 'text',
      required: true,
      index: true,
      admin: { description: 'Scope-local key. For MCP tools, the tool name (e.g. `erpax.consistency.scan`). For UI, the surface key (e.g. `dashboard.welcome.heading`).' },
    },

    {
      name: 'value',
      type: 'textarea',
      required: true,
      // Slice AAAAAAAAA — Payload's localized:true gives us automatic
      // per-locale storage. The runtime resolver picks the locale
      // matching the request's Accept-Language header.
      localized: true,
      admin: { description: 'The localized value. Switch the admin UI locale to add per-language variants.' },
    },

    {
      name: 'note',
      type: 'textarea',
      localized: true,
      admin: { description: 'Optional translator note explaining the override (regulatory rationale, branding choice, glossary alignment, etc.).' },
    },

    // Provenance
    {
      name: 'overrides',
      type: 'group',
      admin: { description: 'Which platform-layer row this overrides. Optional — populated by the resolver when an override is created from the admin UI.' },
      fields: [
        { name: 'collection', type: 'text',
          admin: { description: 'e.g. "mcp-tool-metadata" or "_static" when overriding a code default.' } },
        { name: 'docId', type: 'text',
          admin: { description: 'Document id of the platform-default row, when applicable.' } },
        { name: 'platformDefault', type: 'textarea', localized: true,
          admin: { readOnly: true, description: 'Snapshot of the platform-default value at the time the override was created — for diff review.' } },
      ],
    },

    // Activation window — gives translators a way to schedule rollouts.
    { name: 'effectiveFrom', type: 'date' },
    { name: 'effectiveUntil', type: 'date' },

    // Conservation Law 8 — content-uuid of the override.
    { name: 'contentUuid', type: 'text', index: true,
      admin: { description: 'Sha-256 of (tenant, scope, key, locale-map). Federation peers verify match when sharing overrides across tenants of the same role-profile.' } },

    // Conservation Law 10 — graph back to source rows (the standard /
    // tool / chain this translation describes).
    {
      name: 'relatedTo',
      type: 'array',
      admin: { description: 'Edges to other rows this translation describes — the standard / tool / chain / event the override is about.' },
      fields: [
        { name: 'collection', type: 'text', required: true },
        { name: 'docId', type: 'text', required: true },
        { name: 'edgeKind', type: 'select',
          options: [
            { label: 'Translates (this is the localized form of)', value: 'translates' },
            { label: 'About (this describes)',                       value: 'about' },
            { label: 'Refers (informational pointer)',               value: 'refers' },
          ],
          defaultValue: 'translates',
        },
      ],
    },

    // Tenant-role hint — lets the admin UI surface "every government
    // tenant's IPSAS-aligned phrasing for invoice:activated" via a
    // single query.
    {
      name: 'sharedAcrossRoleProfile',
      type: 'text',
      admin: { description: 'Optional role-profile id (e.g. "government", "bank") this override is intended to be shared across. Federation peers with the same role profile can adopt it.' },
    },
  ],
})
