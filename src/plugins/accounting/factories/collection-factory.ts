/**
 * Collection Factory — base config builder for accounting collections.
 *
 * Access predicates flow through the canonical helpers in
 * `@/plugins/auth/access` (`scopedAccess`, `roleScopedAccess`, `tenantAdmin`)
 * so every accounting collection produced here gets the same multi-tenant
 * isolation contract — no inline `req.user?.roles?.includes(...)` chains
 * to drift, and tenant-scoped delete protection comes for free.
 *
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation tenant-required
 * @security ISO-27002 §5.15 access-control role-required
 * @audit ISO-19011:2018 audit-trail beforeValidate-tenant-populator
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @see docs/STANDARDS.md §4.2
 * @see src/plugins/auth/access.ts
 */

import type { CollectionConfig, CollectionBeforeChangeHook, Field } from 'payload'
// Slice PPP: dropped `ensureTenant` import — duplicated `autoPopulateTenant`
// from `@/hooks/` (both populate `data.tenant` from
// `req.user.tenants[0].tenant`). Use the canonical hook from the
// shared @/hooks/* per-file modules.
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '@/plugins/auth/access'
import type { UserRole } from '@/plugins/auth/access'

export interface AccountingCollectionOptions {
  slug: string;
  labels: { singular: string; plural: string };
  useAsTitle: string;
  defaultColumns: string[];
  /**
   * Additional non-admin role allowed to create/update. `'admin'` is always
   * allowed via `roleScopedAccess`; this option lets a collection extend the
   * write-set (e.g. `'accountant'`, `'payroll-officer'`).
   */
  roleRequired?: UserRole;
  beforeChangeHooks?: CollectionBeforeChangeHook[];
}

/**
 * Create base accounting collection with standard access control and tenant
 * isolation. Read returns the canonical scoped query; create/update gate on
 * admin + the optional extra role; delete is admin-only AND tenant-scoped.
 */
export const createAccountingCollection = (
  options: AccountingCollectionOptions,
  fieldsFactory: () => Field[],
): Partial<CollectionConfig> => {
  const writeRole: UserRole = options.roleRequired ?? ('accountant' as UserRole);
  return {
    slug: options.slug,
    labels: options.labels,
    admin: {
      useAsTitle: options.useAsTitle,
      defaultColumns: options.defaultColumns,
    },
    access: {
      read: scopedAccess(),
      create: roleScopedAccess('admin' as UserRole, writeRole),
      update: roleScopedAccess('admin' as UserRole, writeRole),
      // tenantAdmin is tenant-scoped (admins can only delete docs in their
      // own tenant) — strictly tighter than the previous unscoped admin check.
      delete: tenantAdmin,
    },
    fields: fieldsFactory(),
    hooks: {
      beforeValidate: [autoPopulateTenant],
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
  calculator: (data: Record<string, unknown>) => number,
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
  lineItemFields: { name: string; type: string; required?: boolean; options?: unknown }[],
) => {
  return {
    name: 'lineItems',
    type: 'array' as const,
    minRows: 1,
    fields: lineItemFields,
  };
};
