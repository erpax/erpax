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
