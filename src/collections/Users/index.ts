import type { CollectionConfig } from 'payload'
import { tenantsArrayField } from '@payloadcms/plugin-multi-tenant/fields'

import { isSuperAdmin } from '@/access/isSuperAdmin'
import { localeRecord } from '@/i18n'

import { createAccess } from './access/create'
import { readAccess } from './access/read'
import { updateAndDeleteAccess } from './access/updateAndDelete'
import { externalUsersLogin } from './endpoints/externalUsersLogin'
import { ensureUniqueUsername } from './hooks/ensureUniqueUsername'
import { setCookieBasedOnDomain } from './hooks/setCookieBasedOnDomain'

const defaultTenantArrayField = tenantsArrayField({
  tenantsArrayFieldName: 'tenants',
  tenantsArrayTenantFieldName: 'tenant',
  tenantsCollectionSlug: 'tenants',
  arrayFieldAccess: {},
  tenantFieldAccess: {},
  rowFields: [
    {
      name: 'roles',
      type: 'select',
      label: localeRecord('users.tenantRoles'),
      defaultValue: ['viewer'],
      hasMany: true,
      options: [
        { label: localeRecord('users.tenantAdminRole'), value: 'admin' },
        { label: localeRecord('users.tenantViewerRole'), value: 'viewer' },
      ],
      required: true,
      access: {
        update: ({ req }) => Boolean(req.user),
      },
    },
  ],
})

/**
 * Users — authenticated identities (cross-tenant via tenants[] membership).
 *
 * Email is the login identity; password storage is delegated to Payload's
 * auth subsystem (bcrypt). Tenant membership and per-tenant roles live on
 * the `tenants[]` array field.
 *
 * @rfc 5322 internet-message-format email
 * @rfc 5321 smtp envelope
 * @rfc 6532 internationalized-email-addresses
 * @standard BCP-47 language-tag user-locale
 * @security ISO-27001 A.5.16 identity-management
 * @security ISO-27001 A.5.17 authentication-information
 * @security ISO-27002 §8.5 secure-authentication
 * @compliance GDPR Art.6(1)(b) lawful-basis-contract
 * @compliance GDPR Art.32 security-of-processing
 * @compliance SOC-2 CC6.1 logical-access-controls
 * @see docs/STANDARDS.md §3
 */
export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: localeRecord('users.singular'),
    plural: localeRecord('users.plural'),
  },
  access: {
    create: createAccess,
    delete: updateAndDeleteAccess,
    read: readAccess,
    update: updateAndDeleteAccess,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: {
    // With no outbound email configured, avoid verification (and the send on create/first-user).
    // Set `RESEND_API_KEY` to enable verify + verification emails.
    verify: Boolean(process.env.RESEND_API_KEY?.trim()),
  },
  endpoints: [externalUsersLogin],
  fields: [
    {
      type: 'text',
      name: 'password',
      hidden: true,
      access: {
        read: () => false,
        update: ({ req, id }) => {
          const { user } = req
          if (!user) return false
          if (id === user.id) return true
          return isSuperAdmin(user)
        },
      },
    },
    {
      name: 'name',
      type: 'text',
      label: localeRecord('users.name'),
    },
    {
      admin: {
        position: 'sidebar',
      },
      name: 'roles',
      type: 'select',
      label: localeRecord('users.roles'),
      defaultValue: ['user'],
      hasMany: true,
      options: [
        { label: localeRecord('users.superAdminRole'), value: 'super-admin' },
        { label: localeRecord('users.adminRole'), value: 'admin' },
        { label: localeRecord('users.userRole'), value: 'user' },
        { label: localeRecord('users.customerRole'), value: 'customer' },
        // Slice BBB — added per Decision B step 4 Option A2 so the accounting
        // plugin's existing role checks (`req.user?.roles?.includes('accountant')`,
        // `'auditor'`) resolve. The seeds at
        // `src/plugins/accounting/seeds/level-{1,2,3}/*.ts` already create
        // users with these role values; before this slice they were silently
        // dropped on write.
        { label: 'Accountant', value: 'accountant' },
        { label: 'Auditor', value: 'auditor' },
      ],
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
      },
    },
    {
      name: 'username',
      type: 'text',
      label: localeRecord('users.username'),
      required: false,
      hooks: {
        beforeValidate: [ensureUniqueUsername],
      },
      index: true,
    },
    {
      ...defaultTenantArrayField,
      admin: {
        ...(defaultTenantArrayField?.admin || {}),
        position: 'sidebar',
      },
    },
    {
      name: 'orders',
      type: 'join',
      label: localeRecord('users.orders'),
      collection: 'orders',
      on: 'customer',
      admin: {
        allowCreate: false,
        defaultColumns: ['id', 'createdAt', 'total', 'currency', 'items'],
      },
    },
    {
      name: 'cart',
      type: 'join',
      label: localeRecord('users.cart'),
      collection: 'carts',
      on: 'customer',
      admin: {
        allowCreate: false,
        defaultColumns: ['id', 'createdAt', 'total', 'currency', 'items'],
      },
    },
    {
      name: 'addresses',
      type: 'join',
      label: localeRecord('users.addresses'),
      collection: 'addresses',
      on: 'customer',
      admin: {
        allowCreate: false,
        defaultColumns: ['id'],
      },
    },
  ],
  hooks: {
    afterLogin: [setCookieBasedOnDomain],
  },
  timestamps: true,
}
