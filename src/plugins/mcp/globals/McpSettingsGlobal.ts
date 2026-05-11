/**
 * MCP Settings — platform-wide global.
 *
 * Slice DDDDDDDDD (2026-05-11). Per-tenant overrides can layer on
 * top via the `translations` collection (Slice AAAAAAAAA) for any
 * string fields; this global captures the structural settings
 * (default locale, per-area enable flags, request ceilings).
 *
 * @standard ISO/IEC 25010:2023 §5.3 operability (config-as-data)
 * @audit Conservation Law 38 mcp-tool-standardization
 */
import type { GlobalConfig } from 'payload'

export const McpSettingsGlobal: GlobalConfig = {
  slug: 'mcp-settings',
  label: 'MCP Settings',
  admin: {
    group: 'MCP',
    description: 'Platform-wide MCP configuration. Per-tenant overrides via translations collection.',
  },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user && (req.user as { role?: string }).role === 'admin'),
  },
  fields: [
    {
      name: 'defaultLocale',
      type: 'select',
      defaultValue: 'en',
      options: [
        { label: 'English (en)', value: 'en' }, { label: 'Български (bg)', value: 'bg' },
        { label: 'Deutsch (de)', value: 'de' }, { label: 'Français (fr)', value: 'fr' },
        { label: 'Italiano (it)', value: 'it' }, { label: 'Español (es)', value: 'es' },
        { label: '中文 (zh)', value: 'zh' }, { label: '日本語 (ja)', value: 'ja' },
      ],
      admin: { description: 'Default locale when the request has no Accept-Language header.' },
    },
    {
      name: 'enabledAreas',
      type: 'array',
      fields: [
        { name: 'area', type: 'text', required: true,
          admin: { description: 'Tool area name — e.g. "consistency", "cloudflare", "events".' } },
        { name: 'enabled', type: 'checkbox', defaultValue: true },
      ],
      admin: { description: 'Per-area enable flags. Disabled areas are hidden from the admin UI catalog but still callable via MCP protocol.' },
    },
    {
      name: 'requestCeilings',
      type: 'group',
      admin: { description: 'Per-tenant request ceilings; consulted by the mediator before invoking expensive tools.' },
      fields: [
        { name: 'aiCallsPerHour',     type: 'number', defaultValue: 1000 },
        { name: 'browserRendersPerHour', type: 'number', defaultValue: 100 },
        { name: 'emailsPerHour',      type: 'number', defaultValue: 500 },
        { name: 'vectorizeQueriesPerHour', type: 'number', defaultValue: 10000 },
      ],
    },
    {
      name: 'platformBanner',
      type: 'textarea',
      localized: true,
      admin: { description: 'Optional banner displayed atop the MCP admin UI. Localized.' },
    },
  ],
}
