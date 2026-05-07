import type { CollectionConfig } from 'payload'

import { isSuperAdminAccess, isSuperAdminFieldAccess } from '@/access/isSuperAdmin'
import { t } from '@/i18n'
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
    singular: t('tenants.singular'),
    plural: t('tenants.plural'),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: t('tenants.name'),
      required: true,
    },
    {
      name: 'domain',
      type: 'text',
      label: t('tenants.domain'),
      admin: {
        description: t('tenants.domainHelp'),
      },
    },
    {
      name: 'slug',
      type: 'text',
      label: t('tenants.slug'),
      admin: {
        description: t('tenants.slugHelp'),
      },
      index: true,
      required: true,
    },
    {
      name: 'allowPublicRead',
      type: 'checkbox',
      label: t('tenants.allowPublicRead'),
      admin: {
        description: t('tenants.allowPublicReadHelp'),
        position: 'sidebar',
      },
      defaultValue: false,
      index: true,
    },
    {
      name: 'publicSiteUrl',
      type: 'text',
      label: t('tenants.publicSiteUrl'),
      admin: {
        description: t('tenants.publicSiteUrlHelp'),
        position: 'sidebar',
      },
    },
    {
      name: 'stripePublishableKey',
      type: 'text',
      label: t('tenants.stripePublishableKey'),
      admin: {
        description: t('tenants.stripePublishableHelp'),
        position: 'sidebar',
      },
    },
    {
      name: 'stripeSecretKey',
      type: 'text',
      label: t('tenants.stripeSecretKey'),
      admin: {
        description: t('tenants.stripeSecretHelp'),
        position: 'sidebar',
      },
      access: superAdminSecretsAccess,
    },
    {
      name: 'stripeWebhookSecret',
      type: 'text',
      label: t('tenants.stripeWebhookSecret'),
      admin: {
        description: t('tenants.stripeWebhookHelp'),
        position: 'sidebar',
      },
      access: superAdminSecretsAccess,
    },
    {
      name: 'integrationSettings',
      type: 'json',
      label: t('tenants.integrationSettings'),
      admin: {
        description: t('tenants.integrationSettingsHelp'),
        position: 'sidebar',
      },
    },
    {
      name: 'resendApiKey',
      type: 'text',
      label: t('tenants.resendApiKey'),
      admin: {
        description: t('tenants.resendApiKeyHelp'),
        position: 'sidebar',
      },
      access: superAdminSecretsAccess,
    },
    {
      name: 'emailDefaultFromAddress',
      type: 'text',
      label: t('tenants.emailDefaultFromAddress'),
      admin: {
        description: t('tenants.emailDefaultFromAddressHelp'),
        position: 'sidebar',
      },
    },
    {
      name: 'emailDefaultFromName',
      type: 'text',
      label: t('tenants.emailDefaultFromName'),
      admin: {
        description: t('tenants.emailDefaultFromNameHelp'),
        position: 'sidebar',
      },
    },
    {
      name: 'mcpApiKey',
      type: 'text',
      label: t('tenants.mcpApiKey'),
      admin: {
        description: t('tenants.mcpApiKeyHelp'),
        position: 'sidebar',
      },
      access: superAdminSecretsAccess,
    },
  ],
}
