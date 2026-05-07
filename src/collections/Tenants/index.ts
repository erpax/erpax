import type { CollectionConfig } from 'payload'

import { isSuperAdminAccess, isSuperAdminFieldAccess } from '@/access/isSuperAdmin'
import { localeRecord } from '@/i18n'
import { updateAndDeleteAccess } from './access/updateAndDelete'

const superAdminSecretsAccess = {
  read: isSuperAdminFieldAccess,
  update: isSuperAdminFieldAccess,
} as const

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  access: {
    create: isSuperAdminAccess,
    delete: updateAndDeleteAccess,
    read: ({ req }) => Boolean(req.user),
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
