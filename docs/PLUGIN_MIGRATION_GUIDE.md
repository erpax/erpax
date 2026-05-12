# Plugin Migration Guide

**Date**: 2026-05-12  
**Purpose**: Step-by-step instructions for reorganizing plugins per `PLUGIN_ARCHITECTURE.md`

---

## Overview

This guide walks through migrating each plugin to the standard structure. Not all plugins need migration simultaneously — migrating one is a template for others.

**Current State**:
- `accounting/` — Partially structured (has collections/, fields/, services/, hooks/, agents/, etc.)
- `receivables/` — Flat (root-level `.ts` files)
- `payables/` — Flat
- `parties/` — Flat
- `export/` — Minimal (has seeds/)
- `auth/` — Minimal (has hooks/)
- `dimensions/` — Flat
- `mcp/` — Partial (has components/, endpoints/, globals/)

**Target State**: All plugins follow the standard structure from `PLUGIN_ARCHITECTURE.md` § 2.1.

---

## Phase 1: accounting/ Plugin Reorganization

The `accounting/` plugin is the most mature. Use it as a template.

### Step 1.1: Create Missing Directories

```bash
mkdir -p src/plugins/accounting/{types,validators,access,components}
```

### Step 1.2: Create types/ Directory

**Purpose**: Domain entity types extending standards.

**File**: `src/plugins/accounting/types/index.ts`

```typescript
/**
 * Accounting plugin types — domain entities extending standards.
 * 
 * Standards live in src/standards/; domain extensions live here.
 */

export type { GlAccount } from './gl-account';
export type { JournalEntry } from './journal-entry';
export type { FinancialStatement } from './financial-statement';
// ... export all types
```

**File**: `src/plugins/accounting/types/gl-account.ts`

```typescript
/**
 * GL Account entity — extends ISO-4217 + accounting standards.
 * 
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS IAS-1 chart-of-accounts
 */

import type { CurrencyCode } from '../../../standards/types'; // if exists

export interface GlAccount {
  readonly id: string; // UUID
  readonly number: string; // Account number (e.g., '1010')
  readonly name: string;
  readonly type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
  readonly currency: CurrencyCode;
  readonly tenantId: string; // Multi-tenancy
  readonly isActive: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
```

Repeat for each entity (JournalEntry, FinancialStatement, etc.).

### Step 1.3: Create validators/ Directory

**Purpose**: Validation logic used by collections + services.

**File**: `src/plugins/accounting/validators/index.ts`

```typescript
export { validateGlAccount } from './gl-account';
export { validateJournalEntry } from './journal-entry';
// ... export all validators
```

**File**: `src/plugins/accounting/validators/gl-account.ts`

```typescript
/**
 * GL Account validation.
 * 
 * @accounting IFRS IAS-1 chart-of-accounts
 */

import type { GlAccount } from '../types';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export async function validateGlAccount(
  account: GlAccount
): Promise<ValidationResult> {
  const errors: string[] = [];
  
  // Business rules
  if (account.number.length !== 4) {
    errors.push('Account number must be 4 digits');
  }
  
  if (account.type === 'asset' && account.currency !== 'USD') {
    errors.push('Asset accounts must be in USD');
  }
  
  return { valid: errors.length === 0, errors };
}
```

### Step 1.4: Create access/ Directory

**Purpose**: Role-based access control.

**File**: `src/plugins/accounting/access/index.ts`

```typescript
export { GLAccountAccess } from './gl-account';
export { JournalEntryAccess } from './journal-entry';
```

**File**: `src/plugins/accounting/access/gl-account.ts`

```typescript
/**
 * GL Account access control.
 */

import type { Access } from 'payload';

export const GLAccountAccess: Access = {
  create: ({ req }) => {
    // Only accounting admins can create
    return req.user?.role === 'accounting_admin';
  },
  read: ({ req }) => {
    // All users in tenant can read
    return { tenantId: { equals: req.user?.tenantId } };
  },
  update: ({ req }) => {
    return req.user?.role === 'accounting_admin';
  },
  delete: ({ req }) => {
    return req.user?.role === 'accounting_admin';
  },
};
```

### Step 1.5: Create components/ Directory

**Purpose**: React UI components using shadcn.

**File**: `src/plugins/accounting/components/index.ts`

```typescript
export { GLAccountForm } from './gl-account-form';
export { GLAccountTable } from './gl-account-table';
export { JournalEntryForm } from './journal-entry-form';
```

**File**: `src/plugins/accounting/components/gl-account-form.tsx`

