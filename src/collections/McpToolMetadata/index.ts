/**
 * MCP Tool Metadata — localized + tenant-extensible metadata for every
 * registered erpax.* MCP tool.
 *
 * Slice ZZZZZZZZ (2026-05-11) — per user "in payload even data is
 * translatable so translations are automatic". Instead of inlining
 * a `LocalizedString` per tool in code, the description (and any
 * other user-facing copy) lives here with `localized: true`, so
 * Payload's i18n machinery resolves the right locale automatically
 * for any request — no MCP code rebuild needed when a translator
 * adds a new locale.
 *
 * Pattern at runtime:
 *
 *   1. The tool catalog (services/agents/mcp/tool-defs.ts) emits a
 *      default English description embedded in code.
 *   2. If a row exists in `mcp-tool-metadata` matching the tool name
 *      AND the row's `description` has a value for the request's
 *      `Accept-Language` locale, that overrides the static one.
 *   3. Admin UI translators populate descriptions per locale via the
 *      standard Payload localized-field UI; updates are live (no
 *      redeploy).
 *
 * Tenant-extensible: each tenant can override descriptions (e.g.,
 * bank-tenant wants regulatory phrasing; government-tenant wants
 * compliance terminology). The `tenant` field is auto-populated by
 * the factory.
 *
 * @standard W3C HTTP Content-Language (RFC 7231 §3.1.3.2)
 * @standard BCP-47 language tags
 * @standard EU 1958/1 official-languages-of-the-european-union
 * @audit Conservation Law 38 mcp-tool-standardization (per-tool metadata)
 * @see ../../services/agents/mcp/i18n.ts (static fallback)
 * @see ../../services/agents/mcp/tool-defs.ts (catalog builder)
 */
import { createAccountingCollection } from '../../services/accounting/factories/collection-factory'
import { referenceField } from '../../fields/base-accounting-fields'

export default createAccountingCollection({
  slug: 'mcp-tool-metadata',
  labels: { singular: 'MCP Tool Metadata', plural: 'MCP Tool Metadata' },
  useAsTitle: 'toolName',
  defaultColumns: ['toolName', 'area', 'enabled', 'updatedAt'],
  description:
    'Localized + tenant-extensible metadata overlay for every registered erpax.* MCP tool. Translators fill description.<locale> via the admin UI; the catalog overlays the row\'s values at request time.',

  standards: [
    'W3C-HTTP-Content-Language',
    'BCP-47',
    'EU-1958/1',
    'ISO/IEC-25010:2023',
  ],
  feature: 'mcp-tool-localization',
  emits: [
    { event: 'mcp:metadata:registered', onCreate: true, aggregate: 'order' },
    { event: 'mcp:metadata:enabled',    onStatus: 'enabled',  aggregate: 'order' },
    { event: 'mcp:metadata:disabled',   onStatus: 'disabled', aggregate: 'order' },
  ],

  injectStatusField: true,
  statusOptions: [
    { label: 'Enabled (overlay applies)',                   value: 'enabled' },
    { label: 'Disabled (catalog falls back to code default)', value: 'disabled' },
    { label: 'Pending review (translator added a locale)',   value: 'pending_review' },
  ],
  statusDefault: 'enabled',

  fields: () => [
    referenceField({
      name: 'toolName',
      description: 'Canonical MCP tool id — e.g. "erpax.consistency.scan". Must match a registered tool in the catalog; orphan rows are flagged by the checkMcpToolMetadataOrphans invariant.',
    }),

    {
      name: 'area',
      type: 'select',
      required: true,
      admin: { description: 'Tool family — derived from the second segment of the toolName. Used for grouping in the admin UI.' },
      options: [
        { label: 'accounting',  value: 'accounting' },
        { label: 'agents',      value: 'agents' },
        { label: 'anchoring',   value: 'anchoring' },
        { label: 'archival',    value: 'archival' },
        { label: 'audit',       value: 'audit' },
        { label: 'blocks',      value: 'blocks' },
        { label: 'chain',       value: 'chain' },
        { label: 'cloudflare',  value: 'cloudflare' },
        { label: 'commerce',    value: 'commerce' },
        { label: 'consistency', value: 'consistency' },
        { label: 'did',         value: 'did' },
        { label: 'events',      value: 'events' },
        { label: 'i18n',        value: 'i18n' },
        { label: 'integrity',   value: 'integrity' },
        { label: 'marketing',   value: 'marketing' },
        { label: 'meta',        value: 'meta' },
        { label: 'multimedia',  value: 'multimedia' },
        { label: 'platform',    value: 'platform' },
        { label: 'pwa',         value: 'pwa' },
        { label: 'refs',        value: 'refs' },
        { label: 'seo',         value: 'seo' },
        { label: 'spec',        value: 'spec' },
        { label: 'standards',   value: 'standards' },
        { label: 'storage',     value: 'storage' },
        { label: 'streams',     value: 'streams' },
        { label: 'voting',      value: 'voting' },
        { label: 'website',     value: 'website' },
        { label: 'other',       value: 'other' },
      ],
    },

    {
      name: 'description',
      type: 'textarea',
      required: true,
      // Slice ZZZZZZZZ — Payload's localized:true gives us automatic
      // per-locale storage. Admin UI shows a locale switcher; API
      // resolves the right locale per Accept-Language.
      localized: true,
      admin: { description: 'Tool description; localizable. The MCP catalog overlays this on the code default at request time.' },
    },

    {
      name: 'displayName',
      type: 'text',
      localized: true,
      admin: { description: 'Optional friendly name for admin UI panels (e.g. "Run consistency check" vs. "erpax.consistency.scan").' },
    },

    {
      name: 'tags',
      type: 'array',
      admin: { description: 'Free-form tags for grouping / filtering — "observability", "tamper-evident", "experimental", etc.' },
      fields: [{ name: 'tag', type: 'text', required: true }],
    },

    {
      name: 'documentationUrl',
      type: 'text',
      localized: true,
      admin: { description: 'Optional URL to a per-locale documentation page that expands on the description.' },
    },

    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'When false, the catalog falls back to the code default; the tool itself is NOT disabled (that\'s the feature-registry job — see access/feature-registry.ts).' },
    },

    {
      name: 'lastSyncedFromCatalogAt',
      type: 'date',
      admin: {
        readOnly: true,
        description: 'Timestamp the row was last reconciled against the live tool catalog (by erpax.i18n.audit). Stale rows surface in the orphan-check.',
      },
    },
  ],
})
