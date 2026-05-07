import type { CollectionConfig } from 'payload'

import { isSuperAdminAccess, isSuperAdminFieldAccess } from '@/access/isSuperAdmin'
import { PL } from '@/i18n/payloadLabels'
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
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'domain',
      type: 'text',
      admin: {
        description: PL.tenants.domainHelp,
      },
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        description: PL.tenants.slugHelp,
      },
      index: true,
      required: true,
    },
    {
      name: 'allowPublicRead',
      type: 'checkbox',
      admin: {
        description: PL.tenants.allowPublicReadHelp,
        position: 'sidebar',
      },
      defaultValue: false,
      index: true,
    },
    {
      name: 'publicSiteUrl',
      type: 'text',
      admin: {
        description: PL.tenants.publicSiteUrlHelp,
        position: 'sidebar',
      },
    },
    {
      name: 'stripePublishableKey',
      type: 'text',
      admin: {
        description: PL.tenants.stripePublishableHelp,
        position: 'sidebar',
      },
    },
    {
      name: 'stripeSecretKey',
      type: 'text',
      admin: {
        description: PL.tenants.stripeSecretHelp,
        position: 'sidebar',
      },
      access: superAdminSecretsAccess,
    },
    {
      name: 'stripeWebhookSecret',
      type: 'text',
      admin: {
        description: PL.tenants.stripeWebhookHelp,
        position: 'sidebar',
      },
      access: superAdminSecretsAccess,
    },
    {
      name: 'integrationSettings',
      type: 'json',
      admin: {
        description: PL.tenants.integrationSettingsHelp,
        position: 'sidebar',
      },
    },
    {
      name: 'resendApiKey',
      type: 'text',
      admin: {
        description: PL.tenants.resendApiKeyHelp,
        position: 'sidebar',
      },
      access: superAdminSecretsAccess,
    },
    {
      name: 'emailDefaultFromAddress',
      type: 'text',
      admin: {
        description: PL.tenants.emailDefaultFromAddressHelp,
        position: 'sidebar',
      },
    },
    {
      name: 'emailDefaultFromName',
      type: 'text',
      admin: {
        description: PL.tenants.emailDefaultFromNameHelp,
        position: 'sidebar',
      },
    },
    {
      name: 'mcpApiKey',
      type: 'text',
      admin: {
        description: PL.tenants.mcpApiKeyHelp,
        position: 'sidebar',
      },
      access: superAdminSecretsAccess,
    },
  ],
}
