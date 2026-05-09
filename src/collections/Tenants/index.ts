import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { isSuperAdminAccess, isSuperAdminFieldAccess } from '@/access/isSuperAdmin'
import { localeRecord } from '@/i18n'
import { updateAndDeleteAccess } from './access/updateAndDelete'

const superAdminSecretsAccess = {
  read: isSuperAdminFieldAccess,
  update: isSuperAdminFieldAccess,
} as const

/**
 * Tenants — multi-tenant root entity ("host" alias used in legacy types).
 *
 * Each tenant is a GDPR controller and the boundary of all access scoping.
 *
 * @standard ISO-17442-1:2020 lei legal-entity-identifier
 * @standard ISO-3166-1:2020 country-codes alpha-2
 * @standard ISO-4217:2015 currency-codes default-currency
 * @standard BCP-47 language-tag default-locale
 * @compliance GDPR Art.4(7) data-controller
 * @compliance GDPR Art.30 records-of-processing-activities
 * @security ISO-27001 A.5.23 information-security-for-cloud-services
 * @security ISO-27002 §5.15 access-control
 * @compliance SOC-2 CC6.1 logical-access-controls
 * @see docs/STANDARDS.md §3
 */
export const Tenants: CollectionConfig = {
  slug: 'tenants',
  access: {
    create: isSuperAdminAccess,
    delete: updateAndDeleteAccess,
    read: authenticated,
    update: updateAndDeleteAccess,
  },
  admin: {
    useAsTitle: 'name',
  },
  labels: {
    singular: localeRecord('tenants.singular'),
    plural: localeRecord('tenants.plural'),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: localeRecord('tenants.name'),
      required: true,
    },
    {
      name: 'domain',
      type: 'text',
      label: localeRecord('tenants.domain'),
      /** Tenant-domain routing lookup (`tenant-domains/...`) — fewer D1 rows scanned per request. */
      index: true,
      admin: {
        description: localeRecord('tenants.domainHelp'),
      },
    },
    {
      name: 'slug',
      type: 'text',
      label: localeRecord('tenants.slug'),
      admin: {
        description: localeRecord('tenants.slugHelp'),
      },
      index: true,
      required: true,
    },
    {
      name: 'locales',
      type: 'json',
      label: localeRecord('tenants.locales'),
      admin: {
        description: localeRecord('tenants.localesHelp'),
        position: 'sidebar',
      },
      defaultValue: [],
    },
    /**
     * Per-tenant Payload-shaped sandbox config.
     *
     * `tenant.config` is the canonical Payload `Config` shape, scoped
     * per tenant — the same way the global Payload config governs the
     * deployment, this group governs everything that can vary per
     * tenant within a single deployment. The nested groups
     * (`identity`, `localization`, `currency`, `accounting`, `email`,
     * `branding`, `features`) mirror the corresponding sections of
     * Payload's own Config interface.
     *
     * **International-first cascade** (most-specific wins):
     *   1. Document field (e.g. `address.country`, `invoice.currencyCode`)
     *   2. `tenant.config.<section>.<field>` — explicit per-tenant override
     *   3. `tenant.config.identity.country` → `COUNTRY_PROFILES[country]` derived defaults
     *   4. Deployment defaults (`getRegionalDefaults` from env / `DEFAULT_*`)
     *
     * Any country (ISO 3166-1 alpha-2) and any currency (ISO 4217 §5
     * alphabetic) is welcome — the curated `COUNTRY_PROFILES` /
     * `SUPPORTED_CURRENCIES` lists are the well-known cohort that
     * generators ship explicit adapters for; tenants outside that set
     * are accepted with regex-shape validation. A BG-incorporated
     * tenant CAN explicitly choose `accounting.standard = 'GAAP'` and
     * `currency.reportingCurrency = 'USD'` — and the cascade respects it.
     *
     * @standard ISO-3166-1:2020 country-codes alpha-2 identity.country
     * @standard ISO-4217:2015 currency-codes alphabetic currency.reportingCurrency
     * @standard BCP-47 language-tag localization.defaultLocale
     * @standard ECMA-402 internationalization-api locale-cascade
     * @accounting IFRS IAS-1 presentation-of-financial-statements per-tenant-framework
     * @security ISO-27001 A.5.23 cloud-service-tenant-isolation per-tenant-sandbox-config
     * @audit ISO-19011:2018 audit-trail config-change
     */
    {
      name: 'config',
      type: 'group',
      label: localeRecord('tenants.config'),
      admin: {
        description: localeRecord('tenants.configHelp'),
      },
      fields: [
        {
          name: 'identity',
          type: 'group',
          admin: { description: 'Legal-entity identity for this tenant.' },
          fields: [
            {
              name: 'country',
              type: 'text',
              admin: {
                description:
                  'ISO 3166-1 alpha-2 country code (e.g. BG, US, DE, JP, NO, SA). Any code accepted; drives derived currency / locale / accounting standard when those nested overrides are absent.',
              },
            },
            {
              name: 'legalName',
              type: 'text',
              admin: { description: 'Registered legal name (may differ from the customer-facing brand name).' },
            },
            {
              name: 'taxRegistration',
              type: 'text',
              admin: { description: 'VAT / GST / EIN / GSTIN / etc. as printed on tax documents.' },
            },
          ],
        },
        {
          name: 'localization',
          type: 'group',
          admin: {
            description:
              'Mirrors Payload\'s `localization` section, scoped per tenant. Drives admin UI language, date/number formatting, and document text.',
          },
          fields: [
            {
              name: 'defaultLocale',
              type: 'text',
              admin: {
                description:
                  'BCP 47 locale tag (e.g. bg-BG, en-US, de-DE). Override of the country-derived locale.',
              },
            },
            {
              name: 'fallbackLocale',
              type: 'text',
              admin: { description: 'Fallback BCP 47 locale when a translation is missing.' },
            },
          ],
        },
        {
          name: 'currency',
          type: 'group',
          admin: { description: 'Functional / reporting currency configuration.' },
          fields: [
            {
              name: 'reportingCurrency',
              type: 'text',
              admin: {
                description:
                  'ISO 4217 §5 alphabetic code used as this tenant\'s reporting / functional currency (e.g. EUR, USD, NOK, KRW). Any ISO 4217 code accepted.',
              },
            },
          ],
        },
        {
          name: 'accounting',
          type: 'group',
          admin: { description: 'Accounting framework + fiscal calendar.' },
          fields: [
            {
              name: 'standard',
              type: 'select',
              options: [
                { label: 'IFRS', value: 'IFRS' },
                { label: 'US-GAAP', value: 'GAAP' },
                { label: 'FRS (UK)', value: 'FRS' },
                { label: 'JGAAP (Japan)', value: 'JGAAP' },
                { label: 'ASBE (China)', value: 'ASBE' },
                { label: 'INDAS (India)', value: 'INDAS' },
              ],
              admin: {
                description:
                  'Drives statement structure, OCI placement, SAF-T variant, e-invoicing channel. Overrides the country-derived default.',
              },
            },
            {
              name: 'fiscalYearStartMonth',
              type: 'number',
              min: 1,
              max: 12,
              defaultValue: 1,
              admin: {
                description:
                  'Calendar month (1–12) when this tenant\'s fiscal year begins. Calendar year = 1 (default); UK SME = 4; JP many = 4; AU = 7; US many = 1 or 10.',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'allowPublicRead',
      type: 'checkbox',
      label: localeRecord('tenants.allowPublicRead'),
      admin: {
        description: localeRecord('tenants.allowPublicReadHelp'),
        position: 'sidebar',
      },
      defaultValue: false,
      index: true,
    },
    {
      name: 'publicSiteUrl',
      type: 'text',
      label: localeRecord('tenants.publicSiteUrl'),
      admin: {
        description: localeRecord('tenants.publicSiteUrlHelp'),
        position: 'sidebar',
      },
    },
    {
      name: 'stripePublishableKey',
      type: 'text',
      label: localeRecord('tenants.stripePublishableKey'),
      admin: {
        description: localeRecord('tenants.stripePublishableHelp'),
        position: 'sidebar',
      },
    },
    {
      name: 'stripeSecretKey',
      type: 'text',
      label: localeRecord('tenants.stripeSecretKey'),
      admin: {
        description: localeRecord('tenants.stripeSecretHelp'),
        position: 'sidebar',
      },
      access: superAdminSecretsAccess,
    },
    {
      name: 'stripeWebhookSecret',
      type: 'text',
      label: localeRecord('tenants.stripeWebhookSecret'),
      admin: {
        description: localeRecord('tenants.stripeWebhookHelp'),
        position: 'sidebar',
      },
      access: superAdminSecretsAccess,
    },
    {
      name: 'integrationSettings',
      type: 'json',
      label: localeRecord('tenants.integrationSettings'),
      admin: {
        description: localeRecord('tenants.integrationSettingsHelp'),
        position: 'sidebar',
      },
    },
    {
      name: 'resendApiKey',
      type: 'text',
      label: localeRecord('tenants.resendApiKey'),
      admin: {
        description: localeRecord('tenants.resendApiKeyHelp'),
        position: 'sidebar',
      },
      access: superAdminSecretsAccess,
    },
    {
      name: 'emailDefaultFromAddress',
      type: 'text',
      label: localeRecord('tenants.emailDefaultFromAddress'),
      admin: {
        description: localeRecord('tenants.emailDefaultFromAddressHelp'),
        position: 'sidebar',
      },
    },
    {
      name: 'emailDefaultFromName',
      type: 'text',
      label: localeRecord('tenants.emailDefaultFromName'),
      admin: {
        description: localeRecord('tenants.emailDefaultFromNameHelp'),
        position: 'sidebar',
      },
    },
    {
      name: 'mcpApiKey',
      type: 'text',
      label: localeRecord('tenants.mcpApiKey'),
      admin: {
        description: localeRecord('tenants.mcpApiKeyHelp'),
        position: 'sidebar',
      },
      access: superAdminSecretsAccess,
    },
  ],
}