```typescript
'use client';

/**
 * GL Account form component.
 */

import { useGLAccount } from '../hooks';
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  Input,
  Select,
  Button,
} from '@/components/ui';

export function GLAccountForm({ accountId }: { accountId: string }) {
  const { account, loading, error } = useGLAccount(accountId);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <Form>
      <FormField name="number" label="Account Number">
        <Input defaultValue={account?.number} />
      </FormField>
      <FormField name="type" label="Account Type">
        <Select defaultValue={account?.type}>
          <option value="asset">Asset</option>
          <option value="liability">Liability</option>
          <option value="equity">Equity</option>
          <option value="revenue">Revenue</option>
          <option value="expense">Expense</option>
        </Select>
      </FormField>
      <Button type="submit">Save</Button>
    </Form>
  );
}
```

### Step 1.6: Create React Hooks

**File**: `src/plugins/accounting/hooks/use-gl-account.ts`

```typescript
/**
 * React hook — fetch GL account by ID.
 */

import { useState, useEffect } from 'react';
import type { GlAccount } from '../types';

export function useGLAccount(id: string) {
  const [account, setAccount] = useState<GlAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/gl-accounts/${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setAccount(await res.json());
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);
  
  return { account, loading, error };
}
```

**File**: `src/plugins/accounting/hooks/use-gl-accounts.ts`

```typescript
/**
 * React hook — list GL accounts.
 */

import { useState, useEffect } from 'react';
import type { GlAccount } from '../types';

interface UseGLAccountsOptions {
  page?: number;
  limit?: number;
  search?: string;
}

export function useGLAccounts(options?: UseGLAccountsOptions) {
  const [accounts, setAccounts] = useState<GlAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    (async () => {
      try {
        const params = new URLSearchParams();
        if (options?.page) params.set('page', String(options.page));
        if (options?.limit) params.set('limit', String(options.limit));
        if (options?.search) params.set('search', options.search);
        
        const res = await fetch(`/api/gl-accounts?${params}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setAccounts(await res.json());
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    })();
  }, [options?.page, options?.limit, options?.search]);
  
  return { accounts, loading, error };
}
```

### Step 1.7: Update Collections with Validators & Access

**File**: `src/plugins/accounting/collections/gl-accounts.ts`

```typescript
/**
 * GL Accounts collection.
 * 
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS IAS-1 chart-of-accounts
 */

import type { CollectionConfig } from 'payload';
import { validateGlAccount } from '../validators';
import { GLAccountAccess } from '../access';

export const GLAccounts: CollectionConfig = {
  slug: 'gl-accounts',
  labels: { singular: 'GL Account', plural: 'GL Accounts' },
  
  fields: [
    { name: 'id', type: 'text', required: true, unique: true },
    { name: 'number', type: 'text', required: true, index: true },
    { name: 'name', type: 'text', required: true },
    {
      name: 'type',
      type: 'select',
      options: ['asset', 'liability', 'equity', 'revenue', 'expense'],
      required: true,
    },
    {
      name: 'currency',
      type: 'select',
      options: [
        { label: 'USD', value: 'USD' },
        { label: 'EUR', value: 'EUR' },
        // ... ISO-4217
      ],
      required: true,
    },
    { name: 'isActive', type: 'checkbox', defaultValue: true },
    { name: 'createdAt', type: 'date', admin: { readOnly: true } },
    { name: 'updatedAt', type: 'date', admin: { readOnly: true } },
  ],
  
  access: GLAccountAccess,
  
  hooks: {
    beforeChange: [validateGlAccount],
  },
};
```

### Step 1.8: Update index.ts to Reflect New Structure

**File**: `src/plugins/accounting/index.ts`

```typescript
/**
 * Accounting plugin — public API.
 * 
 * Everything else (collections/, services/, validators/, etc.) is internal.
 */

// Collections
export {
  GLAccounts,
  JournalEntries,
  FinancialStatements,
  // ... all collections
} from './collections';

// Types
export type {
  GlAccount,
  JournalEntry,
  FinancialStatement,
  // ... all types
} from './types';

// Services
export {
  createGLAccount,
  updateGLAccount,
  deleteGLAccount,
  // ... all services
} from './services';

// React hooks
export {
  useGLAccount,
  useGLAccounts,
  useJournalEntry,
  useJournalEntries,
  // ... all React hooks
} from './hooks';

// Components
export {
  GLAccountForm,
  GLAccountTable,
  JournalEntryForm,
  // ... all components
} from './components';

