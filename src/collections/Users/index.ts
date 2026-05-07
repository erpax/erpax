import type { CollectionConfig } from 'payload'
import { tenantsArrayField } from '@payloadcms/plugin-multi-tenant/fields'

import { isSuperAdmin } from '@/access/isSuperAdmin'
import { t } from '@/i18n'

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
      label: t('users.tenantRoles'),
      defaultValue: ['tenant-viewer'],
      hasMany: true,
      options: [
        { label: t('users.tenantAdminRole'), value: 'tenant-admin' },
        { label: t('users.tenantViewerRole'), value: 'tenant-viewer' },
      ],
      required: true,
      access: {
        update: ({ req }) => Boolean(req.user),
      },
    },
  ],
})

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: t('users.singular'),
    plural: t('users.plural'),
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
  auth: true,
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
      label: t('users.name'),
    },
    {
      admin: {
        position: 'sidebar',
      },
      name: 'roles',
      type: 'select',
      label: t('users.roles'),
      defaultValue: ['user'],
      hasMany: true,
      options: [
        { label: t('users.superAdminRole'), value: 'super-admin' },
        { label: t('users.adminRole'), value: 'admin' },
        { label: t('users.userRole'), value: 'user' },
        { label: t('users.customerRole'), value: 'customer' },
      ],
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
      },
    },
    {
      name: 'username',
      type: 'text',
      label: t('users.username'),
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
      label: t('users.orders'),
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
      label: t('users.cart'),
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
      label: t('users.addresses'),
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
