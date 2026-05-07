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
      defaultValue: ['tenant-viewer'],
      hasMany: true,
      options: [
        { label: localeRecord('users.tenantAdminRole'), value: 'tenant-admin' },
        { label: localeRecord('users.tenantViewerRole'), value: 'tenant-viewer' },
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
      ],
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
      },
    },
    {
      name: 'username',
      type: 'text',
      label: localeRecord('users.username'),
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
