/**
 * Collection Factory — base config builder for accounting collections.
 *
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation tenant-required
 * @security ISO-27002 §5.15 access-control role-required
 * @audit ISO-19011:2018 audit-trail beforeValidate-tenant-populator
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @see docs/STANDARDS.md §4.2
 */

import type { CollectionConfig, CollectionBeforeChangeHook } from 'payload'
// Slice PPP: dropped `ensureHostId` import — duplicated `autoPopulateHost`
// from `@/plugins/hooks/common.ts` (both populate `data.tenant` from
// `req.user.tenants[0].tenant`). Use the canonical hook from the
// shared @/plugins/hooks barrel.
import { autoPopulateHost } from '@/plugins/hooks'

export interface AccountingCollectionOptions {
  slug: string;
  labels: { singular: string; plural: string };
  useAsTitle: string;
  defaultColumns: string[];
  roleRequired?: string;
  beforeChangeHooks?: CollectionBeforeChangeHook[];
}

/**
 * Create base accounting collection with standard access control and hostId handling
 */
export const createAccountingCollection = (
  options: AccountingCollectionOptions,
  fieldsFactory: () => any[],
): Partial<CollectionConfig> => {
  return {
    slug: options.slug,
    labels: options.labels,
    admin: {
      useAsTitle: options.useAsTitle,
      defaultColumns: options.defaultColumns,
    },
    access: {
      read: async ({ req }) => {
        if (req.user?.roles?.includes('admin')) return true;
        // Slice CCC: tenant-scoped read derived from req.user.tenants[0].tenant
        // (canonical multi-tenant plugin shape).
        const tenantsArr = (req.user as unknown as { tenants?: Array<{ tenant?: number | string }> } | null | undefined)?.tenants;
        const userTenant = tenantsArr?.[0]?.tenant;
        if (userTenant === undefined || userTenant === null) return false;
        return { tenant: { equals: userTenant } };
      },
      create: async ({ req }) => {
        const role = options.roleRequired || 'accountant';
        return req.user?.roles?.includes('admin') || !!req.user?.roles?.includes(role);
      },
      update: async ({ req }) => {
        const role = options.roleRequired || 'accountant';
        return req.user?.roles?.includes('admin') || !!req.user?.roles?.includes(role);
      },
      delete: async ({ req }) => req.user?.roles?.includes('admin'),
    },
    fields: fieldsFactory(),
    hooks: {
      beforeValidate: [autoPopulateHost],
      beforeChange: [
        ...(options.beforeChangeHooks || []),
      ],
    },
    timestamps: true,
  };
};

/**
 * Create calculated field with beforeChange hook
 */
export const createCalculatedField = (
  fieldName: string,
  calculator: (data: any) => number,
  description?: string,
) => {
  return {
    name: fieldName,
    type: 'number' as const,
    defaultValue: 0,
    admin: { disabled: true, description },
    _calculator: calculator, // Store for use in hooks
  };
};

/**
 * Create GL account mapping fields (asset, liability, expense accounts)
 */
export const createGLAccountFields = (accounts: { name: string; description: string }[]) => {
  return accounts.map(acc => ({
    name: acc.name,
    type: 'relationship' as const,
    relationTo: 'gl-accounts',
    required: true,
    admin: { description: acc.description },
  }));
};

/**
 * Create line item array field with standard structure
 */
export const createLineItemArray = (
  lineItemFields: { name: string; type: string; required?: boolean; options?: any }[],
) => {
  return {
    name: 'lineItems',
    type: 'array' as const,
    minRows: 1,
    fields: lineItemFields,
  };
};