// Plugin factory
export { accountingPlugin } from './plugin';
```

---

## Phase 2: Migrate Flat Plugins (receivables/, payables/, parties/)

### Pattern: receivables/ Plugin

**Current**: Flat structure with `.ts` files at root.

**Target**: Full structure per `PLUGIN_ARCHITECTURE.md` § 2.1.

### Step 2.1: Organize Collections

```bash
mkdir -p src/plugins/receivables/collections
mv src/plugins/receivables/invoice.ts src/plugins/receivables/collections/
mv src/plugins/receivables/customer.ts src/plugins/receivables/collections/
# ... move all collection files
```

**File**: `src/plugins/receivables/collections/index.ts`

```typescript
export { Invoices } from './invoice';
export { Customers } from './customer';
export { Disputes } from './dispute';
// ... export all
```

### Step 2.2: Create types/

```bash
mkdir -p src/plugins/receivables/types
```

**File**: `src/plugins/receivables/types/index.ts`

```typescript
export type { Invoice } from './invoice';
export type { Customer } from './customer';
```

**File**: `src/plugins/receivables/types/invoice.ts`

```typescript
/**
 * Invoice entity — extends EN-16931.
 * 
 * @standard EN-16931:2017 invoice
 */

import type { En16931Invoice } from '../../../standards/en-16931/types';

export interface Invoice extends En16931Invoice {
  readonly tenantId: string;
  readonly status: 'draft' | 'sent' | 'paid' | 'cancelled';
}
```

### Step 2.3: Create validators/, services/, components/, hooks/

Follow the same pattern as accounting/ (Steps 1.3–1.7).

### Step 2.4: Create plugin.ts

**File**: `src/plugins/receivables/plugin.ts`

```typescript
import type { Plugin } from 'payload';
import { Invoices, Customers, Disputes } from './collections';

export const receivablesPlugin = (): Plugin => ({
  name: 'receivables',
  collections: [Invoices, Customers, Disputes],
});

export default receivablesPlugin;
```

### Step 2.5: Create index.ts

**File**: `src/plugins/receivables/index.ts`

```typescript
export { Invoices, Customers } from './collections';
export type { Invoice, Customer } from './types';
export { createInvoice, updateInvoice } from './services';
export { useInvoice, useInvoices } from './hooks';
export { InvoiceForm, InvoiceTable } from './components';
export { receivablesPlugin } from './plugin';
```

---

## Phase 3: Minimal Plugins (auth/, dimensions/, mcp/)

### auth/ Plugin

**Current**: Only has hooks/ folder.

**Target**: Full structure with types/, access/, services/.

```bash
mkdir -p src/plugins/auth/{collections,types,validators,access,services,components}
```

**File**: `src/plugins/auth/collections/users.ts`

```typescript
import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'User', plural: 'Users' },
  fields: [
    { name: 'id', type: 'text', required: true, unique: true },
    { name: 'email', type: 'email', required: true, unique: true },
    { name: 'role', type: 'select', options: ['admin', 'user', 'viewer'] },
    { name: 'tenantId', type: 'relationship', relationTo: 'tenants' },
  ],
  admin: { useAsTitle: 'email' },
};
```

Repeat for permissions, roles, tenants.

---

## Phase 4: Verify Structure

After each plugin migration:

```bash
# Verify directory structure
find src/plugins/<name> -maxdepth 1 -type d | sort

# Should see: collections, types, validators, access, services, hooks, components, middleware

# Test imports
pnpm typecheck

# Test standards citations
pnpm standards:check
pnpm standards:required
```

---

## Checklist

### Per Plugin

- [ ] Create directories: collections/, types/, validators/, access/, services/, hooks/, components/
- [ ] Move/create collection files in collections/
- [ ] Create types extending standards
- [ ] Create validators for each entity
- [ ] Create access control rules
- [ ] Create services for business logic
- [ ] Create React hooks (useEntity, useEntities)
- [ ] Create shadcn components
- [ ] Create/update plugin.ts
- [ ] Create/update index.ts (public API)
- [ ] Add JSDoc citations (@standard, @accounting, etc.)
- [ ] Run pnpm typecheck
- [ ] Run pnpm standards:check
- [ ] Test in dev mode with pnpm dev

### Project-Wide

- [ ] All plugins follow PLUGIN_ARCHITECTURE.md § 2.1
- [ ] All collections cite standards via JSDoc
- [ ] pnpm standards:verify-index passes
- [ ] pnpm typecheck passes
- [ ] All React hooks tested in components
- [ ] All shadcn components render correctly

---

## References

- **Plugin Architecture**: `docs/PLUGIN_ARCHITECTURE.md`
- **Standards System**: `docs/STANDARDS.md`

---
